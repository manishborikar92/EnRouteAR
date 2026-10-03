"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon, DownIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function HeroSection() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const vfFrameRef = useRef(null);
  const vfContainerRef = useRef(null);

  // Gentle 3D perspective tilt on pointer movement
  useEffect(() => {
    const container = vfContainerRef.current;
    const frame = vfFrameRef.current;
    if (!container || !frame) return;

    if (
      window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)")
        .matches
    ) {
      const handlePointerMove = (e) => {
        const rect = container.getBoundingClientRect();
        const rx = -((e.clientY - rect.top) / rect.height - 0.5) * 8;
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        frame.style.setProperty("--rx", `${rx}deg`);
        frame.style.setProperty("--ry", `${ry}deg`);
      };

      const handlePointerLeave = () => {
        frame.style.setProperty("--rx", "0deg");
        frame.style.setProperty("--ry", "0deg");
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, []);

  const handleLaunchNavigation = (e) => {
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
      className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(32px,5vw,64px)] items-center pt-[calc(var(--hdr)+20px)] pb-[clamp(36px,5vw,64px)] min-[56.25em]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[56.25em]:min-h-[calc(100svh-var(--hdr))] overflow-x-clip"
      id="hero"
    >
      <div>
        <p className="inline-flex items-center gap-2.5 px-3.5 py-[7px] border border-line-bright rounded-full bg-white/[0.05] backdrop-blur-md text-[0.84rem] font-semibold text-t2 mb-6 animate-[up_0.8s_cubic-bezier(0.2,0.7,0.2,1)_both]">
          <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] animate-[ping-dot_2.4s_infinite]" />
          Live GPS enabled
        </p>
        <h1 className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-5 bg-gradient-to-b from-white via-white via-35% to-[#9DBBE8] bg-clip-text text-transparent [text-wrap:balance] animate-[up_0.8s_0.08s_cubic-bezier(0.2,0.7,0.2,1)_both]">
          Navigate the real world in augmented reality
        </h1>
        <p className="text-t2 text-[1.08rem] max-w-[56ch] mb-7 [text-wrap:pretty] animate-[up_0.8s_0.16s_cubic-bezier(0.2,0.7,0.2,1)_both]">
          Overlay digital waypoints, 3D markers, and turn-by-turn directions
          directly onto your camera feed. Powered by browser-native WebXR,
          A-Frame, AR.js &amp; Mapbox.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 animate-[up_0.8s_0.24s_cubic-bezier(0.2,0.7,0.2,1)_both]">
          <Button
            onClick={handleLaunchNavigation}
            id="turnOnLocationBtn"
            busy={isLaunching}
          >
            <PlayIcon className="w-5 h-5 shrink-0" />
            <span>Launch navigation</span>
          </Button>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 min-h-12 text-t1 font-semibold underline decoration-line-bright underline-offset-6 decoration-2 hover:text-lk hover:decoration-lk transition-colors"
          >
            <span>Learn more</span>
            <DownIcon className="w-5 h-5 shrink-0 transition-transform duration-200 ease-smooth group-hover:translate-y-0.5" />
          </a>
        </div>
        <dl className="grid grid-cols-3 gap-x-2 sm:gap-x-8 pt-5 border-t border-line animate-[up_0.8s_0.32s_cubic-bezier(0.2,0.7,0.2,1)_both]">
          <div className="flex flex-col">
            <dt className="font-display font-extrabold text-[clamp(1.5rem,5vw,2rem)] leading-none tracking-[-0.03em] text-signal [text-shadow:0_0_28px_rgba(255,197,61,0.35)]">
              14+
            </dt>
            <dd className="text-xs sm:text-[0.88rem] text-t3 mt-1.5 leading-tight">Curated destinations</dd>
          </div>
          <div className="flex flex-col">
            <dt className="font-display font-extrabold text-[clamp(1.5rem,5vw,2rem)] leading-none tracking-[-0.03em] text-signal [text-shadow:0_0_28px_rgba(255,197,61,0.35)]">
              3D
            </dt>
            <dd className="text-xs sm:text-[0.88rem] text-t3 mt-1.5 leading-tight">AR waypoints</dd>
          </div>
          <div className="flex flex-col">
            <dt className="font-display font-extrabold text-[clamp(1.5rem,5vw,2rem)] leading-none tracking-[-0.03em] text-signal [text-shadow:0_0_28px_rgba(255,197,61,0.35)]">
              Live
            </dt>
            <dd className="text-xs sm:text-[0.88rem] text-t3 mt-1.5 leading-tight">Real-time GPS</dd>
          </div>
        </dl>
      </div>

      <figure
        className="relative isolate m-0 justify-self-center w-[min(100%,360px)] before:content-[''] before:absolute before:-z-10 before:inset-x-0 sm:before:-inset-x-[20%] md:before:-inset-x-[34%] before:-inset-y-[14%] before:[background:repeating-radial-gradient(circle_at_50%_46%,transparent_0_52px,rgba(120,170,255,0.14)_53px_54px)] before:[mask-image:radial-gradient(circle_at_50%_46%,#000_12%,transparent_68%)] after:content-[''] after:absolute after:-z-10 after:left-[10%] after:right-[10%] after:top-[18%] after:bottom-[6%] after:[background:radial-gradient(closest-side,rgba(47,107,255,0.55),transparent)] after:blur-[40px]"
        ref={vfContainerRef}
      >
        <div
          className="border-8 border-[#0B1626] rounded-[38px] overflow-hidden aspect-[9/12] bg-[#0B1626] outline-1 outline-line-bright shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_50px_80px_-30px_rgba(0,0,0,0.8),0_0_80px_-20px_rgba(47,107,255,0.5)] transition-transform duration-250 ease-smooth"
          style={{ transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
          ref={vfFrameRef}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 360 480"
            role="img"
            aria-label="Preview of the AR view: a blue route leads ahead to the Main Plaza, 42 metres away, and the North Wing, 87 metres away."
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1B3A66" />
                <stop offset="1" stopColor="#F2B67C" />
              </linearGradient>
              <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3C7A58" />
                <stop offset="1" stopColor="#1B4333" />
              </linearGradient>
            </defs>

            {/* Sky Background */}
            <rect width="360" height="200" fill="url(#sky)" />

            {/* Distant Building Silhouettes */}
            <path
              d="M0 200v-44h44v-26h50v32h36v-16h40v54zM212 200v-52h38v-28h50v34h30v-16h30v62z"
              fill="#2A4666"
              opacity="0.92"
            />

            {/* Ground Surface */}
            <rect y="198" width="360" height="282" fill="url(#grd)" />

            {/* Horizon perspective guide rays */}
            <path d="M104 480 190 198h12l66 282z" fill="#fff" opacity="0.1" />

            {/* Perspective AR Route Ribbon */}
            <path
              className="animate-[rise_1.1s_0.35s_cubic-bezier(0.2,0.7,0.2,1)_both]"
              d="M128 480h122C236 380 214 280 202 202h-12c0 80-34 180-62 278z"
              fill="#2F7BFF"
            />

            {/* Animated Flowing Dashed Route Centerline */}
            <path
              className="animate-[rise_1.1s_0.35s_cubic-bezier(0.2,0.7,0.2,1)_both] [stroke-dasharray:10_14] animate-[flow_1.1s_linear_infinite]"
              d="M190 480c14-100 10-190 4-276"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* 3D AR Waypoint: Main Plaza 42m */}
            <g transform="translate(50 108)">
              <g className="animate-[pop_0.6s_1.2s_cubic-bezier(0.2,0.7,0.2,1)_both]">
                <path d="M46 44v34" stroke="#fff" strokeWidth="2" />
                <circle cx="46" cy="80" r="4" fill="#fff" />
                <rect width="92" height="44" rx="11" fill="#fff" />
                <text x="12" y="19" fontSize="13" fontWeight="600" fill="#0F1C2E">
                  Main Plaza
                </text>
                <text x="12" y="35" fontSize="12" fontWeight="600" fill="#1456F0">
                  42 m
                </text>
              </g>
            </g>

            {/* 3D AR Waypoint: North Wing 87m */}
            <g transform="translate(224 134)">
              <g className="animate-[pop_0.6s_1.45s_cubic-bezier(0.2,0.7,0.2,1)_both]">
                <path d="M44 44v28" stroke="#fff" strokeWidth="2" />
                <circle cx="44" cy="74" r="4" fill="#fff" />
                <rect width="92" height="44" rx="11" fill="#fff" />
                <text x="12" y="19" fontSize="13" fontWeight="600" fill="#0F1C2E">
                  North Wing
                </text>
                <text x="12" y="35" fontSize="12" fontWeight="600" fill="#1456F0">
                  87 m
                </text>
              </g>
            </g>

            {/* Cyberpunk HUD Bars Overlay */}
            <g
              className="animate-[fade_0.6s_1.7s_both]"
              fontSize="11"
              fontWeight="600"
              fill="#fff"
              letterSpacing="0.04em"
            >
              <rect width="360" height="34" fill="#0F1C2E" opacity="0.6" />
              <path d="M16 22l5-10 5 10z" />
              <text x="32" y="22">
                N 12°
              </text>
              <circle cx="318" cy="17" r="4" fill="#5BE0A8" />
              <text x="288" y="22" textAnchor="end">
                GPS
              </text>

              <rect y="446" width="360" height="34" fill="#0F1C2E" opacity="0.6" />
              <text x="16" y="468">
                HEAD 042°
              </text>
              <text x="344" y="468" textAnchor="end">
                ALT 312 m
              </text>
            </g>
          </svg>
        </div>
        <figcaption className="mt-5 text-[0.84rem] text-t3 text-center max-w-[36ch] mx-auto">
          Labels show live distance and stay anchored to the place as you walk.
        </figcaption>
      </figure>
    </div>
  );
}
