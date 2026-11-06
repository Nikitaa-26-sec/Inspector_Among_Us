# The Inspector Among Us 🔍

A 3D detective game built for the **BIS Hackathon** (Problem 3: The Locked Classroom).
You are a student locked in a classroom. Someone tampered with the door lock. Check clues, question classmates and report the culprit before you run out of lives.

## Run it
Open `index.html` in a browser. Everything is local, so no internet or build step is needed.
(Or run `python3 -m http.server` in this folder and visit http://localhost:8000.)

## Project structure
```
index.html        page structure (menus, HUD, overlays)
css/style.css     all styling
css/fonts.css     self-hosted Google Fonts (Chakra Petch, Nunito)
fonts/            font files (.woff2)
lib/three.min.js  Three.js r128 (3D engine, MIT licence)
js/audio.js       Web Audio API sounds (footsteps, chimes, ambient hum)
js/world.js       Three.js scene: classroom, Labubu-style characters, camera, movement
js/game.js        rules, levels, clues, accusations, UI and keyboard input
```

## How to play
1. **Check** clues at the door panel 🚪, switchboard 🎛️ and (Level 2+) the window 🪟.
2. **Ask** students what they carry. Their colour, residue and tool show on their name tags.
3. **Accuse** the one student who matches **all** your clues. A wrong guess costs a life.

Controls: `W A S D` / arrows / joystick to move, drag to turn the camera, scroll to zoom, `E` or `Space` for the main button, `M` to mute, `H` for help.

## Levels
| Level | Clues | Look-alike students | Lives | Timer |
|---|---|---|---|---|
| 1 | 2 | 0 | 3 | none |
| 2 | 3 | 1 | 3 | none |
| 3 | 3 | 2 | 2 | 110 s |

## BIS connection
Each level ends with a BIS tip about a real standard: IS 1293 (plugs and socket-outlets), IS 694 (PVC insulated cables), IS 15683 (portable fire extinguishers).
> Verify these standard numbers on the official BIS catalogue before relying on them.

## Credits and licences
- [Three.js](https://threejs.org/) r128, MIT (see `lib/THREE-LICENSE.txt`)
- Fonts via [Fontsource](https://fontsource.org/): Chakra Petch and Nunito, SIL Open Font License

## Limitations
Student replies come from a rules engine, not a live AI model. Characters are built from basic 3D shapes in code.
