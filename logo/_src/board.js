const fs = require('fs');
const { C, PAL, TL, TD, feather, featherMono, concept2Mark, concept3Mark, horizontal, stacked, HVB, SVB } = require('./build.js');
const OUT = 'C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital/logo/index.html';

const LOGO = 'C:/Users/reala/OneDrive/Desktop/Side Projects/Gokul Hospital/logo/';
const uri = (f) => 'data:image/svg+xml;base64,' + Buffer.from(fs.readFileSync(LOGO + f)).toString('base64');
const FAV = uri('favicon.svg'), MARK = uri('gokul-mark.svg');
const svg = (vb, body, cls = '', label = 'Gokul Hospital') => `<svg viewBox="${vb}" class="${cls}" role="img" aria-label="${label}">${body}</svg>`;
const TM = { gokul: C.cream, hosp: C.cream, rule: C.gold3 };

const swatches = [
  ['Peacock 900', C.navy, 'Primary text, dark base', true],
  ['Peacock 700', C.blue, 'Feather vane, HOSPITAL', true],
  ['Feather teal', C.teal, 'Primary accent', true],
  ['Barb green', C.green, 'Vane on dark, sparingly', true],
  ['Temple gold', C.gold, 'Eye ring, hairlines', false],
  ['Gold 300', C.gold3, 'Type on dark', false],
  ['Lotus 300', C.lotus, 'Maternity warmth, small doses', false],
  ['Cream 50', C.cream, 'Page background', false],
];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gokul Hospital Logo</title>
<meta name="description" content="Logo concepts and final identity for Gokul Hospital, Dwarka Mor, New Delhi.">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..800,0..100;1,9..144,300..800,0..100&family=Manrope:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
<style>
:root{
  --peacock-900:${C.navy};--peacock-700:${C.blue};--teal-500:${C.teal};--feather-green:${C.green};
  --gold-500:${C.gold};--gold-300:${C.gold3};--lotus-300:${C.lotus};--cream-50:${C.cream};--cream-100:${C.cream1};--ink-700:${C.ink};
  --line:rgba(11,42,60,.12);
  --serif:'Fraunces','Cormorant Garamond',Georgia,serif;--sans:'Manrope','Helvetica Neue',Arial,sans-serif;--deva:'Tiro Devanagari Hindi','Noto Serif Devanagari',serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{background:var(--cream-50);color:var(--ink-700);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.gk{font-family:var(--serif);font-weight:560;font-variation-settings:'SOFT' 50,'opsz' 144}
.hs{font-family:var(--sans);font-weight:600}
.hi{font-family:var(--deva)}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
header.top{border-bottom:1px solid var(--line)}
header.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:68px}
.brandline{display:flex;align-items:center;gap:10px;font-weight:600;color:var(--peacock-900);font-size:14px;letter-spacing:.02em}
.brandline svg{width:22px;height:30px}
.meta{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--peacock-700)}
.hero{padding:clamp(56px,9vw,112px) 0 clamp(48px,7vw,88px);text-align:center;position:relative;overflow:hidden}
.hero .logo{width:min(560px,88%);height:auto;display:block;margin:0 auto}
.hero h1{font-family:var(--serif);font-weight:400;font-variation-settings:'SOFT' 100,'opsz' 72;font-size:clamp(28px,4vw,44px);line-height:1.15;color:var(--peacock-900);margin:clamp(40px,6vw,64px) auto 16px;max-width:18ch;letter-spacing:-.01em}
.hero h1 em{font-style:italic;color:var(--teal-500)}
.hero p{max-width:58ch;margin:0 auto;color:var(--ink-700)}
.hero p .hi{font-size:1.05em;color:var(--peacock-700)}
section{padding:clamp(56px,8vw,96px) 0;border-top:1px solid var(--line)}
.sec-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px 48px;align-items:end;margin-bottom:clamp(28px,4vw,48px)}
.eyebrow{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--teal-500);font-weight:700;margin-bottom:10px;display:flex;gap:10px;align-items:center}
.eyebrow::before{content:"";width:22px;height:1px;background:var(--gold-500)}
h2{font-family:var(--serif);font-weight:420;font-variation-settings:'SOFT' 80,'opsz' 72;font-size:clamp(28px,3.4vw,40px);line-height:1.1;color:var(--peacock-900);letter-spacing:-.01em}
.sec-head p{color:var(--ink-700);max-width:56ch}
/* concepts */
.concepts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.card{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
.card .stage{background:var(--cream-50);aspect-ratio:4/3;display:grid;place-items:center;padding:28px;border-bottom:1px solid var(--line)}
.card .stage svg{width:100%;height:auto;max-width:300px}
.card .body{padding:20px 22px 24px}
.card h3{font-family:var(--serif);font-weight:500;font-size:21px;color:var(--peacock-900);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.card .num{font-family:var(--sans);font-size:12px;letter-spacing:.14em;color:var(--peacock-700);font-weight:700;display:block;margin-bottom:4px}
.card p{font-size:15px;margin-top:6px}
.card.final{border-color:var(--gold-500);box-shadow:0 0 0 1px var(--gold-500),0 18px 40px -24px rgba(11,42,60,.35)}
.badge{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:var(--peacock-900);color:var(--gold-300);padding:4px 10px;border-radius:999px}
.verdict{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);font-size:14px;color:var(--peacock-700)}
.verdict b{color:var(--peacock-900)}
/* anatomy */
.anatomy{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,5vw,72px);align-items:center}
.anatomy .big{background:#fff;border:1px solid var(--line);border-radius:18px;aspect-ratio:1;display:grid;place-items:center}
.anatomy .big svg{width:62%;height:auto}
.anatomy ol{list-style:none;display:grid;gap:22px;counter-reset:a}
.anatomy li{display:grid;grid-template-columns:44px 1fr;gap:16px;align-items:start}
.anatomy li .dot{width:44px;height:44px;border-radius:50%;display:grid;place-items:center}
.anatomy li h4{font-family:var(--serif);font-weight:500;font-size:19px;color:var(--peacock-900);line-height:1.25}
.anatomy li p{font-size:15px}
/* variants */
.variants{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:20px}
.tile{border-radius:18px;display:flex;flex-direction:column;justify-content:space-between;min-height:260px;padding:22px;border:1px solid var(--line)}
.tile .art{flex:1;display:grid;place-items:center;padding:24px 0}
.tile .art svg{width:100%;height:auto}
.tile .cap{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}
.tile .cap span:last-child{font-weight:500;letter-spacing:.04em;text-transform:none;opacity:.75}
.w3{grid-column:span 3}.w2{grid-column:span 2}
.bg-cream{background:var(--cream-50);color:var(--peacock-700)}
.bg-white{background:#fff;color:var(--peacock-700)}
.bg-cream1{background:var(--cream-100);color:var(--peacock-700)}
.bg-navy{background:var(--peacock-900);color:var(--gold-300);border-color:transparent}
.bg-teal{background:var(--teal-500);color:var(--cream-50);border-color:transparent}
.bg-blue{background:var(--peacock-700);color:var(--cream-50);border-color:transparent}
.art .lock{max-width:380px}.art .stk{max-width:220px}.art .mk{max-width:120px}
/* sizes */
.sizes{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:20px}
.size-row{background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px;display:flex;align-items:flex-end;gap:clamp(20px,4vw,48px);flex-wrap:wrap}
.size-row figure{display:flex;flex-direction:column;align-items:center;gap:10px}
.size-row figcaption{font-size:12px;color:var(--peacock-700);font-weight:600;letter-spacing:.06em}
.size-row .on-dark{background:var(--peacock-900);border-radius:10px;padding:10px}
.tabmock{background:var(--cream-100);border:1px solid var(--line);border-radius:18px;padding:22px;display:flex;flex-direction:column;gap:14px;justify-content:center}
.tab{display:flex;align-items:center;gap:10px;background:#fff;border-radius:10px 10px 0 0;padding:10px 14px;max-width:280px;font-size:13px;color:var(--ink-700);box-shadow:0 1px 0 var(--line)}
.tab.dark{background:#202124;color:#e8eaed}
.tab img{width:16px;height:16px}
.tab .x{margin-left:auto;opacity:.5}
.app{display:flex;align-items:center;gap:14px;font-size:13px}
.app .ic{width:64px;height:64px;border-radius:15px;background:var(--cream-50);display:grid;place-items:center;box-shadow:0 6px 18px -10px rgba(11,42,60,.5)}
.app .ic img{width:40px;height:40px}
/* clear space */
.clear{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(24px,5vw,64px);align-items:center}
.clear-art{background:#fff;border:1px solid var(--line);border-radius:18px;padding:clamp(20px,4vw,40px)}
.clear-art svg{width:100%;height:auto;display:block}
.rules{display:grid;gap:18px}
.rules div{border-left:2px solid var(--gold-500);padding-left:16px}
.rules h4{font-family:var(--serif);font-weight:500;font-size:19px;color:var(--peacock-900)}
.rules p{font-size:15px}
/* colour */
.swatches{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.sw{border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#fff}
.sw .chip{height:120px;padding:14px;display:flex;align-items:flex-end;font-size:12px;font-weight:600;letter-spacing:.06em}
.sw .info{padding:12px 14px 14px}
.sw .info b{display:block;color:var(--peacock-900);font-size:14px}
.sw .info code{font-family:var(--sans);font-size:13px;color:var(--peacock-700);font-weight:600;letter-spacing:.04em}
.sw .info span{display:block;font-size:13px;color:var(--ink-700);opacity:.85;margin-top:2px}
/* type */
.type{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.spec{background:#fff;border:1px solid var(--line);border-radius:18px;padding:26px;display:flex;flex-direction:column;gap:14px}
.spec .role{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--teal-500)}
.spec .aa{font-size:76px;line-height:1;color:var(--peacock-900)}
.spec .name{font-weight:600;color:var(--peacock-900)}
.spec .sample{color:var(--ink-700);font-size:15px;border-top:1px solid var(--line);padding-top:14px}
footer{border-top:1px solid var(--line);padding:32px 0 48px;font-size:13px;color:var(--peacock-700)}
footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
@media (max-width:960px){
  .concepts,.type{grid-template-columns:1fr}
  .sec-head,.anatomy,.clear,.sizes{grid-template-columns:1fr}
  .variants{grid-template-columns:repeat(2,minmax(0,1fr))}
  .w3,.w2{grid-column:span 2}
  .w2.half{grid-column:span 1}
  .swatches{grid-template-columns:repeat(2,minmax(0,1fr))}
  .card .stage{aspect-ratio:auto;padding:40px 28px}
}
@media (max-width:560px){
  .w2.half{grid-column:span 2}
  .meta{display:none}
}
</style>
</head>
<body>
<header class="top"><div class="wrap">
  <div class="brandline">${svg('14 2 72 96', feather('nav', PAL.light, { barbs: false }), '', 'Gokul mark')}Gokul Hospital · Identity</div>
  <div class="meta">Logo proposal · Concept presentation</div>
</div></header>

<main>
<div class="hero"><div class="wrap">
  ${svg(HVB, horizontal(feather('hero', PAL.light), TL), 'logo')}
  <h1>A feather, held <em>gently</em>.</h1>
  <p>Gokul is where Krishna was raised by Yashoda, so the name already means a mother's care. The mark borrows only his peacock feather: a calm, watchful eye of navy, teal and gold, set in a vane soft enough to feel like an embrace. <span class="hi" style="white-space:nowrap">माँ जैसी देखभाल</span>, care like a mother's.</p>
</div></div>

<section id="concepts"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">01 · Concepts</div><h2>Three routes, one symbol</h2></div>
    <p>Each route keeps the reference to Krishna symbolic and quiet, so the logo reads as a hospital first. All three share the same wordmark: Fraunces for GOKUL, with HOSPITAL set wide in Manrope beneath a temple-gold hairline.</p>
  </div>
  <div class="concepts">
    <article class="card final">
      <div class="stage">${svg(HVB, horizontal(feather('k1', PAL.light), TL))}</div>
      <div class="body"><span class="num">CONCEPT 01</span><h3>Mor Pankh <span class="badge">Final</span></h3>
      <p>A single peacock feather, leaning gently toward the name. A calm eye of navy, teal and gold, with hairline barbs falling from the quill.</p>
      <p class="verdict"><b>Why it wins:</b> the most calm and clinical of the three, and the only one that still reads clearly at 16px.</p></div>
    </article>
    <article class="card">
      <div class="stage">${svg(HVB, horizontal(concept2Mark('k2', PAL.light), TL))}</div>
      <div class="body"><span class="num">CONCEPT 02</span><h3>Pankh &amp; Bansuri</h3>
      <p>The feather crossing Krishna's flute. It is the most explicit nod to Gokul and carries a sense of music and celebration.</p>
      <p class="verdict"><b>Not chosen:</b> the flute pulls it toward devotional iconography, and the holes disappear at small sizes.</p></div>
    </article>
    <article class="card">
      <div class="stage">${svg(HVB, horizontal(concept3Mark('k3', PAL.light), TL))}</div>
      <div class="body"><span class="num">CONCEPT 03</span><h3>Soft Cross</h3>
      <p>The same feather, but the eye's navy core becomes a soft, round-ended cross, so care sits at the very centre of the symbol.</p>
      <p class="verdict"><b>Not chosen:</b> it says hospital fastest, but the cross reads like a UI "add" button and loses the eye's softness.</p></div>
    </article>
  </div>
</div></section>

<section id="mark"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">02 · The mark</div><h2>Anatomy of the feather</h2></div>
    <p>The feather is built symmetrically on one axis, then leaned 16 degrees toward the name. The eye sits slightly low, as it does in a real feather. Every part is a true vector shape, so the mark stays crisp from a favicon to a building sign.</p>
  </div>
  <div class="anatomy">
    <div class="big">${svg('0 0 100 100', feather('big', PAL.light), '', 'Gokul mark, large')}</div>
    <ol>
      <li><span class="dot" style="background:${C.navy}"></span><div><h4>The eye, navy core</h4><p>A watchful, steady centre. Navy is the colour of trust and the primary text colour.</p></div></li>
      <li><span class="dot" style="background:${C.teal}"></span><div><h4>Teal ring</h4><p>The feather's own colour, used across the brand as its primary accent.</p></div></li>
      <li><span class="dot" style="background:${C.gold}"></span><div><h4>Temple-gold ring</h4><p>A thin band of warmth and heritage that frames the eye. It returns as the hairline in the wordmark.</p></div></li>
      <li><span class="dot" style="background:linear-gradient(${C.blue},${C.teal})"></span><div><h4>Vane and barbs</h4><p>Peacock blue deepening to teal. Nine pairs of hairline barbs taper down the quill, so the lower edge dissolves into feathering.</p></div></li>
    </ol>
  </div>
</div></section>

<section id="variants"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">03 · Final system</div><h2>Every lockup, every ground</h2></div>
    <p>Use the primary lockup on cream and white. On navy, switch to the reversed version with cream and gold type. On teal or photography, use the one-colour version in cream.</p>
  </div>
  <div class="variants">
    <div class="tile bg-cream w3"><div class="art">${svg(HVB, horizontal(feather('v1', PAL.light), TL), 'lock')}</div><div class="cap"><span>Primary</span><span>gokul-logo-primary.svg</span></div></div>
    <div class="tile bg-navy w3"><div class="art">${svg(HVB, horizontal(feather('v2', PAL.dark), TD), 'lock')}</div><div class="cap"><span>Reversed</span><span>gokul-logo-reversed.svg</span></div></div>
    <div class="tile bg-teal w2 half"><div class="art">${svg(HVB, horizontal(featherMono('v3', C.cream), TM), 'lock')}</div><div class="cap"><span>Mono on teal</span><span>gokul-logo-mono.svg, cream</span></div></div>
    <div class="tile bg-white w2 half"><div class="art">${svg(HVB, horizontal(featherMono('v4', C.navy), { gokul: C.navy, hosp: C.navy, rule: C.navy }), 'lock')}</div><div class="cap"><span>Mono</span><span>gokul-logo-mono.svg</span></div></div>
    <div class="tile bg-blue w2"><div class="art">${svg(HVB, horizontal(feather('v5', PAL.dark), TD), 'lock')}</div><div class="cap"><span>Reversed on blue</span><span>gokul-logo-reversed.svg</span></div></div>
    <div class="tile bg-cream1 w2 half"><div class="art">${svg(SVB, stacked(feather('v6', PAL.light), TL), 'stk')}</div><div class="cap"><span>Stacked, bilingual</span><span>gokul-logo-stacked.svg</span></div></div>
    <div class="tile bg-navy w2 half"><div class="art">${svg(SVB, stacked(feather('v7', PAL.dark), TD), 'stk')}</div><div class="cap"><span>Stacked, reversed</span><span>on navy</span></div></div>
    <div class="tile bg-white w2"><div class="art">${svg('0 0 100 100', feather('v8', PAL.light), 'mk')}</div><div class="cap"><span>Mark</span><span>gokul-mark.svg</span></div></div>
  </div>
</div></section>

<section id="sizes"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">04 · Small sizes</div><h2>Still a feather at 16px</h2></div>
    <p>Below 48px, use <code>favicon.svg</code>: a navy tile with a tight crop, bolder eye rings and no hairline barbs, so the eye stays legible in a browser tab.</p>
  </div>
  <div class="sizes">
    <div class="size-row">
      <figure><img src="${FAV}" width="16" height="16" alt="Favicon at 16px"><figcaption>16px</figcaption></figure>
      <figure><img src="${FAV}" width="32" height="32" alt="Favicon at 32px"><figcaption>32px</figcaption></figure>
      <figure><img src="${FAV}" width="64" height="64" alt="Favicon at 64px"><figcaption>64px</figcaption></figure>
      <figure><img src="${MARK}" width="32" height="32" alt="Full mark at 32px"><figcaption>Full mark, 32px</figcaption></figure>
      <figure><img src="${MARK}" width="64" height="64" alt="Full mark at 64px"><figcaption>Full mark, 64px</figcaption></figure>
    </div>
    <div class="tabmock">
      <div class="tab"><img src="${FAV}" alt="">Gokul Hospital · Dwarka Mor<span class="x">×</span></div>
      <div class="tab dark"><img src="${FAV}" alt="">Gokul Hospital · Dwarka Mor<span class="x">×</span></div>
      <div class="app"><img src="${FAV}" width="64" height="64" alt="" style="border-radius:14px;box-shadow:0 6px 18px -10px rgba(11,42,60,.5)"><span>Home-screen icon<br><small>favicon.svg at 64px</small></span></div>
    </div>
  </div>
</div></section>

<section id="clearspace"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">05 · Clear space</div><h2>Room to breathe</h2></div>
    <p>Give the logo the same calm the hospital promises. Keep the area around it free of text, edges and other graphics.</p>
  </div>
  <div class="clear">
    <div class="clear-art">
      <svg viewBox="-42 -42 420 200" role="img" aria-label="Clear space diagram">
        <rect x="-29" y="-29" width="394" height="174" fill="none" stroke="${C.teal}" stroke-dasharray="4 4" stroke-width="1"/>
        <rect x="0" y="0" width="336" height="116" fill="${C.teal}" opacity=".05"/>
        ${horizontal(feather('cs', PAL.light), TL)}
        <g fill="none" stroke="${C.teal}" stroke-width=".9"><ellipse cx="43.7" cy="40.8" rx="16.4" ry="19.7" transform="rotate(16 43.7 40.8)" stroke-dasharray="2 2"/></g>
        <g fill="${C.gold}" font-family="Manrope,sans-serif" font-size="11" font-weight="700">
          <rect x="-29" y="58" width="29" height="1"/><text x="-14.5" y="52" text-anchor="middle">X</text>
          <rect x="336" y="58" width="29" height="1"/><text x="350.5" y="52" text-anchor="middle">X</text>
          <rect x="200" y="-29" width="1" height="29"/><text x="207" y="-10">X</text>
          <rect x="200" y="116" width="1" height="29"/><text x="207" y="135">X</text>
        </g>
      </svg>
    </div>
    <div class="rules">
      <div><h4>X = width of the eye</h4><p>The clear space on every side equals the width of the feather's gold eye ring at the size in use.</p></div>
      <div><h4>Minimum sizes</h4><p>Horizontal lockup: 120px or 30mm wide. Stacked: 72px or 18mm. Below 48px, use the favicon mark alone.</p></div>
      <div><h4>Don't</h4><p>Don't recolour, rotate, stretch, outline or add effects to the mark, and don't place the colour version on teal or busy photos.</p></div>
    </div>
  </div>
</div></section>

<section id="colour"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">06 · Colour</div><h2>Peacock, gold and cream</h2></div>
    <p>Navy and teal carry trust. Gold appears only in thin rings and hairlines, and lotus pink is kept for small moments of maternity warmth.</p>
  </div>
  <div class="swatches">
    ${swatches.map(([n, h, u, dark]) => `<div class="sw"><div class="chip" style="background:${h};color:${dark ? C.cream : C.navy}${h === C.cream ? ';border-bottom:1px solid var(--line)' : ''}">Aa</div><div class="info"><b>${n}</b><code>${h}</code><span>${u}</span></div></div>`).join('')}
  </div>
</div></section>

<section id="type"><div class="wrap">
  <div class="sec-head">
    <div><div class="eyebrow">07 · Typography</div><h2>Soft serif, clear sans</h2></div>
    <p>Fraunces brings warmth through its soft optical axis. Manrope keeps wayfinding and forms clear. Tiro Devanagari Hindi gives the Hindi line the same quiet, bookish character.</p>
  </div>
  <div class="type">
    <div class="spec"><span class="role">Display · Wordmark</span><span class="aa" style="font-family:var(--serif);font-variation-settings:'SOFT' 50,'opsz' 144;font-weight:560">Gg</span><span class="name">Fraunces · SemiBold, SOFT 50</span><span class="sample" style="font-family:var(--serif);font-size:22px;color:${C.navy};line-height:1.3;font-variation-settings:'SOFT' 100">Care, like a mother's.</span></div>
    <div class="spec"><span class="role">Body · UI</span><span class="aa" style="font-family:var(--sans);font-weight:600">Gg</span><span class="name">Manrope · 400 to 700</span><span class="sample" style="letter-spacing:.32em;font-weight:600;color:${C.blue};font-size:13px">HOSPITAL · DWARKA MOR</span></div>
    <div class="spec"><span class="role">Devanagari</span><span class="aa" style="font-family:var(--deva)">गो</span><span class="name">Tiro Devanagari Hindi</span><span class="sample" style="font-family:var(--deva);font-size:22px;color:${C.navy};line-height:1.4">गोकुल हॉस्पिटल · माँ जैसी देखभाल</span></div>
  </div>
</div></section>
</main>

<footer><div class="wrap"><span>Gokul Hospital · Est. 2018 · Dwarka Mor, New Delhi</span><span>Identity concept for client review</span></div></footer>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
