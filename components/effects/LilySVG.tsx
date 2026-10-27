import { useId } from "react";

const PETAL = "M0 0 C 13 -14, 12 -44, 0 -58 C -12 -44, -13 -14, 0 0Z";

// Pad radius and the notch (degrees, clockwise from 3 o'clock; upper left, where it stays in view).
const R = 92;
const NOTCH = [205, 223];
const at = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(Math.cos(a) * r).toFixed(2), +(Math.sin(a) * r).toFixed(2)];
};
const [n1x, n1y] = at(NOTCH[0], R);
const [n2x, n2y] = at(NOTCH[1], R);
const PAD = `M0 0 L${n2x} ${n2y} A${R} ${R} 0 1 1 ${n1x} ${n1y} Z`;

// Veins radiate every 22.5deg, skipping the notch.
const VEINS = Array.from({ length: 16 }, (_, i) => i * 22.5).filter((d) => d < NOTCH[0] - 4 || d > NOTCH[1] + 4);

const OUTER_OPACITY = [1, 0.9, 0.96, 0.86, 1, 0.92, 0.88, 0.97];
const INNER_OPACITY = [0.95, 0.88, 1, 0.9, 0.85, 0.98];

/** A water lily seen from above: notched pad, 8 outer + 6 inner petals, golden centre. Decorative only. */
export default function LilySVG(props: React.SVGProps<SVGSVGElement>) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pad = `${id}-pad`;
  const shade = `${id}-shade`;
  const clip = `${id}-clip`;

  return (
    <svg viewBox="-100 -100 200 200" aria-hidden focusable="false" {...props}>
      <defs>
        <radialGradient id={pad} cx="0" cy="0" r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B7E53" />
          <stop offset="0.6" stopColor="#2F6B45" />
          <stop offset="1" stopColor="#1F4A30" />
        </radialGradient>
        <radialGradient id={shade}>
          <stop offset="0" stopColor="#0B2414" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0B2414" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <path d={PAD} />
        </clipPath>
      </defs>

      <path d={PAD} fill={`url(#${pad})`} />
      <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="0.6" strokeLinecap="round">
        {VEINS.map((d) => {
          const [x, y] = at(d, R - 8);
          return <line key={d} x1="0" y1="0" x2={x} y2={y} />;
        })}
      </g>

      <circle r="62" fill={`url(#${shade})`} clipPath={`url(#${clip})`} />

      <g stroke="#E7B7C3" strokeWidth="0.5">
        {OUTER_OPACITY.map((o, i) => (
          <path key={i} d={PETAL} fill="#F7E3E8" opacity={o} transform={`rotate(${i * 45})`} />
        ))}
        {INNER_OPACITY.map((o, i) => (
          <path key={i} d={PETAL} fill="#F7E3E8" opacity={o} transform={`rotate(${i * 60 + 20}) scale(0.7)`} />
        ))}
      </g>

      <circle r="10" fill="#F2C14E" />
      <g fill="#D99A2B">
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-7" rx="1.2" ry="2.4" transform={`rotate(${i * 36})`} />
        ))}
      </g>
      <circle r="4" fill="#F2C14E" stroke="#D99A2B" strokeWidth="0.6" />
    </svg>
  );
}
