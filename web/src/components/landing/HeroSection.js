"use client";

import { useRouter } from "next/navigation";
import { Play, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  const handleLaunchNavigation = (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => router.push("/navigate"),
        (err) => {
          console.warn("Geolocation warning:", err.message);
          router.push("/navigate");
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      router.push("/navigate");
    }
  };

  return (
    <section
      className="hero min-h-screen flex items-center justify-center gap-16 max-lg:gap-10 max-md:flex-col pt-[120px] pb-20 px-10 max-md:pt-[100px] max-md:pb-[60px] max-md:px-6 max-md:text-center max-w-[1280px] mx-auto relative z-10"
      id="hero"
    >
      <div className="hero-content flex-1 max-w-[620px] max-md:max-w-full">
        {/* Badge */}
        <div className="hero-badge reveal inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.18em] text-primary bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.2)] rounded-full px-4 py-1.5 mb-7 max-md:self-center">
          <span className="pulse-dot w-[7px] h-[7px] bg-primary rounded-full animate-pulse-ring shrink-0" />
          LIVE · GPS ENABLED
        </div>

        {/* Title */}
        <h1 className="hero-title reveal font-display text-[clamp(2rem,5vw,3.5rem)] max-[480px]:text-[1.8rem] font-black leading-[1.1] tracking-[-0.01em] mb-6 text-text-1">
          Navigate the
          <br />
          <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            Real World
          </span>
          <br />
          in Augmented Reality
        </h1>

        {/* Description */}
        <p className="hero-desc reveal text-[1.05rem] text-text-2 leading-[1.75] mb-9 max-w-[520px] max-md:mx-auto max-md:mb-9">
          Overlay digital waypoints, 3D markers, and turn-by-turn directions directly onto your
          camera feed. Built for KITS Ramtek campus — powered by A-Frame, AR.js &amp; Mapbox.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions reveal flex items-center gap-4 flex-wrap mb-12 max-md:justify-center">
          <button
            onClick={handleLaunchNavigation}
            className="btn-primary inline-flex items-center gap-2.5 bg-gradient-to-br from-primary to-primary-dk text-white no-underline font-display text-[0.72rem] font-semibold tracking-[0.1em] px-7 py-3.5 rounded-md border-none cursor-pointer relative overflow-hidden transition-[box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,180,255,0.4)] active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,255,255,0.15)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-250 hover:before:opacity-100"
            id="turnOnLocationBtn"
          >
            <Play className="w-4 h-4 shrink-0 fill-current" />
            Launch Navigation
          </button>
          <a
            href="#about"
            className="btn-ghost inline-flex items-center gap-2 text-text-2 no-underline font-display text-[0.72rem] tracking-[0.1em] py-3.5 hover:text-primary transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            Learn More
            <ArrowDown className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats reveal flex items-center gap-6 max-md:justify-center max-[480px]:gap-3.5">
          <div className="stat text-center">
            <span className="stat-num block font-display text-2xl max-[480px]:text-[1.1rem] font-black text-primary">
              14+
            </span>
            <span className="stat-label text-[0.65rem] tracking-[0.1em] text-text-3 uppercase">
              Campus Locations
            </span>
          </div>
          <div className="stat-divider w-[1px] h-10 bg-border" />
          <div className="stat text-center">
            <span className="stat-num block font-display text-2xl max-[480px]:text-[1.1rem] font-black text-primary">
              3D
            </span>
            <span className="stat-label text-[0.65rem] tracking-[0.1em] text-text-3 uppercase">
              AR Waypoints
            </span>
          </div>
          <div className="stat-divider w-[1px] h-10 bg-border" />
          <div className="stat text-center">
            <span className="stat-num block font-display text-2xl max-[480px]:text-[1.1rem] font-black text-primary">
              RT
            </span>
            <span className="stat-label text-[0.65rem] tracking-[0.1em] text-text-3 uppercase">
              Real-Time GPS
            </span>
          </div>
        </div>
      </div>

      {/* Visual Mockup */}
      <div className="hero-visual reveal shrink-0 max-md:order-1">
        <div className="phone-mockup relative w-[260px] max-md:w-[180px] max-[480px]:w-[160px] mx-auto">
          <div className="phone-frame bg-gradient-to-br from-[#0a1f35] to-[#020c16] border-2 border-[rgba(0,180,255,0.25)] rounded-[36px] p-3 shadow-deep shadow-[0_0_60px_rgba(0,180,255,0.1)]">
            <div className="phone-screen bg-bg rounded-[26px] overflow-hidden aspect-[9/16]">
              <div className="ar-scene-preview relative w-full h-full bg-gradient-to-b from-[#0a2035] via-[#041528] to-[#020c16] overflow-hidden">
                <div className="ar-grid absolute inset-0 animate-grid-scroll" />
                <div className="ar-waypoint wp1 absolute top-[28%] left-[20%] flex flex-col items-center gap-[3px] animate-wp-pulse">
                  <div className="wp-icon text-[20px] drop-shadow-[0_0_6px_rgba(0,180,255,0.6)]">
                    📍
                  </div>
                  <div className="wp-label font-display text-[0.5rem] text-text-1 bg-[rgba(0,180,255,0.2)] border border-border rounded px-[5px] py-[1px] tracking-[0.08em] whitespace-nowrap">
                    Library
                  </div>
                  <div className="wp-dist font-display text-[0.42rem] text-accent tracking-[0.06em]">
                    42m
                  </div>
                </div>
                <div className="ar-waypoint wp2 absolute top-[42%] right-[15%] [animation-delay:1.2s] flex flex-col items-center gap-[3px] animate-wp-pulse">
                  <div className="wp-icon text-[20px] drop-shadow-[0_0_6px_rgba(0,180,255,0.6)]">
                    🏛
                  </div>
                  <div className="wp-label font-display text-[0.5rem] text-text-1 bg-[rgba(0,180,255,0.2)] border border-border rounded px-[5px] py-[1px] tracking-[0.08em] whitespace-nowrap">
                    CS Dept.
                  </div>
                  <div className="wp-dist font-display text-[0.42rem] text-accent tracking-[0.06em]">
                    87m
                  </div>
                </div>
                <div className="ar-trail absolute bottom-[25%] left-1/2 -translate-x-1/2 w-1 h-[25%] bg-gradient-to-t from-primary to-transparent rounded-[2px] animate-trail-grow" />
                <div className="ar-hud-top absolute left-0 right-0 top-0 flex justify-between px-2.5 py-2 font-display text-[0.42rem] text-primary tracking-[0.08em] bg-gradient-to-b from-[rgba(2,12,22,0.7)] to-transparent">
                  <span>▲ N 12°</span>
                  <span>GPS ●</span>
                </div>
                <div className="ar-hud-bottom absolute left-0 right-0 bottom-0 flex justify-between px-2.5 py-2 font-display text-[0.42rem] text-primary tracking-[0.08em] bg-gradient-to-t from-[rgba(2,12,22,0.7)] to-transparent">
                  <span>HEAD: 042°</span>
                  <span>ALT: 312m</span>
                </div>
              </div>
            </div>
          </div>
          <div className="phone-glow absolute -bottom-[30px] left-1/2 -translate-x-1/2 w-[180px] h-[60px] pointer-events-none bg-[radial-gradient(ellipse,rgba(0,180,255,0.25),transparent_70%)]" />
        </div>
      </div>
    </section>
  );
}
