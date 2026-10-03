import { PinIcon, MailIcon } from "@/components/common/Icons";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1 bg-gradient-to-b from-white/[0.04] to-white/[0.008] border-b border-line"
      id="contact"
      aria-labelledby="contact-h"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(32px,6vw,80px)] items-start min-[56.25em]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <h2
            id="contact-h"
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-t1"
          >
            Get in touch
          </h2>
          <p className="text-t2 text-[1.08rem] max-w-[56ch] [text-wrap:pretty]">
            Have questions about the project, want to collaborate, or found a bug?
            Fill out the form and our team will get back to you.
          </p>
          <ul className="grid gap-3.5 mt-7 list-none p-0">
            <li className="flex gap-3 items-center text-t2 text-base">
              <PinIcon className="w-5 h-5 shrink-0 text-route" />
              <span>KITS Ramtek, Nagpur, Maharashtra</span>
            </li>
            <li className="flex gap-3 items-center text-t2 text-base">
              <MailIcon className="w-5 h-5 shrink-0 text-route" />
              <span>via kits.edu contact portal</span>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
