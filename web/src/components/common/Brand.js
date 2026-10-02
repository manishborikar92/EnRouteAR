import Link from "next/link";
import { Navigation } from "lucide-react";

export default function Brand({ dark = false }) {
  return <Link href="/" aria-label="EnRouteAR home" className={`inline-flex min-h-11 shrink-0 items-center gap-2.5 ${dark ? "text-white" : "text-ink"}`}><span className={`grid size-9 place-items-center rounded-xl ${dark ? "bg-lime text-ink" : "bg-ink text-lime"}`}><Navigation className="size-5" strokeWidth={2} aria-hidden="true" /></span><span className="font-display text-xl font-bold tracking-tight">EnRoute<span className={dark ? "text-lime" : "text-muted"}>AR</span></span></Link>;
}
