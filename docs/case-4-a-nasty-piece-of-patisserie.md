---
layout: default
title: Case 4 — A Nasty Piece of Pâtisserie
---

# Case 4: A Nasty Piece of Pâtisserie

[Play the prototype](../) · [Design document](GDD.html) · [Case 3](case-3-murder-on-the-marmalade-express.html)

*Tone: bakery farce. The croquembouche has collapsed, and so has its maker.*

Content lives in `cases/case4.js`. Unlocks once Case 3 is solved.

**Solution in one line:** the food critic, Mr. Sugarplum, poisoned Monsieur Gâteau's marzipan because Gâteau was about to expose his bribes.

## Cast

| Character | Role | Hook |
|---|---|---|
| **Mr. Sugarplum** | Food critic, **culprit** | Tall, bald, spectacles, pink coat |
| **Chef Tarte** | Head pâtissier | White toque, shouts in two languages |
| **Madame Brioche** | Bakery owner | Flour like a veil |

## Clue graph

| Clue | Chain | Points to |
|---|---|---|
| Bitter Almond Marzipan | Test Kitchen: Sprinkle → Almond Shaving → Marzipan Bite → Slide | Sugarplum |
| Pink Icing on a Cuff | Icing Bench: Crumb → Smear → Cuff | Sugarplum |
| Review vs Receipt | Critics' Table: **contradiction merge** ("never taken a bribe" vs the £50 receipt) | Sugarplum |
| *Dented Rolling Pin* | Pastry Counter | nobody (**red herring**) |

## Scenes

| Scene | Chains | Unlocks when you have |
|---|---|---|
| Test Kitchen | Bake, Icing Bench | (start) |
| Critics' Table | Paper | Marzipan |
| Pastry Counter | Pin | Marzipan |
