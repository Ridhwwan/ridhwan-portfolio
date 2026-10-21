import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "table" }>;

/** Stages across, rows down: a journey map or service blueprint. Scrolls sideways on phones. */
export default function Table({ label, columns, rows }: P) {
  return (
    <div className={s.blockGap}>
      {label && <p className={s.mini}>{label}</p>}
      <div className={s.tableWrap} tabIndex={0} role="region" aria-label={label ?? "Table"}>
        <table className={s.table}>
          <thead>
            <tr><th scope="col">Stage</th>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className={r.tone === "pain" ? s.trPain : r.tone === "gain" ? s.trGain : undefined}>
                <th scope="row">{r.name}</th>
                {r.cells.map((c, i) => <td key={i}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
