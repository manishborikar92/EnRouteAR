import { ScanLine, Map, Compass } from "lucide-react";
import { Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui/Primitives";
import CameraPreview from "@/components/landing/CameraPreview";

const features = [
  { icon: ScanLine, title: "Directions with a sense of place", text: "GPS-positioned route markers bring your walking path into your camera view." },
  { icon: Map, title: "The detail. And the bigger picture.", text: "An interactive satellite map shows your route and position alongside the AR view." },
  { icon: Compass, title: "Your bearings, at a glance", text: "Follow your device heading, explore the map, or recenter with a single control." },
];

export default function AboutSection() {
  return <section id="about" aria-labelledby="about-h" className="bg-ink py-16 text-white lg:py-20"><Container><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div><Eyebrow dark>02 / Two views. One journey.</Eyebrow><SectionHeading id="about-h">Not just a line on a map.<br /><span className="text-lime">A way to see it.</span></SectionHeading><ul className="mt-8 divide-y divide-white/15">{features.map(({ icon: Icon, title, text }) => <li key={title} className="flex gap-4 py-5"><Icon className="mt-1 size-5 shrink-0 text-lime" aria-hidden="true" /><div><h3 className="font-display text-lg font-bold">{title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{text}</p></div></li>)}</ul><TextLink href="/about" className="mt-4 text-lime">Get to know EnRouteAR</TextLink></div><CameraPreview /></div></Container></section>;
}
