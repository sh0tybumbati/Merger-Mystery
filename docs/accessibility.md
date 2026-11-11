---
layout: default
title: Merger Mystery — Accessibility
---

# Accessibility

[Play the prototype](../) · [Design document](GDD.html) · [Analytics](analytics.html)

Target: **WCAG 2.1 AA** on every screen, in both Day and Night themes. Checked with the axe-core engine (zero violations across the menu, dialogs, evidence table and string board in both themes) plus manual keyboard testing. Not yet tested with a real screen reader on a device.

## Play without a pointer

| Key | Action |
|---|---|
| Tab | Move between controls. The table is one tab stop; arrow keys move inside it |
| Arrow keys, Home, End | Move around the evidence table |
| Enter or Space | Tap: spawn from a generator, select a tile, merge or move it onto the selected tile |
| Shift+Enter | Select a generator without spawning (the long-press equivalent) |
| Delete | File the focused tile away |
| Escape | Cancel a selection or the Magnifier; close a dialog |

Merging never requires dragging: tap a tile, then tap its partner. Dragging is a convenience, which satisfies WCAG 2.5.7 (Dragging Movements).

## Screen readers

- Every tile has a label with its position, name, tier and (for generators) charges: "Row 1, column 3: Powder Pinch, tier 2 of 4".
- Spawns, merges, hints and rewards are announced through a polite live region.
- Dialogs trap focus, label themselves from their heading, close with Escape and give focus back where it was. The page behind them is made inert.
- Tabs, the rooms bar, tool buttons and the string-board cards expose roles, pressed/selected state and instructions.
- Decorative art, badges and particles are hidden from assistive tech; meaning is always carried by text.

## Seeing and reading

- **Contrast.** Text meets 4.5:1 and large text 3:1 in both themes (tokens `--dim`, `--amber`, `--moss`, `--blood`, `--rose-t`, `--danger`, `--teal-d` were darkened or lightened to pass). Checked with a script plus axe.
- **Never colour alone.** Chains differ by icon shape and tier number as well as colour; a correct string is solid and a wrong one dashed; clue status is also written out ("Strung to …").
- **Text size** (Settings): Normal, Large, Extra large scales the reading surfaces; pinch-zoom is allowed.
- **Reduce motion** (Settings) defaults to *Auto*, following the system setting, and disables animation and particles.
- **Focus** is always visible (a high-contrast ring that changes colour in Night mode); touch targets are at least 44px.
- **Sound** is never required: every sound has a visual or text equivalent.
- Forced-colours (high contrast) mode keeps borders and selection outlines.

## Known gaps

- Cooldown seconds on a recharging generator are announced when you focus it, not live.
- The red-string lines are drawn art; their meaning is in the card text ("Strung to …").
