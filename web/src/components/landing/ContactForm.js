"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const endpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mgegpkeb";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMsg =
          data?.errors?.map((err) => err.message).join(", ") ||
          "Failed to send message. Please try again.";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="contact-form reveal bg-surface border border-border rounded-lg p-8 backdrop-blur-[12px]"
      onSubmit={handleSubmit}
    >
      <div className="form-group mb-5">
        <label
          htmlFor="name"
          className="block font-display text-[0.6rem] tracking-[0.14em] text-text-2 uppercase mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          disabled={isSubmitting}
          className="w-full bg-[rgba(0,0,0,0.25)] border border-border rounded-md px-4 py-3 font-body text-[0.95rem] text-text-1 outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-text-3 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,180,255,0.1)] disabled:opacity-50"
        />
      </div>

      <div className="form-group mb-5">
        <label
          htmlFor="email"
          className="block font-display text-[0.6rem] tracking-[0.14em] text-text-2 uppercase mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          disabled={isSubmitting}
          className="w-full bg-[rgba(0,0,0,0.25)] border border-border rounded-md px-4 py-3 font-body text-[0.95rem] text-text-1 outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-text-3 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,180,255,0.1)] disabled:opacity-50"
        />
      </div>

      <div className="form-group mb-5">
        <label
          htmlFor="message"
          className="block font-display text-[0.6rem] tracking-[0.14em] text-text-2 uppercase mb-2"
        >
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
          className="w-full h-[130px] resize-y bg-[rgba(0,0,0,0.25)] border border-border rounded-md px-4 py-3 font-body text-[0.95rem] text-text-1 outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-text-3 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,180,255,0.1)] disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary inline-flex items-center gap-2.5 bg-gradient-to-br from-primary to-primary-dk text-white no-underline font-display text-[0.72rem] font-semibold tracking-[0.1em] px-7 py-3.5 rounded-md border-none cursor-pointer relative overflow-hidden transition-[box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,180,255,0.4)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,255,255,0.15)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-250 hover:before:opacity-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 shrink-0" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
