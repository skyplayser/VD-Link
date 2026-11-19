# VDM (VD-Mobile): the club in the headset.
#   Live      – VD-Link on the computer sends scene, beams and spots per frame, video pictures;
#               VDM sends back where the headset is (shown in VD-Link).
#   Scenario  – a show recorded in VDM plays without a computer (scenario.gd).
#   Demo      – the scenario that ships with the app (res://demo/).
#   Home      – the start screen: a small lounge with a light show, the choice on a pedestal.
# Signal sources (console, NDI video) are only ever on the computer.
extends Node3D

const BEAM_SHADER := preload("res://shaders/beam.gdshader")
const SPOTMAP_SHADER := preload("res://shaders/spotmap.gdshader")
const MAP_SIZE := 512
const HEIGHT_SIZE := 160
const MAX_BEAMS := 512
const MAX_SPOTS := 24
const DEMO_DIR := "res://demo/"
const SETTINGS_FILE := "user://settings.json"
## Room light per level: the hemisphere light of VD-Link's 3D view × gain (1 = as in VD-Link).
const AMBIENT := [0.0, 0.8, 1.8, 3.5]
const AMBIENT_LABEL := ["Aus", "Wie VD-Link", "Heller", "Hell"]
const HAZE := [[0.0, "Aus"], [0.3, "Wenig"], [0.6, "Mittel"], [1.0, "Viel"]]

@onready var net: Node = $Net
@onready var origin: XROrigin3D = $XROrigin3D
@onready var camera: XRCamera3D = $XROrigin3D/XRCamera3D
@onready var left: XRController3D = $XROrigin3D/LeftHand
@onready var right: XRController3D = $XROrigin3D/RightHand
@onready var env: WorldEnvironment = $WorldEnvironment

var xr: OpenXRInterface
var world := Node3D.new()
var walls: Node3D = preload("res://scripts/walls.gd").new()
var scenario: Node = preload("res://scripts/scenario.gd").new()
var player: Node3D = preload("res://scripts/player.gd").new()
var menu: Node3D = preload("res://scripts/menu.gd").new()
var home = preload("res://scripts/home.gd").new()
var _home_t := 0.0
var beams := MultiMeshInstance3D.new()
var mm := MultiMesh.new()
var lenses := MultiMeshInstance3D.new()
var lens_mm := MultiMesh.new()
var heads := MultiMeshInstance3D.new()
var head_mm := MultiMesh.new()
var spot_img := Image.create_empty(4, MAX_SPOTS, false, Image.FORMAT_RGBAF)
var spot_tex: ImageTexture
var spot_map := SubViewport.new()
var spot_map_mat := ShaderMaterial.new()
var settings := { "ambient": 1, "haze": 0.6, "walk": true, "turn": 30, "v": 2 }

## "home", "live", "scenario" or "demo"
var mode := ""
var status_text := ""
var status_ok := true
var computer_name := ""
var _scene: Dictionary = {}
var _spots: Array = []
var _loc: Dictionary = {}
var _walls_state: Array = []
var _view: Dictionary = {}
var _gobo_png := PackedByteArray()
var _gobo_grid := Vector2i.ZERO
## The room from VD-Link ("VDV1"); empty = VDM builds a simple room from the location itself.
var _venue_bin := PackedByteArray()
var _page := "main"
var _code := ""
var _code_target := {}
var _confirm_delete := ""
var _saved: Array = []
var _fps := 0.0
var _live_wait := 0.0

var _frames := 0
var _fps_t := 0.0
var _beam_count := 0
var _spot_count := 0
var _floor_y := 0.0
## On-device measurement after the scene is loaded: what costs how much (4 s per step).
var _bench_step := -1
var _bench_t := 0.0
var _bench_out: PackedStringArray = []
var _no_spots := false


func _ready() -> void:
	xr = XRServer.find_interface("OpenXR")
	if xr and xr.is_initialized():
		get_viewport().use_xr = true
		xr.session_begun.connect(_on_session_begun)
	add_child(world)
	walls.net = net
	add_child(walls)
	add_child(scenario)
	player.origin = origin
	player.camera = camera
	player.left = left
	player.right = right
	player.menu = menu
	player.settings = settings
	player.menu_button = _on_menu_button
	menu.left = left
	menu.right = right
	add_child(menu)
	add_child(player)
	menu.action.connect(_on_menu)
	_setup_beams()
	_setup_lamps()
	spot_tex = ImageTexture.create_from_image(spot_img)
	RenderingServer.global_shader_parameter_set("spot_tex", spot_tex)
	RenderingServer.global_shader_parameter_set("spot_count", 0)
	_setup_spot_map()
	_load_settings()
	_apply_settings()
	# Live data and scenario playback feed the same handlers.
	for src in [net, scenario]:
		src.scene_received.connect(_on_scene)
		src.frame_received.connect(_on_frame)
		src.view_received.connect(_on_view)
		src.walls_received.connect(_on_walls)
		src.gobos_received.connect(_on_gobos)
		src.venue_received.connect(_on_venue)
	net.goto_requested.connect(_on_goto)
	net.scene_changed.connect(func(): net.load_scene())
	net.status_changed.connect(_on_net_status)
	net.found_changed.connect(func(_l): _refresh_menu())
	net.record_requested.connect(func(secs): _on_menu("rec:%d" % int(secs)))
	walls.picture_received.connect(func(i, b): scenario.record_picture(i, b))
	scenario.picture.connect(func(i, b): walls.show_jpeg(i, b))
	scenario.recording_done.connect(_on_recorded)
	net.log_line("start VDM %s %s" % [OS.get_model_name(), Engine.get_version_info().string])
	# Start screen; looking for VD-Link in the network runs meanwhile.
	_start_home()
	net.discover()


## Server address: user://server.txt (saved after a successful connection or written for tests),
## else res://server.txt (development, USB with adb reverse).
func _server_url() -> String:
	for f in ["user://server.txt", "res://server.txt"]:
		if FileAccess.file_exists(f):
			var s := FileAccess.get_file_as_string(f).strip_edges().get_slice("\n", 0).strip_edges()
			if s != "":
				return s
	return ""


func _saved_name() -> String:
	var f := "user://server-name.txt"
	return FileAccess.get_file_as_string(f).strip_edges() if FileAccess.file_exists(f) else "VD-Link"


func _on_session_begun() -> void:
	var rates: Array = xr.get_available_display_refresh_rates()
	# 72 Hz: the Pico holds it steadily with the full room (90 Hz dropped to 56–85 fps).
	var want := 72.0 if rates.has(72.0) or rates.is_empty() else float(rates[0])
	# Test override: user://hz.txt (debug build: adb shell run-as <package> to write it).
	if FileAccess.file_exists("user://hz.txt"):
		var hz := FileAccess.get_file_as_string("user://hz.txt").strip_edges().to_float()
		if rates.has(hz):
			want = hz
	if rates.size():
		xr.display_refresh_rate = want
	# Ask the runtime for full GPU clocks (XR_EXT_performance_settings; ignored if unsupported).
	xr.set_gpu_level(OpenXRInterface.PERF_SETTINGS_LEVEL_BOOST)
	xr.set_cpu_level(OpenXRInterface.PERF_SETTINGS_LEVEL_SUSTAINED_HIGH)
	net.log_line("xr session: rates=%s set=%.0f foveation=%s" % [str(rates), xr.display_refresh_rate, str(xr.foveation_level)])


# ------------------------------------------------------------------ settings
func _load_settings() -> void:
	if not FileAccess.file_exists(SETTINGS_FILE):
		return
	var s = JSON.parse_string(FileAccess.get_file_as_string(SETTINGS_FILE))
	if typeof(s) != TYPE_DICTIONARY:
		return
	# Room light levels changed with settings version 2 (now: like VD-Link's 3D view).
	if s.get("ambient") is float and int(s.ambient) in [0, 1, 2, 3] and s.get("v") == 2.0:
		settings.ambient = int(s.ambient)
	if s.get("haze") is float and s.haze >= 0.0 and s.haze <= 1.0:
		settings.haze = float(s.haze)
	if s.get("walk") is bool:
		settings.walk = s.walk
	if s.get("turn") is float and int(s.turn) in [0, 30, 45]:
		settings.turn = int(s.turn)


func _save_settings() -> void:
	var f := FileAccess.open(SETTINGS_FILE, FileAccess.WRITE)
	if f:
		f.store_string(JSON.stringify(settings))


func _apply_settings() -> void:
	RenderingServer.global_shader_parameter_set("ambient_gain", AMBIENT[settings.ambient])
	# Lamp housings and controllers (standard materials) get a little flat light.
	env.environment.ambient_light_energy = 0.15 + AMBIENT[settings.ambient] * 0.25
	RenderingServer.global_shader_parameter_set("haze", settings.haze)


# ------------------------------------------------------------------ sources
func _start_live(url: String, name: String) -> void:
	_leave_home()
	if mode == "home":
		_clear_scene()
	scenario.stop_recording(false)
	scenario.stop()
	walls.offline = false
	mode = "live"
	computer_name = name
	_live_wait = 0.0
	_set_status("Verbinde mit %s …" % name, true)
	net.start(url)


## The start screen: lounge, light show, the choice on the pedestal.
func _start_home(why := "") -> void:
	scenario.stop_recording(false)
	scenario.stop()
	net.stop()
	walls.offline = true
	mode = "home"
	_clear_scene()
	_scene = {}
	_venue_bin = PackedByteArray()
	_gobo_png = PackedByteArray()
	RenderingServer.global_shader_parameter_set("gobo_grid", Vector2.ZERO)
	home.build(world)
	_loc = home.loc
	_spots = []
	walls.build(home.loc)
	walls.apply_states([{ "name": "LED", "state": "demo", "brightness": 1.0 }])
	var room: Dictionary = home.loc.room
	player.room_half = Vector2(float(room.width) / 2.0, float(room.depth) / 2.0)
	player.place(home.START, 0.0)
	settings.haze = 0.6
	_apply_settings()
	_saved = scenario.list_saved()
	_page = "home"
	_set_status(why if why != "" else "Willkommen", why == "")
	_pin_home_menu()
	await get_tree().physics_frame
	await get_tree().physics_frame
	if mode == "home":
		_build_height_map(home.loc)


func _pin_home_menu() -> void:
	_page = "home"
	menu.set_model(_menu_model())
	menu.pin(Transform3D(Basis().rotated(Vector3.RIGHT, -0.12).scaled(Vector3(1.15, 1.15, 1.15)), home.KIOSK))


## B / Y: open or close the menu; on the start screen it moves between the pedestal and your hand.
func _on_menu_button() -> void:
	if mode == "home":
		if menu.pinned:
			_page = "home"
			menu.show_menu(player.head(), player.head_dir())
			menu.set_model(_menu_model())
		else:
			_pin_home_menu()
		return
	if menu.is_open():
		menu.hide_menu()
	else:
		_page = "main"
		menu.show_menu(player.head(), player.head_dir())
		menu.set_model(_menu_model())


func _leave_home() -> void:
	if menu.pinned:
		menu.hide_menu()


func _start_scenario(dir: String) -> void:
	_leave_home()
	scenario.stop_recording(false)
	net.stop()
	walls.offline = true
	if scenario.play(dir):
		mode = "scenario"
		_set_status("Gespeichert: %s" % scenario.play_name, true)
	else:
		_start_demo("Szenario nicht lesbar")


func _start_demo(why := "") -> void:
	_leave_home()
	scenario.stop_recording(false)
	net.stop()
	walls.offline = true
	mode = "demo"
	if not scenario.play(DEMO_DIR):
		_clear_scene()
		_set_status("Demo fehlt in dieser Version", false)
		return
	_set_status(why if why != "" else "Demo-Show (ohne Computer)", why == "")


func _set_status(text: String, ok: bool) -> void:
	status_text = text
	status_ok = ok
	net.log_line("status " + text)
	_refresh_menu()


func _on_net_status(text: String, ok: bool) -> void:
	if mode != "live":
		return
	if net.wrong_code:
		_set_status("Code stimmt nicht – Menü: Verbinden", false)
		return
	_set_status(("%s: " % computer_name if ok else "") + text, ok)
	if ok and net.connected:
		# Remember this computer for the next start.
		var f := FileAccess.open("user://server.txt", FileAccess.WRITE)
		if f:
			f.store_string(net.base)
		var n := FileAccess.open("user://server-name.txt", FileAccess.WRITE)
		if n:
			n.store_string(computer_name)


# ------------------------------------------------------------------ scene
func _clear_scene() -> void:
	for c in world.get_children():
		c.queue_free()
	walls.build({})
	mm.visible_instance_count = 0
	lens_mm.visible_instance_count = 0
	head_mm.visible_instance_count = 0
	RenderingServer.global_shader_parameter_set("spot_count", 0)


func _on_scene(data: Dictionary) -> void:
	_clear_scene()
	_scene = data
	var project: Dictionary = data.get("project", {})
	# `loc`: also the ready-made templates as a location (VD-Link 0.5+); older: own locations only.
	var loc: Dictionary = data.get("loc", {}) if typeof(data.get("loc")) == TYPE_DICTIONARY else {}
	if loc.is_empty():
		loc = project.get("venue", {}).get("location", {})
	if loc.is_empty():
		_set_status("Diese Vorlage braucht ein neueres VD-Link", false)
		return
	_loc = loc
	_venue_bin = PackedByteArray()
	var info: Dictionary = preload("res://scripts/venue.gd").new().build(loc, world)
	_spots = info.spots
	walls.build(loc)
	var room: Dictionary = loc.get("room", {})
	player.room_half = Vector2(float(room.get("width", 20.0)) / 2.0, float(room.get("depth", 14.0)) / 2.0)
	var view: Dictionary = project.get("view", {})
	if view.has("haze") and mode == "live":
		settings.haze = float(view.haze)
		_apply_settings()
	_go_to(_start_spot())
	await get_tree().physics_frame
	await get_tree().physics_frame
	_build_height_map(loc)
	if mode == "live":
		_set_status("%s: %s" % [computer_name, String(project.get("name", "Projekt"))], true)
	# Measurement only on request: user://bench.txt (debug build: adb shell run-as <package>).
	if FileAccess.file_exists("user://bench.txt") and (_bench_step < 0 or _bench_step == 99):
		_bench_step = 0
		_bench_out = []
		_bench_t = -6.0  # let shaders compile and the first frames settle
	net.log_line("scene %s: %d objects" % [project.get("name", "?"), loc.get("objects", []).size()])


## Start on the dance floor (crowd area named „Tanzfläche“, else the largest).
func _start_spot() -> int:
	var best := -1
	for i in _spots.size():
		var s: Dictionary = _spots[i]
		if String(s.name).to_lower().contains("tanzfläche"):
			return i
		if best < 0 or s.size.x * s.size.z > _spots[best].size.x * _spots[best].size.z:
			best = i
	return best


## Stand in a crowd area, looking towards the stage (back wall).
func _go_to(i: int) -> void:
	var back := -float(_loc.get("room", {}).get("depth", 14.0)) / 2.0
	var p: Vector3 = _spots[i].pos if i >= 0 and i < _spots.size() else Vector3.ZERO
	var yaw := atan2(0.0, -(back - p.z))
	player.place(p, yaw)


## VD-Link's own room (all details, baked lights, crowd) replaces the simple one.
func _on_venue(bytes: PackedByteArray) -> void:
	if _loc.is_empty() or bytes == _venue_bin:
		return
	var t0 := Time.get_ticks_msec()
	var holder := Node3D.new()
	var vm = preload("res://scripts/venue_mesh.gd").new()
	if not vm.build(bytes, holder):
		holder.free()
		net.log_line("venue: unreadable (%d bytes)" % bytes.size())
		return
	for c in world.get_children():
		c.queue_free()
	world.add_child(holder)
	_venue_bin = bytes
	net.log_line("venue: %d triangles, %d people, %d ms" % [vm.triangles, vm.crowd_count, Time.get_ticks_msec() - t0])
	await get_tree().physics_frame
	await get_tree().physics_frame
	_build_height_map(_loc)


## VD-Link's VR menu „Hierher holen“: stand there, looking where the 3D view looked.
func _on_goto(p: Vector3, yaw: float) -> void:
	var space := get_world_3d().direct_space_state
	# From the view's height (below the ceiling) down to the first floor, stage or podium.
	var top := minf(p.y + 0.3, float(_loc.get("room", {}).get("height", 8.0)) - 0.3)
	var hit := space.intersect_ray(PhysicsRayQueryParameters3D.create(Vector3(p.x, top, p.z), Vector3(p.x, -30.0, p.z)))
	var feet := Vector3(p.x, hit.position.y if hit else 0.0, p.z)
	player.place_view(feet, yaw)
	net.log_line("goto (%.1f, %.1f, %.1f) yaw %.0f°" % [feet.x, feet.y, feet.z, rad_to_deg(yaw)])


func _on_view(v: Dictionary) -> void:
	_view = v
	if v.has("haze"):
		settings.haze = float(v.haze)
		_apply_settings()


func _on_walls(w: Array) -> void:
	_walls_state = w
	walls.apply_states(w)


func _on_gobos(png: PackedByteArray, cols: int, rows: int) -> void:
	var img := Image.new()
	if img.load_png_from_buffer(png) != OK:
		return
	_gobo_png = png
	_gobo_grid = Vector2i(cols, rows)
	RenderingServer.global_shader_parameter_set("gobo_tex", ImageTexture.create_from_image(img))
	RenderingServer.global_shader_parameter_set("gobo_grid", Vector2(cols, rows))


func _on_recorded(ok: bool, name: String) -> void:
	_set_status(("Gespeichert: " + name) if ok else "Aufnahme verworfen", ok)


# ------------------------------------------------------------------ beams, lamps, spots
func _setup_beams() -> void:
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.use_colors = true
	mm.use_custom_data = true
	# 16 sides, 6 rings: half the vertices of 24×8; brightness is per vertex, still smooth.
	mm.mesh = _unit_cylinder(16, 6)
	mm.instance_count = MAX_BEAMS
	mm.visible_instance_count = 0
	beams.multimesh = mm
	var m := ShaderMaterial.new()
	m.shader = BEAM_SHADER
	beams.material_override = m
	beams.custom_aabb = AABB(Vector3(-200, -200, -200), Vector3(400, 400, 400))
	beams.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(beams)


## Lamp heads: a dark housing behind every beam and the glowing lens in its colour – they
## follow pan/tilt because they sit on the beams VD-Link computes.
func _setup_lamps() -> void:
	var housing := CylinderMesh.new()
	housing.top_radius = 1.0
	housing.bottom_radius = 1.15
	housing.height = 1.0
	housing.radial_segments = 12
	housing.rings = 1
	var hm := StandardMaterial3D.new()
	hm.albedo_color = Color(0.09, 0.09, 0.1)
	hm.roughness = 0.5
	housing.material = hm
	head_mm.transform_format = MultiMesh.TRANSFORM_3D
	head_mm.mesh = housing
	head_mm.instance_count = MAX_BEAMS
	head_mm.visible_instance_count = 0
	heads.multimesh = head_mm
	heads.custom_aabb = AABB(Vector3(-200, -200, -200), Vector3(400, 400, 400))
	heads.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(heads)
	var lens := CylinderMesh.new()
	lens.top_radius = 1.0
	lens.bottom_radius = 1.0
	lens.height = 1.0
	lens.radial_segments = 16
	lens.rings = 1
	var lm := StandardMaterial3D.new()
	lm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	lm.vertex_color_use_as_albedo = true
	lens.material = lm
	lens_mm.transform_format = MultiMesh.TRANSFORM_3D
	lens_mm.use_colors = true
	lens_mm.mesh = lens
	lens_mm.instance_count = MAX_BEAMS
	lens_mm.visible_instance_count = 0
	lenses.multimesh = lens_mm
	lenses.custom_aabb = heads.custom_aabb
	lenses.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(lenses)


## Open cylinder, radius 1, y from 0 to 1, with rings along the length (the beam shader
## computes brightness per vertex, so the falloff needs vertices along the beam).
func _unit_cylinder(seg: int, rings := 8) -> ArrayMesh:
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	for r in rings:
		# Denser near the lens, where brightness changes fastest.
		var y0 := pow(float(r) / rings, 1.6)
		var y1 := pow(float(r + 1) / rings, 1.6)
		for i in seg:
			var a0 := TAU * i / seg
			var a1 := TAU * (i + 1) / seg
			var p0 := Vector3(cos(a0), 0, sin(a0))
			var p1 := Vector3(cos(a1), 0, sin(a1))
			for v in [[p0, y0], [p1, y0], [p1, y1], [p0, y0], [p1, y1], [p0, y1]]:
				var p: Vector3 = v[0]
				st.set_normal(Vector3(p.x, 0, p.z))
				st.add_vertex(Vector3(p.x, v[1], p.z))
	return st.commit()


## One frame: [beams, spots, t, 0] + 16 floats per beam + 16 floats per spot.
func _on_frame(f: PackedFloat32Array) -> void:
	if f.size() < 4:
		return
	if scenario.recording:
		# Only what VDM draws is kept: all beams, the brightest MAX_SPOTS spots.
		var keep := 4 + (int(f[0]) + mini(int(f[1]), MAX_SPOTS)) * 16
		var r := f.slice(0, mini(keep, f.size()))
		r[1] = minf(f[1], MAX_SPOTS)
		scenario.record_frame(r)
	var nb := mini(int(f[0]), MAX_BEAMS)
	var ns := mini(int(f[1]), MAX_SPOTS)
	if f.size() < 4 + (int(f[0]) + ns) * 16:
		return
	# Beams too dark to see are left out (each one costs fill rate on the headset).
	var k := 0
	for i in nb:
		var o := 4 + i * 16
		if maxf(f[o + 12], maxf(f[o + 13], f[o + 14])) < 0.004:
			continue
		var org := Vector3(f[o], f[o + 1], f[o + 2])
		var dir := Vector3(f[o + 4], f[o + 5], f[o + 6])
		var rgt := Vector3(f[o + 8], f[o + 9], f[o + 10])
		var up := rgt.cross(dir)
		var lens: float = maxf(f[o + 11], 0.04)
		var col := Color(f[o + 12], f[o + 13], f[o + 14])
		mm.set_instance_transform(k, Transform3D(Basis(rgt, dir, up), org))
		mm.set_instance_color(k, col)
		# Length: up to the floor (or 32 m) – no cone parts hidden below the floor.
		var length := 32.0
		if dir.y < -0.05:
			length = clampf((org.y - _floor_y) / -dir.y + 0.3, 0.5, 32.0)
		mm.set_instance_custom_data(k, Color(f[o + 3], f[o + 11], f[o + 15], length))
		var hr := lens * 1.25 + 0.03
		var hl := 0.26
		head_mm.set_instance_transform(k, Transform3D(Basis(rgt * hr, dir * hl, up * hr), org - dir * (hl * 0.5 + 0.005)))
		lens_mm.set_instance_transform(k, Transform3D(Basis(rgt * lens, dir * 0.01, up * lens), org))
		var glow := col * 2.2
		lens_mm.set_instance_color(k, Color(minf(glow.r, 1.0), minf(glow.g, 1.0), minf(glow.b, 1.0)))
		k += 1
	mm.visible_instance_count = k
	head_mm.visible_instance_count = k
	lens_mm.visible_instance_count = k
	var base := 4 + int(f[0]) * 16
	for si in ns:
		var o := base + si * 16
		for c in 4:
			spot_img.set_pixel(c, si, Color(f[o + c * 4], f[o + c * 4 + 1], f[o + c * 4 + 2], f[o + c * 4 + 3]))
	spot_tex.update(spot_img)
	RenderingServer.global_shader_parameter_set("spot_count", 0 if _no_spots else ns)
	_beam_count = k
	_spot_count = ns


# ------------------------------------------------------------------ menu
func _refresh_menu() -> void:
	if menu.is_open():
		menu.set_model(_menu_model())


func _menu_model() -> Dictionary:
	match _page:
		"home":
			return _home_model()
		"connect":
			var found: Array = net.found
			var rows: Array = []
			for i in found.size():
				rows.append({ "title": "", "buttons": [{ "id": "pick:%d" % i, "label": "%s  (%s)" % [found[i].name, found[i].ip] }] })
			return { "title": "Mit VD-Link verbinden",
				"status": ("Suche im WLAN …" if net.is_discovering() else "%d Computer gefunden" % found.size()) + " – in VD-Link: VERBINDEN → VR-Brille einschalten",
				"ok": found.size() > 0 or net.is_discovering(),
				"sections": rows + [{ "title": "", "buttons": [{ "id": "rescan", "label": "Neu suchen" }] }],
				"footer": [{ "id": "back", "label": "Zurück" }] }
		"code":
			var shown := ""
			for i in 4:
				shown += (_code[i] if i < _code.length() else "·") + " "
			var keys: Array = []
			for r in [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["⌫", "0", "OK"]]:
				keys.append({ "title": "", "buttons": r.map(func(k): return { "id": "key:" + k, "label": k, "on": k == "OK" and _code.length() == 4 }) })
			return { "title": "Code für %s" % _code_target.get("name", "VD-Link"),
				"status": shown + "  – steht in VD-Link unter VERBINDEN → VR-Brille", "ok": true,
				"sections": keys, "footer": [{ "id": "back", "label": "Zurück" }] }
		"saved":
			var rows: Array = []
			for s in _saved.slice(0, 7):
				rows.append({ "title": "", "buttons": [
					{ "id": "play:" + s.id, "label": "%s  (%d s)" % [s.name, int(s.duration)], "on": mode == "scenario" and scenario.play_name == s.name },
					{ "id": "del:" + s.id, "label": "Wirklich löschen?" if _confirm_delete == s.id else "Löschen" }] })
			if rows.is_empty():
				rows.append({ "title": "Noch nichts gespeichert – im Live-Betrieb: Show aufnehmen", "buttons": [] })
			return { "title": "Gespeicherte Szenarien", "status": "Spielen ohne Computer", "ok": true,
				"sections": rows, "footer": [{ "id": "back", "label": "Zurück" }] }
	var src_label := "Live: " + computer_name if computer_name != "" else "Live"
	var sections: Array = [{ "title": "Quelle", "buttons": [
		{ "id": "src:live", "label": src_label, "on": mode == "live" },
		{ "id": "src:saved", "label": "Gespeichert", "on": mode == "scenario" },
		{ "id": "src:demo", "label": "Demo", "on": mode == "demo" }] }]
	var locs: Array = []
	for i in mini(_spots.size(), 8):
		locs.append({ "id": "loc:%d" % i, "label": String(_spots[i].name) if String(_spots[i].name) != "" else "Bereich %d" % (i + 1) })
	for i in range(0, locs.size(), 4):
		sections.append({ "title": "Standort" if i == 0 else "", "buttons": locs.slice(i, i + 4) })
	sections.append({ "title": "Haze %d %%" % roundi(settings.haze * 100), "buttons": HAZE.map(func(h): return { "id": "haze:%s" % h[0], "label": h[1], "on": is_equal_approx(settings.haze, h[0]) }) })
	var amb: Array = []
	for i in 4:
		amb.append({ "id": "amb:%d" % i, "label": AMBIENT_LABEL[i], "on": settings.ambient == i })
	sections.append({ "title": "Grundlicht", "buttons": amb })
	sections.append({ "title": "Bewegung", "buttons": [
		{ "id": "walk", "label": "Laufen: an" if settings.walk else "Laufen: aus", "on": settings.walk },
		{ "id": "turn", "label": "Drehen: " + ("Gleitend" if settings.turn == 0 else "%d°-Schritte" % settings.turn) }] })
	if mode == "live" and net.connected:
		if scenario.recording:
			sections.append({ "title": "Aufnahme läuft: %d von %d s" % [int(scenario.rec_seconds), int(scenario.rec_length)], "buttons": [{ "id": "rec:stop", "label": "Aufnahme beenden und speichern" }] })
		else:
			sections.append({ "title": "Auf der Brille speichern", "buttons": [{ "id": "rec:30", "label": "Show aufnehmen (30 s)" }, { "id": "rec:60", "label": "Show aufnehmen (60 s)" }] })
	var title := String(_scene.get("project", {}).get("name", "VDM")) if not _scene.is_empty() else "VDM"
	if mode == "home":
		return { "title": "Einstellungen", "status": "Gelten für alle Shows", "ok": true, "sections": sections.slice(1),
			"footer": [{ "id": "back", "label": "Zurück" }] }
	return { "title": title, "status": "%s · %d fps" % [status_text, roundi(_fps)], "ok": status_ok, "sections": sections,
		"footer": [{ "id": "src:home", "label": "Startbildschirm" }, { "id": "connect", "label": "Verbinden …" }, { "id": "close", "label": "Schließen" }] }


## Start screen: Live (the computer from last time, or search), saved shows, demo, settings.
func _home_model() -> Dictionary:
	var sections: Array = []
	var live: Array = []
	if _server_url() != "":
		live.append({ "id": "src:live", "label": "Weiter mit %s" % _saved_name(), "on": true })
	live.append({ "id": "connect", "label": "Computer suchen …" if _server_url() == "" else "Anderer Computer …" })
	sections.append({ "title": "Live mit VD-Link – was du dort änderst, siehst du sofort", "buttons": live })
	if _saved.is_empty():
		sections.append({ "title": "Gespeicherte Shows: noch keine – im Live-Betrieb aufnehmen", "buttons": [] })
	else:
		sections.append({ "title": "Gespeicherte Shows – laufen ohne Computer", "buttons": [] })
		for s in _saved.slice(0, 3):
			sections.append({ "title": "", "buttons": [{ "id": "play:" + s.id, "label": "%s  (%d s)" % [s.name, int(s.duration)] }] })
		if _saved.size() > 3:
			sections.append({ "title": "", "buttons": [{ "id": "src:saved", "label": "Alle %d gespeicherten …" % _saved.size() }] })
	sections.append({ "title": "Demo", "buttons": [{ "id": "src:demo", "label": "Demo-Club mit Lichtshow" }] })
	return { "title": "VDM · VD-Mobile", "status": status_text, "ok": status_ok, "sections": sections,
		"footer": [{ "id": "settings", "label": "Einstellungen" }, { "id": "src:saved", "label": "Verwalten …" }] }


## Where „Zurück“ leads: the start screen's page while there, else the show menu.
func _back_page() -> String:
	return "home" if mode == "home" else "main"


func _on_menu(id: String) -> void:
	if id.begins_with("loc:"):
		_go_to(int(id.substr(4)))
		menu.hide_menu()
		return
	if id.begins_with("haze:"):
		settings.haze = float(id.substr(5))
	elif id.begins_with("amb:"):
		settings.ambient = int(id.substr(4))
	elif id == "walk":
		settings.walk = not settings.walk
	elif id == "turn":
		settings.turn = 45 if settings.turn == 30 else (0 if settings.turn == 45 else 30)
	elif id == "close":
		menu.hide_menu()
		return
	elif id == "src:live":
		var url := _server_url()
		if url == "":
			_open_page("connect")
			net.discover()
			return
		_start_live(url, _saved_name())
	elif id == "src:saved":
		_saved = scenario.list_saved()
		_confirm_delete = ""
		_open_page("saved")
		return
	elif id == "src:demo":
		_start_demo()
	elif id == "src:home":
		_start_home()
		return
	elif id == "settings":
		_open_page("main")
		return
	elif id == "connect" or id == "rescan":
		net.discover()
		_open_page("connect")
		return
	elif id == "back":
		_open_page(_back_page())
		return
	elif id.begins_with("pick:"):
		var i := int(id.substr(5))
		if i < net.found.size():
			_code_target = net.found[i]
			_code = ""
			_open_page("code")
		return
	elif id.begins_with("key:"):
		var k := id.substr(4)
		if k == "⌫":
			_code = _code.left(-1)
		elif k == "OK":
			if _code.length() == 4:
				_start_live("https://%s:%d/%s/" % [_code_target.ip, _code_target.port, _code], String(_code_target.name))
				_open_page("main")
				return
		elif _code.length() < 4:
			_code += k
		_open_page("code")
		return
	elif id.begins_with("play:"):
		var sid := id.substr(5)
		_start_scenario("user://scenarios/" + sid + "/")
		_open_page("main")
		return
	elif id.begins_with("del:"):
		var sid := id.substr(4)
		if _confirm_delete == sid:
			scenario.delete_saved("user://scenarios/" + sid + "/")
			_saved = scenario.list_saved()
			_confirm_delete = ""
		else:
			_confirm_delete = sid
		_open_page("saved")
		return
	elif id.begins_with("rec:"):
		var what := id.substr(4)
		if what == "stop":
			scenario.stop_recording(true)
		elif scenario.start_recording(_scene, _walls_state, _view, _gobo_png, _gobo_grid.x, _gobo_grid.y, float(what), _venue_bin):
			_set_status("Aufnahme läuft …", true)
	_save_settings()
	_apply_settings()
	_refresh_menu()


func _open_page(p: String) -> void:
	_page = p
	menu.set_model(_menu_model())


# ------------------------------------------------------------------ every frame
var _menu_tick := 0.0

func _process(dt: float) -> void:
	_shot_check()
	_frames += 1
	_fps_t += dt
	_bench(dt)
	net.send_pose(camera.global_transform)
	# Live: no picture from VD-Link for a while → tell (the scene stays as it is).
	if mode == "live" and not net.has_scene:
		_live_wait += dt
		# Never reached (or no project open) after 12 s: play the demo, Live stays in the menu.
		if _live_wait > 12.0 and _scene.is_empty():
			_start_home("%s nicht erreicht – läuft VD-Link mit eingeschalteter VR-Brille?" % computer_name)
	# Menu: status line and recording time stay current.
	_menu_tick += dt
	if menu.is_open() and _menu_tick > 1.0:
		_menu_tick = 0.0
		if _page == "main" or _page == "connect":
			_refresh_menu()
	if not menu.is_open() and _page != "main":
		_page = "main"
	if mode == "home":
		_home_t += dt
		_on_frame(home.frame(_home_t))
	if Engine.get_frames_drawn() % 2 == 0:
		spot_map.render_target_update_mode = SubViewport.UPDATE_ONCE
	if _fps_t >= 2.0:
		_fps = _frames / _fps_t
		var cpu := Performance.get_monitor(Performance.TIME_PROCESS) * 1000.0
		var draw := Performance.get_monitor(Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME)
		var head := camera.global_position
		var look := -camera.global_transform.basis.z
		net.log_line("vdm %s fps=%.1f process=%.1fms draws=%d beams=%d spots=%d frames_in=%d head=(%.2f,%.2f,%.2f) look=(%.2f,%.2f,%.2f)" % [mode, _fps, cpu, draw, _beam_count, _spot_count, net.frames_in, head.x, head.y, head.z, look.x, look.y, look.z])
		net.frames_in = 0
		_frames = 0
		_fps_t = 0.0


## On-device measurement (user://bench.txt): each step switches one more thing off for 4 s.
const BENCH := ["alles", "ohne Menü", "ohne Publikum", "ohne Glas", "ohne Leuchten/Neon", "ohne Lichtflecken", "ohne Lichtkegel", "ohne Raum"]
var _bench_frames := 0

func _bench(dt: float) -> void:
	if _bench_step < 0 or _bench_step >= BENCH.size():
		return
	_bench_t += dt
	if _bench_t < 0:
		return
	_bench_frames += 1
	if _bench_t < 4.0:
		return
	_bench_out.append("%s: %.1f fps" % [BENCH[_bench_step], _bench_frames / _bench_t])
	_bench_step += 1
	_bench_t = -1.0
	_bench_frames = 0
	match _bench_step:
		1: menu.visible = false
		2: _bench_hide("vdm_crowd")
		3: _bench_hide("vdm_glass")
		4:
			_bench_hide("vdm_glow")
			_bench_hide("vdm_add")
			_bench_hide("vdm_aqua")
		5: _no_spots = true
		6: beams.visible = false
		7: world.visible = false
		8:
			_no_spots = false
			beams.visible = true
			world.visible = true
			menu.visible = menu.pinned
			for g in ["vdm_crowd", "vdm_glass", "vdm_glow", "vdm_add", "vdm_aqua"]:
				for n in get_tree().get_nodes_in_group(g):
					n.visible = true
			net.log_line("vdm bench %s (%s): %s" % [mode, RenderingServer.get_current_rendering_method(), " | ".join(_bench_out)])
			_bench_step = 99


func _bench_hide(group: String) -> void:
	for n in get_tree().get_nodes_in_group(group):
		n.visible = false


# ------------------------------------------------------------------ spot light map
## Spots on floor, stage and podiums are rendered once per frame into a 512² map seen from
## above (fixed cost, independent of the headset resolution); surfaces facing up read it.
func _setup_spot_map() -> void:
	spot_map.size = Vector2i(MAP_SIZE, MAP_SIZE)
	spot_map.use_hdr_2d = true
	spot_map.transparent_bg = false
	spot_map.disable_3d = true
	# Redrawn every second frame (see _process): spots move smoothly, half the cost.
	spot_map.render_target_update_mode = SubViewport.UPDATE_ONCE
	var rect := ColorRect.new()
	rect.size = Vector2(MAP_SIZE, MAP_SIZE)
	spot_map_mat.shader = SPOTMAP_SHADER
	rect.material = spot_map_mat
	spot_map.add_child(rect)
	add_child(spot_map)
	RenderingServer.global_shader_parameter_set("spot_map", spot_map.get_texture())


## Height of the highest walkable surface per texel (raycasts down onto the room).
func _build_height_map(loc: Dictionary) -> void:
	var room: Dictionary = loc.get("room", {})
	var w := float(room.get("width", 20.0))
	var d := float(room.get("depth", 14.0))
	var h := maxf(float(room.get("height", 6.0)), 4.0)
	var area := Vector4(-w / 2, -d / 2, w, d)
	var img := Image.create_empty(HEIGHT_SIZE, HEIGHT_SIZE, false, Image.FORMAT_RF)
	var space := get_world_3d().direct_space_state
	var q := PhysicsRayQueryParameters3D.new()
	var t0 := Time.get_ticks_msec()
	for j in HEIGHT_SIZE:
		for i in HEIGHT_SIZE:
			var x := area.x + (i + 0.5) / HEIGHT_SIZE * area.z
			var z := area.y + (j + 0.5) / HEIGHT_SIZE * area.w
			q.from = Vector3(x, h - 0.3, z)
			q.to = Vector3(x, -1.0, z)
			var hit := space.intersect_ray(q)
			img.set_pixel(i, j, Color(hit.position.y if hit else 0.0, 0, 0))
	var tex := ImageTexture.create_from_image(img)
	spot_map_mat.set_shader_parameter("height_tex", tex)
	RenderingServer.global_shader_parameter_set("spot_height", tex)
	RenderingServer.global_shader_parameter_set("spot_area", area)
	net.log_line("height map %dx%d in %d ms" % [HEIGHT_SIZE, HEIGHT_SIZE, Time.get_ticks_msec() - t0])


# ------------------------------------------------------------------ development
## `-- --shot=/path.png --cam=x,y,z,yaw [--menu=main|connect|code|saved] [--demo] [--play=<dir>]
##  [--server=<url>] [--rec=<seconds>] [--wait=<ms>]` – desktop checks without a headset.
var _shot_done := false
var _dev_started := false
func _shot_check() -> void:
	var args := OS.get_cmdline_user_args()
	if args.is_empty():
		return
	var wait := 10000
	for a in args:
		if a.begins_with("--wait="):
			wait = int(a.substr(7))
	if not _dev_started:
		_dev_started = true
		for a in args:
			if a == "--demo":
				_start_demo()
			elif a.begins_with("--play="):
				_start_scenario(a.substr(7))
			elif a.begins_with("--server="):
				_start_live(a.substr(9), "Test")
			elif a == "--rec-skip-dark":
				scenario.skip_dark = true
			elif a.begins_with("--rec="):
				var secs := float(a.substr(6))
				get_tree().create_timer(4.0).timeout.connect(func(): _on_menu("rec:%d" % int(secs)))
	if _shot_done or Time.get_ticks_msec() < wait:
		return
	for a in args:
		if a.begins_with("--cam="):
			var c := a.substr(6).split(",")
			origin.transform = Transform3D(Basis(Vector3.UP, deg_to_rad(float(c[3]))), Vector3(float(c[0]), float(c[1]) - 1.7, float(c[2])))
		if a.begins_with("--menu="):
			_page = a.substr(7)
			menu.show_menu(camera.global_position, -camera.global_transform.basis.z)
			menu.set_model(_menu_model())
	for a in args:
		if a.begins_with("--shot="):
			if Time.get_ticks_msec() < wait + 1000:
				return
			_shot_done = true
			get_viewport().get_texture().get_image().save_png(a.substr(7))
			get_tree().quit()
