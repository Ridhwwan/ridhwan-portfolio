# ridhwansalaudeen.com

Ridhwan Salaudeen's portfolio. Next.js 16 (App Router), React Three Fiber.

## Theme layers
- **Site theme (Prism):** iridescent glass cubes on a cool fog ground. Tokens in `app/globals.css`, the glass material in `components/three/GlassCubes.tsx`.
- **Case study skeleton:** every case study is a flip-through folio (`components/book/`). Pages are data in `lib/projects.ts`.
- **Per-project theme:** each project in `lib/projects.ts` has its own `theme` (palette, fonts, decoration). Decorations live at the bottom of `components/book/book.css`.

## Images
Case study and About images are served from `public/work/img`. `npm run images` (also run automatically before every build) copies any that are missing from the old Framer site. Run it once locally and commit `public/work/img` so the site no longer depends on Framer.

## To do
- BentoSMS case study is a draft at `/work/bentosms` (not linked, not indexed). The home card opens bentosms.com until it's reviewed.
