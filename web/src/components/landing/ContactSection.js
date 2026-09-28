import { MapPin, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      className="content-section alt-bg relative z-10 py-[100px] px-10 max-md:py-[72px] max-md:px-6 bg-gradient-to-b from-bg-alt to-[rgba(4,26,42,0.5)] border-y border-border"
      id="contact"
    >
      <div className="section-inner max-w-[1200px] mx-auto">
        <div className="section-label reveal flex items-center gap-3.5 font-display text-[0.6rem] tracking-[0.22em] text-primary uppercase mb-5">
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
          CONTACT US
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
        </div>

        <h2 className="section-title reveal font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-text-1 mb-[52px]">
          Get in{" "}
          <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <div className="contact-layout grid grid-cols-[1fr_1.4fr] max-lg:grid-cols-1 gap-[60px] items-start">
          <div className="contact-info reveal">
            <p className="text-[0.96rem] text-text-2 leading-[1.8] mb-7">
              Have questions about the project, want to collaborate, or found a bug? Fill out the
              form and our team will get back to you.
            </p>
            <div className="contact-item flex items-center gap-3 text-[0.88rem] text-text-2 mb-3.5">
              <MapPin className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={1.5} />
              KITS Ramtek, Nagpur, Maharashtra
            </div>
            <div className="contact-item flex items-center gap-3 text-[0.88rem] text-text-2 mb-3.5">
              <Mail className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={1.5} />
              via kits.edu contact portal
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
