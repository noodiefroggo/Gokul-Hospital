// Generates Gokul Hospital social creatives into ads/
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital';
const OUT = path.join(ROOT, 'ads');


const PHONE = '+91 97189 34517';
const TEL = 'tel:+919718934517';

// ---------- logos (inline, strip @import; fonts come from <link>) ----------
function loadLogo(f) {
  let s = fs.readFileSync(path.join(ROOT, 'logo', f), 'utf8');
  s = s.replace(/@import url\([^)]*\);\s*/, '');
  s = s.replace(/<title>[^<]*<\/title>/, '');
  return s.replace(/^<svg /, '<svg class="logo" ');
}
const LOGO = loadLogo('gokul-logo-primary.svg');
const LOGO_REV = loadLogo('gokul-logo-reversed.svg');

// ---------- illustration helpers ----------
const r = (n) => Math.round(n * 100) / 100;

// Feather in local box 0..200 x 0..600, tip at top, quill at bottom.
function feather({ stroke = '#C9A24B', sw = 1.3, barbs = 44, eye = 'solid', op = 1, rachis = null, eyeCols = ['#C9A24B', '#1A8C8C', '#0B2A3C'], vane = null, id = 'f' } = {}) {
  const cx = 100, top = 60, bottom = 560;
  let d = '';
  for (let i = 0; i < barbs; i++) {
    const t = i / (barbs - 1);
    const y = top + 40 + t * (bottom - top - 60);
    const w = 10 + 82 * Math.pow(Math.sin(Math.PI * (0.08 + 0.92 * (1 - t))), 0.75);
    const lift = w * 0.62;
    if (eye === 'line' && y < 196) continue;
    d += `M${cx} ${r(y)}Q${r(cx - w * 0.42)} ${r(y - lift * 0.15)} ${r(cx - w)} ${r(y - lift)}`;
    d += `M${cx} ${r(y)}Q${r(cx + w * 0.42)} ${r(y - lift * 0.15)} ${r(cx + w)} ${r(y - lift)}`;
  }
  let g = `<g opacity="${op}">`;
  if (vane) g += `<path d="M100 18C140 18 168 60 168 120C168 180 136 226 100 250C64 226 32 180 32 120C32 60 60 18 100 18Z" fill="${vane}"/>`;
  g += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  g += `<path d="M100 ${top + 70}L100 ${bottom + 30}" stroke="${rachis || stroke}" stroke-width="${sw * 2}" stroke-linecap="round"/>`;
  if (eye === 'solid') {
    g += `<ellipse cx="100" cy="112" rx="50" ry="64" fill="${eyeCols[0]}"/><ellipse cx="100" cy="117" rx="39" ry="51" fill="${eyeCols[1]}"/><ellipse cx="100" cy="124" rx="23" ry="32" fill="${eyeCols[2]}"/>`;
  } else if (eye === 'line') {
    g += `<g fill="none" stroke="${stroke}" stroke-width="${sw * 1.4}"><path d="M100 22C138 22 164 62 164 118C164 176 134 220 100 244C66 220 36 176 36 118C36 62 62 22 100 22Z"/><ellipse cx="100" cy="112" rx="46" ry="60"/><ellipse cx="100" cy="117" rx="33" ry="45"/><ellipse cx="100" cy="124" rx="19" ry="27"/></g>`;
  }
  return g + '</g>';
}
function place(inner, { x, y, rot = 0, s = 1 }) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -300)">${inner}</g>`;
}
// Barb field: soft parallel curved lines (texture)
function barbField({ w, h, n = 40, stroke = '#C9A24B', op = 0.12, sw = 1.2, curve = 120 }) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const y = (i / (n - 1)) * (h + curve * 2) - curve;
    d += `M0 ${r(y)}Q${w / 2} ${r(y - curve)} ${w} ${r(y)}`;
  }
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}"/>`;
}
const LOTUS = (stroke, sw = 2.2, fill = 'none') => `<g fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round">
<path d="M200 22C242 72 242 150 200 202C158 150 158 72 200 22Z"/>
<path d="M200 202C150 192 108 142 104 80C150 94 186 140 200 202Z"/>
<path d="M200 202C250 192 292 142 296 80C250 94 214 140 200 202Z"/>
<path d="M200 206C130 212 60 182 28 132C90 120 162 150 200 206Z"/>
<path d="M200 206C270 212 340 182 372 132C310 120 238 150 200 206Z"/>
<path d="M60 230Q200 252 340 230" /><path d="M110 246Q200 258 290 246" opacity=".6"/></g>`;

const ICON_WA = (c = 'currentColor') => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z"/><path d="M9.2 8.3c.2-.4.6-.5.9-.3l.9 1.6c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.6.9c.3.2.4.6.2.9-.5.9-1.4 1.4-2.4 1.1-2.4-.7-4.4-2.7-5.1-5.1-.3-.9.2-1.8.7-2.3z" fill="${c}" stroke="none"/></svg>`;
const ICON_PHONE = (c = 'currentColor') => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const STAR = `<svg viewBox="0 0 24 24" class="st"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="currentColor"/></svg>`;

// Standard footer
function foot({ dark, label = 'WhatsApp or call', icon = 'wa', right = 'Dwarka Mor · New Delhi' }) {
  return `<footer class="foot">
  <a class="cta-chip" href="${TEL}">${icon === 'wa' ? ICON_WA() : ICON_PHONE()}<span><small>${label}</small><b>${PHONE}</b></span></a>
  <span class="foot-r">${right}</span></footer>`;
}

// ---------- page shell ----------
const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..800,0..100;1,9..144,300..800,0..100&family=Manrope:wght@400;500;600;700;800&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap';
function page({ title, size, cls, body, w, h, extraCss = '' }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=${w}">
<title>${title} · Gokul Hospital</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${CSS}
/* creative-specific */${extraCss}</style>
</head><body>
<!-- Artboard: ${w}×${h}px. Open with ?fit to scale it to the window. -->
<main class="art ${size} ${cls}" style="width:${w}px;height:${h}px">
${body}
</main>
<script>if(location.search.includes('fit')){const a=document.querySelector('.art');const f=()=>{const s=Math.min(innerWidth/${w},innerHeight/${h});a.style.transformOrigin='0 0';a.style.transform='scale('+s+')';document.body.style.overflow='hidden'};f();addEventListener('resize',f)}</script>
</body></html>`;
}

// ---------- shared CSS ----------
const CSS = `:root{
--peacock-900:#0B2A3C;--peacock-700:#0E4D64;--teal-500:#1A8C8C;--feather-green:#3E8E5A;
--gold-500:#C9A24B;--gold-300:#E6CF8F;--lotus-300:#F2B8B5;--cream-50:#FBF7EF;--cream-100:#F3EADA;--ink-700:#3A3A3A;
--pad:84px}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#1b1f22}
body{min-height:100vh}
a{color:inherit;text-decoration:none}
.art{position:relative;overflow:hidden;font-family:'Manrope',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.dark{background:var(--peacock-900);color:var(--cream-50)}
.light{background:var(--cream-50);color:var(--peacock-900)}
.art svg.logo{display:block;height:auto}
.logo .gk{font-family:'Fraunces',Georgia,serif;font-weight:560;font-variation-settings:'SOFT' 50,'opsz' 144}
.logo .hs{font-family:'Manrope',Arial,sans-serif;font-weight:600}
.layer{position:absolute;inset:0;pointer-events:none}
.layer svg{width:100%;height:100%;display:block}
.serif{font-family:'Fraunces',Georgia,serif;font-variation-settings:'SOFT' 100,'opsz' 144;font-weight:400;letter-spacing:-.02em}
.serif em{font-style:italic;font-variation-settings:'SOFT' 100,'opsz' 144}
.hi{font-family:'Tiro Devanagari Hindi','Noto Serif Devanagari',serif;letter-spacing:0}
.eyebrow{font:700 21px/1.2 'Manrope',sans-serif;letter-spacing:.24em;text-transform:uppercase}
.rule{height:1px;background:var(--gold-500)}
.ic{width:1em;height:1em;flex:none}
.st{width:1em;height:1em;display:inline-block}
/* footer */
.foot{position:absolute;left:var(--pad);right:var(--pad);bottom:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.cta-chip{display:inline-flex;align-items:center;gap:20px;padding:16px 34px 16px 22px;border-radius:999px;font-size:52px}
.cta-chip .ic{width:56px;height:56px;padding:12px;border-radius:50%;}
.cta-chip span{display:flex;flex-direction:column;gap:4px}
.cta-chip small{font:700 16px/1 'Manrope';letter-spacing:.2em;text-transform:uppercase;opacity:.75}
.cta-chip b{font:700 34px/1.05 'Manrope';letter-spacing:.01em;font-variant-numeric:tabular-nums}
.foot-r{font:600 20px/1.3 'Manrope';letter-spacing:.18em;text-transform:uppercase;opacity:.85;text-align:right}
.dark .cta-chip{background:rgba(251,247,239,.07);border:1px solid rgba(230,207,143,.45);color:var(--cream-50)}
.dark .cta-chip .ic{background:var(--gold-500);color:var(--peacock-900)}
.light .cta-chip{background:var(--peacock-900);color:var(--cream-50)}
.light .cta-chip .ic{background:var(--gold-500);color:var(--peacock-900)}
/* photo placeholder */
.ph{position:absolute;overflow:hidden;display:flex;align-items:flex-end;justify-content:center}
.ph::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(11,42,60,.05) 0 2px,transparent 2px 18px)}
.ph .ph-l{position:relative;margin-bottom:34px;font:700 15px/1.3 'Manrope';letter-spacing:.2em;text-transform:uppercase;padding:9px 16px;border-radius:999px;background:rgba(251,247,239,.82);color:var(--peacock-700);text-align:center}
.arch{border-radius:999px 999px 18px 18px}
`;
fs.rmSync(path.join(OUT, 'assets'), { recursive: true, force: true });

const files = [];
function emit(file, meta, html) { fs.writeFileSync(path.join(OUT, file), html); files.push({ file, ...meta }); }

// ===== 01 Brand intro (dark) =====
emit('01-brand-intro.html', { title: 'Brand intro', fmt: 'Instagram post', w: 1080, h: 1080, theme: 'dark' }, page({
  title: 'Brand intro', size: 'sq', cls: 'dark', w: 1080, h: 1080,
  extraCss: `
.c1-bg{background:radial-gradient(120% 90% at 85% 30%, #0E4D64 0%, rgba(14,77,100,0) 55%), var(--peacock-900)}
.c1-logo{position:absolute;left:var(--pad);top:80px;width:268px}
.c1-est{position:absolute;right:var(--pad);top:104px;color:var(--gold-300);opacity:.85;font-size:18px}
.c1-copy{position:absolute;left:var(--pad);top:386px;width:600px}
.c1-h{font-size:118px;line-height:.98;color:var(--cream-50)}
.c1-h em{color:var(--gold-300)}
.c1-hi{margin-top:40px;font-size:58px;line-height:1.3;color:var(--gold-300)}
.c1-sub{margin-top:26px;font:500 25px/1.45 'Manrope';color:rgba(251,247,239,.78);max-width:470px}
.c1-arch{position:absolute;right:58px;top:196px;width:390px;height:640px;border:1.5px solid rgba(201,162,75,.55);border-radius:999px 999px 0 0;border-bottom:0}
.c1-arch2{position:absolute;right:76px;top:214px;width:354px;height:640px;border:1px solid rgba(201,162,75,.22);border-radius:999px 999px 0 0;border-bottom:0}
`,
  body: `<div class="layer c1-bg"></div>
<div class="layer"><svg viewBox="0 0 1080 1080">${barbField({ w: 1080, h: 1080, n: 34, op: 0.06, curve: 160 })}</svg></div>
<div class="c1-arch2"></div><div class="c1-arch"></div>
<div class="layer"><svg viewBox="0 0 1080 1080">
<defs><linearGradient id="v1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E4D64"/><stop offset="1" stop-color="#1A8C8C"/></linearGradient></defs>
${place(feather({ stroke: '#C9A24B', sw: 1.15, barbs: 52, eye: 'solid', vane: 'url(#v1)', rachis: '#E6CF8F', eyeCols: ['#C9A24B', '#2BA3A0', '#0B2A3C'] }), { x: 830, y: 600, rot: 14, s: 1.18 })}
</svg></div>
<div class="c1-logo">${LOGO_REV}</div>
<div class="eyebrow c1-est">Est. 2018</div>
<div class="c1-copy">
  <h1 class="serif c1-h">Care, like<br>a <em>mother’s.</em></h1>
  <p class="hi c1-hi" lang="hi">माँ जैसी देखभाल</p>
  <p class="c1-sub">Maternity &amp; women’s hospital in Dwarka&nbsp;Mor, New&nbsp;Delhi.</p>
</div>
${foot({ dark: true })}`
}));

// ===== 02 Maternity (light) =====
const services = [['01', 'Pregnancy<br>check-ups'], ['02', 'Normal<br>deliveries'], ['03', 'C-section<br>deliveries'], ['04', 'NICU<br>care']];
emit('02-maternity-care.html', { title: 'Maternity care', fmt: 'Instagram post', w: 1080, h: 1080, theme: 'light' }, page({
  title: 'Maternity care', size: 'sq', cls: 'light', w: 1080, h: 1080,
  extraCss: `
.c2-logo{position:absolute;left:var(--pad);top:80px;width:250px}
.c2-eb{position:absolute;left:var(--pad);top:262px;color:var(--teal-500)}
.c2-h{position:absolute;left:var(--pad);top:304px;width:560px;font-size:84px;line-height:1.02}
.c2-h em{color:var(--teal-500)}
.c2-ph{right:var(--pad);top:80px;width:330px;height:560px;background:linear-gradient(170deg,#F8E1DC 0%,#F4C9C5 60%,#EFB9B5 100%)}
.c2-ph-ring{position:absolute;right:calc(var(--pad) - 14px);top:66px;width:358px;height:588px;border:1px solid var(--gold-500);border-radius:999px 999px 26px 26px}
.c2-list{position:absolute;left:var(--pad);right:var(--pad);top:704px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--gold-500)}
.c2-list div{padding:26px 22px 0 0}
.c2-list div+div{padding-left:24px;border-left:1px solid rgba(201,162,75,.55)}
.c2-list i{display:block;font:italic 400 26px/1 'Fraunces';color:var(--gold-500);margin-bottom:16px}
.c2-list b{display:block;font:700 27px/1.22 'Manrope';color:var(--peacock-900)}
`,
  body: `<div class="layer"><svg viewBox="0 0 1080 1080">${barbField({ w: 1080, h: 1080, n: 30, stroke: '#1A8C8C', op: 0.05, curve: 140 })}</svg></div>
<div class="c2-ph-ring"></div>
<div class="ph arch c2-ph"><svg viewBox="0 0 400 260" style="position:absolute;left:40px;right:40px;top:210px;width:250px;opacity:.55">${LOTUS('#FBF7EF', 2.4)}</svg><span class="ph-l">Photo placeholder<br>Mother &amp; newborn</span></div>
<div class="c2-logo">${LOGO}</div>
<div class="eyebrow c2-eb">Maternity &amp; Obstetrics</div>
<h1 class="serif c2-h">Every step of motherhood, <em>held with care.</em></h1>
<div class="c2-list">${services.map(([n, t]) => `<div><i>${n}</i><b>${t}</b></div>`).join('')}</div>
${foot({ dark: false, label: 'Book on WhatsApp' })}`
}));

// ===== 03 Trust (dark) =====
emit('03-trust-rating.html', { title: 'Trust · 4.8★ rating', fmt: 'Instagram post', w: 1080, h: 1080, theme: 'dark' }, page({
  title: 'Trust', size: 'sq', cls: 'dark', w: 1080, h: 1080,
  extraCss: `
.c3-bg{background:radial-gradient(90% 70% at 18% 40%, rgba(26,140,140,.28) 0%, rgba(26,140,140,0) 60%), var(--peacock-900)}
.c3-logo{position:absolute;left:var(--pad);top:80px;width:250px}
.c3-eb{position:absolute;right:var(--pad);top:104px;color:var(--gold-300);opacity:.85;font-size:18px}
.c3-score{position:absolute;left:var(--pad);top:250px;display:flex;align-items:flex-start;gap:28px}
.c3-num{font-size:300px;line-height:.82;color:var(--gold-300);font-weight:350;letter-spacing:-.04em}
.c3-meta{padding-top:26px}
.c3-stars{display:flex;gap:8px;font-size:44px;color:var(--gold-500)}
.c3-of{margin-top:22px;font:600 30px/1.3 'Manrope';color:var(--cream-50)}
.c3-src{margin-top:8px;font:500 22px/1.3 'Manrope';color:rgba(251,247,239,.62);letter-spacing:.02em}
.c3-q{position:absolute;left:var(--pad);right:150px;top:600px;border-top:1px solid rgba(201,162,75,.5);padding-top:40px}
.c3-q blockquote{font-size:50px;line-height:1.18;color:var(--cream-50)}
.c3-q blockquote::before{content:"“";position:absolute;left:-6px;top:6px;font:400 110px/1 'Fraunces';color:var(--gold-500);transform:translateY(-48px);opacity:.0}
.c3-q p{margin-top:24px;font:600 18px/1 'Manrope';letter-spacing:.22em;text-transform:uppercase;color:var(--gold-300);opacity:.8}
`,
  body: `<div class="layer c3-bg"></div>
<div class="layer"><svg viewBox="0 0 1080 1080">
${place(feather({ stroke: '#C9A24B', sw: 1.1, barbs: 50, eye: 'line', op: 0.28 }), { x: 975, y: 430, rot: -18, s: 1.1 })}
</svg></div>
<div class="c3-logo">${LOGO_REV}</div>
<div class="eyebrow c3-eb">What families say</div>
<div class="c3-score"><div class="serif c3-num">4.8</div>
<div class="c3-meta"><div class="c3-stars">${STAR.repeat(5)}</div><div class="c3-of">from 500+ ratings</div><div class="c3-src">on Justdial</div></div></div>
<div class="c3-q"><blockquote class="serif"><em>Caring staff, a spotless hospital, and no surprise bills at discharge.</em></blockquote><p>Summarised from patient reviews</p></div>
${foot({ dark: true, label: 'Call or WhatsApp' , icon: 'phone'})}`
}));

// ===== 04 Fertility (portrait, light blush) =====
emit('04-fertility-ivf.html', { title: 'Fertility & IVF', fmt: 'Instagram portrait', w: 1080, h: 1350, theme: 'light' }, page({
  title: 'Fertility & IVF', size: 'pt', cls: 'light', w: 1080, h: 1350,
  extraCss: `
.c4-bg{background:linear-gradient(180deg,#FBF7EF 0%,#F8E9E2 58%,#F5DCD5 100%)}
.c4-logo{position:absolute;left:50%;top:84px;width:250px;transform:translateX(-50%)}
.c4-arch{position:absolute;left:50%;top:250px;width:440px;height:470px;transform:translateX(-50%);border-radius:999px 999px 0 0;background:radial-gradient(80% 70% at 50% 75%, rgba(242,184,181,.75) 0%, rgba(242,184,181,.0) 70%), linear-gradient(180deg,rgba(243,234,218,.0),rgba(243,234,218,.9));border:1.5px solid var(--gold-500);border-bottom:0}
.c4-lotus{position:absolute;left:50%;top:430px;width:400px;transform:translateX(-50%)}
.c4-base{position:absolute;left:250px;right:250px;top:720px;height:1px;background:var(--gold-500)}
.c4-copy{position:absolute;left:var(--pad);right:var(--pad);top:800px;text-align:center}
.c4-eb{color:var(--teal-500)}
.c4-h{margin-top:22px;font-size:112px;line-height:1}
.c4-h em{color:var(--peacock-700)}
.c4-sub{margin:30px auto 0;max-width:700px;font:500 31px/1.45 'Manrope';color:var(--ink-700)}
.c4 .foot{justify-content:center}
.c4 .foot-r{display:none}
.c4 .cta-chip{background:transparent;color:var(--peacock-900);border:1.5px solid var(--peacock-900)}
.c4 .cta-chip .ic{background:var(--peacock-900);color:var(--gold-300)}
`,
  body: `<div class="layer c4-bg"></div>
<div class="layer"><svg viewBox="0 0 1080 1350">${barbField({ w: 1080, h: 1350, n: 36, stroke: '#C9A24B', op: 0.08, curve: 180 })}</svg></div>
<div class="c4-logo">${LOGO}</div>
<div class="c4-arch"></div><div class="c4-base"></div>
<svg class="c4-lotus" viewBox="0 0 400 260">${LOTUS('#0E4D64', 2)}<circle cx="200" cy="12" r="4" fill="#C9A24B"/></svg>
<div class="c4-copy"><div class="eyebrow c4-eb">Fertility &amp; IVF</div>
<h1 class="serif c4-h">Hope, <em>held gently.</em></h1>
<p class="c4-sub">Patient, unhurried guidance for every step of your fertility journey.</p></div>
${foot({ dark: false, label: 'Talk to us on WhatsApp' })}`
}).replace('class="art pt light"', 'class="art pt light c4"'));

// ===== 05 Emergency story (dark, 1080x1920) =====
let ticks = '';
for (let i = 0; i < 13; i++) { const x = 70 + i * 60; ticks += `<rect x="${x - 3}" y="94" width="6" height="40" rx="2" fill="#E6CF8F" opacity="${i === 8 ? 0 : 0.35}"/>`; }
emit('05-emergency-story.html', { title: '24×7 Emergency', fmt: 'Story / Reel cover', w: 1080, h: 1920, theme: 'dark' }, page({
  title: '24×7 Emergency', size: 'st', cls: 'dark', w: 1080, h: 1920,
  extraCss: `
.c5-bg{background:radial-gradient(80% 45% at 50% 34%, #0E4D64 0%, rgba(14,77,100,0) 70%), var(--peacock-900)}
.c5-logo{position:absolute;left:var(--pad);top:250px;width:270px}
.c5-live{position:absolute;right:var(--pad);top:282px;display:flex;align-items:center;gap:14px;color:var(--gold-300);font-size:20px}
.c5-live i{width:14px;height:14px;border-radius:50%;background:#F2B8B5;box-shadow:0 0 0 8px rgba(242,184,181,.18)}
.c5-big{position:absolute;left:var(--pad);right:var(--pad);top:450px}
.c5-num{font-size:330px;line-height:.82;color:var(--gold-300);letter-spacing:-.05em;font-weight:340}
.c5-num span{font-size:.62em;vertical-align:.3em;margin:0 .02em;color:var(--gold-500)}
.c5-word{margin-top:18px;font-size:150px;line-height:.95;color:var(--cream-50)}
.c5-sub{margin-top:30px;font:500 34px/1.4 'Manrope';color:rgba(251,247,239,.82);max-width:640px}
.c5-map{position:absolute;left:var(--pad);right:var(--pad);top:1086px;border:1px solid rgba(201,162,75,.45);border-radius:28px;padding:36px 40px 40px;background:rgba(251,247,239,.04)}
.c5-map .eyebrow{color:var(--gold-300);font-size:19px;opacity:.85}
.c5-addr{margin-top:14px;font-size:54px;line-height:1.08;color:var(--cream-50)}
.c5-addr em{color:var(--gold-300)}
.c5-map svg{display:block;width:100%;margin-top:22px}
.c5-cta{position:absolute;left:var(--pad);right:var(--pad);top:1532px;height:112px;border-radius:999px;background:var(--gold-500);color:var(--peacock-900);display:flex;align-items:center;justify-content:center;gap:22px;font:800 44px/1 'Manrope';letter-spacing:.01em}
.c5-cta .ic{width:46px;height:46px}
.c5-hint{position:absolute;left:0;right:0;top:1674px;text-align:center;font:600 20px/1 'Manrope';letter-spacing:.22em;text-transform:uppercase;color:rgba(251,247,239,.8)}
`,
  body: `<div class="layer c5-bg"></div>
<div class="layer"><svg viewBox="0 0 1080 1920">${barbField({ w: 1080, h: 1920, n: 44, op: 0.06, curve: 200 })}
${place(feather({ stroke: '#C9A24B', sw: 1.1, barbs: 50, eye: 'line', op: 0.22 }), { x: 900, y: 700, rot: 20, s: 1.35 })}</svg></div>
<div class="c5-logo">${LOGO_REV}</div>
<div class="eyebrow c5-live"><i></i>Always open</div>
<div class="c5-big"><div class="serif c5-num">24<span>×</span>7</div><div class="serif c5-word"><em>Emergency</em></div>
<p class="c5-sub">Every hour, every day, for mothers, women and newborns.</p></div>
<div class="c5-map"><div class="eyebrow">Find us</div>
<div class="serif c5-addr">Opposite Metro <em>Pillar 781</em>,<br>Dwarka Mor</div>
<svg viewBox="0 0 912 180" aria-hidden="true">
<rect x="20" y="110" width="872" height="8" rx="4" fill="#1A8C8C"/>
${ticks}
<circle cx="190" cy="114" r="18" fill="#0B2A3C" stroke="#E6CF8F" stroke-width="4"/>
<text x="190" y="170" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="20" letter-spacing="2" fill="#FBF7EF" opacity=".75">DWARKA MOR</text>
<line x1="550" y1="20" x2="550" y2="100" stroke="#C9A24B" stroke-width="2" stroke-dasharray="4 6"/>
<rect x="540" y="86" width="20" height="56" rx="3" fill="#E6CF8F"/>
<text x="550" y="170" text-anchor="middle" font-family="Manrope" font-weight="800" font-size="20" letter-spacing="2" fill="#E6CF8F">PILLAR 781</text>
<g transform="translate(550 22)"><rect x="-118" y="-20" width="236" height="44" rx="22" fill="#FBF7EF"/><text x="0" y="9" text-anchor="middle" font-family="Fraunces" font-size="24" fill="#0B2A3C">Gokul Hospital</text></g>
</svg></div>
<a class="c5-cta" href="${TEL}">${ICON_PHONE()}Call ${PHONE}</a>
<div class="c5-hint">Call or WhatsApp, same number</div>`
}));

// ===== 06 Meta feed ad (light) =====
emit('06-meta-ad-checkup.html', { title: 'Meta ad · Check-up', fmt: 'Meta feed ad', w: 1080, h: 1080, theme: 'light' }, page({
  title: 'Meta ad · Pregnancy check-up', size: 'sq', cls: 'light', w: 1080, h: 1080,
  extraCss: `
.c6-bg{background:linear-gradient(180deg,var(--cream-50) 0%,var(--cream-100) 100%)}
.c6-logo{position:absolute;left:var(--pad);top:80px;width:250px}
.c6-ph{left:560px;top:0;right:0;bottom:0;border-radius:0;background:linear-gradient(160deg,#CFE3E0 0%,#9CCAC6 50%,#6FB0AD 100%)}
.c6-ph::after{content:"";position:absolute;left:0;top:0;bottom:0;width:180px;background:linear-gradient(90deg,var(--cream-50),rgba(251,247,239,0))}
.c6-archmask{position:absolute;left:610px;top:230px;width:380px;height:850px;border:1.5px solid rgba(251,247,239,.9);border-radius:999px 999px 0 0;border-bottom:0}
.c6-badge{position:absolute;right:70px;top:80px;background:var(--cream-50);border-radius:20px;padding:18px 24px;box-shadow:0 14px 40px rgba(11,42,60,.16);display:flex;align-items:center;gap:16px}
.c6-badge b{font:400 54px/1 'Fraunces';color:var(--peacock-900)}
.c6-badge span{font:600 18px/1.3 'Manrope';color:var(--ink-700)}
.c6-badge .st{color:var(--gold-500);font-size:22px}
.c6-copy{position:absolute;left:var(--pad);top:280px;width:560px}
.c6-eb{color:var(--teal-500)}
.c6-h{margin-top:22px;font-size:96px;line-height:.98}
.c6-h em{color:var(--teal-500)}
.c6-sub{margin-top:28px;font:500 28px/1.45 'Manrope';color:var(--ink-700);max-width:440px}
.c6-btns{position:absolute;left:var(--pad);top:830px;display:flex;gap:16px}
.mbtn{display:inline-flex;align-items:center;gap:14px;height:84px;padding:0 34px;border-radius:14px;font:700 30px/1 'Manrope'}
.mbtn .ic{width:34px;height:34px}
.mbtn.wa{background:#0B2A3C;color:#FBF7EF}
.mbtn.wa .ic{color:#25D366}
.mbtn.call{background:#E4E6EB;color:#050505}
.c6-num{position:absolute;left:var(--pad);top:944px;font:600 22px/1 'Manrope';letter-spacing:.06em;color:var(--peacock-700)}
.c6-feather{position:absolute;inset:0;pointer-events:none}
`,
  body: `<div class="layer c6-bg"></div>
<div class="ph c6-ph"><span class="ph-l" style="position:absolute;top:400px;left:50%;transform:translateX(-50%);margin:0;white-space:nowrap">Photo placeholder<br>Expecting mother, check-up</span></div>
<div class="c6-archmask"></div>
<div class="layer"><svg viewBox="0 0 1080 1080">${place(feather({ stroke: '#FBF7EF', sw: 1.2, barbs: 46, eye: 'line', op: 0.55 }), { x: 930, y: 800, rot: 12, s: 0.82 })}</svg></div>
<div class="c6-badge"><b>4.8</b><span><span class="st">${STAR}</span> 500+ ratings<br>on Justdial</span></div>
<div class="c6-logo">${LOGO}</div>
<div class="c6-copy"><div class="eyebrow c6-eb">Dwarka Mor · New Delhi</div>
<h1 class="serif c6-h">Book your pregnancy <em>check-up</em></h1>
<p class="c6-sub">Gentle, experienced care, steps from Dwarka Mor metro.</p></div>
<div class="c6-btns"><a class="mbtn wa" href="https://wa.me/919718934517">${ICON_WA()}WhatsApp us</a><a class="mbtn call" href="${TEL}">${ICON_PHONE()}Call now</a></div>
<div class="c6-num">${PHONE}</div>`
}));

// ===== 07 Janmashtami (dark festive) =====
const matki = `<g fill="none" stroke="#C9A24B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M0 -620L0 -170"/><path d="M0 -170L-62 -14M0 -170L62 -14M0 -170L-24 -10M0 -170L24 -10" stroke-width="1.8"/>
<circle cx="0" cy="-170" r="7" fill="#C9A24B"/>
<path d="M-62 -12C-62 -24 62 -24 62 -12C62 0 -62 0 -62 -12Z"/>
<path d="M-56 -4C-66 6 -60 16 -54 22"/><path d="M56 -4C66 6 60 16 54 22"/>
<path d="M-54 22C-150 50 -150 200 -50 228L50 228C150 200 150 50 54 22"/>
<path d="M-128 92Q0 122 128 92" /><path d="M-134 118Q0 150 134 118"/>
<path d="M-112 92l14 26M-84 98l14 26M-56 102l14 26M-28 104l14 28M0 105l14 28M28 104l14 27M56 102l14 26M84 98l14 25" stroke-width="1.4" opacity=".7"/>
<path d="M-44 228Q0 244 44 228"/>
<g fill="#F3EADA" stroke="none"><path d="M-40 -14C-42 -30 -24 -36 -12 -30C-6 -46 22 -46 26 -30C40 -32 46 -20 40 -14Z"/></g>
<g stroke="#E6CF8F" stroke-width="1.4" opacity=".8"><circle cx="-70" cy="170" r="5"/><circle cx="0" cy="182" r="5"/><circle cx="70" cy="170" r="5"/></g>
</g>`;
const flute = `<g stroke-linecap="round">
<rect x="-300" y="-13" width="600" height="26" rx="13" fill="none" stroke="#C9A24B" stroke-width="2.4"/>
<path d="M-250 -13v26M250 -13v26M-232 -13v26" stroke="#C9A24B" stroke-width="1.6"/>
${[-150, -100, -50, 0, 50, 100].map((x) => `<ellipse cx="${x}" cy="0" rx="6" ry="5" fill="#C9A24B"/>`).join('')}
<path d="M-241 13C-250 50 -236 82 -246 118M-241 13C-228 46 -226 80 -214 110" fill="none" stroke="#E6CF8F" stroke-width="1.6"/>
<circle cx="-241" cy="16" r="6" fill="#F2B8B5"/>
</g>`;
emit('07-janmashtami.html', { title: 'Janmashtami greeting', fmt: 'Instagram post · festive', w: 1080, h: 1080, theme: 'dark' }, page({
  title: 'Janmashtami greeting', size: 'sq', cls: 'dark', w: 1080, h: 1080,
  extraCss: `
.c7-bg{background:radial-gradient(70% 60% at 72% 34%, rgba(201,162,75,.20) 0%, rgba(201,162,75,0) 60%), radial-gradient(90% 80% at 20% 90%, #0E4D64 0%, rgba(14,77,100,0) 60%), var(--peacock-900)}
.c7-logo{position:absolute;left:var(--pad);top:80px;width:250px}
.c7-copy{position:absolute;left:var(--pad);top:480px;width:600px}
.c7-hi{font-size:96px;line-height:1.25;color:var(--gold-300)}
.c7-en{margin-top:4px;font-size:64px;line-height:1.05;color:var(--cream-50)}
.c7-sub{margin-top:26px;font:500 26px/1.45 'Manrope';color:rgba(251,247,239,.78);max-width:470px}
.c7-frame{position:absolute;inset:34px;border:1px solid rgba(201,162,75,.35);border-radius:28px;pointer-events:none}
`,
  body: `<div class="layer c7-bg"></div>
<div class="c7-frame"></div>
<div class="layer"><svg viewBox="0 0 1080 1080">
${[...Array(24)].map((_, i) => { const a = i * 15 * Math.PI / 180; return `<line x1="${r(780 + Math.cos(a) * 250)}" y1="${r(340 + Math.sin(a) * 250)}" x2="${r(780 + Math.cos(a) * 300)}" y2="${r(340 + Math.sin(a) * 300)}" stroke="#C9A24B" stroke-width="1.2" opacity=".35"/>`; }).join('')}
<circle cx="780" cy="340" r="232" fill="none" stroke="#C9A24B" stroke-width="1" opacity=".3"/>
${place(feather({ stroke: '#C9A24B', sw: 1.2, barbs: 48, eye: 'solid', op: 1, vane: '#0E4D64', rachis: '#E6CF8F', eyeCols: ['#C9A24B', '#2BA3A0', '#0B2A3C'] }), { x: 905, y: 610, rot: 30, s: 0.78 })}
<g transform="translate(780 300)">${matki}</g>
<g transform="translate(760 790) rotate(-14) scale(.86)">${flute}</g>
</svg></div>
<div class="c7-logo">${LOGO_REV}</div>
<div class="c7-copy"><p class="hi c7-hi" lang="hi">शुभ जन्माष्टमी</p>
<h1 class="serif c7-en"><em>Happy Janmashtami</em></h1>
<p class="c7-sub">May every home be filled with a mother’s love and a child’s laughter.</p></div>
${foot({ dark: true })}`
}));

// ===== Gallery =====
const ROWH = 320;
const cards = files.map((f, i) => {
  const h = ROWH, w = Math.round(f.w * ROWH / f.h), SC = ROWH / f.h;
  return `<figure class="card" style="width:${Math.max(w, 250)}px;--fw:${w}px">
<a class="frame" href="${f.file}" data-aw="${f.w}" style="aspect-ratio:${f.w}/${f.h}" aria-label="Open ${f.title} at full size">
<iframe src="${f.file}" width="${f.w}" height="${f.h}" style="transform:scale(${SC})" tabindex="-1" loading="eager" title="${f.title}"></iframe></a>
<figcaption><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t"><b>${f.title}</b><small>${f.fmt} · ${f.w}×${f.h} · ${f.theme}</small></span>
<span class="links"><a href="${f.file}">HTML</a><a href="png/${f.file.replace('.html', '.png')}">PNG</a></span></figcaption></figure>`;
}).join('\n');
fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Social &amp; Ads · Gokul Hospital</title>
<link rel="stylesheet" href="${FONTS}">
<style>
:root{--n:#0B2A3C;--t:#1A8C8C;--g:#C9A24B;--c:#FBF7EF;--c2:#F3EADA;--ink:#3A3A3A}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--c);color:var(--n);font-family:Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
header{max-width:1300px;margin:0 auto;padding:56px 24px 28px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;border-bottom:1px solid var(--g)}
header svg.logo{width:220px;height:auto;display:block}
.logo .gk{font-family:'Fraunces',Georgia,serif;font-weight:560;font-variation-settings:'SOFT' 50,'opsz' 144}.logo .hs{font-family:Manrope;font-weight:600}
h1{font-family:Fraunces;font-weight:400;font-variation-settings:'SOFT' 100,'opsz' 144;font-size:clamp(34px,5vw,56px);line-height:1;letter-spacing:-.02em;margin-top:22px}
h1 em{color:var(--t)}
.meta{font-size:14px;line-height:1.6;color:var(--ink);max-width:min(420px,100%)}
.meta b{display:block;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--t);margin-bottom:6px}
.meta a{color:var(--n);text-decoration:underline;text-decoration-color:var(--g);text-underline-offset:3px}
main{max-width:1300px;margin:0 auto;padding:44px 24px 80px;display:flex;flex-wrap:wrap;gap:48px 32px;align-items:flex-start}
.card{display:flex;flex-direction:column;gap:14px;max-width:100%}
.frame{display:block;width:var(--fw);max-width:100%;position:relative;overflow:hidden;border-radius:10px;box-shadow:0 1px 0 rgba(11,42,60,.06),0 18px 40px -18px rgba(11,42,60,.35);transition:transform .25s ease,box-shadow .25s ease}
.frame:hover{transform:translateY(-3px);box-shadow:0 1px 0 rgba(11,42,60,.06),0 26px 50px -18px rgba(11,42,60,.45)}
.frame:focus-visible{outline:2px solid var(--t);outline-offset:4px}
.frame iframe{border:0;transform-origin:0 0;pointer-events:none;display:block}
figcaption{display:flex;align-items:flex-start;gap:12px}
.n{font-family:Fraunces;font-style:italic;color:var(--g);font-size:20px;line-height:1.1}
.t{display:flex;flex-direction:column;gap:3px;flex:1}
.t b{font-size:15px}.t small{font-size:12.5px;color:#5b6670;letter-spacing:.02em}
.links{display:flex;gap:10px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.links a{color:var(--t)}
footer{max-width:1300px;margin:0 auto;padding:0 24px 56px;font-size:13px;color:#5b6670}
@media (max-width:700px){.card{width:100%!important}.frame{width:100%}}
</style></head><body>
<header><div>${LOGO}<h1>Social posts &amp; <em>Meta ads</em></h1></div>
<p class="meta"><b>Demo set · ${files.length} creatives</b>Brand system: “Care, like a mother’s.” Cream and peacock-navy treatments, feather-eye, barb and lotus motifs. Click any creative to open it at full size. Ad copy lives in <a href="ad-copy.md">ad-copy.md</a>.</p></header>
<main>
${cards}
</main>
<script>const fit=()=>document.querySelectorAll('.frame').forEach(a=>{a.querySelector('iframe').style.transform='scale('+(a.clientWidth/a.dataset.aw)+')'});fit();addEventListener('resize',fit);</script>
<footer>Photo areas are labelled placeholders for real hospital photography. All facts from the brand brief; review line is paraphrased.</footer>
</body></html>`);
console.log('built', files.map((f) => f.file).join(', '));
