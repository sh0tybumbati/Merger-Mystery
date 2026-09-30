---
layout: default
title: Case 1 — The Late Mr. Grimsby
---

# Case 1: The Late Mr. Grimsby

*Tone: gothic farce. Everyone is spindly, the manor leans, and the truth is petty.*

[Play the prototype](../) · [Design document](GDD.html)

## Premise

Ebenezer Grimsby, collector of stuffed ravens and owner of Grimsby Hollow, is found slumped over his chessboard, midnight tea untouched, a look of mild surprise on his face. The police inspector is out of his depth. The player is the **Consulting Apprentice**, a hollow-eyed child sleuth, aided by **Inspector Bloat** (bumbling, comic relief) and a talking raven, **Poe-tential** (hint system).

**Solution in one line:** Lady Vesper poisoned the tea with belladonna from her conservatory, and lied about her alibi.

## Cast

| Character | Role | Look | Secret |
|---|---|---|---|
| **Ebenezer Grimsby** | Victim | Tall, gaunt, stripe-suited | Was about to rewrite his will |
| **Lady Vesper Grimsby** | Widow — **culprit** | Bride-in-perpetual-mourning, lavender gloves | Would be cut out of the will; grows belladonna |
| **Dr. Alaric Morrow** | Physician, suspect | Enormous spectacles, black bag | Was at the club; hides a gambling debt (red herring motive) |
| **Mr. Crane** | Butler, suspect | Stork-like, unblinking | Allergic to flowers; hides that he reads the séance columns |
| **Mrs. Hemlock** | Maid, witness | Small, round, terrified | Heard the conservatory door |
| **Inspector Bloat** | Ally | Egg-shaped | — |

## Timeline (ground truth)

| Time | Event |
|---|---|
| 8:00 pm | Dinner. Everyone present |
| 8:30 pm | Lady Vesper "retires with a headache" |
| 8:50 pm | Mrs. Hemlock hears the **conservatory door**; Vesper cuts belladonna |
| 9:00 pm | Vesper doses the pot of tea in the study, snags her **lavender glove** on the window latch |
| 9:10 pm | Grimsby drinks the tea |
| 9:40 pm | Dr. Morrow is seen at the club (verified by three witnesses) |
| 11:00 pm | Butler Crane finds the body |

## Clue Graph

Each clue comes from a merge chain, points at a suspect, and raises a question the next clue answers.

```
 [Forensic Lab chain] ──► TOXIN: BELLADONNA ─────┐
                                                 │  "Rare bloom, needs a garden"
 [Witness Desk chain] ──► ALIBI BROKEN ──────────┼──► LADY VESPER
                                                 │  "In bed at nine? Door at ten to"
 [Trace Kit chain]   ──► LAVENDER GLOVE ─────────┘
                                                    "Her colour, her left hand"
 [Séance chain]      ──► SPIRIT BOARD: CRANE ──► ✗ RED HERRING (string goes limp)
```

| Clue | Chain | Points to | Answers | Raises |
|---|---|---|---|---|
| **Belladonna** | Forensic Lab (4 tiers) | Whoever has a garden: Vesper (or Crane, ruled out: allergy) | *How was he killed?* | *Who had access to the plant?* |
| **Alibi Broken** | Witness Desk (3 tiers) | Vesper | *Who lied?* | *What was she doing at 8:50?* |
| **Lavender Glove** | Trace Kit (3 tiers) | Vesper | *Who was in the study?* | *Left-handed? She held the cup left-handed at dinner.* |
| **Spirit Board: CRANE** | Séance (3 tiers) | Crane (false) | — | Tests player discipline: ghosts are not admissible |

### Extended clues for the full (non-prototype) version

| Clue | Chain | Purpose |
|---|---|---|
| Gambling IOU | Ledger | Gives Dr. Morrow a motive, then his club alibi clears him |
| Torn Will Draft | Ledger | Motive for Vesper (being cut out) |
| Club Roster | Witness Desk | Clears Dr. Morrow (Contradiction merge with his statement) |
| Allergy Note | Fibre | Clears Crane |

## Scenes (each is a merge board)

| Scene | Chains | Unlocks when you have | Yields |
|---|---|---|---|
| **The Study** | Forensic Lab, Trace Kit | (start) | *Belladonna*, *Lavender Glove* |
| **The Servants' Hall** | Witness Desk | Belladonna + Lavender Glove | *Alibi Broken* — a **contradiction merge**: Lady Vesper's statement (“in bed by nine”) must meet the Maid's (“conservatory door, ten to nine”) |
| **The Séance Parlour** | Séance | Belladonna | *Spirit Board: CRANE* (deliberate red herring) |

Each clue also sends a fresh Lv1 generator for the current scene.

## Showdown (Deduction Confrontation)

*Prototype: three claims, answered from the clues you found (the ghost clue is always a wrong option). The fourth, trap claim needs the Allergy Note and is planned for the full version.*

Lady Vesper makes four claims. The player presents a clue against each:

| Her claim | Correct clue |
|---|---|
| "I never touched the tea." | **Lavender Glove** (her glove on the study latch) |
| "I was in bed all evening." | **Alibi Broken** |
| "I hate poisons, I hate the garden!" | **Belladonna** (grown only in her conservatory) |
| "…it must have been the butler! The spirits said so!" | **(Trap)** presenting the Spirit Board fails, and she smirks; the real reply is *Allergy Note* / Crane's allergy |

Wrong answers cost Composure; at 0 the raven offers a hint and resets to full (never a hard fail).

## Beats & Dialogue Samples

- **Cold open:** *Bloat:* "He died of… surprise?" *Apprentice:* "Nobody dies of surprise. Bring me the teapot."
- **On the string board:** *Poe-tential:* "Red string for truth, grey for gossip. Caw."
- **Eureka:** the room desaturates to black-and-white, Vesper is spotlit, one red line traces from the glove to her hand.
- **Epilogue cliffhanger:** as Vesper is led away she smiles: *"You'll want to see what I left in the undertaker's parlour."* → Case 2: **The Widow's Undertaker**.

## Difficulty & Pacing Targets

| Metric | Target |
|---|---|
| Total spawns to solve (no lucky tiers) | ~40 (16 + 8 + 8 + 8) |
| Playtime (prototype) | 10–15 min |
| Playtime (full case) | ~60 min |
| Wrong-link tolerance | 3 before a hint |

## Data Shape (for the JSON pipeline)

```json
{
  "id": "case-1",
  "suspects": [{ "id": "vesper", "name": "Lady Vesper", "culprit": true }],
  "chains": [{ "id": "poison", "tiers": ["Dust Mote", "Powder Pinch", "Vial", "Slide"], "reveals": "belladonna" }],
  "clues": [{ "id": "belladonna", "title": "Toxin: Belladonna", "implicates": "vesper", "herring": false }],
  "scenes": [{ "id": "study", "sources": ["poison", "fibre"], "grid": [6, 7] }],
  "showdown": [{ "claim": "I never touched the tea.", "answer": "glove" }]
}
```
The playable prototype in `index.html` already keeps its content in a `CHAINS` / `SUSPECTS` / `CLUES` block in this spirit.
