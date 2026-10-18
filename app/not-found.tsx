import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "120px var(--gutter) 40px", display: "grid", gap: 24 }}>
      <h1 className="h-xl">This page doesn&rsquo;t exist.</h1>
      <p className="lede">The link may be old. The work and everything else is on the home page.</p>
      <div><Link className="btn" href="/">Go to the home page</Link></div>
    </div>
  );
}
