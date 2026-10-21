import ContactLinks from "@/components/ui/ContactLinks";
import { EMAIL } from "@/lib/contact";
import s from "./study.module.css";

/** End of every case study: an invitation plus the email and X icons. */
export default function SayHi() {
  return (
    <div className={s.sayHi}>
      <div>
        <p className={s.sayHiKicker}>Let&rsquo;s build something interesting.</p>
        <p className={s.sayHiBig}>Say hi!</p>
        <p className={s.sayHiMail}><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
      <ContactLinks only={["email", "x"]} />
    </div>
  );
}
