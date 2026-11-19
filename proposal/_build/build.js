// Builds proposal/index.html from proposal/src.html by inlining the logo SVGs.
// Run: node proposal/_build/build.js  (from the project root)
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const logo = f => {
  let s = fs.readFileSync(path.join(root, 'logo', f), 'utf8');
  s = s.replace(/<\?xml[^>]*>/, '')
       .replace(/<style>[\s\S]*?<\/style>/, '')   // page loads fonts + .gk/.hs/.hi classes itself
       .replace(/<title>[\s\S]*?<\/title>/, '')
       .replace(/role="img"/, 'role="img" focusable="false"');
  return s.trim();
};
let html = fs.readFileSync(path.join(root, 'proposal', 'src.html'), 'utf8');
// each placeholder may appear several times; duplicate ids would clash, so suffix per occurrence
const map = {
  LOGO_PRIMARY: 'gokul-logo-primary.svg',
  LOGO_REVERSED: 'gokul-logo-reversed.svg',
  LOGO_STACKED: 'gokul-logo-stacked.svg',
  MARK: 'gokul-mark.svg',
};
let n = 0;
for (const [key, file] of Object.entries(map)) {
  html = html.replace(new RegExp(`{{${key}}}`, 'g'), () => {
    n++;
    const svg = logo(file);
    const ids = [...svg.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    let out = svg;
    for (const id of ids) {
      out = out.split(`id="${id}"`).join(`id="${id}-${n}"`)
               .split(`url(#${id})`).join(`url(#${id}-${n})`)
               .split(`href="#${id}"`).join(`href="#${id}-${n}"`);
    }
    return out;
  });
}
fs.writeFileSync(path.join(root, 'proposal', 'index.html'), html);
console.log('wrote proposal/index.html', html.length, 'bytes,', n, 'logos inlined');

// Site root (GitHub / Vercel): full document, paths rewritten to the repo layout.
let site = html
  .replace(/src="shots\//g, 'src="proposal/shots/')
  .replace(/'shots\//g, "'proposal/shots/")
  .replace(/src="ads\/(\d\d-[^"]+\.png)"/g, 'src="ads/png/$1"');
const titleEnd = site.indexOf('</title>') + '</title>'.length;
site = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  + site.slice(0, titleEnd)
  + '\n<link rel="icon" href="logo/favicon.svg" type="image/svg+xml">'
  + site.slice(titleEnd).replace('</style>', '</style>\n</head>\n<body>')
  + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(root, 'index.html'), site);
console.log('wrote index.html (site root)', site.length, 'bytes');
