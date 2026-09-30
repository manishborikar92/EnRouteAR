"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLaunchAR = (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          router.push("/navigate");
        },
        (err) => {
          console.warn("Geolocation warning:", err.message);
          router.push("/navigate");
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      router.push("/navigate");
    }
    setIsMobileOpen(false);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,padding,border-color,backdrop-filter] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="header-inner flex items-center justify-between px-10 py-[18px] max-md:px-5 max-md:py-3.5 transition-[padding,background,border-color,backdrop-filter] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <Link href="/" className="logo-wrap select-none no-underline">
          <div className="logo-mark font-display font-bold text-[1.25rem] tracking-[0.08em] text-text-1">
            <span className="logo-bracket text-primary">[</span>
            <span className="logo-text">
              EnRoute<span className="logo-accent text-accent">AR</span>
            </span>
            <span className="logo-bracket text-primary">]</span>
          </div>
          <div className="logo-sub font-display text-[0.52rem] tracking-[0.2em] text-text-3 mt-[2px]">
            AUGMENTED REALITY NAVIGATION
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="site-nav hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <Link
            href="/#about"
            className="font-display text-[0.68rem] tracking-[0.12em] text-text-2 uppercase no-underline hover:text-primary transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            About
          </Link>
          <Link
            href="/#college"
            className="font-display text-[0.68rem] tracking-[0.12em] text-text-2 uppercase no-underline hover:text-primary transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            Campus
          </Link>
          <Link
            href="/#vision"
            className="font-display text-[0.68rem] tracking-[0.12em] text-text-2 uppercase no-underline hover:text-primary transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            Vision
          </Link>
          <Link
            href="/#contact"
            className="font-display text-[0.68rem] tracking-[0.12em] text-text-2 uppercase no-underline hover:text-primary transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            Contact
          </Link>
          <button
            onClick={handleLaunchAR}
            className="nav-cta inline-flex items-center justify-center bg-gradient-to-br from-primary to-primary-dk text-white px-5 py-2 rounded-sm font-display text-[0.68rem] tracking-[0.12em] no-underline hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:-translate-y-px transition-[box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer border-none"
            id="nav-launch-btn"
          >
            Launch AR
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-menu-btn flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 ${
            isMobileOpen ? "active" : ""
          }`}
          id="mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <span className="block w-6 h-[2px] bg-text-1 rounded-[2px] transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          <span className="block w-6 h-[2px] bg-text-1 rounded-[2px] transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          <span className="block w-6 h-[2px] bg-text-1 rounded-[2px] transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <nav
        className={`mobile-nav flex flex-col gap-0 bg-[rgba(2,12,22,0.97)] border-t border-border overflow-hidden transition-[max-height,padding] duration-350 ease ${
          isMobileOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
        }`}
        id="mobile-nav"
        aria-label="Mobile Navigation"
      >
        <Link
          href="/#about"
          onClick={closeMobile}
          className="font-display text-[0.75rem] tracking-[0.12em] text-text-2 uppercase no-underline px-6 py-3.5 border-b border-[rgba(0,180,255,0.06)] hover:text-primary hover:bg-surface-hi transition-[color,background] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          About
        </Link>
        <Link
          href="/#college"
          onClick={closeMobile}
          className="font-display text-[0.75rem] tracking-[0.12em] text-text-2 uppercase no-underline px-6 py-3.5 border-b border-[rgba(0,180,255,0.06)] hover:text-primary hover:bg-surface-hi transition-[color,background] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          Campus
        </Link>
        <Link
          href="/#vision"
          onClick={closeMobile}
          className="font-display text-[0.75rem] tracking-[0.12em] text-text-2 uppercase no-underline px-6 py-3.5 border-b border-[rgba(0,180,255,0.06)] hover:text-primary hover:bg-surface-hi transition-[color,background] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          Vision
        </Link>
        <Link
          href="/#contact"
          onClick={closeMobile}
          className="font-display text-[0.75rem] tracking-[0.12em] text-text-2 uppercase no-underline px-6 py-3.5 border-b border-[rgba(0,180,255,0.06)] hover:text-primary hover:bg-surface-hi transition-[color,background] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          Contact
        </Link>
        <button
          onClick={handleLaunchAR}
          className="nav-cta inline-flex items-center justify-center mx-6 mt-3 bg-gradient-to-br from-primary to-primary-dk text-white px-5 py-2 rounded-sm font-display text-[0.68rem] tracking-[0.12em] text-center no-underline hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:-translate-y-px transition-[box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] border-none cursor-pointer"
          id="mobile-launch-btn"
        >
          Launch AR
        </button>
      </nav>
    </header>
  );
}
