"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

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
