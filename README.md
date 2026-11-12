# Yu Jin's Little World

Personal site of Yu Jin Jeong: an interactive miniature room with projects, experience, notes, and a way to say hello.

Plain HTML, CSS and JavaScript. No build step.

- `index.html` — page shell and the front-door intro
- `world.js` — the room, the character, panels and journal posts
- `world.css` — styles
- `audio/`, `images/`, `logos/` — assets

To preview locally: `python3 -m http.server 8777` and open http://127.0.0.1:8777/

To add a journal post, add an entry at the top of the `posts` list in `world.js`.
