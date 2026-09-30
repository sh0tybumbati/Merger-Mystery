---
layout: default
title: Merger Mystery — Art & Audio Style Guide
---

# Art & Audio Style Guide

[Play the prototype](../) · [Design document](GDD.html) · [Case 1](case-1-the-late-mr-grimsby.html)

The prototype implements this guide with **no image or audio files**: characters are generated SVG, sound is synthesised in WebAudio. That keeps it tiny and makes every rule below testable in code (`puppet()`, `Sfx`, the CSS tokens in `index.html`).

## Palette tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#120c1a` | Backgrounds, outlines |
| `--velvet` | `#1e1429` | Panels |
| `--plum` | `#2d1d3d` | Buttons, pills |
| `--bone` | `#efe6d2` | Text, paper cards, stripes |
| `--blood` | `#c8102e` | **Red string, key actions, danger.** Reserve it. |
| `--amber` | `#f2b84b` | Generators, candlelight, guidance |
| `--moss` | `#6fa88a` | Success, unlocks |
| `--dim` | `#9a8fa8` | Secondary text |

Rule: about five hues on screen at once; one accent per case (Case 1 is lavender and belladonna green).

## Shape language

- Spindly, elongated, asymmetrical. Nothing perfectly square: cells, cards and buttons are rotated ±1° and use uneven corner radii.
- Thick black outlines (3px at phone scale) with a hard offset shadow, never a soft blur.
- Stripes and stitching as recurring motifs (title bar, character bodies, mouths).
- Big heads, needle limbs, huge dark-ringed eyes.

## Puppet rig

One shared rig (`puppet(kind)`) draws every character from parameters: body and stripe colours, skin, headgear (`veil`, `tophat`, `bowler`, `spiky`, `bald`), and extras (spectacles, moustache, extra-tall neck). New suspects for later cases are one line of data.

| Character | Silhouette hook |
|---|---|
| Lady Vesper | Lavender veil |
| Dr. Morrow | Bald, huge spectacles |
| Mr. Crane | Top hat, stork-thin |
| Inspector Bloat | Egg head, bowler, moustache |
| The Apprentice | Spiky hair, striped scarf-body |
| Poe-tential | Raven (emoji placeholder) |

## Motion (stop-motion rules)

- Idle "boil" on items, portraits and the moon: a 0.5s **stepped** wobble (`steps(1)`), about 8–12 fps. Never smooth-interpolate a character.
- UI transitions stay smooth (drag, toasts) so input feels responsive.
- Merge FX are DOM particles (✨ 🕸️ 🦇 ⭐) that burst from the merged cell; a clue reveal bursts from the top of the screen.
- Global film grain and vignette sit above everything at ~10% opacity.
- **Reduce motion** (Settings) disables all animation and particles.

## UI rules for phones

- Thumb zone for actions, targets 48px or larger, one-hand drag with a tap-tap alternative.
- Drag threshold: 12px for items, 26px for generators (so a fat-finger tap still spawns).
- Red is reserved for strings and critical clues; amber marks anything you can tap to *do* something.
- Body copy uses a readable serif; only titles use the spiky treatment.

## Audio direction

Music-box waltz in A minor (3/4, 104 BPM) with a plucked bass and stabbed chord tones. Effects are short and tuned to the same A-minor pentatonic scale so overlapping sounds stay consonant.

| Event | Sound |
|---|---|
| Tap / button | Tiny square tick |
| Spawn | Rising triangle pop |
| Merge | Two music-box notes, pitched up with tier |
| Generator upgrade | Five-note ascending arpeggio |
| Clue revealed | Arpeggio plus a low drone |
| String pulls taut | Two-note pluck |
| String snaps | Falling saw twang |
| Wrong answer | Two low buzzes |
| Case solved | Rising six-note fanfare |

Audio unlocks on the first tap (browser autoplay rules). Music starts **off**; effects on. Both are in Settings.

## When replacing placeholders with real art

1. Keep the palette tokens and outline weight; commission to them.
2. Deliver characters as layered parts (head, eyes, mouth, body, arms) so the rig, stepped animation and swappable headgear still work.
3. Keep item icons readable in grayscale at 44px.
4. Test the boil at 10 fps before approving any animation.
