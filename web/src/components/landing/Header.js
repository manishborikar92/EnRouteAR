"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Brand from "@/components/common/Brand";
import LaunchButton from "@/components/common/LaunchButton";
import { Container } from "@/components/ui/Primitives";

const links = [{ href: "/#how", label: "How it works" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const close = () => setIsMenuOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false);
      toggle.current?.focus();
    }
  };

  return (
    <header ref={header} onKeyDown={handleKeyDown} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false); }} className="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-xl" id="top">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex lg:gap-5">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink aria-[current=page]:bg-ink/5 aria-[current=page]:text-ink">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <LaunchButton className="hidden sm:inline-flex" id="nav-launch-btn">Launch AR</LaunchButton>
          <button ref={toggle} type="button" id="mobile-menu-btn" aria-expanded={isMenuOpen} aria-controls="mobile-nav" aria-label={isMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMenuOpen((open) => !open)} className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-white md:hidden">{isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}</button>
        </div>
      </Container>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!isMenuOpen} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-6 pt-3 shadow-panel md:hidden">
        {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} aria-current={pathname === href ? "page" : undefined} className="flex min-h-14 items-center border-b border-line font-display text-xl hover:text-muted">{label}</Link>)}
        <LaunchButton className="mt-5 w-full" onLaunch={() => setIsMenuOpen(false)} id="mobile-launch-btn" />
      </nav>
    </header>
  );
}
