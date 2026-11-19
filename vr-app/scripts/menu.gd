# Menu in VDM: a panel in front of you (B / Y or menu button), operated by pointing with a
# controller and pulling the trigger. Same content as the browser viewer's menu.
# The panel is a 2D UI (Controls) in a SubViewport, shown on a quad; controller rays become
# mouse events in that viewport.
extends Node3D

signal action(id: String)

const PX := Vector2i(1280, 1500)
const WIDTH := 0.9

var left: XRController3D
var right: XRController3D
var model: Dictionary = {}

var _vp := SubViewport.new()
var _root := PanelContainer.new()
var _quad := MeshInstance3D.new()
var _hover_ctrl: XRController3D = null
var _trigger_prev := { "left": false, "right": false }
var _dot := MeshInstance3D.new()
## Standing in the room (start screen) instead of floating in front of the head.
var pinned := false
## The panel is only redrawn while something changes or a ray points at it (saves GPU time
## on the start screen, where it stands open all the time).
var _awake_until := 0


func _ready() -> void:
	_vp.size = PX
	_vp.transparent_bg = true
	_vp.gui_disable_input = false
	_vp.render_target_update_mode = SubViewport.UPDATE_ALWAYS
	add_child(_vp)
	var style := StyleBoxFlat.new()
	style.bg_color = Color(0.06, 0.06, 0.08, 0.94)
	style.set_corner_radius_all(36)
	style.set_content_margin_all(40)
	_root.add_theme_stylebox_override("panel", style)
	_root.size = PX
	_root.theme = _make_theme()
	_vp.add_child(_root)
	var q := QuadMesh.new()
	q.size = Vector2(WIDTH, WIDTH * PX.y / PX.x)
	_quad.mesh = q
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m.no_depth_test = true
	m.render_priority = 10
	m.albedo_texture = _vp.get_texture()
	_quad.material_override = m
	_quad.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(_quad)
	var s := SphereMesh.new()
	s.radius = 0.008
	s.height = 0.016
	_dot.mesh = s
	var dm := StandardMaterial3D.new()
	dm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	dm.no_depth_test = true
	dm.render_priority = 11
	_dot.material_override = dm
	_dot.top_level = true
	add_child(_dot)
	visible = false


func _make_theme() -> Theme:
	var t := Theme.new()
	t.default_font_size = 34
	var normal := StyleBoxFlat.new()
	normal.bg_color = Color("1d1d27")
	normal.set_corner_radius_all(18)
	normal.set_content_margin_all(18)
	var hover := normal.duplicate()
	hover.bg_color = Color("2c2c3c")
	var on := normal.duplicate()
	on.bg_color = Color("ff4f8b")
	t.set_stylebox("normal", "Button", normal)
	t.set_stylebox("hover", "Button", hover)
	t.set_stylebox("pressed", "Button", on)
	t.set_stylebox("focus", "Button", StyleBoxEmpty.new())
	t.set_color("font_color", "Button", Color.WHITE)
	t.set_color("font_hover_color", "Button", Color.WHITE)
	t.set_color("font_pressed_color", "Button", Color.WHITE)
	t.set_color("font_color", "Label", Color("d8d8e0"))
	t.set_stylebox("pressed_hover", "Button", on)
	t.set_type_variation("OnButton", "Button")
	t.set_stylebox("normal", "OnButton", on)
	t.set_stylebox("hover", "OnButton", on)
	return t


func is_open() -> bool:
	return visible


## Model: {title, status, ok, sections: [{title, buttons: [{id, label, on}]}], footer: [...]}
func set_model(m: Dictionary) -> void:
	model = m
	_wake()
	for c in _root.get_children():
		c.queue_free()
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 14)
	_root.add_child(box)
	var title := Label.new()
	title.text = String(m.get("title", "VDM"))
	title.add_theme_font_size_override("font_size", 48)
	title.add_theme_color_override("font_color", Color.WHITE)
	box.add_child(title)
	var status := Label.new()
	status.text = String(m.get("status", ""))
	status.add_theme_color_override("font_color", Color("7ee08a") if m.get("ok", true) else Color("ff7a8f"))
	status.add_theme_font_size_override("font_size", 28)
	status.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(status)
	for sec in m.get("sections", []):
		if String(sec.get("title", "")) != "":
			var l := Label.new()
			l.text = String(sec.title)
			l.add_theme_font_size_override("font_size", 28)
			l.add_theme_color_override("font_color", Color("9a9aa8"))
			box.add_child(l)
		box.add_child(_row(sec.get("buttons", [])))
	var spacer := Control.new()
	spacer.size_flags_vertical = Control.SIZE_EXPAND_FILL
	box.add_child(spacer)
	box.add_child(_row(m.get("footer", [])))


func _row(buttons: Array) -> HBoxContainer:
	var row := HBoxContainer.new()
	row.add_theme_constant_override("separation", 14)
	for b in buttons:
		var btn := Button.new()
		btn.text = String(b.label)
		btn.custom_minimum_size = Vector2(0, 80)
		btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		btn.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		if b.get("on", false):
			btn.theme_type_variation = "OnButton"
		btn.pressed.connect(func(): action.emit(String(b.id)))
		row.add_child(btn)
	return row


## In front of the head: 0.85 m ahead, slightly below eye height, facing you.
func show_menu(head: Vector3, dir: Vector3) -> void:
	var d := Vector3(dir.x, 0, dir.z).normalized()
	if not d.is_finite() or d.length() < 0.1:
		d = Vector3(0, 0, -1)
	var p := head + d * 0.85 + Vector3(0, -0.12, 0)
	global_transform = Transform3D(Basis.looking_at(d, Vector3.UP), p)
	pinned = false
	_wake()
	visible = true


## Stand in the room at `xf` (faces +z of xf), e.g. on the start screen's pedestal.
func _wake(ms := 400) -> void:
	_awake_until = Time.get_ticks_msec() + ms
	_vp.render_target_update_mode = SubViewport.UPDATE_ALWAYS


func pin(xf: Transform3D) -> void:
	_wake()
	global_transform = xf
	pinned = true
	visible = true


func hide_menu() -> void:
	pinned = false
	visible = false
	_dot.visible = false


func _process(_dt: float) -> void:
	if not visible:
		return
	_dot.visible = false
	for c in [right, left]:
		if not c.get_is_active():
			continue
		var hit = _hit(c)
		var pressed: bool = c.get_float("trigger") > 0.6 or c.is_button_pressed("trigger_click")
		var key := "right" if c == right else "left"
		if hit != null:
			_wake(250)
			_dot.global_position = hit[0]
			_dot.visible = true
			var pos: Vector2 = hit[1]
			var mv := InputEventMouseMotion.new()
			mv.position = pos
			_vp.push_input(mv, true)
			if pressed != _trigger_prev[key]:
				var ev := InputEventMouseButton.new()
				ev.button_index = MOUSE_BUTTON_LEFT
				ev.pressed = pressed
				ev.position = pos
				_vp.push_input(ev, true)
		_trigger_prev[key] = pressed
		if hit != null:
			break
	if Time.get_ticks_msec() > _awake_until and _vp.render_target_update_mode != SubViewport.UPDATE_DISABLED:
		_vp.render_target_update_mode = SubViewport.UPDATE_DISABLED


## Controller ray on the panel: [world point, pixel position] or null.
func _hit(c: XRController3D):
	var t := c.global_transform
	var o := t.origin
	var d := -t.basis.z
	var plane := Plane(global_transform.basis.z, global_position)
	var p = plane.intersects_ray(o, d)
	if p == null:
		return null
	var local: Vector3 = global_transform.affine_inverse() * (p as Vector3)
	var size: Vector2 = (_quad.mesh as QuadMesh).size
	var u := local.x / size.x + 0.5
	var v := 0.5 - local.y / size.y
	if u < 0 or u > 1 or v < 0 or v > 1:
		return null
	return [p, Vector2(u * PX.x, v * PX.y)]
