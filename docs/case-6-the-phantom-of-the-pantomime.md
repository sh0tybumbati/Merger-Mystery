---
layout: default
title: Case 6 — The Phantom of the Pantomime
---

# Case 6: The Phantom of the Pantomime

[Play the prototype](../) · [Design document](GDD.html) · [Case 5](case-5-dead-calm-at-gull-rock.html)

*Tone: backstage theatre farce. The audience applauded the falling sandbag, because they thought it was the finale.*

Content lives in `cases/case6.js`. Unlocks once Case 5 is solved.

**Solution in one line:** the stage manager, Mr. Fennel, cut the sandbag rope to silence Sir Thespian Gloat, who had noticed Fennel selling the theatre's props.

## Cast

| Character | Role | Hook |
|---|---|---|
| **Mr. Fennel** | Stage manager, **culprit** | All in black, tall, speaks in cues |
| **Dame Dora** | Pantomime dame | Red hair, pink gown, larger than the doorway |
| **Maestro Crotchet** | Conductor | Bald, spectacles, moustache |
| **Percy Pennywhistle** | Understudy | Eleven years ready to step in |

## Clue graph

| Clue | Chain | Points to |
|---|---|---|
| The Cut Rope End | Fly Loft: Hemp Fibre → Frayed Strand → Cut Rope End | Fennel |
| Stripped Prop Inventory | Prop Store: Glitter → Paste Jewel → Inventory | Fennel |
| Chalk Thumbprint on the Winch | Stage Left: Chalk Dust → Smear → Thumbprint | Fennel |
| Rigging Alibi Broken | Prompt Desk: **contradiction merge** ("never touched it" vs stagehand saw him retie it) | Fennel |
| *Fan Mail: "I'll bring the curtain down!"* | Dressing Room | nobody (**red herring**) |

## Scenes

| Scene | Chains | Unlocks when you have |
|---|---|---|
| Stage Left | Fly Loft, Chalk | (start) |
| Prop Store | Props | Cut Rope |
| Prompt Desk | Cue | Cut Rope + Inventory |
| Star Dressing Room | Mail | Cut Rope |
