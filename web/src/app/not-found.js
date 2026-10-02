import Link from "next/link";
import { ArrowUpRight, Signpost } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Container, buttonClass } from "@/components/ui/Primitives";

export const metadata = { title: "Page not found", description: "This page is off the map. Find your way back to EnRouteAR." };
export default function NotFound() {
  return <><Header /><main id="main" tabIndex={-1} className="flex min-h-[65dvh] items-center py-16"><Container className="text-center"><Signpost className="mx-auto mb-6 size-12 text-forest" strokeWidth={1.25} aria-hidden="true" /><p className="mb-4 font-mono text-sm text-muted">404 / A little off course</p><h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">This page is off the map.</h1><p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">The link may have changed, or the page no longer exists. Let’s get you heading in the right direction.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className={buttonClass()}>Back to home<ArrowUpRight className="size-4" aria-hidden="true" /></Link><Link href="/navigate" className={buttonClass("secondary")}>Open navigation</Link></div></Container></main><Footer /></>;
}
