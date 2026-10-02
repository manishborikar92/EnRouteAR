"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, MapPinOff } from "lucide-react";
import { buttonClass } from "@/components/ui/Primitives";

export default function ErrorState({ error, reset, title = "A small detour.", description = "This page couldn’t load. Please try again, or head back home." }) {
  useEffect(() => { console.error("EnRouteAR page error:", error); }, [error]);
  return <main id="main" className="grid min-h-dvh place-items-center bg-paper px-5 text-ink"><div className="max-w-lg rounded-3xl border border-line bg-white p-8 text-center shadow-panel sm:p-12"><MapPinOff className="mx-auto mb-6 size-10 text-forest" strokeWidth={1.5} aria-hidden="true" /><h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1><p className="mt-4 text-sm leading-relaxed text-muted">{description}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={reset} className={buttonClass()}><RotateCcw className="size-4" aria-hidden="true" />Try again</button><Link href="/" className={buttonClass("secondary")}><ArrowLeft className="size-4" aria-hidden="true" />Back home</Link></div></div></main>;
}
