#! /usr/bin/env bash

# Script is expected to be run from the root dir of the git repo

set -euo pipefail

icons_dir="browser-extension/images"
sizes="16 32 48 96 128"

[ -d "$icons_dir" ] || { echo "No icons dir found. Aborting."; exit 1; }

cd "$icons_dir"

for s in $sizes; do
  inkscape -w $s -h $s -o logo-${s}.png logo.svg
done

for s in $sizes; do
  zopflipng -my logo-${s}.png{,}
done
