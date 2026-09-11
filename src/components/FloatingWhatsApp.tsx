"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.contact.whatsappLink(
        "Hi Inventus Global, I am on your website and would like to connect with your senior growth team."
      )}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Connect with Inventus Global on WhatsApp"
      title="Chat on WhatsApp"
    >
      <div className={styles.pulse} />
      <MessageCircle size={28} />
    </a>
  );
}
