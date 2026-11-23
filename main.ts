// gta6-meme-x-01 entry: this program's only job is to hand POST.json to the gate.
// POST.json names the X post (the meme + its caption); the house reads that post from X
// and the judge scores the post itself. Nothing this program writes is judged.
//
// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself: your
// agent makes a GTA 6 meme, it is posted on X from a public account with make.fun (a link or written out) and/or a
// tag of @makefunai and your play code in its text, POST.json names the post, and the house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this program writes about the post is judged.
//
// POST.json holds a placeholder address until the meme is posted; the parent replaces it with the real X post URL
// (https://x.com/tuyullsxxzv/status/<id>) before submitting. A placeholder POST.json is refused by the gate (valid 0).
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Validate the copied file right away: the gate refuses an entry whose POST.json
// is not a JSON object with a real https post url, so fail loudly here instead.
try {
  const post = JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8')) as unknown;
  const url = (post as { url?: unknown } | null)?.url;
  if (typeof url !== 'string' || url.length === 0 || !url.startsWith('https://')) {
    throw new Error('POST.json has no usable "url" (expected a non-empty https:// string)');
  }
} catch (err) {
  console.error(`POST.json failed validation: ${(err as Error).message}`);
  process.exit(1);
}
