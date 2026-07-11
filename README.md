# Heimdall Sigil — 8×8 Sprite Converter

Image → 8×8 delivery-block converter. Drop any image (or an 8×8 pixel sprite); it builds a
top-N color palette, majority-votes each 8×8 cell, and emits a text delivery block.

**Live:** https://randomittin.github.io/pixelor/

## Alphabet

```
. bg | 1 body | 2 eye | 3 highlight | 4 shadow | 5 outline | 6 accent-A | 7 accent-B
```

## Use

1. Drop / pick an image (`png · jpg · gif · webp`). Transparent pixels → bg; else the corner
   color is treated as bg.
2. Tune **MAX COLORS**, edit palette hex values, or **merge** near-duplicate colors — the grid
   re-votes live.
3. **Paint** individual pixels: pick a color in the **PAINT** bar, then click pixels in the 8×8
   preview to set them. Click a filled pixel with its own color to erase it back to bg (`.`).
   (Re-quantizing — changing MAX COLORS / palette — resets the grid, so paint last.)
4. **copy block** or **↓ .md** to export the delivery block.

## How it works

- **Pass 1** — histogram of exact source colors (no averaging → palette entries are real pixels),
  background detection from corner sampling / alpha.
- **Pass 2** — each of the 64 cells majority-votes its nearest palette color; winners are assigned
  alphabet slots (freq → body; darkest → outline; lightest → eye; rest → accents/highlight/shadow).

## Files

| File | Role |
|------|------|
| `index.html` | Sprite Converter (Claude Design Canvas `.dc.html`) |
| `Sigil Sprite Library 8x8.dc.html` | 8×8 sprite library |
| `support.js` | Claude Design Canvas runtime (auto-loads React 18 UMD from unpkg, boots `<x-dc>`) |
| `sprites8-data.js` | `window.SIGIL8` — 8×8 sprite data + compose/validate/render helpers |

Static site — no build step. Runtime fetches React/ReactDOM/Babel from unpkg at load.

Imported from Claude Design and hosted via GitHub Pages.
