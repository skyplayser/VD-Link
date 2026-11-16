#!/bin/sh
# Downloads only the fixture folders of the Open Fixture Library (MIT) and QLC+ (Apache-2.0).
# Data only – nothing from these repositories is executed.
set -e
cd "$(dirname "$0")/.."
mkdir -p vendor-src
fetch() { # url dir path
  if [ -d "vendor-src/$2/.git" ]; then git -C "vendor-src/$2" pull --depth 1 -q; return; fi
  git clone -q --depth 1 --filter=blob:none --sparse "$1" "vendor-src/$2"
  git -C "vendor-src/$2" sparse-checkout set "$3"
  git -C "vendor-src/$2" checkout -q
}
fetch https://github.com/OpenLightingProject/open-fixture-library.git ofl fixtures
fetch https://github.com/mcallegari/qlcplus.git qlcplus resources/fixtures
cp vendor-src/ofl/LICENSE vendor-src/ofl-LICENSE.txt 2>/dev/null || true
cp vendor-src/qlcplus/COPYING vendor-src/qlcplus-LICENSE.txt 2>/dev/null || true
echo "OFL:   $(find vendor-src/ofl/fixtures -name '*.json' | wc -l) Dateien"
echo "QLC+:  $(find vendor-src/qlcplus/resources/fixtures -name '*.qxf' | wc -l) Dateien"
