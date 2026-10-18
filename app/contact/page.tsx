import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { GlassCubes } from "@/components/three/Scene";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Ridhwan Salaudeen a message about work, collaboration or just to say hello.",
};

export default function Contact() {
  return (
    <div className={`wrap ${styles.page}`}>
      <div className={styles.copy}>
        <h1 className="h-xl">Want to work together, or just say hi?</h1>
        <p className="lede">Leave a message and I&rsquo;ll reply by email.</p>
        <div className={styles.cube} aria-hidden>
          <GlassCubes layout="single" />
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
