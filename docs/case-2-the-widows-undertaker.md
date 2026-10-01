---
layout: default
title: Case 2 — The Widow's Undertaker
---

# Case 2: The Widow's Undertaker

[Play the prototype](../) · [Design document](GDD.html) · [Case 1](case-1-the-late-mr-grimsby.html)

*Tone: deadpan funeral-parlour farce. Everybody is professionally sad, so tears prove nothing.*

All content lives in `cases/case2.js` (the same data shape as Case 1). Case 2 unlocks once Case 1 is solved.

## Premise

Lady Vesper's parting hint leads Inspector Bloat and the Apprentice to **Plum & Sons, Funeral Directors**. Mr. Ignatius Plum, the undertaker, has been found in the showroom's deluxe coffin. He didn't climb in by himself.

**Solution in one line:** the junior partner, Mr. Fitch, spiked the sherry with embalming fluid to hide that he had embezzled the funeral fund.

## Cast

| Character | Role | Hook | Secret |
|---|---|---|---|
| **Mr. Barnaby Fitch** | Junior partner, **culprit** | Stork-tall, hums when nervous | Forged Plum's signature on £400 of withdrawals |
| **Miss Prunella Plum** | Daughter | Bob, black dress, hat pins | Inherits, which makes her the obvious (wrong) suspect |
| **Rev. Dolour** | Vicar | Bald, spectacles, moustache | Merely likes the sherry |
| **Mrs. Weep** | Professional mourner | Veil | Cries on cue; has not laughed since 1998 |

## Clue graph

| Clue | Chain (tiers) | Points to | Notes |
|---|---|---|---|
| **Embalming Fluid in the Sherry** | Embalming Room: Drip → Sample Jar → Test Tube → Spectrum Slide | Fitch | Only two keys open the embalming room |
| **Cedar Boot Print** | Showroom Floor: Sawdust → Cedar Shaving → Boot Print | Fitch | Size eleven; only Fitch trims coffin lids |
| **Cooked Books** | Counting House: Receipt → Invoice → Bank Slip | Fitch | Signatures in Fitch's apprenticeship loops |
| **Hearse Log vs Statement** | Hearse Garage: Whisper → Rumour → Log Entry, then a **contradiction merge** | Fitch | "Left at six sharp" vs "signed back in at 8:05" |
| *Anonymous Letter: "MISS PLUM DID IT"* | Mourning Parlour: Stamp → Envelope → Poison-Pen Letter | nobody | **Red herring** |

## Scenes

| Scene | Chains | Unlocks when you have |
|---|---|---|
| Embalming Room | Embalming, Showroom Floor | (start) |
| Counting House | Ledger | Embalming Fluid |
| Hearse Garage | Hearse log | Embalming Fluid + Cooked Books |
| Mourning Parlour | Letters | Embalming Fluid |

## Showdown (four claims, the whole set)

| Fitch's claim | Correct clue |
|---|---|
| "I have never touched the embalming room key! (hum hum hum)" | Embalming Fluid |
| "The accounts? Immaculate." | Cooked Books |
| "I was never in the showroom. I don't even like cedar." | Cedar Boot Print |
| "I left at six sharp. Ask anyone! (hum)" | Hearse Log vs Statement |

The anonymous letter is an always-wrong option.
