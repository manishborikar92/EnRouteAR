"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark, MenuIcon, CloseIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function Header() {
  const [isStuck, setIsStuck] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  // Scroll listener for sticky header background
  useEffect(() => {
    const onScroll = () => {
      setIsStuck(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section observer for highlighting active nav link
  useEffect(() => {
    const sectionIds = ["how", "about", "destinations", "vision", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock on mobile menu toggle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Handle AR launch with geolocation request feedback
  const handleLaunchAR = (e) => {
    e.preventDefault();
    if (isLaunching) return;

    const navigateToApp = () => {
      router.push("/navigate");
    };

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      setIsLaunching(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLaunching(false);
          navigateToApp();
        },
        (err) => {
          console.warn("Geolocation warning:", err.message);
          setIsLaunching(false);
          navigateToApp();
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      navigateToApp();
    }
    setIsMenuOpen(false);
  };

  const navLinkClass = (isActive) =>
    `relative px-3 py-2.5 text-t2 font-medium text-[0.92rem] no-underline transition-colors hover:text-t1 after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-route after:scale-x-0 after:origin-left after:transition-transform after:duration-250 hover:after:scale-x-100 ${
      isActive ? "text-t1 after:scale-x-100" : ""
    }`;

  const mobileNavLinkClass =
    "flex items-center min-h-16 text-t1 font-display font-bold text-[1.6rem] tracking-[-0.02em] no-underline border-b border-line";

  return (
    <>
      <a
        className="fixed left-4 -top-20 focus:top-3 z-[200] bg-signal text-[#0A1626] px-[18px] py-3 rounded-[10px] font-semibold no-underline transition-[top] duration-200 ease-smooth"
        href="#main"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background,box-shadow,backdrop-filter] duration-250 ${
          isMenuOpen
            ? "bg-[#07111e]/[0.97] shadow-[0_1px_0_var(--color-line)]"
            : isStuck
            ? "bg-[#07111e]/72 backdrop-blur-md backdrop-saturate-150 shadow-[0_1px_0_var(--color-line)]"
            : ""
        }`}
        id="top"
      >
        <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto h-[var(--hdr)] pt-[env(safe-area-inset-top,0px)] flex items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-t1 no-underline font-display font-extrabold text-[1.3rem] leading-none tracking-[-0.03em] min-w-0"
            aria-label="EnRouteAR, home"
          >
            <BrandMark className="w-[34px] h-[34px] shrink-0" />
            <span>
              EnRoute<b className="text-route font-extrabold">AR</b>
              <small className="block font-body font-medium text-[0.66rem] leading-tight tracking-[0.01em] text-t3 mt-[3px] whitespace-nowrap">
                Augmented reality navigation
              </small>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary">
            <Link
              href="/#how"
              className={navLinkClass(activeSection === "how")}
              aria-current={activeSection === "how" ? "true" : undefined}
            >
              How it works
            </Link>
            <Link
              href="/#about"
              className={navLinkClass(activeSection === "about")}
              aria-current={activeSection === "about" ? "true" : undefined}
            >
              About
            </Link>
            <Link
              href="/#destinations"
              className={navLinkClass(activeSection === "destinations")}
              aria-current={activeSection === "destinations" ? "true" : undefined}
            >
              Destinations
            </Link>
            <Link
              href="/#vision"
              className={navLinkClass(activeSection === "vision")}
              aria-current={activeSection === "vision" ? "true" : undefined}
            >
              Vision
            </Link>
            <Link
              href="/#contact"
              className={navLinkClass(activeSection === "contact")}
              aria-current={activeSection === "contact" ? "true" : undefined}
            >
              Contact
            </Link>
            <Button
              size="sm"
              onClick={handleLaunchAR}
              id="nav-launch-btn"
              busy={isLaunching}
              className="ml-2.5"
            >
              Launch AR
            </Button>
          </nav>

          <button
            className="grid place-items-center w-11 h-11 border border-line-bright rounded-xl bg-white/[0.06] text-t1 cursor-pointer shrink-0 z-[101] lg:hidden"
            id="mobile-menu-btn"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon
              className={`[grid-area:1/1] w-[22px] h-[22px] transition-[opacity,transform] duration-250 ease-smooth ${
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <CloseIcon
              className={`[grid-area:1/1] w-[22px] h-[22px] transition-[opacity,transform] duration-250 ease-smooth ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <nav
        className={`fixed z-[99] inset-x-0 top-[var(--hdr)] bottom-0 flex flex-col overflow-y-auto overscroll-contain px-6 pt-3 pb-[calc(24px+env(safe-area-inset-bottom))] bg-[#07111e]/[0.97] backdrop-blur-lg animate-[fade_0.2s] lg:hidden ${
          !isMenuOpen ? "hidden" : ""
        }`}
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!isMenuOpen}
      >
        <Link href="/#how" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
          How it works
        </Link>
        <Link href="/#about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
          About
        </Link>
        <Link href="/#destinations" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
          Destinations
        </Link>
        <Link href="/#vision" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
          Vision
        </Link>
        <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className={`${mobileNavLinkClass} mb-6`}>
          Contact
        </Link>
        <Button
          onClick={handleLaunchAR}
          id="mobile-launch-btn"
          busy={isLaunching}
          className="w-full min-h-14 mt-auto"
        >
          Launch AR
        </Button>
      </nav>
    </>
  );
}
