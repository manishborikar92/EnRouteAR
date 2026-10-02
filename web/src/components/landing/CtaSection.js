import { Camera, MapPin } from "lucide-react";
import LaunchButton from "@/components/common/LaunchButton";
import { Container, SectionHeading } from "@/components/ui/Primitives";

export default function CtaSection() {
  return <section id="start" aria-labelledby="cta-h" className="pb-16 lg:pb-20"><Container><div className="relative overflow-hidden rounded-3xl bg-lime p-7 sm:p-10 lg:p-12"><div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forest">Your next step starts here</p><SectionHeading id="cta-h">Find your way. In a new way.</SectionHeading><p className="mt-4 max-w-xl text-sm leading-relaxed text-forest">Open EnRouteAR on your phone, choose an available destination, and see your walking route in perspective.</p></div><div><LaunchButton id="cta-launch-btn" className="w-full">Launch navigation</LaunchButton><p className="mt-3 flex items-center justify-center gap-2 text-xs text-forest"><Camera className="size-3.5" aria-hidden="true" /><MapPin className="size-3.5" aria-hidden="true" />Camera &amp; location required</p></div></div></div></Container></section>;
}
