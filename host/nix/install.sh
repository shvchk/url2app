#! /usr/bin/env bash

set -euo pipefail

repo_cdn="https://cdn.jsdelivr.net/gh/shvchk/url2app"

desktop_file_name="url2app.desktop"
desktop_file_dir="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
desktop_file_url="${repo_cdn}/host/nix/${desktop_file_name}"

exec_file_name="url2app.sh"
exec_file_dir="$HOME/.local/bin"
exec_file_url="${repo_cdn}/host/nix/${exec_file_name}"

wget -P "$desktop_file_dir" "$desktop_file_url"
wget -P "$exec_file_dir" "$exec_file_url"

xdg-mime default "${desktop_file_dir}/${desktop_file_name}" x-scheme-handler/x-url2app
update-desktop-database "$desktop_file_dir"

[[ $PATH =~ $exec_file_dir ]] || echo "$exec_file_dir is not in \$PATH. Make sure to add it."
