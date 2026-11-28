"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useActivePreview } from "@/components/playground/useActivePreview";
import type { CadModel } from "@/lib/cad-models";
import styles from "./CadCard.module.css";

/**
 * A card for one CAD model. Shows the thumbnail centred on a tinted
 * background. Small view-switcher chips let visitors flip between
 * perspectives without leaving the page. The whole card links to
 * the Onshape document.
 */
export default function CadCard({ model }: { model: CadModel }) {
  const ref = useRef<HTMLElement>(null);
  const active = useActivePreview(ref);
  const [viewIdx, setViewIdx] = useState(0);
  const current = model.views[viewIdx] ?? model.views[0];

  return (
    <li className={styles.card}>
      <article ref={ref} data-active={active || undefined} data-lily>
        <div className={styles.thumb} style={{ background: `color-mix(in srgb, ${model.color} 12%, var(--tile))` }}>
          <Image
            src={current.src}
            alt={`${model.name} — ${current.alt}`}
            width={600}
            height={600}
            sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
        </div>

        <div className={styles.text}>
          <h3 className={styles.name}>
            <a href={model.link} target="_blank" rel="noopener noreferrer">{model.name}</a>
          </h3>
          <p className={styles.label}>CAD model · Onshape</p>
        </div>

        {model.views.length > 1 && (
          <div className={styles.views}>
            {model.views.map((v, i) => (
              <button
                key={v.src}
                type="button"
                className={styles.viewBtn}
                data-selected={i === viewIdx || undefined}
                onClick={() => setViewIdx(i)}
                aria-label={v.alt}
                style={{ background: `color-mix(in srgb, ${model.color} 10%, var(--tile))` }}
              >
                <Image src={v.src} alt="" width={32} height={32} sizes="32px" />
              </button>
            ))}
          </div>
        )}
      </article>
    </li>
  );
}
