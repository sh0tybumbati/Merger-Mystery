---
layout: default
title: Case 3 — Murder on the Marmalade Express
---

# Case 3: Murder on the Marmalade Express

[Play the prototype](../) · [Design document](GDD.html) · [Case 2](case-2-the-widows-undertaker.html)

*Tone: night-train farce. A locked compartment, a trolley of preserves and a very punctual conductor.*

Content lives in `cases/case3.js`. Unlocks once Case 2 is solved.

**Solution in one line:** the conductor, Mr. Pomfrey, smuggled an emerald in a hollow marmalade jar, and killed Baron Crumpet when the Baron found it.

## Cast

| Character | Role | Hook |
|---|---|---|
| **Mr. Pomfrey** | Conductor, **culprit** | Peaked cap, moustache, never late |
| **Colonel Brisket** | Retired soldier | Red coat, white moustache, shouts |
| **Madame Zola** | Fortune teller | Veil; predicts things after they happen |
| **Miss Quill** | Novelist | Spectacles, takes notes on everyone |

## Clue graph

| Clue | Chain | Points to |
|---|---|---|
| Hollow Marmalade Jar | Dining Car: Crumb → Sticky Spoon → Jar | Pomfrey |
| Duplicate Master Key | Luggage Van: Brass Filing → Shaving → Key | Pomfrey |
| Brass Button in the Baron's Fist | Sleeper Compartments: Thread → Fleck → Button | Pomfrey |
| Corridor Alibi Broken | Conductor's Corridor: **contradiction merge** ("never left" vs Dunmore telegram) | Pomfrey |
| *Tea Leaves: "Beware the Colonel"* | Fortune Corner | nobody (**red herring**) |

## Scenes

| Scene | Chains | Unlocks when you have |
|---|---|---|
| Sleeper Compartments | Dining Car, Sleeper Compartments | (start) |
| Luggage Van | Luggage | Jar |
| Conductor's Corridor | Log | Jar + Key |
| Fortune Corner | Tent | Jar |
