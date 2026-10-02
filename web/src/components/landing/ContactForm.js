"use client";

import { useState } from "react";
import { ArrowUpRight, LoaderCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { buttonClass } from "@/components/ui/Primitives";

const fieldClass = "w-full min-h-12 rounded-xl border border-line bg-paper/60 px-4 py-3 text-base text-ink transition-colors placeholder:text-muted focus:border-forest focus:bg-white disabled:opacity-60";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const endpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
    "https://formspree.io/f/mgegpkeb";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`${res.status}`);

      setFormData({ name: "", email: "", message: "" });
      setStatus({
        type: "ok",
        message: "Message sent. We’ll reply to the email you provided.",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus({
        type: "bad",
        message:
          "Your message wasn’t sent. Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" aria-label="Contact the EnRouteAR team" className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-panel sm:p-8" onSubmit={handleSubmit}>
      <div className="mb-1"><h2 className="font-display text-2xl font-bold tracking-tight">Send us a message</h2><p className="mt-2 text-sm text-muted">All fields are required.</p></div>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold">Your name</label>
        <input
          className={fieldClass}
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label>
        <input
          className={fieldClass}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">Your message</label>
        <textarea
          className={`${fieldClass} min-h-36 resize-y`}
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you're thinking…"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className={buttonClass("primary", "w-full sm:w-auto")}
          id="send"
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? "Sending…" : "Send message"}</span>
          {isSubmitting ? <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-muted">Your name, email, and message are sent to the team through Formspree. Please don’t include sensitive information.</p>
      <div id="form-status" role="status" aria-live="polite" aria-atomic="true">
        {status.message && <p className={`flex items-start gap-2 rounded-xl border p-4 text-sm leading-relaxed ${status.type === "ok" ? "border-success/25 bg-success/5 text-success" : "border-danger/25 bg-danger/5 text-danger"}`}>
          {status.type === "ok" ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}{status.message}
        </p>}
      </div>
    </form>
  );
}
