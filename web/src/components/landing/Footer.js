import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-bg-alt border-t border-border">
      <div className="footer-inner max-w-[1200px] mx-auto pt-12 pb-8 px-10 max-md:pt-10 max-md:pb-6 max-md:px-6 flex justify-between items-start gap-10 flex-wrap">
        <div className="footer-brand">
          <Link href="/" className="logo-mark sm font-display font-bold text-[1rem] tracking-[0.08em] text-text-1 mb-2 inline-block no-underline">
            <span className="logo-bracket text-primary">[</span>
            <span className="logo-text">
              EnRoute<span className="logo-accent text-accent">AR</span>
            </span>
            <span className="logo-bracket text-primary">]</span>
          </Link>
          <p className="text-[0.82rem] text-text-3 max-w-[260px]">
            Augmented Reality Navigation for KITS Ramtek Campus.
          </p>
        </div>

        <div className="footer-links flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/#about"
            className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-text-3 no-underline hover:text-primary transition-colors duration-250"
          >
            About
          </Link>
          <Link
            href="/#college"
            className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-text-3 no-underline hover:text-primary transition-colors duration-250"
          >
            Campus
          </Link>
          <Link
            href="/#vision"
            className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-text-3 no-underline hover:text-primary transition-colors duration-250"
          >
            Vision
          </Link>
          <Link
            href="/#contact"
            className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-text-3 no-underline hover:text-primary transition-colors duration-250"
          >
            Contact
          </Link>
          <a
            href="https://www.kits.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-text-3 no-underline hover:text-primary transition-colors duration-250"
          >
            kits.edu
          </a>
        </div>
      </div>

      <div className="footer-bottom border-t border-[rgba(0,180,255,0.06)] px-10 py-4 max-md:px-6 max-md:py-3.5 max-w-[1200px] mx-auto">
        <p className="font-display text-[0.58rem] tracking-[0.12em] text-text-3 text-center">
          &copy; {new Date().getFullYear()} EnRouteAR — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
