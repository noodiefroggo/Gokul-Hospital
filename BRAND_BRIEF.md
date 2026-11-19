# Gokul Hospital — Brand Brief (demo proposal)

Shared brief for every deliverable in this folder. Read this before designing anything.

## Client facts (use verbatim; do not invent other facts)
- Name: **Gokul Hospital** (Hindi: **गोकुल हॉस्पिटल**)
- Est. 2018 · Dwarka Mor, New Delhi
- Address: Plot A 3/4, Bhagwati Garden Rd, Opposite Metro Pillar No. 781, Block D, Bhagwati Garden Extension, Dwarka Mor, New Delhi – 110059
- Phone: +91 97189 34517 · +91 90153 56927 (WhatsApp on the first)
- Rating: **4.8★ from 500+ ratings** (Justdial)
- Services: Maternity & Obstetrics (pregnancy check-ups, normal & C-section deliveries), NICU, Gynaecology, Fertility & IVF, 24×7 Emergency, Operation Theatres
- Facilities: wheelchair-accessible entrance/exit and parking, free Wi-Fi, right by Dwarka Mor metro (Pillar 781)
- Doctor: **Dr. Rohita**, praised repeatedly in reviews as an "excellent and practical doctor". Other doctors: use clearly generic placeholders ("Senior Gynaecologist", no invented names).
- Review themes to paraphrase (don't quote reviewers by name): caring, friendly staff; personalised care; clean & hygienic; affordable, no surprise bills at discharge; short wait; well connected by metro.

## Positioning
Gokul is where Krishna was raised by Yashoda, so the name stands for nurturing and a mother's care. The positioning is **"Care, like a mother's."** (Hindi line: **"माँ जैसी देखभाल"**). It's a warm, devotional-but-modern women's and maternity hospital. It should feel calm, trustworthy and clinically competent, never kitschy. Krishna appears only **symbolically** (peacock feather / flute). No figurative depictions of the deity.

## Visual system
Colour tokens:
- `--peacock-900: #0B2A3C` deep peacock navy (dark-theme base, primary text on light)
- `--peacock-700: #0E4D64` peacock blue
- `--teal-500: #1A8C8C` feather teal (primary accent)
- `--feather-green: #3E8E5A` feather barb green (sparingly)
- `--gold-500: #C9A24B` temple gold (accents, hairlines, eye of feather ring)
- `--gold-300: #E6CF8F`
- `--lotus-300: #F2B8B5` soft lotus pink (maternity warmth, small doses)
- `--cream-50: #FBF7EF` page background (light)
- `--cream-100: #F3EADA`
- `--ink-700: #3A3A3A` body text on light

Type (Google Fonts):
- Display/headings: **Fraunces** (soft optical serif; use opsz/SOFT axes) or Cormorant Garamond as fallback
- Body/UI: **Manrope**
- Devanagari: **Tiro Devanagari Hindi** (or Noto Serif Devanagari)

Motifs: the peacock-feather "eye" (concentric navy → teal → gold ovals), fine feather-barb line patterns, lotus curves and soft arches. Keep the motif subtle and use plenty of whitespace.

## Logo
The final logo lives in `logo/`. Use `logo/gokul-logo-primary.svg` (horizontal lockup), `logo/gokul-mark.svg` (symbol only) and `logo/gokul-logo-reversed.svg` (for dark backgrounds). Reference these by relative path or inline the SVG.

## Folder layout
- `logo/` logo concepts + final files + `logo/index.html` presentation board
- `home/brand.html` home page A (light, brand theme)
- `home/dark.html` home page B (dark theme)
- `ads/` social posts & Meta ads (`ads/index.html` gallery + individual files)
- `proposal/` final client-facing proposal page

## Quality bar
Premium, award-level craft, not a template. Mobile-responsive. Accessible contrast. No lorem ipsum. Imagery: no real hospital photos exist, so use tasteful CSS/SVG illustration, gradients and feather motifs, or clearly-marked image placeholders (soft tinted blocks labelled e.g. "Photo: maternity suite"). Do not hotlink random stock photos.
