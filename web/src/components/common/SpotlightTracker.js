"use client";

import { useEffect } from "react";

export default function SpotlightTracker() {
  useEffect(() => {
    const handlePointerMove = (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const attachListeners = () => {
      const elements = document.querySelectorAll(
        "[data-spotlight], .glass-spotlight, .glass-panel, form"
      );
      elements.forEach((el) => {
        el.removeEventListener("pointermove", handlePointerMove);
        el.addEventListener("pointermove", handlePointerMove, { passive: true });
      });
      return elements;
    };

    const elements = attachListeners();

    // Re-check on mutation if DOM elements change
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      elements.forEach((el) => el.removeEventListener("pointermove", handlePointerMove));
    };
  }, []);

  return null;
}
