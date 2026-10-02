import { PinIcon, MailIcon } from "@/components/common/Icons";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      className="sec white"
      id="contact"
      aria-labelledby="contact-h"
      style={{ borderTop: 0 }}
    >
      <div className="wrap split b">
        <div>
          <h2 id="contact-h" className="mb-5">
            Get in touch
          </h2>
          <p className="lead">
            Have questions about the project, want to collaborate, or found a bug?
            Fill out the form and our team will get back to you.
          </p>
          <ul className="info">
            <li>
              <PinIcon className="i" />
              <span>KITS Ramtek, Nagpur, Maharashtra</span>
            </li>
            <li>
              <MailIcon className="i" />
              <span>via kits.edu contact portal</span>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
