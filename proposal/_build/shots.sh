#!/bin/sh
# Screenshots of both home pages for the proposal (desktop 1440x900, phone 375x780 via iframe wrapper).
ROOT="C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital"
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
OUT="$ROOT/assets/shots"
mkdir -p "$OUT"
for pair in "brand Home-V1" "dark Home-V2"; do
  set -- $pair; p=$1; dir=$2
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,900 \
    --virtual-time-budget=8000 --user-data-dir="$TEMP/gk-shots" \
    --screenshot="$OUT/$p-desktop.png" "file:///$ROOT/$dir/index.html" 2>/dev/null
  W="$OUT/_wrap-$p.html"
  printf '<!doctype html><html><body style="margin:0;background:#000"><iframe src="../../%s/index.html" style="width:375px;height:780px;border:0;display:block"></iframe></body></html>' "$dir" > "$W"
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=600,780 \
    --virtual-time-budget=8000 --user-data-dir="$TEMP/gk-shots" \
    --screenshot="$OUT/$p-mobile.png" "file:///$W" 2>/dev/null
  rm -f "$W"
done
ls -la "$OUT"
