---
layout: default
title: Case 5 — Dead Calm at Gull Rock
---

# Case 5: Dead Calm at Gull Rock

[Play the prototype](../) · [Design document](GDD.html) · [Case 4](case-4-a-nasty-piece-of-patisserie.html)

*Tone: foggy seaside farce. The lighthouse keeper is dead, the lamp is out and the ferry swears it never sailed.*

Content lives in `cases/case5.js`. Unlocks once Case 4 is solved.

**Solution in one line:** the ferryman, Mr. Mossop, spoiled the lamp oil to wreck ships for salvage, and killed Captain Barnacle when he found out.

## Cast

| Character | Role | Hook |
|---|---|---|
| **Mr. Mossop** | Ferryman, **culprit** | Yellow oilskin, sou'wester, moustache |
| **Miss Gannet** | Naturalist | Spectacles; collects shells and remarks |
| **Admiral Fogg** | Retired navy | Tall, white moustache; every room is a ship |
| **Mrs. Winkle** | Cook | Opinions on soup and weather |

## Clue graph

| Clue | Chain | Points to |
|---|---|---|
| Cheap Paraffin in the Lamp | Lamp Room: Oil Drop → Sample Jar → Test Tube → Slide | Mossop |
| A Ferryman's Knot | Boat House: Tarry Fibre → Frayed Rope → Knot | Mossop |
| Ferry Alibi Broken | Harbour Office: **contradiction merge** ("never sailed" vs bell at two) | Mossop |
| *Cone Shell: "Venomous!"* | Shell Cabinet | nobody (**red herring**) |

## Scenes

| Scene | Chains | Unlocks when you have |
|---|---|---|
| The Lamp Room | Lamp, Rope | (start) |
| Harbour Office | Tide | Paraffin |
| Shell Cabinet | Shells | Paraffin |
