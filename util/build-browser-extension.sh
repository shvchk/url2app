#! /usr/bin/env bash

# Script is expected to be run from the root dir of the git repo

set -euo pipefail

ext_name="url2app"
ext_dir="browser-extension"

[ -d "$ext_dir" ] || { echo "No extension dir found. Aborting."; exit 1; }

case $1 in
  firefox)
    cd "$ext_dir"
    git apply -v --directory="$ext_dir" "manifest.firefox.patch"
    zip -r -FS "../${ext_name}.xpi" *
    git apply -v -R --directory="$ext_dir" "manifest.firefox.patch"
    ;;

  -h|--help|help)
    echo "Usage: $(basename -- "$0") <browser name>"
    ;;

  *) echo "Error: argument $1 not supported" ;;
esac
