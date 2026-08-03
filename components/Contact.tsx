"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, MapPin, GitFork, Briefcase, FileDown, Check, Send } from "lucide-react";
import Reveal from "./Reveal";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import styles from "./Contact.module.css";

declare global {
  interface Window {
    turnstile?: { reset: (widgetId?: string) => void };
  }
}

type ContactProps = {
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
};

const initialFormState: ContactFormState = { status: "idle", message: null };

export default function Contact({
  email,
  phone,
  location,
  githubUrl,
  linkedinUrl,
  resumeUrl,
}: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [formState, formAction, isPending] = useActionState(submitContactForm, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status === "idle") return;
    window.turnstile?.reset();
    if (formState.status === "success") {
      formRef.current?.reset();
    }
  }, [formState]);

  const handleCopyEmail = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div className={styles.gridBg} />
      <Reveal className={styles.inner}>
        <div className={`${styles.eyebrow} mono`}>06 / CONTACT</div>
        <h2 className={styles.title}>Let&apos;s connect</h2>
        <p className={styles.lead}>
          Have a project, a role, or just want to talk shop? My inbox is always open.
        </p>
        <a href={`mailto:${email}`} onClick={handleCopyEmail} className={`${styles.emailBtn} mono`}>
          <Mail size={16} strokeWidth={2.25} />
          {email}
        </a>
        <div className={`${styles.infoRow} mono`}>
          <span className={styles.infoItem}>
            <Phone size={13} strokeWidth={2.25} />
            {phone}
          </span>
          <span className={styles.sep}>/</span>
          <span className={styles.infoItem}>
            <MapPin size={13} strokeWidth={2.25} />
            {location}
          </span>
        </div>
        <div className={styles.socialRow}>
          <a href={githubUrl} target="_blank" rel="noopener" className={`${styles.social} mono`}>
            <GitFork size={15} strokeWidth={2.25} />
            GITHUB
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener" className={`${styles.social} mono`}>
            <Briefcase size={15} strokeWidth={2.25} />
            LINKEDIN
          </a>
          <a href={resumeUrl} target="_blank" className={`${styles.social} mono`}>
            <FileDown size={15} strokeWidth={2.25} />
            RESUME.PDF
          </a>
        </div>

        <div className={styles.formDivider}>
          <span className={`${styles.formDividerLabel} mono`}>OR SEND A MESSAGE</span>
        </div>

        <form ref={formRef} action={formAction} className={styles.form}>
          {/* Honeypot — hidden from real visitors, real bots often fill every field. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={`${styles.fieldLabel} mono`}>
                Name
              </label>
              <input id="name" name="name" type="text" required className={styles.fieldInput} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={`${styles.fieldLabel} mono`}>
                Email
              </label>
              <input id="email" name="email" type="email" required className={styles.fieldInput} />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="message" className={`${styles.fieldLabel} mono`}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              minLength={10}
              className={styles.fieldTextarea}
            />
          </div>

          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />

          {formState.status === "error" && (
            <p className={`${styles.formMessage} ${styles.formMessageError} mono`}>{formState.message}</p>
          )}
          {formState.status === "success" && (
            <p className={`${styles.formMessage} ${styles.formMessageSuccess} mono`}>{formState.message}</p>
          )}

          <button type="submit" disabled={isPending} className={`${styles.submitBtn} mono`}>
            <Send size={14} strokeWidth={2.25} />
            {isPending ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>
      </Reveal>

      <div className={styles.toastWrap}>
        <AnimatePresence>
          {copied && (
            <motion.div
              className={`${styles.toast} mono`}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check size={14} strokeWidth={2.5} />
              Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
