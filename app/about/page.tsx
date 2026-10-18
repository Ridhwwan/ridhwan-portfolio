/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ridhwan Salaudeen is a product designer, developer, teacher and lifelong student based in Nigeria.",
};

const F = (id: string) => `/work/img/${id}`;

export default function About() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <h1 className="h-xl">I&rsquo;m a designer, builder, teacher and student</h1>
      </header>

      <section className={styles.block}>
        <div className="prose">
          <h2 className="h-lg">The designer</h2>
          <p>
            I&rsquo;m a product designer and software developer for long-term, end-to-end digital products. I help
            teams build scalable, accessible solutions that feel natural to use, even for people who&rsquo;ve never seen
            them before.
          </p>
          <p>
            My approach is grounded in long-term strategy and planning, component-based design from the ground up, and
            design systems documented so anyone on the team can understand what&rsquo;s being built. I prioritise
            function over form, because form is part of function.
          </p>
          <p>
            I&rsquo;ve worked with startups, small businesses and enterprise companies to refine their infrastructure and
            grow revenue, including one that processed over $40 million in transactions in three years. Clarity,
            scalability and a sound long-term strategy matter the same at every size.
          </p>
        </div>
        <figure className={styles.portrait}>
          <img src={F("97aaHf49tOePKgw0z0uGAev7QgU.jpg")} alt="Portrait of Ridhwan Salaudeen" />
        </figure>
      </section>

      <section className={styles.block}>
        <div className="prose">
          <h2 className="h-lg">The student and builder</h2>
          <p>
            I&rsquo;m a habitual learner who likes merging fields to get somewhere new. Curiosity from tinkering as a
            kid led me into robotics, AI engineering and software development.
          </p>
        </div>
        <div className={styles.gallery}>
          {["ItxhDVbd489k63JPrtCHkea2gc.jpg", "HxHVvH1TOEyOz6CK3iDI00FuSDo.png", "nwI111HKBHRJy4rRtH0GURt1HE.png", "57p1oPO8XiMsT2uE46P7GcxYOI.png"].map((id) => (
            <img key={id} src={F(id)} alt="" loading="lazy" />
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <div className="prose">
          <h2 className="h-lg">The teacher</h2>
          <p>Having benefited from other people&rsquo;s knowledge, I find it fulfilling to give back to people learning the way I did.</p>
        </div>
        <figure className={styles.video}>
          <video src="/work/img/u1dSpFl4jBU5QZriSwx2xmbbfw.mp4" controls playsInline preload="metadata" poster={F("81pJXMLq0ICGo6psgax9NdIF26g.png")} />
          <figcaption>Teaching a group of students web development at The Renewed Hope Agenda, 2025.</figcaption>
        </figure>
      </section>
    </div>
  );
}
