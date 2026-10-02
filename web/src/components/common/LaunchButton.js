"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { buttonClass } from "@/components/ui/Primitives";

// Preserve the existing permission-first launch, including navigation on denial.
export default function LaunchButton({ children = "Start navigating", variant = "primary", className = "", onLaunch, id }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const pending = useRef(false);
  const router = useRouter();

  const launch = () => {
    if (pending.current) return;
    pending.current = true;
    setIsLaunching(true);
    onLaunch?.();
    const proceed = () => {
      pending.current = false;
      setIsLaunching(false);
      router.push("/navigate");
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(proceed, proceed, { enableHighAccuracy: false, timeout: 8000 });
    } else {
      proceed();
    }
  };

  return <button type="button" id={id} onClick={launch} aria-busy={isLaunching} disabled={isLaunching} className={buttonClass(variant, className)}>{isLaunching ? "Getting ready…" : children}{isLaunching ? <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}</button>;
}
