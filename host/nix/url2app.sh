#! /usr/bin/env sh

# Clean incoming URL
url="$(echo -n "$1" | sed 's|url2app://||')"

# Do anything, e.g. send notification with URL
notify-send "$url"
