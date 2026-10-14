"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function MobileDock() {
  const [showDock, setShowDock] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const isHeroPastRef = useRef(false);
  const isBottomVisibleRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollIdleTimerRef = useRef(null);

  const recomputeVisibility = useCallback((isScrollingDown = false) => {
    // If hero is still in view or bottom CTA/contact/footer is visible, always hide dock
    if (!isHeroPastRef.current || isBottomVisibleRef.current) {
      setShowDock(false);
      return;
    }

    // While actively scrolling down to read, tuck dock away so step 3 / cards are not obscured
    if (isScrollingDown) {
      setShowDock(false);
    } else {
      // When scrolling up or pausing, reveal dock
      setShowDock(true);
    }
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const seenBottom = new Set();

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Hero is past when it is not intersecting and its bottom has scrolled above the header
        isHeroPastRef.current = !entry.isIntersecting && entry.boundingClientRect.bottom <= 120;
        recomputeVisibility(false);
      },
      { threshold: [0, 0.1, 0.2] }
    );
    heroObserver.observe(heroEl);

    const bottomElements = document.querySelectorAll(
      ".cta, #cta, #contact, footer"
    );
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            seenBottom.add(entry.target);
          } else {
            seenBottom.delete(entry.target);
          }
        });
        isBottomVisibleRef.current = seenBottom.size > 0;
        recomputeVisibility(false);
      },
      { threshold: 0.05 }
    );
    bottomElements.forEach((el) => bottomObserver.observe(el));

    // Scroll listener for directional auto-hide
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollYRef.current;

      // Filter out micro-movements
      if (Math.abs(diff) > 8) {
        const isDown = diff > 0 && currentScrollY > 160;
        recomputeVisibility(isDown);
        lastScrollYRef.current = currentScrollY;

        // When reading/scroll pauses for 850ms, gently slide dock back up
        if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = setTimeout(() => {
          recomputeVisibility(false);
        }, 850);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      heroObserver.disconnect();
      bottomObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, [recomputeVisibility]);

  const handleLaunch = (e) => {
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
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[90] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-gradient-to-t from-[#07111E]/96 to-[#07111E]/72 backdrop-blur-md border-t border-line transition-[transform,visibility] duration-350 ease-smooth lg:hidden ${
        showDock ? "translate-y-0 visible delay-0" : "translate-y-[110%] invisible delay-350"
      }`}
      id="dock"
    >
      <Button
        onClick={handleLaunch}
        id="dock-launch-btn"
        busy={isLaunching}
        className="w-full min-h-[52px]"
      >
        <PlayIcon className="w-5 h-5 shrink-0" />
        <span>Launch AR</span>
      </Button>
    </div>
  );
}
