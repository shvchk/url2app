#! /usr/bin/env sh

# Clean incoming URL of url2app:// prefix
url="$(echo -n "$1" | sed 's|url2app://||')"

case $url in
  #*pdf)
  #  okular "$url" & ;;

  #*.avi|*mp4|*mkv|*mov|*webm|*.ts)
  #  mpv "$url" & ;;

  #*youtu.be/*|*youtube.com/watch*)
  #  mpv "$url" & ;;

  #*jpg|*jpeg|*png|*webp)
  #  GIO_USE_VFS=gvfs gimp "$url" & ;;

  *)
    notify-send "Example url2app:// handler" "$url" & ;;
esac
