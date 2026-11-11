# Merger Mystery

A pastel, dollhouse-styled (Wes Anderson × Cluedo) merge-puzzle × murder-mystery for mobile web.

- **Play the prototype:** `index.html` (single file, no build step): title screen, intro scene, guided first steps, then Case 1
- [Game Design Document](docs/GDD.md)
- [Art & audio style guide](docs/art-style-guide.md)
- [Accessibility](docs/accessibility.md) · [Analytics](docs/analytics.md)
- [Case 1: The Late Mr. Grimsby](docs/case-1-the-late-mr-grimsby.md)
- [Case 2: The Widow's Undertaker](docs/case-2-the-widows-undertaker.md)
- [Case 3: Murder on the Marmalade Express](docs/case-3-murder-on-the-marmalade-express.md)
- [Case 4: A Nasty Piece of Pâtisserie](docs/case-4-a-nasty-piece-of-patisserie.md)
- [Case 5: Dead Calm at Gull Rock](docs/case-5-dead-calm-at-gull-rock.md)
- [Case 6: The Phantom of the Pantomime](docs/case-6-the-phantom-of-the-pantomime.md)

## Hosting on GitHub Pages
Settings → Pages → *Deploy from a branch* → pick this branch, folder `/ (root)`.
The game is served at `https://<user>.github.io/Merger-Mystery/`, docs at `/docs/GDD.html`.

## Project layout
- `index.html`, `style.css`, `game.js`: the shell, theme and engine
- `cases/*.js`: one data file per case (chains, suspects, clues, scenes, showdown, intro). Add a case by adding a file and listing it in `index.html` and `sw.js`
- `analytics.js`: local-first play stats (opt-in sharing is off by default)
- `icons.js`: vector icons, generator composer, raven and scene banners
- `manifest.webmanifest`, `sw.js`, `icons/`: install and offline support
