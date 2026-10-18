import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Ridhwan Salaudeen a message about work, collaboration or just to say hello.",
};

export default function Contact() {
  return (
    <div className={`wrap ${styles.page}`}>
      <PageHeader
        label="Contact"
        title="Want to work together, or just say hi?"
        lede="Leave a message and I'll reply by email."
      />
      <ContactForm />
    </div>
  );
}
