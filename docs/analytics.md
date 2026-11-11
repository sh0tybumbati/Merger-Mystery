---
layout: default
title: Merger Mystery — Analytics
---

# Analytics

[Play the prototype](../) · [Design document](GDD.html) · [Accessibility](accessibility.html)

**Privacy first:** all stats live on the player's own device (`localStorage`). Nothing is sent anywhere unless a developer sets `ANALYTICS_URL` in `analytics.js` *and* the player switches on "Share anonymous stats". No names, emails or free text are recorded, only event names, case/chain ids and numbers. There is no third-party tracking.

## What is recorded

| Group | Events |
|---|---|
| Session | `session_start`, `session_end` (seconds), active play time (counts only while the game screen is visible) |
| Funnel (per case, first time, with play-time offset) | intro started, first spawn, first merge, first generator upgrade, first clue, a room unlocked, first string pinned, showdown reached, case solved |
| Moves | `spawn` (chain, level), `merge` (chain, tier), `gen_upgrade`, `file_away`, `merge_refused` |
| Friction | `spawn_fail` (cooldown or full table), `idle` (seconds with nothing to do, and whether the table was full), `composure_out` (board or showdown), `link_bad`, `showdown_wrong` |
| Economy | `hint`, `hint_empty`, `mag_use`, `request_done` (reward type), `deliver_wrong`, `daily_claim` (streak) |
| Health | `error` (message and line number of script errors) |

The last 400 events are kept on the device, plus running totals per case.

## Reading it: Settings → Play stats

Shows sessions, total play time and, per case, plays, minutes, and which funnel steps were reached with the play time it took, plus counts of hints, Magnifiers, requests, wrong strings, idle waits and failed spawns. **Copy data** or **Download** exports everything as JSON, so a playtester can send it in.

## How to use it for tuning

| Question | Look at |
|---|---|
| Where do players quit? | Furthest funnel step per case |
| Is a case too long or short? | `case_solved` play-time offset (target about 60 minutes in the full game) |
| Are cooldowns too slow? | `idle` events and `spawn_fail` (cooldown) |
| Is the table too small? | `spawn_fail` (full) and `idle` with `full: true` |
| Is the showdown too hard? | `showdown_wrong` per claim and `composure_out` |
| Are hints and tools useful? | `hint`, `mag_use`, `request_done` against clues found |
| Are returning players claiming the daily reward? | `daily_claim` streaks |

## Turning on sharing later

1. Host a small endpoint that accepts a JSON `POST` (it receives `{id, v, summary, events}` with a random install id).
2. Set `ANALYTICS_URL` in `analytics.js`.
3. The Settings screen then shows "Share anonymous stats" (off by default). Events upload when the player leaves the game, through `navigator.sendBeacon`.
