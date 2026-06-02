# Pet's Afterlife - Shareable Static MVP

This folder is the standalone static MVP for Puffo.

## What It Demonstrates

- A pet photo starts the creation flow.
- The app extracts and displays visual DNA.
- The owner can adjust breed/body notes and tweak prompt.
- The generated Puffo preview uses a Petdex/OpenPets-style sprite package.
- Puffo's Home supports basic interactions: call, play, nap, and pet.
- Puffo can need space when over-interacted with.

## Files

```text
index.html
styles.css
app.js
Puffo.JPG
pets/puffo-v2-compact/
  pet.json
  spritesheet.webp
  contact-sheet.png
  validation.json
```

## Local Preview

From this folder:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/
```

## Deploy

This is a no-build static web app. You can deploy this folder directly to:

- Netlify Drop
- Vercel static project
- GitHub Pages
- Cloudflare Pages

For the first external feedback round, Netlify Drop is the fastest: drag this folder into Netlify Drop and share the generated URL.

## Current Limitation

This MVP simulates the AI generation flow. It does not yet call an AI image-generation backend or create a new spritesheet from uploaded photos.
