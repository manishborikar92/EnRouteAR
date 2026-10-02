import { MessageSquare } from "lucide-react";
import { Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui/Primitives";
import ContactForm from "@/components/landing/ContactForm";

export default function ContactSection() {
  return <section id="contact" aria-labelledby="contact-h" className="border-t border-line bg-white/40 py-16 lg:py-20"><Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20"><div><Eyebrow>Let’s make the next step better</Eyebrow><SectionHeading id="contact-h">A question?<br />A fresh perspective?</SectionHeading><p className="mt-5 max-w-sm leading-relaxed text-muted">Tell us what worked, what didn’t, or what you’d like to explore together. We’d love to hear from you.</p><div className="mt-7 flex items-start gap-3 text-sm text-muted"><MessageSquare className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><p className="max-w-xs leading-relaxed">For technical issues, include your device, browser, and what happened.</p></div><TextLink href="/contact#faq" className="mt-5">Explore common questions</TextLink></div><ContactForm /></Container></section>;
}
