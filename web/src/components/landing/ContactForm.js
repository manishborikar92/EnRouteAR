"use client";

import { useState } from "react";
import { SendIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

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

  const inputClass =
    "w-full min-h-12 px-3.5 py-3 border border-line-bright rounded-xl bg-[#030a14]/55 text-t1 font-body text-base transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#7F90A6] focus:outline-none focus:border-route focus:bg-[#030a14]/80 focus:ring-4 focus:ring-route/25 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <form
      id="contact-form"
      data-spotlight="true"
      className="glass-panel grid gap-5 p-[clamp(22px,4vw,36px)] rounded-[26px]"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block font-semibold text-[0.92rem] text-t1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-semibold text-[0.92rem] text-t1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block font-semibold text-[0.92rem] text-t1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you're thinking…"
          required
          disabled={isSubmitting}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          id="send"
          busy={isSubmitting}
          disabled={isSubmitting}
        >
          <SendIcon className="w-5 h-5 shrink-0" />
          <span>{isSubmitting ? "Sending…" : "Send message"}</span>
        </Button>
      </div>

      {status.message && (
        <p
          className={`p-3.5 rounded-xl font-medium text-[0.94rem] ${
            status.type === "ok"
              ? "bg-[rgba(61,220,151,0.12)] border border-[rgba(61,220,151,0.35)] text-[#8CEBC0]"
              : "bg-[rgba(255,145,136,0.12)] border border-[rgba(255,145,136,0.35)] text-[#FFB8B1]"
          }`}
          id="form-status"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
