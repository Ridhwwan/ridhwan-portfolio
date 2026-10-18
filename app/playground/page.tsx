import type { Metadata } from "next";
import TypeTester from "./TypeTester";
import { GlassCubes } from "@/components/three/Scene";
import styles from "./playground.module.css";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experiments in type and 3D. Currently: the KoreanFirst typeface.",
};

export default function Playground() {
  return (
    <div className="wrap">
      <section className={styles.head}>
        <div>
          <h1 className="h-xl">Playground</h1>
          <p className="lede">Things I&rsquo;m trying out. First up, the KoreanFirst typeface. Type anything below.</p>
        </div>
        <div className={styles.cube} aria-hidden>
          <GlassCubes layout="single" />
        </div>
      </section>
      <TypeTester />
    </div>
  );
}
