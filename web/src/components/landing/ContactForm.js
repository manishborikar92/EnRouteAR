"use client";

import { useState } from "react";
import { SendIcon } from "@/components/common/Icons";

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
    <form id="contact-form" className="glass-form" onSubmit={handleSubmit}>
      <div className="f">
        <label htmlFor="name">Name</label>
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
        />
      </div>

      <div className="f">
        <label htmlFor="email">Email</label>
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
        />
      </div>

      <div className="f">
        <label htmlFor="message">Message</label>
        <textarea
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

      <div className="fs">
        <button
          type="submit"
          className="btn"
          id="send"
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        >
          <SendIcon className="i" />
          <span>{isSubmitting ? "Sending…" : "Send message"}</span>
        </button>
      </div>

      {status.message && (
        <p
          className={`msg ${status.type === "ok" ? "ok" : "bad"}`}
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
