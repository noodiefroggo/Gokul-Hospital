// Generator for Gokul Hospital logo files. Run: node build.js
const fs = require('fs');
const path = require('path');
const OUT = 'C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital/logo';

const C = {
  navy: '#0B2A3C', blue: '#0E4D64', teal: '#1A8C8C', green: '#3E8E5A',
  gold: '#C9A24B', gold3: '#E6CF8F', lotus: '#F2B8B5', cream: '#FBF7EF',
  cream1: '#F3EADA', ink: '#3A3A3A',
};

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..800,0..100&family=Manrope:wght@500;600;700&family=Tiro+Devanagari+Hindi&display=swap');";

const r2 = (n) => Math.round(n * 100) / 100;

// ---------- Feather geometry (100 x 100 design space, axis x = 50) ----------
// Oval vane holding the eye; loose barbs fan off the quill below it.
const VANE = 'M50 3C62.6 3 72 14 72 30C72 46 62.4 59.6 50 66C37.6 59.6 28 46 28 30C28 14 37.4 3 50 3Z';
const SHAFT = 'M49.05 56L50.95 56L50.42 97.6Q50 99 49.58 97.6Z';
const EYE = { cx: 50, gold: { cy: 28.6, rx: 14.6, ry: 18 }, ring: { cy: 29.9, rx: 11.5, ry: 14.6 }, core: { cy: 31.7, rx: 7, ry: 9.5 } };

// Loose barbs: hairline strands off the quill. Tips sit on a straight taper so the
// vane's lower edge dissolves into feathering.
function barbPaths() {
  const out = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const tipY = 51 + i * 4.6;
    const dx = 21.5 - (tipY - 51) * 0.52;
    const rootY = tipY + dx * 0.62;
    for (const s of [-1, 1]) {
      out.push(`M50 ${r2(rootY)}Q${r2(50 + s * dx * 0.5)} ${r2((rootY + tipY) / 2 - dx * 0.1)} ${r2(50 + s * dx)} ${r2(tipY)}`);
    }
  }
  return out.join('');
}
const BARB_W = 0.95;
// Fine fringe cut into the vane edge around the eye (negative space).
function fringeCuts() {
  const out = [];
  const g = EYE.gold;
  for (let k = -6; k <= 6; k++) {
    const a = (-90 + k * 15) * Math.PI / 180;
    const ca = Math.cos(a), sa = Math.sin(a);
    const t = 1 / Math.sqrt((ca * ca) / ((g.rx + 4.6) ** 2) + (sa * sa) / ((g.ry + 4.6) ** 2));
    out.push(`<path d="M${r2(50 + ca * t)} ${r2(g.cy + sa * t)}L${r2(50 + ca * 40)} ${r2(g.cy + sa * 40)}"/>`);
  }
  return out.join('');
}

// Tilt the upright, symmetric construction so it reads as a feather in motion.
const TILT = 16;
const tilt = (inner, s = 0.92) => `<g transform="translate(50 50) rotate(${TILT}) scale(${s}) translate(-50 -51.5)">${inner}</g>`;

const ell = (e, fill, extra = '') => `<ellipse cx="${EYE.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="${fill}"${extra}/>`;

// palettes for the feather
const PAL = {
  light: { vaneTop: C.blue, vaneBot: C.teal, barb: C.teal, gold: C.gold, ring: C.teal, core: C.navy, shaft: C.navy },
  dark: { vaneTop: C.teal, vaneBot: C.green, barb: C.green, gold: C.gold, ring: '#2BA3A0', core: C.navy, shaft: C.gold3 },
};

const FRINGE = false;
const fringeMask = (id, extra = '') => `<mask id="${id}-m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/>${FRINGE ? `<g fill="none" stroke="#000" stroke-width="1.05" stroke-linecap="round">${fringeCuts()}</g>` : ''}${extra}</mask>`;

// Full-colour feather. id = unique prefix (needed when several SVGs are inlined in one page).
function feather(id, pal, { barbs = true, tilted = true, eye = null, extraDefs = '', s = 0.92 } = {}) {
  const defs = `<linearGradient id="${id}-g" x1="0" y1="4" x2="0" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${pal.vaneTop}"/><stop offset=".55" stop-color="${pal.vaneBot}"/><stop offset="1" stop-color="${pal.barb}"/></linearGradient>` +
    (barbs ? fringeMask(id) : '') + extraDefs;
  const body = `<defs>${defs}</defs>` +
    `<path d="${SHAFT}" fill="${pal.shaft}"/>` +
    (barbs ? `<path d="${barbPaths()}" fill="none" stroke="url(#${id}-g)" stroke-width="${BARB_W}" stroke-linecap="round"/>` : '') +
    `<path d="${VANE}" fill="url(#${id}-g)"${barbs ? ` mask="url(#${id}-m)"` : ''}/>` +
    (eye || (ell(EYE.gold, pal.gold) + ell(EYE.ring, pal.ring) + ell(EYE.core, pal.core)));
  return tilted ? tilt(body, s) : body;
}

// Single-colour feather: eye rings become hairline gaps.
function featherMono(id, color, { barbs = true } = {}) {
  const g = EYE.gold, k = EYE.core;
  const cut = (rx, ry, cy, w) => `<ellipse cx="50" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#000" stroke-width="${w}"/>`;
  const defs = fringeMask(id, cut(g.rx, g.ry, g.cy, 1.7) + cut(k.rx + 1.3, k.ry + 1.3, k.cy, 1.5));
  return tilt(`<defs>${defs}</defs><path d="${SHAFT}" fill="${color}"/>` + (barbs ? `<path d="${barbPaths()}" fill="none" stroke="${color}" stroke-width="${BARB_W}" stroke-linecap="round"/>` : '') +
    `<g mask="url(#${id}-m)"><path d="${VANE}" fill="${color}"/>${ell(EYE.gold, color)}</g>`);
}

// ---------- Concept 2: feather crossing a bansuri ----------
function flute(pal) {
  const holes = [4, 10.5, 17, 23.5].map((x) => `<circle cx="${x}" cy="0" r="1.15" fill="${pal.core}"/>`).join('');
  return `<g transform="translate(50 71) rotate(26)">` +
    `<rect x="-41" y="-3" width="82" height="6" rx="3" fill="${pal.gold}"/>` +
    `<rect x="-34" y="-3" width="1.8" height="6" fill="${pal.core}"/><rect x="-30.6" y="-3" width=".9" height="6" fill="${pal.core}"/>` +
    `<rect x="32.5" y="-3" width="1.8" height="6" fill="${pal.core}"/>` +
    `<circle cx="-21" cy="0" r="1.4" fill="${pal.core}"/>` + holes +
    `</g>`;
}
function concept2Mark(id, pal) {
  return `<g transform="translate(53 50) scale(.92) translate(-50 -50)">${flute(pal)}<g transform="translate(50 47) scale(.94) translate(-50 -50)">${feather(id, pal)}</g></g>`;
}

// ---------- Concept 3: the eye holds a soft cross ----------
// Same feather, but the navy core becomes a soft, round-ended cross: care held inside the eye.
function concept3Mark(id, pal) {
  const r = EYE.ring, cy = 30.2, w = 5.4;
  const eye = ell(EYE.gold, pal.gold) + ell(r, pal.ring) +
    `<g transform="rotate(${-TILT} 50 ${cy})" stroke="${pal.core}" stroke-width="${w}" stroke-linecap="round"><path d="M50 ${r2(cy - 7.4)}V${r2(cy + 7.4)}M${r2(50 - 7.4)} ${cy}H${r2(50 + 7.4)}"/></g>`;
  return feather(id, pal, { eye });
}

// ---------- Wordmark / lockups ----------
function svgDoc(viewBox, body, { title, width, height, fonts = true } = {}) {
  const style = fonts ? `<style><![CDATA[${FONT_IMPORT}
.gk{font-family:'Fraunces','Cormorant Garamond',Georgia,serif;font-weight:560;font-variation-settings:'SOFT' 50,'opsz' 144;}
.hs{font-family:'Manrope','Helvetica Neue',Arial,sans-serif;font-weight:600;}
.hi{font-family:'Tiro Devanagari Hindi','Noto Serif Devanagari',serif;}]]></style>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${width ? ` width="${width}" height="${height}"` : ''} role="img" aria-label="${title}"><title>${title}</title>${style}${body}</svg>\n`;
}

// Horizontal lockup. mark: inner svg content in 100-space.
function horizontal(markInner, t) {
  // mark placed at scale 1.12, visible bbox ~ x 6..69, y 8..112
  return `<g transform="translate(-16 9) scale(1.07)">${markInner}</g>` +
    `<text class="gk" x="88" y="66" font-size="62" textLength="236" lengthAdjust="spacingAndGlyphs" fill="${t.gokul}">GOKUL</text>` +
    `<rect x="89" y="80" width="234" height="1" fill="${t.rule}"/>` +
    `<text class="hs" x="89.5" y="103" font-size="13.5" textLength="233" lengthAdjust="spacing" fill="${t.hosp}">HOSPITAL</text>`;
}
const HVB = '0 0 336 116';

function stacked(markInner, t) {
  return `<g transform="translate(79.8 5.5) scale(1.2)">${markInner}</g>` +
    `<text class="gk" x="140" y="180" font-size="58" text-anchor="middle" textLength="214" lengthAdjust="spacingAndGlyphs" fill="${t.gokul}">GOKUL</text>` +
    `<text class="hs" x="141.5" y="206" font-size="12.5" text-anchor="middle" textLength="211" lengthAdjust="spacing" fill="${t.hosp}">HOSPITAL</text>` +
    `<rect x="118" y="220" width="44" height="1" fill="${t.rule}"/>` +
    `<text class="hi" x="140" y="248" font-size="19" text-anchor="middle" fill="${t.hindi}">गोकुल हॉस्पिटल</text>`;
}
const SVB = '0 0 280 262';

const TL = { gokul: C.navy, hosp: C.blue, rule: C.gold, hindi: C.blue };
const TD = { gokul: C.cream, hosp: C.gold3, rule: C.gold, hindi: C.gold3 };

// ---------- Files ----------
const files = {};
const mark1 = (id, p = PAL.light) => feather(id, p);
files['concept-1-feather.svg'] = svgDoc(HVB, horizontal(mark1('c1'), TL), { title: 'Gokul Hospital - Concept 1: Feather' });
files['concept-2-feather-flute.svg'] = svgDoc(HVB, horizontal(concept2Mark('c2', PAL.light), TL), { title: 'Gokul Hospital - Concept 2: Feather and Flute' });
files['concept-3-feather-care.svg'] = svgDoc(HVB, horizontal(concept3Mark('c3', PAL.light), TL), { title: 'Gokul Hospital - Concept 3: Feather Care' });

files['gokul-mark.svg'] = svgDoc('0 0 100 100', mark1('gm'), { title: 'Gokul Hospital mark', fonts: false });
files['gokul-logo-primary.svg'] = svgDoc(HVB, horizontal(mark1('gp'), TL), { title: 'Gokul Hospital' });
files['gokul-logo-stacked.svg'] = svgDoc(SVB, stacked(mark1('gs'), TL), { title: 'Gokul Hospital' });
files['gokul-logo-reversed.svg'] = svgDoc(HVB, horizontal(mark1('gr', PAL.dark), TD), { title: 'Gokul Hospital (reversed)' });
files['gokul-logo-mono.svg'] = svgDoc(HVB, horizontal(featherMono('gmo', C.navy), { gokul: C.navy, hosp: C.navy, rule: C.navy }), { title: 'Gokul Hospital (one colour)' });
// favicon: no barbs, tighter crop so the feather fills the 32px square
const favEye = `<ellipse cx="50" cy="28.6" rx="15.6" ry="19" fill="${C.gold}"/><ellipse cx="50" cy="30" rx="11" ry="14" fill="#2BA3A0"/><ellipse cx="50" cy="31.8" rx="6.6" ry="9" fill="${C.navy}"/>`;
files['favicon.svg'] = svgDoc('0 0 100 100', `<defs><clipPath id="fv-c"><rect width="100" height="100" rx="22"/></clipPath></defs><rect width="100" height="100" rx="22" fill="${C.navy}"/><g clip-path="url(#fv-c)"><g transform="translate(-3 14)">${feather('fv', PAL.dark, { barbs: false, eye: favEye, s: 1.04 })}</g></g>`, { title: 'Gokul Hospital', fonts: false });

for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(OUT, name), content);

// export pieces for the board
module.exports = { C, PAL, TL, TD, feather, featherMono, concept2Mark, concept3Mark, horizontal, stacked, HVB, SVB };
if (require.main === module) {
  require('./board.js');
  console.log('written', Object.keys(files).length + 1, 'files');
}
