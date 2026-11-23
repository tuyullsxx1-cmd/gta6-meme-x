# GTA 6 meme — launch-day sick day

A meme about GTA 6 launch day: the make.fun ghost calls in "sick" so it can play GTA 6 (Vice City) all day on the couch.

- Picture: `meme.png` (in the workspace, posted to X) — the make.fun ghost (real mascot from https://make.fun/press/, mark-1024.png) sitting on the sofa in front of a TV showing a neon Vice City sunset, a November 2026 calendar with launch day circled, a game controller and a crumpled sick note on the coffee table. Caption in the picture: "GTA 6 LAUNCH DAY" / "Sorry boss, I'm 'sick'."
- Post text (see `CAPTION.txt` in the workspace): the sick-day joke, make.fun, @makefunai, and play code `makefun-panther-reef-newt`.

## How to submit

1. Post the meme + caption to X from @tuyullsxxzv.
2. Replace `POST.json` with the real post URL: `{"url": "https://x.com/tuyullsxxzv/status/<id>"}`.
3. Submit this repo to make.fun (competition `gta6-meme-x-01`).

## Program

`main.ts` (Node 22, stdlib only) copies `POST.json` to `/output/POST.json`. That is all it does; the house reads the post itself from X.
