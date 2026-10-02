import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function buttonClass(variant = "primary", className = "") {
  const variants = {
    primary: "border-ink bg-ink text-white hover:bg-forest",
    secondary: "border-line bg-transparent text-ink hover:border-ink hover:bg-white",
    lime: "border-lime bg-lime text-ink hover:border-lime-hover hover:bg-lime-hover",
    dark: "border-white/25 bg-white/5 text-white hover:bg-white/10",
  };
  return `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-[0.98] ${variants[variant]} ${className}`;
}

export function Container({ children, className = "", ...props }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`} {...props}>{children}</div>;
}

export function Eyebrow({ children, dark = false, className = "" }) {
  return <p className={`mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-lime" : "text-muted"} ${className}`}><span className={`size-1.5 rounded-full ${dark ? "bg-lime" : "bg-forest"}`} aria-hidden="true" />{children}</p>;
}

export function SectionHeading({ children, className = "", ...props }) {
  return <h2 className={`text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${className}`} {...props}>{children}</h2>;
}

export function TextLink({ href, children, className = "" }) {
  return <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current ${className}`}>{children}<ArrowUpRight className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" /></Link>;
}

export function Breadcrumb({ current }) {
  return <nav aria-label="Breadcrumb" className="mb-10"><ol className="flex items-center gap-3 text-sm text-muted"><li><Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-ink">{current}</li></ol></nav>;
}
