#! /usr/bin/env bash

set -euo pipefail

name="url2app"
repo_cdn="https://cdn.jsdelivr.net/gh/shvchk/url2app"

desktop_file_dir="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
desktop_file_url="${repo_cdn}/host/nix/${name}.desktop"

exec_file_dir="$HOME/.local/bin"
exec_file_url="${repo_cdn}/host/nix/${name}.sh"

wget -O "${desktop_file_dir}/${name}.desktop" "$desktop_file_url"
wget -O ${exec_file_dir}/${name}.sh" "$exec_file_url"

chmod +x "${exec_file_dir}/${name}.sh"
xdg-mime default "${desktop_file_dir}/${name}.desktop" x-scheme-handler/x-$name
update-desktop-database "$desktop_file_dir"

[[ $PATH =~ $exec_file_dir ]] || echo "$exec_file_dir is not in \$PATH. Make sure to add it."
