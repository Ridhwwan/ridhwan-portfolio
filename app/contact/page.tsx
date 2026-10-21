import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import ContactLinks from "@/components/ui/ContactLinks";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Ridhwan Salaudeen a message about work, collaboration or just to say hello.",
};

export default function Contact() {
  return (
    <div className={`wrap ${styles.page}`}>
      <div>
        <PageHeader
          label="Contact"
          title="Want to work together, or just say hi?"
          lede="Leave a message and I'll reply by email. Or skip the form and reach me directly:"
        />
        <ContactLinks showEmailText className={styles.direct} />
      </div>
      <ContactForm />
    </div>
  );
}
