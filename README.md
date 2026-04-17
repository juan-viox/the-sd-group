# The SD Group

Cinematic personal-brand website for **Sarah De Jesus**, bilingual REALTOR® at Keller Williams Village Square in Ridgewood, NJ.

- **Live:** https://thesdgroup.co
- **Vibe:** Editorial Luxury — Ink · Bone · Champagne · Moss
- **Type:** Single-page, vanilla HTML + GSAP, no build step
- **Languages:** English + Español (live toggle)
- **Voice:** Bilingual ElevenLabs concierge embedded

## Structure

```
site/
  index.html              single self-contained page
  assets/
    logo-full.png         full SD monogram + wordmark
    hero-static.jpg       hero static fallback (C3 white farmhouse)
    frames/               121 scroll-scrubbed hero frames (Kling v3 Pro 4K)
    images/               neighborhood tiles + founder portrait
  robots.txt
  sitemap.xml
vercel.json               routing + cache headers
```

## Deploy

Push to `main` → Vercel auto-deploys.

Custom domain `thesdgroup.co` is served via Cloudflare DNS pointing at Vercel.

## Swap real photos

Replace:
- `site/assets/images/sarah-portrait.jpg` — Sarah's final headshot
- Neighborhood tiles as needed

Then push to main.

## Voice agent

- Agent ID: `agent_1201kpe46cqff3fr1bnaa6m59244`
- ElevenLabs ConvAI, bilingual (EN + ES)
- Embedded as `<elevenlabs-convai>` widget in the Contact section

## Design system

- `DESIGN.md` — full token spec
- `tokens.json` — machine-readable exports

Built with VioX AI · Cinematic Design Studio.
