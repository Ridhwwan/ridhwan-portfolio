"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const TO = "salaudeenridhwan@gmail.com";

// v1: no mail service yet, so the form hands a ready-made email to the visitor's mail app.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "");
    const email = String(f.get("email") ?? "");
    const message = String(f.get("message") ?? "");
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required rows={6} />
      </label>
      <button className="btn" type="submit">Send message</button>
      <p className={styles.status} role="status">
        {sent ? `Your mail app should now be open with the message ready to send. If nothing opened, write to ${TO}.` : ""}
      </p>
    </form>
  );
}
