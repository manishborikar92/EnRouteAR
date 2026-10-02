"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon, DownIcon } from "@/components/common/Icons";

export default function HeroSection() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const vfFrameRef = useRef(null);
  const vfContainerRef = useRef(null);

  // Gentle 3D perspective tilt on pointer movement (matching reference script)
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
    <div className="wrap hero" id="hero">
      <div>
        <p className="status">
          <span className="dot" />
          Live GPS enabled
        </p>
        <h1>Navigate the real world in augmented reality</h1>
        <p className="lead">
          Overlay digital waypoints, 3D markers, and turn-by-turn directions
          directly onto your camera feed. Built for KITS Ramtek campus — powered
          by A-Frame, AR.js &amp; Mapbox.
        </p>
        <div className="cta-row">
          <button
            onClick={handleLaunchNavigation}
            className="btn"
            id="turnOnLocationBtn"
            aria-busy={isLaunching}
          >
            <PlayIcon className="i" />
            Launch navigation
          </button>
          <a href="#about" className="link">
            Learn more
            <DownIcon className="i" />
          </a>
        </div>
        <dl className="facts">
          <div>
            <dt>14+</dt>
            <dd>Campus locations</dd>
          </div>
          <div>
            <dt>3D</dt>
            <dd>AR waypoints</dd>
          </div>
          <div>
            <dt>Live</dt>
            <dd>Real-time GPS</dd>
          </div>
        </dl>
      </div>

      <figure className="vf" ref={vfContainerRef}>
        <div className="vf-frame" ref={vfFrameRef}>
          <svg
            viewBox="0 0 360 480"
            role="img"
            aria-label="Preview of the AR view: a blue route leads ahead to the Library, 42 metres away, and the CS Department, 87 metres away."
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

            {/* Distant Campus Building Silhouettes */}
            <path
              d="M0 200v-44h44v-26h50v32h36v-16h40v54zM212 200v-52h38v-28h50v34h30v-16h30v62z"
              fill="#2A4666"
              opacity="0.92"
            />

            {/* Campus Lawn Ground */}
            <rect y="198" width="360" height="282" fill="url(#grd)" />

            {/* Horizon perspective guide rays */}
            <path d="M104 480 190 198h12l66 282z" fill="#fff" opacity="0.1" />

            {/* Perspective AR Route Ribbon */}
            <path
              className="ribbon"
              d="M128 480h122C236 380 214 280 202 202h-12c0 80-34 180-62 278z"
              fill="#2F7BFF"
            />

            {/* Animated Flowing Dashed Route Centerline */}
            <path
              className="ribbon flow"
              d="M190 480c14-100 10-190 4-276"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* 3D AR Waypoint: Library 42m */}
            <g transform="translate(50 108)">
              <g className="tag t1">
                <path d="M46 44v34" stroke="#fff" strokeWidth="2" />
                <circle cx="46" cy="80" r="4" fill="#fff" />
                <rect width="92" height="44" rx="11" fill="#fff" />
                <text x="12" y="19" fontSize="13" fontWeight="600" fill="#0F1C2E">
                  Library
                </text>
                <text x="12" y="35" fontSize="12" fontWeight="600" fill="#1456F0">
                  42 m
                </text>
              </g>
            </g>

            {/* 3D AR Waypoint: CS Dept. 87m */}
            <g transform="translate(224 134)">
              <g className="tag t2">
                <path d="M44 44v28" stroke="#fff" strokeWidth="2" />
                <circle cx="44" cy="74" r="4" fill="#fff" />
                <rect width="92" height="44" rx="11" fill="#fff" />
                <text x="12" y="19" fontSize="13" fontWeight="600" fill="#0F1C2E">
                  CS Dept.
                </text>
                <text x="12" y="35" fontSize="12" fontWeight="600" fill="#1456F0">
                  87 m
                </text>
              </g>
            </g>

            {/* Cyberpunk HUD Bars Overlay */}
            <g
              className="hud"
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
        <figcaption>
          Labels show live distance and stay anchored to the place as you walk.
        </figcaption>
      </figure>
    </div>
  );
}
