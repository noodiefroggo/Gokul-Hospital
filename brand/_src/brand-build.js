// Generates brand/index.html (Gokul Hospital brand guidelines). Run: node brand-build.js
const fs = require('fs');
const ROOT = 'C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital/';
fs.mkdirSync(ROOT + 'brand', { recursive: true });

const inl = (f, cls) => fs.readFileSync(ROOT + 'logo/' + f, 'utf8')
  .replace(/<title>.*?<\/title>/s, '').replace(/<style>.*?<\/style>/s, '')
  .replace('<svg ', `<svg class="${cls}" `).trim();

// Reversed-palette mark, lifted from the reversed lockup (everything before the wordmark text)
const rev = fs.readFileSync(ROOT + 'logo/gokul-logo-reversed.svg', 'utf8');
const darkMark = `<svg class="mark" viewBox="2 6 76 110" role="img" aria-label="Gokul feather mark">${rev.slice(rev.indexOf('<g transform="translate(-16 9)'), rev.indexOf('<text')).replace(/gr-/g, 'hm-')}</svg>`;
// WCAG contrast
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const C = { navy: '#0B2A3C', blue: '#0E4D64', teal: '#1A8C8C', teal6: '#136F6F', green: '#3E8E5A', gold: '#C9A24B', gold3: '#E6CF8F', gold7: '#7A5E1C', lotus: '#F2B8B5', lotus1: '#FBE6E3', cream: '#FBF7EF', cream1: '#F3EADA', ink: '#3A3A3A', ink5: '#55565A' };

const tokens = [
  ['--peacock-900', C.navy, 'Peacock navy', 'Primary text on light, dark-theme base, primary buttons'],
  ['--peacock-700', C.blue, 'Peacock blue', 'Secondary headings, links, the feather vane'],
  ['--teal-500', C.teal, 'Feather teal', 'Primary accent: icons, highlights, large type only'],
  ['--feather-green', C.green, 'Barb green', 'Sparingly: the vane on dark, small illustration accents'],
  ['--gold-500', C.gold, 'Temple gold', 'Hairlines, eye ring, dividers. Never body text'],
  ['--gold-300', C.gold3, 'Gold 300', 'Type and buttons on navy'],
  ['--lotus-300', C.lotus, 'Lotus pink', 'Maternity warmth in small doses: tags, illustrations'],
  ['--cream-50', C.cream, 'Cream', 'Page background, light theme'],
  ['--cream-100', C.cream1, 'Cream 100', 'Alternate sections, cards on cream'],
  ['--ink-700', C.ink, 'Ink', 'Body text on light'],
];
const dark = (h) => lum(h) < 0.25;

const pairs = [
  [C.navy, C.cream, 'Navy on cream', 'Headings, body'],
  [C.ink, C.cream, 'Ink on cream', 'Body copy'],
  [C.blue, C.cream, 'Peacock blue on cream', 'Links, subheads'],
  [C.teal, C.cream, 'Teal on cream', 'Large text and icons only'],
  [C.gold7, C.cream, 'Gold 700 on cream', 'Small gold text (use this, not gold 500)'],
  [C.gold, C.cream, 'Gold 500 on cream', 'Hairlines and ornament only'],
  [C.cream, C.navy, 'Cream on navy', 'Body on dark'],
  [C.gold3, C.navy, 'Gold 300 on navy', 'Headings, buttons on dark'],
  [C.teal, C.navy, 'Teal on navy', 'Decoration only'],
  [C.cream, C.teal6, 'Cream on teal 600', 'Text on a teal band'],
];
const verdict = (r) => (r >= 7 ? ['AAA', 'ok'] : r >= 4.5 ? ['AA', 'ok'] : r >= 3 ? ['AA large', 'mid'] : ['Fail', 'bad']);

const pairHTML = pairs.map(([fg, bg, n, use]) => {
  const r = cr(fg, bg), [v, cls] = verdict(r);
  return `<li class="pair"><div class="pair-chip" style="background:${bg};color:${fg}"><span>Aa</span><small>${fg} on ${bg}</small></div><div class="pair-info"><b>${n}</b><span>${use}</span></div><div class="ratio ${cls}"><b>${r.toFixed(1)}:1</b><span>${v}</span></div></li>`;
}).join('');

const swatchHTML = tokens.map(([t, h, n, role]) => `<li class="sw"><div class="chip" style="background:${h};color:${dark(h) ? C.cream : C.navy}${h === C.cream ? ';box-shadow:inset 0 0 0 1px var(--line)' : ''}"><code>${h}</code></div><div class="info"><b>${n}</b><code class="tok">${t}</code><span>${role}</span></div></li>`).join('');

const proportions = [[C.cream, 46, 'Cream'], [C.navy, 22, 'Navy'], [C.cream1, 12, 'Cream 100'], [C.blue, 7, 'Blue'], [C.teal, 6, 'Teal'], [C.gold, 4, 'Gold'], [C.lotus, 2, 'Lotus'], [C.green, 1, 'Green']];
const propHTML = proportions.map(([h, p, n]) => `<span style="flex:${p};background:${h};color:${dark(h) ? C.cream : C.navy}" title="${n} ${p}%"><em>${p >= 6 ? `${n} ${p}%` : ''}</em></span>`).join('');
const propLegend = proportions.filter(([, p]) => p < 6).map(([h, p, n]) => `<li><i style="background:${h}"></i>${n} ${p}%</li>`).join('');

// feather-eye motif svg (outline rings, as used on the site)
const eyeOutline = (stroke = 1) => `<svg viewBox="0 0 150 184" class="m-eye" aria-hidden="true"><g fill="none" stroke-width="${stroke}"><ellipse cx="75" cy="92" rx="74" ry="91" stroke="${C.gold}"/><ellipse cx="75" cy="98" rx="56" ry="71" stroke="${C.teal}"/><ellipse cx="75" cy="106" rx="34" ry="45" stroke="${C.navy}"/></g></svg>`;
const eyeFilled = `<svg viewBox="0 0 100 120" class="m-eye" aria-hidden="true"><ellipse cx="50" cy="58" rx="40" ry="50" fill="${C.gold}"/><ellipse cx="50" cy="62" rx="31" ry="40" fill="${C.teal}"/><ellipse cx="50" cy="67" rx="18" ry="25" fill="${C.navy}"/></svg>`;
let barbs = '';
for (let i = 0; i < 9; i++) { const y = 4 + i * 16; barbs += `<path d="M150 ${y + 34}Q104 ${y + 32} 30 ${y}"/><path d="M150 ${y + 34}Q196 ${y + 32} 270 ${y}"/>`; }
const barbSvg = `<svg viewBox="0 0 300 160" class="m-barb" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="${C.blue}" stroke-opacity=".28" stroke-width="1" stroke-linecap="round">${barbs}<path d="M150 0V170" stroke="${C.gold}" stroke-opacity=".8"/></g></svg>`;
const archSvg = `<svg viewBox="0 0 200 160" class="m-arch" aria-hidden="true"><path d="M30 160V90a70 70 0 0 1 140 0v70Z" fill="${C.cream1}"/><path d="M44 160V92a56 56 0 0 1 112 0v68" fill="none" stroke="${C.gold}" stroke-width="1.2"/><path d="M58 160V95a42 42 0 0 1 84 0v65" fill="none" stroke="${C.teal}" stroke-opacity=".5" stroke-width="1"/></svg>`;
const lotusSvg = `<svg viewBox="0 0 200 140" class="m-lotus" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-width="1.4"><path d="M100 118C84 96 84 62 100 34C116 62 116 96 100 118Z" stroke="${C.gold}"/><path d="M100 118C78 108 62 84 60 56C82 66 98 90 100 118Z" stroke="${C.teal}"/><path d="M100 118C122 108 138 84 140 56C118 66 102 90 100 118Z" stroke="${C.teal}"/><path d="M100 118C72 118 44 104 30 84C58 82 86 96 100 118Z" stroke="${C.lotus}" stroke-width="1.6"/><path d="M100 118C128 118 156 104 170 84C142 82 114 96 100 118Z" stroke="${C.lotus}" stroke-width="1.6"/><path d="M50 126H150" stroke="${C.gold}" stroke-width="1"/></g></svg>`;

// icons (stroke, lucide-like)
const ico = (d) => `<svg viewBox="0 0 24 24" class="ico" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  arrow: ico('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  phone: ico('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>'),
  check: ico('<path d="M20 6 9 17l-5-5"/>'),
  x: ico('<path d="M18 6 6 18M6 6l12 12"/>'),
  heart: ico('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>'),
  clock: ico('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  ext: ico('<path d="M7 17 17 7M8 7h9v9"/>'),
};

const voice = [
  ['Warm', 'We speak like the senior sister who has been through it: kind, close, never syrupy.',
    'You\'re not alone in this. Our team is here day and night, for you and your baby.',
    'Dear valued patient, we cordially welcome you to our world-class facility.',
    'Pehli baar maa ban rahi hain? Hum har kadam par aapke saath hain.',
    'Best-in-class maternity solutions at unbeatable prices!!!'],
  ['Plain', 'Short sentences, everyday words. Explain medical terms the first time they appear.',
    'An NT scan is a simple ultrasound at 11–14 weeks. It checks your baby\'s early growth.',
    'Avail our comprehensive nuchal translucency screening modalities.',
    'Check-up ka time? Bas call ya WhatsApp kijiye, hum slot bata denge.',
    'Kindly do the needful for appointment booking at the earliest.'],
  ['Reassuring', 'Name what to expect and what it costs. Calm is a service.',
    'You\'ll know what your bill covers before you\'re admitted. No surprises at discharge.',
    'Don\'t risk your baby\'s life. Book now before it\'s too late!',
    'Discharge ke time koi surprise bill nahi. Pehle se sab clear.',
    'Ek galti aur sab khatam. Abhi book karein!'],
  ['Competent', 'Quiet confidence from facts: 24×7 care, NICU, experienced doctors. No superlatives.',
    'NICU and operation theatres on site, with a doctor on call 24×7.',
    'Delhi\'s #1 most trusted, best, top-rated hospital ever.',
    'Raat ke 2 baje bhi emergency? Doctor on call, 24×7.',
    'Miracle results guaranteed by our expert gurus.'],
];
const voiceHTML = voice.map(([t, d, doEn, dontEn, doHi, dontHi], i) => `<article class="trait">
  <header><span class="tn">0${i + 1}</span><h3>${t}</h3><p>${d}</p></header>
  <div class="dd">
    <div class="do"><span class="tag">${I.check}Do</span><p>${doEn}</p><p class="hing">${doHi}</p></div>
    <div class="dont"><span class="tag">${I.x}Don't</span><p>${dontEn}</p><p class="hing">${dontHi}</p></div>
  </div></article>`).join('');

const typeScale = [
  ['Display', 'Fraunces 400, SOFT 100', 'clamp(44px, 6vw, 72px) / 1.02', 'serif', 'Care, like a mother\'s.', 'font-size:clamp(40px,6vw,72px);line-height:1.02;font-weight:400;font-variation-settings:\'SOFT\' 100,\'opsz\' 144;letter-spacing:-.02em'],
  ['H1', 'Fraunces 420', '44 / 1.1', 'serif', 'Maternity care in Dwarka', 'font-size:clamp(32px,4vw,44px);line-height:1.1;font-weight:420;font-variation-settings:\'SOFT\' 80,\'opsz\' 72;letter-spacing:-.01em'],
  ['H2', 'Fraunces 450', '30 / 1.15', 'serif', 'Your first check-up, explained', 'font-size:clamp(24px,3vw,30px);line-height:1.15;font-weight:450;font-variation-settings:\'SOFT\' 60'],
  ['H3', 'Fraunces 500', '21 / 1.25', 'serif', 'Normal and C-section deliveries', 'font-size:21px;line-height:1.25;font-weight:500'],
  ['Body L', 'Manrope 400', '18 / 1.6', 'sans', 'Our NICU and operation theatres are on site, so you and your baby stay in one place.', 'font-size:18px;line-height:1.6'],
  ['Body', 'Manrope 400', '16 / 1.6', 'sans', 'Book a check-up by phone or WhatsApp. We\'ll call you back to confirm your slot.', 'font-size:16px;line-height:1.6'],
  ['Label', 'Manrope 700, +0.16em, caps', '12 / 1.4', 'sans', 'Maternity · NICU · 24×7', 'font-size:12px;line-height:1.4;font-weight:700;letter-spacing:.16em;text-transform:uppercase'],
  ['Hindi', 'Tiro Devanagari Hindi', '22 / 1.5', 'deva', 'माँ जैसी देखभाल, हर दिन, हर पल।', 'font-size:22px;line-height:1.5'],
];
const typeHTML = typeScale.map(([n, f, s, fam, ex, st]) => `<li class="ts"><div class="ts-meta"><b>${n}</b><span>${f}</span><code>${s}</code></div><p style="font-family:var(--${fam});${st}">${ex}</p></li>`).join('');

const photoPh = (label, tone, note) => `<figure class="ph ph-${tone}"><div class="ph-art">${eyeOutline()}<span>Photo: ${label}</span></div><figcaption>${note}</figcaption></figure>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gokul Hospital Brand</title>
<meta name="description" content="Brand guidelines for Gokul Hospital, Dwarka Mor: story, voice, logo, colour, type, motifs, photography and UI.">
<link rel="icon" href="../logo/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..800,0..100;1,9..144,300..800,0..100&family=Manrope:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
<style>
:root{
  --peacock-900:${C.navy};--peacock-700:${C.blue};--teal-500:${C.teal};--teal-600:${C.teal6};--feather-green:${C.green};
  --gold-500:${C.gold};--gold-300:${C.gold3};--gold-700:${C.gold7};--lotus-300:${C.lotus};--lotus-100:${C.lotus1};
  --cream-50:${C.cream};--cream-100:${C.cream1};--ink-700:${C.ink};--ink-500:${C.ink5};
  --line:rgba(11,42,60,.12);
  --serif:'Fraunces','Cormorant Garamond',Georgia,serif;--sans:'Manrope','Helvetica Neue',Arial,sans-serif;--deva:'Tiro Devanagari Hindi','Noto Serif Devanagari',serif;
  --r:18px;--ease:cubic-bezier(.2,.7,.2,1);
}
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:76px}
body{background:var(--cream-50);color:var(--ink-700);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:var(--peacock-700)}
.gk{font-family:var(--serif);font-weight:560;font-variation-settings:'SOFT' 50,'opsz' 144}
.hs{font-family:var(--sans);font-weight:600}
.hi{font-family:var(--deva)}
.ico{width:18px;height:18px;flex:none}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
:focus-visible{outline:2px solid var(--teal-500);outline-offset:3px}

/* header */
header.top{position:sticky;top:0;z-index:10;background:rgba(251,247,239,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
header.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
.brandline{display:flex;align-items:center;gap:10px;font-weight:600;color:var(--peacock-900);font-size:14px;text-decoration:none;white-space:nowrap}
.brandline svg{width:26px;height:26px}
.toc{display:flex;gap:4px;list-style:none;overflow-x:auto;scrollbar-width:none;min-width:0}
.toc::-webkit-scrollbar{display:none}
.toc a{display:block;padding:6px 10px;border-radius:999px;font-size:13px;font-weight:600;color:var(--peacock-700);text-decoration:none;white-space:nowrap}
.toc a:hover{background:var(--cream-100)}

/* hero */
.hero{position:relative;padding:clamp(56px,9vw,120px) 0 clamp(48px,7vw,96px);overflow:hidden}
.hero .wrap{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(32px,6vw,80px);align-items:center}
.kicker{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--teal-600);font-weight:700;display:flex;gap:10px;align-items:center;margin-bottom:18px}
.kicker::before{content:"";width:22px;height:1px;background:var(--gold-500)}
.hero h1{font-family:var(--serif);font-weight:400;font-variation-settings:'SOFT' 100,'opsz' 144;font-size:clamp(40px,6.4vw,80px);line-height:1;letter-spacing:-.02em;color:var(--peacock-900)}
.hero h1 em{font-style:italic;color:var(--teal-600)}
.hero .hindi{font-family:var(--deva);font-size:clamp(22px,2.6vw,30px);color:var(--peacock-700);margin-top:14px}
.hero .lede{max-width:52ch;margin-top:24px;font-size:17px}
.hero-art{position:relative;aspect-ratio:4/5;border-radius:200px 200px var(--r) var(--r);background:var(--peacock-900);overflow:hidden;display:grid;place-items:center}
.hero-art .m-eye{position:absolute;width:150%;height:auto;opacity:.5}
.hero-art .m-eye.e2{width:110%}
.hero-art .m-eye.e3{width:70%}
.hero-art .mark{position:relative;width:48%;height:auto}
.hero-art figcaption{position:absolute;bottom:18px;left:0;right:0;text-align:center;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-300);font-weight:700}

/* sections */
section{padding:clamp(56px,8vw,104px) 0;border-top:1px solid var(--line)}
section.alt{background:var(--cream-100)}
section.dark{background:var(--peacock-900);color:#d9e2e4;border-top:0}
.sec-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:20px 56px;align-items:end;margin-bottom:clamp(28px,4vw,52px)}
.eyebrow{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--teal-600);font-weight:700;margin-bottom:10px;display:flex;gap:10px;align-items:center}
.eyebrow::before{content:"";width:22px;height:1px;background:var(--gold-500)}
.dark .eyebrow{color:var(--gold-300)}
h2{font-family:var(--serif);font-weight:420;font-variation-settings:'SOFT' 80,'opsz' 72;font-size:clamp(30px,3.6vw,44px);line-height:1.08;color:var(--peacock-900);letter-spacing:-.01em}
.dark h2{color:var(--cream-50)}
.sec-head p{max-width:58ch}
h3{font-family:var(--serif);font-weight:500;font-size:21px;line-height:1.25;color:var(--peacock-900)}
.dark h3{color:var(--cream-50)}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:clamp(20px,3vw,30px)}
.note{font-size:14px;color:var(--ink-500)}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.list-check{list-style:none;display:grid;gap:10px}
.list-check li{display:grid;grid-template-columns:20px 1fr;gap:10px;font-size:15px}
.list-check .ico{color:var(--teal-600);margin-top:3px}
.list-x .ico{color:#A3473F}

/* 1 story */
.story{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(24px,5vw,64px);align-items:start}
.story .prose p{font-size:17px;margin-bottom:16px;max-width:60ch}
.story .prose p:first-child::first-letter{font-family:var(--serif);float:left;font-size:64px;line-height:.9;padding:6px 10px 0 0;color:var(--teal-600)}
.pull{border-left:2px solid var(--gold-500);padding:6px 0 6px 20px;margin:24px 0}
.pull q{font-family:var(--serif);font-size:clamp(24px,2.6vw,32px);line-height:1.2;color:var(--peacock-900);font-variation-settings:'SOFT' 100;quotes:none}
.pull .hi{display:block;font-size:22px;color:var(--peacock-700);margin-top:6px}
.facts{display:grid;gap:16px}
.fact h4{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--teal-600);font-weight:700;margin-bottom:6px}
.fact p{font-size:15px}
.aud{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin-top:8px}
.aud li{padding:6px 12px;border-radius:999px;background:var(--cream-100);font-size:13.5px;font-weight:600;color:var(--peacock-900)}

/* 2 voice */
.traits{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.trait{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column}
.trait header{padding:24px 24px 18px}
.trait .tn{font-family:var(--serif);font-style:italic;color:var(--gold-700);font-size:15px}
.trait header p{font-size:15px;margin-top:6px}
.dd{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);flex:1}
.dd>div{padding:18px 20px 22px}
.dd .do{background:#F2F8F6}
.dd .dont{background:#FBF1EF;border-left:1px solid var(--line)}
.tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
.do .tag{color:var(--teal-600)}.dont .tag{color:#A3473F}
.tag .ico{width:14px;height:14px;stroke-width:2.4}
.dd p{font-size:14.5px;line-height:1.5}
.dd .dont p{color:var(--ink-500)}
.dd .hing{margin-top:10px;padding-top:10px;border-top:1px dashed rgba(11,42,60,.15);font-style:italic}
.tone{margin-top:20px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.tone div{border-top:2px solid var(--gold-500);padding-top:14px}
.tone h4{font-family:var(--serif);font-weight:500;font-size:18px;color:var(--peacock-900)}
.tone p{font-size:14.5px;margin-top:4px}

/* 3 logo */
.logo-row{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:20px}
.logo-tile{border-radius:var(--r);padding:clamp(28px,5vw,56px);display:grid;place-items:center;min-height:240px;border:1px solid var(--line)}
.logo-tile svg{width:100%;max-width:420px;height:auto}
.logo-tile.navy{background:var(--peacock-900);border-color:transparent}
.logo-tile.light{background:#fff}
.logo-meta{display:flex;flex-wrap:wrap;gap:12px 28px;align-items:center;justify-content:space-between;margin-top:20px}
.logo-meta ul{display:flex;flex-wrap:wrap;gap:8px 20px;list-style:none;font-size:14px}
.logo-meta li b{color:var(--peacock-900)}

/* 4 colour */
.swatches{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;list-style:none}
.sw{border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#fff;display:flex;flex-direction:column}
.sw .chip{height:96px;padding:12px;display:flex;align-items:flex-end}
.sw .chip code{font-family:var(--sans);font-size:12.5px;font-weight:700;letter-spacing:.04em}
.sw .info{padding:12px 14px 14px;display:grid;gap:2px}
.sw .info b{color:var(--peacock-900);font-size:14px}
.sw .tok{font-family:ui-monospace,Consolas,monospace;font-size:12px;color:var(--peacock-700)}
.sw .info span{font-size:13px;line-height:1.45;color:var(--ink-500);margin-top:4px}
.prop{margin-top:clamp(32px,4vw,48px)}
.prop h3{margin-bottom:6px}
.bar{display:flex;height:64px;border-radius:14px;overflow:hidden;border:1px solid var(--line);margin-top:16px}
.bar span{display:flex;align-items:flex-end;padding:8px 10px;min-width:0}
.bar em{font-style:normal;font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.legend{display:flex;flex-wrap:wrap;gap:6px 16px;list-style:none;margin-top:10px;font-size:13px}
.legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.pairings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:clamp(32px,4vw,48px)}
.theme{border-radius:var(--r);padding:clamp(22px,3vw,32px);display:grid;gap:12px}
.theme.l{background:#fff;border:1px solid var(--line)}
.theme.d{background:var(--peacock-900);color:#d9e2e4}
.theme .t-k{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700}
.theme.l .t-k{color:var(--teal-600)}.theme.d .t-k{color:var(--gold-300)}
.theme .t-h{font-family:var(--serif);font-size:28px;line-height:1.15;font-variation-settings:'SOFT' 80}
.theme.l .t-h{color:var(--peacock-900)}.theme.d .t-h{color:var(--cream-50)}
.theme .t-rule{height:1px;width:56px;background:var(--gold-500)}
.theme p{font-size:15px}
.contrast{list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:clamp(32px,4vw,48px)}
.pair{display:grid;grid-template-columns:76px minmax(0,1fr) auto;gap:14px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 14px 10px 10px}
.pair-chip{height:56px;border-radius:10px;display:grid;place-items:center;box-shadow:inset 0 0 0 1px var(--line)}
.pair-chip span{font-family:var(--serif);font-size:24px;line-height:1}
.pair-chip small{display:none}
.pair-info b{display:block;color:var(--peacock-900);font-size:14px}
.pair-info span{font-size:13px;color:var(--ink-500)}
.ratio{text-align:right}
.ratio b{display:block;font-size:15px;color:var(--peacock-900)}
.ratio span{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px;border-radius:999px;margin-top:2px}
.ratio.ok span{background:#E1F0EC;color:#0F5E50}
.ratio.mid span{background:#FBF0D9;color:var(--gold-700)}
.ratio.bad span{background:#F8E1DE;color:#8E3A33}

/* 5 type */
.families{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.fam{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:26px;display:flex;flex-direction:column;gap:10px}
.fam .role{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--teal-600)}
.fam .aa{font-size:88px;line-height:1;color:var(--peacock-900)}
.fam .name{font-weight:700;color:var(--peacock-900)}
.fam .glyphs{font-size:15px;color:var(--ink-500);word-break:break-word;border-top:1px solid var(--line);padding-top:12px}
.scale{list-style:none;margin-top:clamp(32px,4vw,48px);border-top:1px solid var(--line)}
.ts{display:grid;grid-template-columns:200px minmax(0,1fr);gap:24px;padding:22px 0;border-bottom:1px solid var(--line);align-items:baseline}
.ts-meta{display:grid;gap:2px;font-size:13px}
.ts-meta b{font-size:14px;color:var(--peacock-900)}
.ts-meta code{font-family:ui-monospace,Consolas,monospace;font-size:12px;color:var(--peacock-700)}
.ts p{color:var(--peacock-900);min-width:0;overflow-wrap:anywhere}
.bilingual{margin-top:clamp(32px,4vw,48px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.bilingual .card h4{font-family:var(--serif);font-weight:450;font-size:28px;line-height:1.15;color:var(--peacock-900)}
.bilingual .card h4.hi{font-family:var(--deva);font-weight:400}
.bilingual .card p{margin-top:10px}
.bilingual .card p.hi{font-size:18px;line-height:1.7}

/* 6 motifs */
.motifs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.motif{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column}
.motif .stage{aspect-ratio:1/1;background:var(--cream-50);display:grid;place-items:center;position:relative;overflow:hidden;border-bottom:1px solid var(--line)}
.motif .stage .m-eye{width:44%;height:auto}
.motif .stage .m-barb{position:absolute;inset:0;width:100%;height:100%}
.motif .stage .m-arch{width:70%;height:auto;margin-top:auto}
.motif .stage .m-lotus{width:88%;height:auto}
.motif .body{padding:18px 20px 22px;display:grid;gap:6px}
.motif .body p{font-size:14.5px}
.donts{margin-top:clamp(28px,4vw,44px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.dont-card{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.dont-card .stage{height:150px;display:grid;place-items:center;background:var(--cream-50);position:relative;border-bottom:1px solid var(--line)}
.dont-card .stage::after{content:"";position:absolute;inset:0;background:linear-gradient(to top right,transparent calc(50% - 1px),rgba(163,71,63,.6) 50%,transparent calc(50% + 1px))}
.dont-card .body{padding:14px 18px 18px;font-size:14.5px}
.dont-card .body b{display:flex;align-items:center;gap:6px;color:#8E3A33;font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px}
.dont-card .body b .ico{width:15px;height:15px;stroke-width:2.4}

/* 7 photography */
.photos{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}
.ph{grid-column:span 2;display:flex;flex-direction:column;gap:10px}
.ph.big{grid-column:span 3}
.ph-art{position:relative;aspect-ratio:4/3;border-radius:var(--r);overflow:hidden;display:grid;place-items:center;text-align:center;padding:16px}
.ph-art .m-eye{position:absolute;width:70%;height:auto;opacity:.35}
.ph-art span{position:relative;font-size:13px;font-weight:700;letter-spacing:.06em;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.72);color:var(--peacock-900)}
.ph-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ph-warm .ph-art{background:linear-gradient(140deg,#F6E3C8,#EBC9A6 55%,#D9A982)}
.ph-lotus .ph-art{background:linear-gradient(140deg,#FBE6E3,#F2C9BF 60%,#E2AFA4)}
.ph-teal .ph-art{background:linear-gradient(140deg,#DCEDEA,#B7D8D2 60%,#8FC0B8)}
.ph-cream .ph-art{background:linear-gradient(140deg,#F8F1E4,#EADDC6)}
.ph-navy .ph-art{background:linear-gradient(140deg,#1B4157,#0B2A3C)}
.ph-navy .ph-art span{background:rgba(11,42,60,.6);color:var(--gold-300)}
.ph figcaption{font-size:14px}
.photo-rules{margin-top:clamp(28px,4vw,44px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.photo-rules h3{margin-bottom:14px}

/* 8 UI */
.ui{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.panel{border-radius:var(--r);padding:clamp(22px,3vw,34px);display:grid;gap:26px;align-content:start}
.panel.l{background:#fff;border:1px solid var(--line)}
.panel.d{background:var(--peacock-900);color:#d9e2e4}
.panel-k{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--teal-600)}
.panel.d .panel-k{color:var(--gold-300)}
.ui-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.ui-label{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-500);margin-bottom:10px}
.panel.d .ui-label{color:#9db3ba}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px;border-radius:999px;font:700 15px/1 var(--sans);text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .35s var(--ease),background-color .25s,border-color .25s;white-space:nowrap}
.btn:hover{transform:translateY(-2px)}
.btn-primary{background:var(--peacock-900);color:var(--cream-50);box-shadow:0 10px 24px -14px rgba(11,42,60,.7)}
.btn-primary:hover{background:var(--peacock-700)}
.btn-gold{background:var(--gold-300);color:var(--peacock-900)}
.btn-gold:hover{background:#efdca6}
.btn-ghost{background:transparent;color:var(--peacock-900);border-color:rgba(11,42,60,.28)}
.btn-ghost:hover{border-color:var(--peacock-900);background:#fff}
.panel.d .btn-ghost{color:var(--cream-50);border-color:rgba(230,207,143,.45)}
.panel.d .btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--gold-300)}
.chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none}
.chips li{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--cream-50);border:1px solid var(--line);font-size:14px;font-weight:600;color:var(--peacock-900)}
.chips .star{color:var(--gold-700)}
.chips .dot{width:7px;height:7px;border-radius:50%;background:var(--teal-500);box-shadow:0 0 0 4px rgba(26,140,140,.16)}
.panel.d .chips li{background:rgba(255,255,255,.06);border-color:rgba(230,207,143,.25);color:var(--cream-50)}
.panel.d .chips .star{color:var(--gold-300)}
.svc{position:relative;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:26px 24px;display:grid;gap:10px;overflow:hidden}
.svc .eye-c{position:absolute;right:20px;top:20px;width:44px;height:auto;opacity:.55}
.svc .ic{width:48px;height:48px;border-radius:16px;display:grid;place-items:center;background:var(--cream-100);color:var(--peacock-700)}
.svc .ic .ico{width:24px;height:24px;stroke-width:1.5}
.svc p{font-size:14.5px}
.svc a{font-size:14px;font-weight:700;display:inline-flex;gap:6px;align-items:center;text-decoration:none}
.panel.d .svc{background:rgba(255,255,255,.04);border-color:rgba(230,207,143,.2)}
.panel.d .svc h3{color:var(--cream-50)}
.panel.d .svc .ic{background:rgba(230,207,143,.12);color:var(--gold-300)}
.panel.d .svc a{color:var(--gold-300)}
form.demo{display:grid;gap:14px}
.field{display:grid;gap:7px}
.field label{font-size:13.5px;font-weight:700;color:var(--peacock-900)}
.field input{width:100%;height:52px;border-radius:14px;border:1px solid rgba(11,42,60,.25);background:#fff;color:var(--peacock-900);padding:0 16px;font:16px var(--sans)}
.field input::placeholder{color:#7D8A91}
.field input:focus{outline:none;border-color:var(--teal-500);box-shadow:0 0 0 3px rgba(26,140,140,.2)}
.panel.d .field label{color:var(--cream-50)}
.panel.d .field input{border-color:rgba(230,207,143,.4);background:rgba(255,255,255,.06);color:var(--cream-50)}
.panel.d .field input::placeholder{color:#9db3ba}
.panel.d .field input:focus{border-color:var(--gold-300);box-shadow:0 0 0 3px rgba(230,207,143,.25)}
.consent{display:grid;grid-template-columns:22px 1fr;gap:12px;align-items:start;font-size:13.5px;line-height:1.5;cursor:pointer}
.consent input{appearance:none;-webkit-appearance:none;width:22px;height:22px;border-radius:7px;border:1.5px solid rgba(11,42,60,.4);background:#fff;display:grid;place-items:center;margin-top:1px;cursor:pointer}
.consent input::after{content:"";width:11px;height:6px;border:2px solid var(--cream-50);border-top:0;border-right:0;transform:rotate(-45deg) translate(1px,-1px);opacity:0}
.consent input:checked{background:var(--peacock-900);border-color:var(--peacock-900)}
.consent input:checked::after{opacity:1}
.consent input:focus-visible{outline:2px solid var(--teal-500);outline-offset:2px}
.panel.d .consent input{background:transparent;border-color:rgba(230,207,143,.55)}
.panel.d .consent input:checked{background:var(--gold-300);border-color:var(--gold-300)}
.panel.d .consent input::after{border-color:var(--peacock-900)}
.panel.d .consent a{color:var(--gold-300)}
form.demo .btn{width:100%}
.panel.d .field-help{color:#9db3ba}
.field-help{font-size:12.5px;color:var(--ink-500)}

/* 9 social */
.social{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(24px,5vw,64px);align-items:center}
.posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.post{aspect-ratio:4/5;border-radius:14px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;position:relative}
.post .m-eye{position:absolute;width:120%;right:-40%;top:-10%;height:auto;opacity:.4}
.post b{position:relative;font-family:var(--serif);font-weight:450;font-size:clamp(14px,1.6vw,19px);line-height:1.15}
.post small{position:relative;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.post.p1{background:#fff;color:var(--peacock-900);box-shadow:inset 0 0 0 1px var(--line)}
.post.p2{background:var(--peacock-900);color:var(--cream-50)}.post.p2 small{color:var(--gold-300)}
.post.p3{background:var(--teal-600);color:var(--cream-50)}
.social ul{margin-top:18px}
.cta-link{display:inline-flex;align-items:center;gap:8px;margin-top:24px}

footer{border-top:1px solid var(--line);padding:32px 0 48px;font-size:13px;color:var(--peacock-700)}
footer .wrap{display:flex;justify-content:space-between;gap:12px 24px;flex-wrap:wrap}
footer a{font-weight:600}

@media (max-width:1060px){
  .swatches{grid-template-columns:repeat(3,minmax(0,1fr))}
  .motifs{grid-template-columns:repeat(2,minmax(0,1fr))}
  .tone{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:900px){
  .hero .wrap,.story,.sec-head,.traits,.logo-row,.pairings,.contrast,.families,.bilingual,.photo-rules,.ui,.social,.donts{grid-template-columns:1fr}
  .hero-art{max-width:360px;width:100%;justify-self:center}
  .ts{grid-template-columns:1fr;gap:8px}
  .photos{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ph,.ph.big{grid-column:span 1}
  .toc{display:none}
}
@media (max-width:560px){
  .swatches{grid-template-columns:repeat(2,minmax(0,1fr))}
  .motifs,.tone{grid-template-columns:1fr}
  .motif .stage{aspect-ratio:16/10}
  .dd{grid-template-columns:1fr}
  .dd .dont{border-left:0;border-top:1px solid var(--line)}
  .photos{grid-template-columns:1fr}
  .bar em{display:none}
  .pair{grid-template-columns:56px minmax(0,1fr) auto;gap:10px}
  .pair-chip{height:48px}
  .ui-row .btn{flex:1 1 100%}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style>
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brandline" href="#top">${inl('favicon.svg', 'fav')}Gokul Hospital · Brand</a>
  <nav aria-label="Sections"><ul class="toc">
    <li><a href="#story">Story</a></li><li><a href="#voice">Voice</a></li><li><a href="#logo">Logo</a></li><li><a href="#colour">Colour</a></li><li><a href="#type">Type</a></li><li><a href="#motifs">Motifs</a></li><li><a href="#photo">Photography</a></li><li><a href="#ui">UI</a></li><li><a href="#social">Social</a></li>
  </ul></nav>
</div></header>

<main id="top">
<div class="hero"><div class="wrap">
  <div>
    <div class="kicker">Brand guidelines · v1</div>
    <h1>Care, like <em>a mother's</em>.</h1>
    <p class="hindi">माँ जैसी देखभाल</p>
    <p class="lede">How Gokul Hospital looks, sounds and behaves, so every sign, post, page and phone call feels like the same calm, capable place. Use it as a working reference, not a rulebook to admire.</p>
  </div>
  <figure class="hero-art">
    ${eyeOutline(.6).replace('class="m-eye"', 'class="m-eye"')}${eyeOutline(.6).replace('class="m-eye"', 'class="m-eye e2"')}${eyeOutline(.8).replace('class="m-eye"', 'class="m-eye e3"')}
    ${darkMark}
    <figcaption>Gokul · Dwarka Mor · Est. 2018</figcaption>
  </figure>
</div></div>

<section id="story"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">01 · Brand story</div><h2>Where a mother's care began</h2></div>
    <p>The name already carries the promise. The brand's job is to keep it, quietly and consistently.</p>
  </div>
  <div class="story">
    <div class="prose">
      <p>Gokul is the village where Krishna was raised by Yashoda. She was not his birth mother, yet the stories remember her care above all else: patient, watchful, and full of joy. For a hospital devoted to mothers and babies, there is no better name.</p>
      <p>Since 2018, Gokul Hospital in Dwarka Mor has looked after women through pregnancy, delivery and beyond, with a NICU, operation theatres and emergency care around the clock. Families come back because of how they were treated: caring staff, a clean ward, and a bill with no surprises at discharge.</p>
      <div class="pull"><q>Care, like a mother's.</q><span class="hi">माँ जैसी देखभाल</span></div>
      <p>Krishna appears only symbolically, through the peacock feather and, rarely, the flute. We never show the deity. The symbol stands for nurture; the hospital stands on clinical competence.</p>
    </div>
    <div class="facts">
      <div class="card fact"><h4>Mission</h4><p>Give every woman in our neighbourhood safe, skilled and affordable care, delivered with the warmth and attention of family.</p></div>
      <div class="card fact"><h4>Audience</h4><p>The people we design and write for:</p>
        <ul class="aud"><li>Expecting mothers</li><li>Women at every life stage</li><li>Couples trying to conceive</li><li>Families in Dwarka</li><li>West Delhi</li></ul></div>
      <div class="card fact"><h4>Proof we lean on</h4><p>4.8★ from 500+ ratings on Justdial · 24×7 emergency · NICU · beside Dwarka Mor metro, Pillar 781.</p></div>
    </div>
  </div>
</div></section>

<section id="voice" class="alt"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">02 · Personality &amp; voice</div><h2>How Gokul speaks</h2></div>
    <p>Four traits, each with real lines in English and in the Hinglish families actually use on WhatsApp. When in doubt, read it aloud as if to a nervous first-time mother.</p>
  </div>
  <div class="traits">${voiceHTML}</div>
  <div class="tone">
    <div><h4>Warm, not sugary</h4><p>Use "you" and "your baby". Skip honorifics and corporate politeness.</p></div>
    <div><h4>Plain, not clinical</h4><p>One idea per sentence. Explain medical terms once, kindly.</p></div>
    <div><h4>Reassuring, never fear-based</h4><p>No scare tactics, countdowns or worst cases to drive bookings.</p></div>
    <div><h4>Honest about money</h4><p>Say what's included. Never promise outcomes or "guarantees".</p></div>
  </div>
</div></section>

<section id="logo"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">03 · Logo</div><h2>The feather and the name</h2></div>
    <p>A single peacock feather leaning toward the wordmark: a calm navy, teal and gold eye above fine barbs. Use the files as supplied. Never redraw, recolour or stretch them.</p>
  </div>
  <div class="logo-row">
    <div class="logo-tile light">${inl('gokul-logo-primary.svg', 'lk')}</div>
    <div class="logo-tile navy">${inl('gokul-logo-reversed.svg', 'lk')}</div>
  </div>
  <div class="logo-meta">
    <ul><li><b>Primary</b> on cream and white</li><li><b>Reversed</b> on navy</li><li><b>One colour</b> on teal or photos</li><li><b>Clear space</b> = width of the eye</li><li><b>Minimum</b> 120px wide</li></ul>
    <a class="btn btn-ghost" href="../logo/">Full logo board ${I.ext}</a>
  </div>
</div></section>

<section id="colour"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">04 · Colour</div><h2>Peacock, gold and cream</h2></div>
    <p>A calm, mostly cream page with navy for trust. Teal carries the brand's colour and gold appears as thin lines only. Lotus pink is a small, warm accent for maternity moments.</p>
  </div>
  <ul class="swatches">${swatchHTML}</ul>

  <div class="prop">
    <h3>Usage proportions</h3>
    <p class="note">A typical light page or print piece. Dark pages swap cream and navy.</p>
    <div class="bar" role="img" aria-label="Colour proportions: cream 46%, navy 22%, cream 100 12%, blue 7%, teal 6%, gold 4%, lotus 2%, green 1%">${propHTML}</div>
    <ul class="legend">${propLegend}</ul>
  </div>

  <div class="pairings">
    <div class="theme l"><span class="t-k">Light pairing</span><span class="t-h">Your first scan, explained</span><span class="t-rule"></span><p>Navy headings, ink body on cream or white, teal for icons and large accents, gold for hairlines. The default for print and the main site.</p><div class="ui-row"><span class="btn btn-primary">Book a check-up ${I.arrow}</span></div></div>
    <div class="theme d"><span class="t-k">Dark pairing</span><span class="t-h">Here at 2 a.m. too</span><span class="t-rule"></span><p>Cream body and gold 300 headings or buttons on navy. Teal and gold 500 stay decorative. Use for emergency, night and premium moments.</p><div class="ui-row"><span class="btn btn-gold">${I.phone} Call 24×7</span></div></div>
  </div>

  <h3 style="margin-top:clamp(32px,4vw,48px)">Contrast (WCAG 2.1)</h3>
  <p class="note">Body text needs AA (4.5:1). "AA large" is fine for text 24px+ or 19px bold, and for icons. Teal 500 and gold 500 never carry small text: use teal 600 or gold 700 instead.</p>
  <ul class="contrast">${pairHTML}</ul>
</div></section>

<section id="type" class="alt"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">05 · Typography</div><h2>Soft serif, clear sans, warm Hindi</h2></div>
    <p>Fraunces brings warmth through its SOFT axis. Manrope keeps forms, prices and directions crisp. Tiro Devanagari Hindi gives Hindi the same bookish calm, so bilingual pages feel like one voice.</p>
  </div>
  <div class="families">
    <div class="fam"><span class="role">Display &amp; headings</span><span class="aa" style="font-family:var(--serif);font-variation-settings:'SOFT' 100,'opsz' 144">Gg</span><span class="name">Fraunces</span><span class="note">300–600 · SOFT 50–100 · italic for one word of emphasis</span><span class="glyphs" style="font-family:var(--serif)">ABCDEFGHIJKLM abcdefghijklm 0123456789 ₹ ★</span></div>
    <div class="fam"><span class="role">Body &amp; UI</span><span class="aa" style="font-family:var(--sans);font-weight:600">Gg</span><span class="name">Manrope</span><span class="note">400 body · 600 labels · 700 buttons</span><span class="glyphs">ABCDEFGHIJKLM abcdefghijklm 0123456789 ₹ ★</span></div>
    <div class="fam"><span class="role">Devanagari</span><span class="aa" style="font-family:var(--deva)">गो</span><span class="name">Tiro Devanagari Hindi</span><span class="note">Regular · set 10–15% larger than the English beside it</span><span class="glyphs" style="font-family:var(--deva)">क ख ग घ च ज ट ड त द न प ब म य र ल व स ह ० १ २ ३</span></div>
  </div>
  <ul class="scale">${typeHTML}</ul>
  <div class="bilingual">
    <div class="card"><h4>Care, like a mother's.</h4><p>From your first check-up to the day you take your baby home, our team is with you, day and night.</p></div>
    <div class="card"><h4 class="hi">माँ जैसी देखभाल।</h4><p class="hi">पहली जाँच से लेकर बच्चे को घर ले जाने तक, हमारी टीम दिन-रात आपके साथ।</p></div>
  </div>
</div></section>

<section id="motifs"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">06 · Motifs</div><h2>Fine lines, soft shapes</h2></div>
    <p>Our graphic language is drawn from the feather and the lotus, always in thin lines and generous space. Motifs support content and never compete with it.</p>
  </div>
  <div class="motifs">
    <article class="motif"><div class="stage">${eyeOutline(1.4)}</div><div class="body"><h3>Feather eye</h3><p>Three concentric ovals: gold, teal, navy. Use as an outline at 30–60% opacity behind cards, or filled only in the logo.</p></div></article>
    <article class="motif"><div class="stage">${barbSvg}</div><div class="body"><h3>Barb lines</h3><p>Hairline curves from a central spine. Use as a quiet texture at 6–12% opacity on cream or navy bands.</p></div></article>
    <article class="motif"><div class="stage">${archSvg}</div><div class="body"><h3>Soft arches</h3><p>Rounded doorway shapes for image frames and hero panels, echoing temple and home thresholds.</p></div></article>
    <article class="motif"><div class="stage">${lotusSvg}</div><div class="body"><h3>Lotus line</h3><p>An open outline lotus for maternity, fertility and celebration moments. Lotus pink appears only here and in small tags.</p></div></article>
  </div>
  <div class="donts">
    <div class="dont-card"><div class="stage">${eyeFilled.replace('class="m-eye"', 'class="m-eye" style="width:70px;height:auto;transform:scale(1.6)"')}</div><div class="body"><b>${I.x} No filled blobs</b>Don't enlarge the filled eye into a big decorative shape. Outlines only, outside the logo.</div></div>
    <div class="dont-card"><div class="stage" style="background:linear-gradient(135deg,#F2B8B5,#E6CF8F,#1A8C8C)"></div><div class="body"><b>${I.x} No rainbow gradients</b>Don't blend the palette into loud gradients or glitter. Flat colour, soft tints.</div></div>
    <div class="dont-card"><div class="stage"><span class="note" style="max-width:24ch;text-align:center">Deity figures, crowns, idols, calendar art</span></div><div class="body"><b>${I.x} No deity figures</b>Krishna is present only through the feather and flute. Never depict the deity or use devotional clip art.</div></div>
  </div>
</div></section>

<section id="photo" class="alt"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">07 · Photography</div><h2>Real light, real families</h2></div>
    <p>Photographs should feel like a good afternoon on the ward: warm natural light, real mothers and families from Delhi, unposed moments of care. Shoot our own spaces and people as soon as possible; until then, these frames show the direction.</p>
  </div>
  <div class="photos">
    ${photoPh('mother and newborn by a window', 'warm', 'Hero: soft window light, skin tones true and warm, room to breathe for type.').replace('class="ph ', 'class="ph big ')}
    ${photoPh('family at discharge', 'lotus', 'Moments of relief and joy, with grandparents and partners included.').replace('class="ph ', 'class="ph big ')}
    ${photoPh('Dr. Rohita in consultation', 'teal', 'Doctors at eye level, listening. Real coats, real rooms, no stock stethoscope poses.')}
    ${photoPh('clean ward detail', 'cream', 'Calm details: fresh linen, morning light, a tidy bedside.')}
    ${photoPh('night corridor, 24×7', 'navy', 'For the dark theme: low light, navy shadows, one warm lamp.')}
  </div>
  <div class="photo-rules">
    <div class="card"><h3>Do</h3><ul class="list-check">
      <li>${I.check}<span>Indian and South Asian mothers, partners and grandparents, with a range of ages, skin tones and body types.</span></li>
      <li>${I.check}<span>Warm, natural daylight with a gentle grade toward cream. Faces lit, never harsh.</span></li>
      <li>${I.check}<span>Touch and closeness: a hand on a bump, a baby on a chest, a nurse adjusting a blanket.</span></li>
      <li>${I.check}<span>Our own building, staff and Dwarka streets once shot. Get signed consent for every patient photo.</span></li>
    </ul></div>
    <div class="card"><h3>Don't</h3><ul class="list-check list-x">
      <li>${I.x}<span>Western stock families, staged thumbs-up doctors or glossy studio backdrops.</span></li>
      <li>${I.x}<span>Fear imagery: alarms, close-up procedures, needles, distressed patients or NICU drama.</span></li>
      <li>${I.x}<span>Cold blue clinical grading, heavy filters or colour-tinted overlays across faces.</span></li>
      <li>${I.x}<span>Religious imagery or idols as decoration, and any photo that identifies a baby without consent.</span></li>
    </ul></div>
  </div>
</div></section>

<section id="ui"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">08 · UI elements</div><h2>Components from the site</h2></div>
    <p>These are the same patterns used on the home pages. Pill buttons at least 52px tall, generous radius, one primary action per view, and the feather-eye outline as the only ornament on cards.</p>
  </div>
  <div class="ui">
    ${['l', 'd'].map((t) => `<div class="panel ${t}"><span class="panel-k">${t === 'l' ? 'Light' : 'Dark'}</span>
      <div><div class="ui-label">Buttons</div><div class="ui-row">${t === 'l' ? `<a class="btn btn-primary" href="#ui">Book a check-up ${I.arrow}</a><a class="btn btn-ghost" href="#ui">${I.phone} Call us</a>` : `<a class="btn btn-gold" href="#ui">Book a check-up ${I.arrow}</a><a class="btn btn-ghost" href="#ui">${I.phone} Call us</a>`}</div></div>
      <div><div class="ui-label">Trust chips</div><ul class="chips"><li><span class="star">★</span>4.8 from 500+ ratings</li><li><span class="dot"></span>24×7 emergency</li><li>NICU on site</li></ul></div>
      <div><div class="ui-label">Card</div><article class="svc">${eyeOutline(1).replace('class="m-eye"', 'class="eye-c"')}<span class="ic">${I.heart}</span><h3>Maternity &amp; Obstetrics</h3><p>Pregnancy check-ups, normal and C-section deliveries, and a NICU on site.</p><a href="#ui">See maternity care ${I.arrow}</a></article></div>
      <div><div class="ui-label">Form</div><form class="demo" onsubmit="return false">
        <div class="field"><label for="n-${t}">Your name</label><input id="n-${t}" type="text" autocomplete="name" placeholder="Your name"></div>
        <div class="field"><label for="p-${t}">Mobile number</label><input id="p-${t}" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile number"><span class="field-help">We'll call or WhatsApp you to confirm a slot.</span></div>
        <label class="consent"><input type="checkbox" ${t === 'd' ? 'checked' : ''}><span>I agree to be contacted by Gokul Hospital about my appointment. We never share your number. <a href="#ui">Privacy</a></span></label>
        <button class="btn ${t === 'l' ? 'btn-primary' : 'btn-gold'}" type="button">Request a call back</button>
      </form></div>
    </div>`).join('')}
  </div>
</div></section>

<section id="social" class="alt"><div class="wrap">
  <div class="social">
    <div>
      <div class="eyebrow">09 · Social templates</div><h2>The system, in a feed</h2>
      <ul class="list-check">
        <li>${I.check}<span>One idea per post, set in Fraunces, with a short Manrope line beneath and the logo or mark in a corner.</span></li>
        <li>${I.check}<span>Alternate cream, navy and teal grounds so the grid stays calm and recognisable.</span></li>
        <li>${I.check}<span>Feather-eye outlines and barb lines as quiet texture. Ads close with a clear, low-pressure action: call, WhatsApp or book.</span></li>
        <li>${I.check}<span>Festival posts such as Janmashtami use the feather and flute, never the deity.</span></li>
      </ul>
      <a class="btn btn-primary cta-link" href="../ads/">See the social and ad set ${I.arrow}</a>
    </div>
    <div class="posts" aria-hidden="true">
      <div class="post p1">${eyeOutline(1)}<small>Gokul Hospital</small><b>Care, like a mother's.</b></div>
      <div class="post p2">${eyeOutline(1)}<small>4.8★ · 500+ ratings</small><b>Families keep coming back.</b></div>
      <div class="post p3">${eyeOutline(1)}<small>24×7</small><b>Here at 2 a.m. too.</b></div>
    </div>
  </div>
</div></section>
</main>

<footer><div class="wrap"><span>Gokul Hospital · Est. 2018 · Dwarka Mor, New Delhi</span><span><a href="../logo/">Logo board</a> · <a href="../ads/">Social &amp; ads</a></span></div></footer>
</body>
</html>
`;
fs.writeFileSync(ROOT + 'brand/index.html', html);
console.log('ok', pairs.map(([a, b, n]) => n + ' ' + cr(a, b).toFixed(2)).join(' | '));
