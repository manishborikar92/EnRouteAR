"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark, MenuIcon, CloseIcon } from "@/components/common/Icons";

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
    const sectionIds = ["how", "about", "college", "vision", "contact"];
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
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
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

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className={`top ${isStuck ? "stuck" : ""}`} id="top">
        <div className="wrap bar">
          <Link href="/" className="brand" aria-label="EnRouteAR, home">
            <BrandMark className="mk" />
            <span>
              EnRoute<b>AR</b>
              <small>Augmented reality navigation</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <Link
              href="/#how"
              aria-current={activeSection === "how" ? "true" : undefined}
            >
              How it works
            </Link>
            <Link
              href="/#about"
              aria-current={activeSection === "about" ? "true" : undefined}
            >
              About
            </Link>
            <Link
              href="/#college"
              aria-current={activeSection === "college" ? "true" : undefined}
            >
              Campus
            </Link>
            <Link
              href="/#vision"
              aria-current={activeSection === "vision" ? "true" : undefined}
            >
              Vision
            </Link>
            <Link
              href="/#contact"
              aria-current={activeSection === "contact" ? "true" : undefined}
            >
              Contact
            </Link>
            <button
              onClick={handleLaunchAR}
              className="btn sm"
              id="nav-launch-btn"
              aria-busy={isLaunching}
            >
              Launch AR
            </button>
          </nav>

          <button
            className="burger"
            id="mobile-menu-btn"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon className="i m" />
            <CloseIcon className="i x" />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <nav
        className="mnav"
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!isMenuOpen}
      >
        <Link href="/#how" onClick={() => setIsMenuOpen(false)}>
          How it works
        </Link>
        <Link href="/#about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
        <Link href="/#college" onClick={() => setIsMenuOpen(false)}>
          Campus
        </Link>
        <Link href="/#vision" onClick={() => setIsMenuOpen(false)}>
          Vision
        </Link>
        <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </Link>
        <button
          onClick={handleLaunchAR}
          className="btn"
          id="mobile-launch-btn"
          aria-busy={isLaunching}
        >
          Launch AR
        </button>
      </nav>
    </>
  );
}
