# ridhwansalaudeen.com

Ridhwan Salaudeen's portfolio. Next.js 16 (App Router), React Three Fiber.

## Theme layers
- **Site theme (Prism):** iridescent glass cubes on a cool fog ground. Tokens in `app/globals.css`, the glass material in `components/three/GlassCubes.tsx`.
- **Case study skeleton:** every case study is a flip-through folio (`components/book/`). Pages are data in `lib/projects.ts`.
- **Per-project theme:** each project in `lib/projects.ts` has its own `theme` (palette, fonts, decoration). Decorations live at the bottom of `components/book/book.css`.

## To do
- Add KoreanFirst font files to `public/fonts/` (see the README there).
- Case study images are hotlinked from framerusercontent.com; move them into `public/work/` before the Framer site goes away.
- BentoSMS case study needs product screenshots.
