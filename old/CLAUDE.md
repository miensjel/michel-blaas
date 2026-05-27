# CLAUDE.md — Michel Bekkers Portfolio

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind v4
- Three.js voor procedurele 3D modellen (geen externe assets)
- Deploy: Vercel
- Code: GitHub

## Huisregels
- Nooit kleuren/fonts/spacing hardcoden — gebruik `@theme` tokens in `app/globals.css`
- Teksten in `content/home.ts`, niet in JSX
- Componenten in `components/`, één per file
- Three.js logica uitsluitend in `lib/scene.ts`
- Alle `<canvas>` elementen via `components/ThreeCanvas.tsx` (client component)
- Geen inline styles tenzij dynamisch noodzakelijk (bijv. bg kleur per canvas)
- Elke pagina exporteert eigen `metadata` (title, description, OG)

## Mapstructuur
- `app/` → layout, page, globals.css
- `components/` → één component per file
- `content/` → alle teksten als TypeScript objecten
- `lib/` → Three.js scene logica

## Kleurenpalet (in globals.css @theme)
- `--color-paper` → warm beige achtergrond (#ebe5db)
- `--color-ink` → donkere tekst (#1a1815)
- `--color-accent` → oranje highlight (#d65a1f)

## Fonts
- `--font-serif` → Instrument Serif (grote koppen)
- `--font-sans` → Geist (body tekst)
- `--font-mono` → Geist Mono (labels, meta)

## Workflow
- Nooit direct naar `main` — altijd via feature branch + PR
- Wachten op Vercel preview voor merge
