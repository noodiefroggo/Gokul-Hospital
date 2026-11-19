#!/bin/sh
# Export each creative to ads/png via headless Chrome
ADS="C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital/ads"
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
mkdir -p "$ADS/png"
for spec in "01-brand-intro 1080 1080" "02-maternity-care 1080 1080" "03-trust-rating 1080 1080" "04-fertility-ivf 1080 1350" "05-emergency-story 1080 1920" "06-meta-ad-checkup 1080 1080" "07-janmashtami 1080 1080"; do
  set -- $spec
  [ -n "$ONLY" ] && case "$1" in *$ONLY*) ;; *) continue;; esac
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=$2,$3 \
    --virtual-time-budget=10000 --user-data-dir="$TEMP/gk-chrome" \
    --screenshot="$ADS/png/$1.png" "file:///$ADS/$1.html" 2>/dev/null
done
ls -la "$ADS/png"
