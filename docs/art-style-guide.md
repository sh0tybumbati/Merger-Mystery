---
layout: default
title: Merger Mystery — Art & Audio Style Guide
---

# Art & Audio Style Guide: Dollhouse Cluedo

[Play the prototype](../) · [Design document](GDD.html) · [Case 1](case-1-the-late-mr-grimsby.html)

**Direction:** a Wes-Anderson dollhouse crossed with a board-game murder mystery. Pastel, symmetrical, flat and deadpan. The crime is grim; the world is polite, tidy and slightly absurd. (An earlier gothic/Burton direction was dropped: it read as cheap without bespoke art and hurt merge-item readability.)

The prototype implements this with **no image or audio files**: characters and the hotel are generated SVG, sound is synthesised in WebAudio. Every rule below is testable in code (`puppet()`, `Sfx`, the CSS tokens in `index.html`).

## Palette

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#3a2b33` | All outlines and text (never pure black) |
| `--cream` | `#fbf3e4` | Panels, buttons, tiles |
| `--paper` | `#f6e7d3` | Page wallpaper (with a dot pattern) |
| `--pink` / `--rose` | `#f2b5b5` / `#e58f92` | Hotel, suspects, accents |
| `--mustard` | `#f0bf4c` | Active state, generators, brass |
| `--teal` | `#4fa3a5` | Felt tray, primary buttons |
| `--sky` / `--mint` / `--lilac` | `#a9d3e0` / `#bfe3cf` / `#d3c3ea` | Chain colours |
| `--blood` | `#d1382c` | **Red string, pins and danger only. Reserve it.** |

Each chain owns one colour so tiers and origins read at a glance: forensics mint, witnesses sky, fibres pink, séance lilac. Each future case gets its own accent scheme and location.

## Night variant ("Dollhouse After Dark")

The same world after dark, switchable any time: **Settings → Theme** (Day / Night / Auto, which follows the phone's dark-mode setting) or the ☀️/🌙 button on the title screen. The choice is remembered.

- Same shapes, same flat hard-shadow language; only the tokens change (`body.night` in the CSS), so every new screen gets both themes for free.
- Page and panels go deep aubergine; outlines go near-black (`--line`) while text goes warm cream (`--ink`). Text and outline are separate tokens for this reason.
- Chain tiles stay colour-coded but deeper: mint → forest, sky → denim, pink → rose, lilac → violet, so emoji still pop.
- The title screen becomes a starry night with a moon, and the hotel is relit: darker walls, glowing mustard windows.
- Characters get a thin cream rim light so dark coats still read on dark panels.
- Red remains reserved for string, pins and danger.

## Shape and layout language

- **Symmetry.** Centre-aligned titles, mirrored layouts, no random tilts. Nothing wobbles.
- **Flat colour with a hard offset shadow** (`0 3px 0 ink`) and a 2–3px ink outline. No blur, no gradients except the sky.
- **Rounded, chunky, toy-like** corners; pill-shaped HUD.
- **Board-game furniture:** a teal felt tray with a brass rim for the merge board, checkerboard tiles, a green baize case board with pinned index cards, awning stripes, bunting.
- **Type:** Playfair Display (900, uppercase, tracked) for titles; Jost (geometric sans) for everything else. Small, wide-tracked caps for labels.

## The hotel and the cast

The menu is a symmetrical pastel hotel (`hotel()` SVG) under bunting and slow clouds. Future cases swap the building: a manor, a train, a theatre.

Characters come from one flat **puppet rig** (`puppet(kind)`): big round head, dot eyes, flat brows, rosy cheeks, a **deadpan straight mouth**, a coat with trim and buttons, thin legs. Silhouette hooks are the identity:

| Character | Hook |
|---|---|
| Lady Vesper | Lilac veil and pillbox hat |
| Dr. Morrow | Bald, round spectacles, cream coat |
| Mr. Crane | Sleek hair, stork-tall, black tails |
| Inspector Bloat | Mustard coat, red-banded bowler, moustache |
| The Apprentice | Pink coat, dark bob |
| Poe-tential | Raven (emoji placeholder) |

## Motion

- Crisp and deliberate, like a dolly shot: **pop** on spawn/merge, a gentle **bob** on portraits, slow cloud drift. No wobble or jitter.
- Button presses drop 3px onto their shadow.
- Confetti-style bursts (✨ ⭐ 🎉 🔍) on merges, upgrades, clues and the finale.
- **Reduce motion** (Settings) disables all animation and particles.

## Mobile UX

- Thumb-zone actions, targets 48px or larger, one-hand drag with a tap-tap alternative.
- Drag threshold: 12px for items, 26px for generators, so a fat-finger tap still spawns.
- Amber and mustard mean "you can act here"; red only ever means string, pin or danger.
- Item tiles use a coloured tile, a thick outline and a numeric tier badge, so they read at 40px.

## Audio direction

A jaunty harpsichord waltz in C major (3/4, 118 BPM) with a plucked bass. Effects are short plucks tuned to the same C-major pentatonic, so overlaps stay consonant.

| Event | Sound |
|---|---|
| Tap / button | Tiny square tick |
| Spawn | Rising triangle pop |
| Merge | Two plucks, pitched up with tier |
| Generator upgrade | Five-note ascending run |
| Clue revealed | Five-note arpeggio |
| String pulls taut | Two-note pluck |
| String snaps | Falling saw twang |
| Wrong answer | Two low buzzes |
| Case solved | Six-note fanfare |

Audio unlocks on the first tap (browser rules). Music starts **off**; effects on. Both are in Settings.

## When replacing placeholders with real art

1. Keep the palette, the ink outline and the hard shadow; commission to them.
2. Item icons are currently emoji on coloured tiles. Replace with flat vector props that share the outline weight and sit on the same tiles.
3. Deliver characters as layered parts (head, eyes, brows, mouth, coat, arms) so the rig and swappable headgear still work.
4. Keep every icon readable in grayscale at 44px.
