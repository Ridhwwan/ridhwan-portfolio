/* eslint-disable @next/next/no-img-element -- light WebP copies are made at build time (scripts/optimize-images.mjs) */
import manifest from "@/lib/image-manifest.json";

type Entry = { w: number; h: number; widths: number[]; base: string };
const MANIFEST = manifest as Record<string, Entry>;

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  src: string;
  /** How wide the image shows on screen, e.g. "(max-width: 620px) 100vw, 33vw". */
  sizes?: string;
  /** Above the fold: load straight away and first. */
  priority?: boolean;
};

/**
 * An <img> that serves a light WebP at the width the screen needs (copies made by
 * scripts/optimize-images.mjs) and reserves its space so nothing jumps as it loads.
 * Images without copies (e.g. from Notion) fall back to a plain <img>.
 */
export default function Img({ src, sizes = "100vw", priority = false, alt = "", loading, ...rest }: Props) {
  const e = MANIFEST[src];
  const load = priority ? "eager" : (loading ?? "lazy");
  const fp = priority ? "high" : undefined;
  if (!e) return <img src={src} alt={alt} loading={load} fetchPriority={fp} decoding="async" {...rest} />;
  const srcSet = e.widths.map((w) => `${e.base}-${w}.webp ${w}w`).join(", ");
  return (
    <img
      src={`${e.base}-${e.widths.at(-1)}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={e.w}
      height={e.h}
      alt={alt}
      loading={load}
      fetchPriority={fp}
      decoding="async"
      {...rest}
    />
  );
}
