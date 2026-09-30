---
layout: default
title: Merger Mystery — Game Design Document
---

# Merger Mystery — Game Design Document

*Working title. Merge-puzzle × episodic murder mystery in a pastel dollhouse world. Mobile-first PWA.*

[Play the prototype](../) · [Case 1 mystery graph](case-1-the-late-mr-grimsby.html) · [Art & audio style guide](art-style-guide.html)

## 1. Pillars

- **Merge tier = investigative depth.** Every merge chain is a forensic process; higher tier means more is known.
- **Two skills, two feelings.** Merging is spatial and logistical. The red-string board is logical and narrative.
- **Fair play.** Money speeds processing, never solving. Story beats are never gated by energy.
- **Dollhouse Cluedo.** Pastel, symmetrical, flat and deadpan; a grim crime in a tidy, polite world.

## 2. Core Gameplay Loop

### Session loop (2–5 min)
1. **Evidence Table.** A 6×7 (prototype) or 7×9 board, themed per scene, seeded with raw unidentified items.
2. **Spend Candlelight** (energy) at a *Source* (crate, kit, filing cabinet) to spawn a tier-1 item.
3. **Merge** matching items to promote them along a forensic chain.
4. **Reveal tier.** The final merge in a chain consumes the item and yields a **Clue Card**.
5. **Pin the clue** on the **Red-String Board** by stringing it to the suspect it implicates. Wrong links snap and cost *Composure* (a soft penalty, never a fail state).
6. **Eureka checkpoint.** Enough correct threads trigger a silhouette-and-spotlight beat that unlocks the next scene.
7. **Showdown.** At episode end, confront suspects by presenting the right clue against each claim.

### Episode structure (~1 hour, 10–15 short sessions)
| Phase | Content | Time |
|---|---|---|
| Prologue | Deadpan cold open, body found | 1 min |
| Scenes 1–3 | 3 boards, 4–6 clues each | ~45 min |
| The Web | Board consolidation, contradictions | 5 min |
| Showdown | Confront 3–4 suspects | 5 min |
| Epilogue | Twist and cliffhanger | 1 min |

### Mystery-specific mechanics
- **Red-herring chains** produce plausible but false clues; the string goes limp.
- **Contradiction merges:** at the testimony tier, items come in two variants (e.g. Lady Vesper's statement vs the Maid's). Matching variants refuse to merge ("these agree"); a *clashing* pair merges into a **Contradiction** clue. The game biases variant spawns toward whichever you have fewer of, so a pair is always reachable.
- **Magnifier tool:** reveals an unknown item's chain before you commit to a merge.
- **Sealed cells** (cobwebbed evidence bags) open when adjacent merges happen.
- **Case File Requests** replace customer orders ("The Inspector needs a toxicology report").
- **Soft-lock prevention:** full board with no merges grants a free Emergency Lead.

## 2b. Generators (Sources on the Board)

Sources are **items on the merge board**, not a menu. Each chain has its own generator line that levels up by merging.

- **Tap to spawn.** A generator has a fixed number of **charges**. Spawning uses one; when the last is spent it goes on **cooldown** and refills fully.
- **Merge to upgrade.** Two generators of the same chain and level merge into the next level, so a Lv3 needs four Lv1s. Upgrading refills charges and clears cooldown.
- **Higher level = better output.** More charges per cycle, slightly faster refill, and spawn tables that unlock higher-tier items off the bat (the final tier is never spawned; it must be merged to reveal the clue).
- **Leads.** Each clue found earns a new Lv1 generator for a chain whose clue is still missing.
- **Protected.** Generators can't be filed away, but can be moved and swapped.

| Level | Charges | Refill | Spawn weights (tier 1 / 2 / 3) |
|---|---|---|---|
| 1 | 6 | 30 s | 100 / – / – |
| 2 | 8 | 30 s | 65 / 35 / – |
| 3 | 10 | 28 s | 30 / 50 / 20 |
| 4 | 14 | 26 s | 10 / 35 / 55 |

Example line (Forensic): 🧰 Field Kit → 🧫 Petri Bench → ⚗️ Chem Bench → 🏥 Forensic Lab.

In the full game, generator cooldowns replace global energy as the pacing lever, and speed-ups or extra charges become the natural monetization hook. The prototype has no global energy.

## 3. Merge Chains

Chains run 4–6 tiers and end in a Clue Card. Keep them short; deep chains mean tedious tile counts on a small grid.

| Chain | Tiers | Reveal |
|---|---|---|
| **Forensic Chemistry** | Dust Mote → Powder Pinch → Vial of Residue → Lab Slide → Chromatogram | *Toxin ID: Belladonna* |
| **Witness Testimony** | Whisper → Rumour → Statement Fragment → Signed Statement → Timeline | *Alibi Broken* (two statements of different witnesses can merge into a Timeline; a mismatch yields a Contradiction) |
| **Fibres & Fabric** | Thread → Fibre Tuft → Cloth Scrap → Sleeve Fragment → Reconstructed Glove | *Left-handed killer* |
| Ballistics | Casing → Bullet → Trajectory Rod → Angle Map | *Shot from the balcony* |
| Ledger | Receipt → Invoice → Bank Slip → Forged Signature | *Motive: embezzlement* |
| Séance (red herring) | Candle Stub → Wax Pool → Spirit Board | *False ghost clue* |

Cross-chain: a Vial merged with a Reagent skips a tier. Sources level up to spawn higher tiers.

## 4. Art & UI Guidelines

**Direction: Dollhouse Cluedo.** A Wes-Anderson dollhouse crossed with a board-game murder mystery: pastel, symmetrical, flat and deadpan, where a grim crime plays out in a tidy, polite world. Merge items need bright, distinct silhouettes, and this look gives them that. Dark, gothic moods are saved for the big beats (the showdown and the string board) instead of being the whole game. Full detail is in the [style guide](art-style-guide.html).

- **Palette:** cream, blush pink, mustard, teal, sky, mint and lilac on a dotted paper wallpaper, with plum-brown ink for all outlines. Red is reserved for string, pins and danger. Each chain has its own colour; each case gets its own accent scheme and setting.
- **Shapes:** symmetrical layouts, chunky rounded corners, flat colour with a hard offset shadow, no blur.
- **Board:** a teal felt tray with a brass rim and checkerboard tiles. The case board is green baize with pinned index cards and saggy red string.
- **Characters:** one flat puppet rig with big round heads, dot eyes and a deadpan mouth; identity comes from silhouette hooks (veil, spectacles, bowler, top hat).
- **Motion:** crisp and deliberate (pop, bob, drift), never wobbly. Confetti-style bursts on merges and clues.
- **Type:** Playfair Display for titles, Jost for UI; readable body copy first.
- **Mobile UX:** key actions in the bottom third; targets 48px or larger; one-hand drag with a tap-tap alternative; silhouettes readable at small size; reduce-motion toggle; audio muted by default until enabled.
- **Audio:** a jaunty harpsichord waltz and short plucked effects, synthesised in-browser.
- **Production shortcuts:** procedural SVG characters and buildings; a shared puppet rig with swappable headgear; per-case palette swaps.

## 5. Monetization & Pacing

**Energy ("Candlelight"):** cap 100, ~1 per 3 min. Spawning costs 1; merging, pinning and confronting are free. Never gate story beats. Generous starter buffer, daily stipend, soft-lock protection.

**Cadence:** Case 1 (and ideally Case 2) fully free. New cases biweekly or as seasons. A daily "Cold Case" mini-board for retention. Cliffhanger endings drive return.

| Model | Fit | Notes |
|---|---|---|
| Case packs / season pass | ★★★★★ | Cleanest fit for episodic narrative |
| Cosmetics | ★★★★ | Board themes, string colours, detective outfits |
| Hint currency ("Inspiration") | ★★★★ | Reveal a clue location or next merge |
| Energy bundles | ★★★ | Modest, optional |
| Rewarded ads | ★★★ | Opt-in; PWA ad SDK support is limited |
| Subscription | ★★★ | Faster regen and unlocks, as an add-on |

**Fairness:** no selling answers; transparent costs; a non-paying daily player finishes each case in a reasonable window. Web payments (e.g. Stripe) avoid app-store cuts, but check current policy for target platforms.

**Metrics:** D1/D7/D30, case completion, drop-off by tier, empty-energy quit rate, pack vs energy conversion.

## 6. Technical Considerations

**Engine:** PixiJS v8 for the board and effects, HTML/CSS overlays for dialogue and case-file text, GSAP for tweens, Howler for audio. Phaser is a heavier alternative that prototypes faster.

**Rendering:**
- A 6×7–7×9 grid is trivial; cost is in effects. Use texture atlases, pooled sprites/particles (cap ~100–200), `cacheAsTexture` for static panels, and avoid full-screen filters (bake glows).
- Step "boil" animation on one shared ~10 fps timer, not per-sprite timers.
- Strings: `MeshRope` or `Graphics` quadratic curves with sag, redrawn only when dirty.
- Use `BitmapText` for dynamic in-canvas text.

**Mobile web:** cap `devicePixelRatio` at ~2 (1.5 on low-end); fixed logical resolution (e.g. 750×1334) with safe-area insets; Pointer Events, `touch-action: none`, drag threshold; 30 fps mode and pause when hidden; per-case asset loading and unloading, KTX2/Basis textures where supported.

**PWA:** Workbox service worker for offline; IndexedDB for saves with optional cloud sync; manifest and splash. Expect iOS quirks (storage eviction, limited push), so make saves resilient and encourage sign-in.

**Architecture:**
- **Data-driven content:** chains, cases, clues, dialogue and layouts in JSON so writers can ship cases without code.
- Deterministic game-state module separate from rendering (testable, server-verifiable).
- State machine for case flow (Scene → Web → Showdown).
- TypeScript + Vite; analytics funnels from day one.

**Budgets:** shell < 3 MB with lazy-loaded case assets; 60 fps on a mid-range 2–3-year-old Android; < 50 draw calls on the board screen.

## 7. Roadmap

1. **Digital prototype** of the merge → reveal → pin loop. ✅
2. **Contradiction merges** ✅. Witness statements come in two clashing variants; only a clashing pair merges into the clue.
3. **Scene progression and showdown** ✅. Study, Servants' Hall and Séance Parlour unlock as clues are found; a three-claim showdown ends the case.
4. **Art and audio pass** ✅ (procedural), then re-themed from gothic to **Dollhouse Cluedo**: pastel palette, hotel facade, flat puppet rig, confetti bursts, harpsichord waltz. See the [style guide](art-style-guide.html).
5. **Playtest** the pacing, then decide monetization numbers.
6. **PixiJS port** with real art, once the design has settled.
