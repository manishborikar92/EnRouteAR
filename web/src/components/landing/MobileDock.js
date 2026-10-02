"use client";

import { useEffect, useState } from "react";
import LaunchButton from "@/components/common/LaunchButton";

export default function MobileDock() {
  const [showDock, setShowDock] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("turnOnLocationBtn");
    if (!hero) return;
    let aboveHero = true;
    const visibleBottom = new Set();
    const update = () => setShowDock(!aboveHero && visibleBottom.size === 0);
    const heroObserver = new IntersectionObserver(([entry]) => {
      aboveHero = entry.isIntersecting || entry.boundingClientRect.top > 0;
      update();
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleBottom.add(entry.target) : visibleBottom.delete(entry.target));
      update();
    });
    heroObserver.observe(hero);
    document.querySelectorAll("#start, #contact, footer").forEach((element) => bottomObserver.observe(element));
    return () => { heroObserver.disconnect(); bottomObserver.disconnect(); };
  }, []);

  return <div id="dock" inert={!showDock} aria-hidden={!showDock} className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-200 md:hidden ${showDock ? "visible translate-y-0" : "invisible translate-y-full"}`}><LaunchButton className="w-full" id="dock-launch-btn" /></div>;
}
