#!/bin/sh
# Builds the macOS virtual-display helper (universal arm64 + x86_64, macOS 13+).
set -e
cd "$(dirname "$0")"
mkdir -p build
clang -fobjc-arc -O2 -arch arm64 -arch x86_64 -mmacosx-version-min=13.0 \
  -framework Foundation -framework CoreGraphics \
  -o build/vd-display-helper vd-display-helper.m
echo "built native/macos/build/vd-display-helper"
