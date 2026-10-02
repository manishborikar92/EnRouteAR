"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/common/Icons";

export default function MobileDock() {
  const [showDock, setShowDock] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const heroBtn = document.getElementById("turnOnLocationBtn");
    if (!heroBtn) return;

    const seenBottom = new Set();
    let isHeroVisible = true;

    const updateVisibility = () => {
      setShowDock(!isHeroVisible && seenBottom.size === 0);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroBtn);

    const bottomElements = document.querySelectorAll(
      ".cta, #contact, footer"
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
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    bottomElements.forEach((el) => bottomObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

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
    <div className={`dock ${showDock ? "show" : ""}`} id="dock">
      <button
        onClick={handleLaunch}
        className="btn"
        id="dock-launch-btn"
        aria-busy={isLaunching}
      >
        <PlayIcon className="i" />
        Launch AR
      </button>
    </div>
  );
}
