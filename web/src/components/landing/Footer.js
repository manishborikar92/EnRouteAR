import Link from "next/link";
import Brand from "@/components/common/Brand";
import { Container } from "@/components/ui/Primitives";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return <footer className="border-t border-line py-10"><Container><div className="flex flex-col justify-between gap-8 sm:flex-row"><div><Brand /><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">A little perspective.<br />A clearer way forward.</p></div><nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted sm:gap-x-12"><Link href="/#how" className="flex min-h-11 items-center hover:text-ink">How it works</Link><Link href="/about" className="flex min-h-11 items-center hover:text-ink">About the product</Link><Link href="/contact" className="flex min-h-11 items-center hover:text-ink">Get in touch</Link><Link href="/navigate" className="flex min-h-11 items-center gap-2 text-ink">Open navigation<ArrowUpRight className="size-4" aria-hidden="true" /></Link></nav></div><div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-xs text-muted"><p>© {new Date().getFullYear()} EnRouteAR</p><p>Built for a different perspective.</p></div></Container></footer>;
}
