import type { Metadata } from "next";
import styles from "./about.module.css";
import PageHeader from "@/components/ui/PageHeader";
import Img from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ridhwan Salaudeen is a product designer, developer, teacher and lifelong student based in Nigeria.",
};

const F = (id: string) => `/work/img/${id}`;

export default function About() {
  return (
    <div className="wrap">
      <PageHeader label="About" title={<>I&rsquo;m a designer, builder, teacher and student</>} />

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
            grow. Clarity,
            scalability and a sound long-term strategy matter the same at every size.
          </p>
        </div>
        <figure className={styles.portrait}>
          <Img src={F("97aaHf49tOePKgw0z0uGAev7QgU.jpg")} alt="Portrait of Ridhwan Salaudeen" sizes="(max-width: 860px) 100vw, 40vw" priority />
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
            <Img key={id} src={F(id)} sizes="(max-width: 860px) 50vw, 25vw" />
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <div className="prose">
          <h2 className="h-lg">The teacher</h2>
          <p>Having benefited from other people&rsquo;s knowledge, I find it fulfilling to give back to people learning the way I did.</p>
        </div>
        <figure className={styles.video}>
          <video src="/work/img/u1dSpFl4jBU5QZriSwx2xmbbfw.mp4" controls playsInline preload="metadata" poster="/work/img/opt/81pJXMLq0ICGo6psgax9NdIF26g-644.webp" />
          <figcaption>Teaching a group of students web development at The Renewed Hope Agenda, 2025.</figcaption>
        </figure>
      </section>
    </div>
  );
}
