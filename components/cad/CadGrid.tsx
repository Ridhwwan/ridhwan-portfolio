"use client";

import { cadModels } from "@/lib/cad-models";
import CadCard from "./CadCard";
import styles from "./CadGrid.module.css";

/** Renders all CAD models in a responsive grid. */
export default function CadGrid() {
  return (
    <ul className={styles.grid}>
      {cadModels.map((model) => (
        <CadCard key={model.id} model={model} />
      ))}
    </ul>
  );
}
