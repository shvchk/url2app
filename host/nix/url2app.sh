#! /usr/bin/env bash

# Clean incoming URL of url2app:// prefix
url="${1#x-url2app://}"

# Process media hint
media_type="${url#*###mediaType=}"
url="${url%###mediaType=*}"

case $media_type in
  image)
    GIO_USE_VFS=gvfs gimp "$url" & exit ;;
  audio)
    mpv --force-window --keep-open "$url" & exit ;;
  video)
    mpv --keep-open "$url" & exit ;;
esac

# Hints didn't help or are off, now we have to guess by URL only
case $url in
  #*pdf)
  #  okular "$url" & ;;

  #*.avi|*mp4|*mkv|*mov|*webm|*.ts)
  #  mpv --keep-open "$url" & ;;

  #*youtu.be/*|*youtube.com/watch*)
  #  mpv --keep-open "$url" & ;;

  #*jpg|*jpeg|*png|*webp)
  #  GIO_USE_VFS=gvfs gimp "$url" & ;;

  *)
    line1="x-url2app:// protocol handler is working fine!"
    line2="This URL has no handler defined, though: ${url}"
    line3="You can add one in $0"
    notify-send -a url2app "Good news!" "${line1}\n\n${line2}\n${line3}" &
    ;;
esac
