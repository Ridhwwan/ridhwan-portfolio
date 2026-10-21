import { Bike, BriefcaseBusiness, ShoppingBag, Users } from "lucide-react";
import type { MapPerson } from "./types";
import s from "./study.module.css";

const ICONS = { customer: ShoppingBag, courier: Bike, owner: BriefcaseBusiness, team: Users };

type Props = { top: MapPerson[]; hub: string; bottom: MapPerson[] };

function Person({ p }: { p: MapPerson }) {
  const I = ICONS[p.icon];
  return (
    <span className={s.person}>
      <span className={s.avatar} aria-hidden><I size={26} strokeWidth={1.6} /></span>
      {p.name}
    </span>
  );
}

/** Who connects through the product: people on top, the product in the middle, people below. */
export default function UserMap({ top, hub, bottom }: Props) {
  const names = (l: MapPerson[]) => l.map((p) => p.name).join(" and ");
  return (
    <div className={s.map} role="img" aria-label={`${names(top)} connect through ${hub} to ${names(bottom)}`}>
      <div className={s.mapRow}>{top.map((p) => <Person key={p.name} p={p} />)}</div>
      <svg className={s.mapLines} viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden>
        <path d="M100 0 V20 Q100 30 110 30 H190 Q200 30 200 40 V60 M300 0 V20 Q300 30 290 30 H210 Q200 30 200 40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={s.hub}>{hub}</span>
      <svg className={s.mapLines} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden>
        <path d="M200 0 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={s.mapRow}>{bottom.map((p) => <Person key={p.name} p={p} />)}</div>
    </div>
  );
}
