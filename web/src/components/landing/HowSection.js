import { Camera, MapPin, Navigation } from "lucide-react";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";

const steps = [
  { icon: Camera, title: "Open up a new view.", text: "Launch navigation on your phone. Allow location and camera access when your browser asks." },
  { icon: MapPin, title: "Choose your destination.", text: "Pick a place from the available list, then tap Navigate to calculate your walking route." },
  { icon: Navigation, title: "Find your direction.", text: "Use the AR markers and satellite map to orient yourself. Check your surroundings before moving." },
];

export default function HowSection() {
  return <section id="how" aria-labelledby="how-h" className="border-t border-line py-16 lg:py-20"><Container><div className="grid gap-5 md:grid-cols-2 md:items-end"><div><Eyebrow>01 / A simpler start</Eyebrow><SectionHeading id="how-h">From here to there.<br />In three steps.</SectionHeading></div><p className="max-w-sm text-base leading-relaxed text-muted md:justify-self-end">A familiar destination picker. A different way to see the journey.</p></div><ol className="mt-10 grid gap-4 md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, i) => <li key={title} className="rounded-2xl border border-line bg-white/50 p-6 lg:p-8"><div className="mb-8 flex items-center justify-between"><Icon className="size-6 text-forest" strokeWidth={1.5} aria-hidden="true" /><span className="font-mono text-xs text-muted">0{i + 1}</span></div><h3 className="mb-3 font-display text-xl font-bold tracking-tight">{title}</h3><p className="text-sm leading-relaxed text-muted">{text}</p></li>)}</ol></Container></section>;
}
