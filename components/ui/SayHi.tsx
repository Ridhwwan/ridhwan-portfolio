import ContactLinks from "@/components/ui/ContactLinks";
import { EMAIL } from "@/lib/contact";
import styles from "./SayHi.module.css";

/** The end of every page: an invitation, the email address, and the email and X icons. */
export default function SayHi() {
  return (
    <div className={styles.sayHi}>
      <div>
        <p className={styles.kicker}>Let&rsquo;s build something interesting.</p>
        <p className={styles.big}>Say hi!</p>
        <p className={styles.mail}><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
      <ContactLinks only={["email", "x"]} />
    </div>
  );
}
