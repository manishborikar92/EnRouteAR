"use client";

import Image from "next/image";

const ICON_MAP = {
  "reset-all": "/models/reset-all.png",
  centered: "/models/centered.png",
  recenter: "/models/recenter.png",
  bearing: "/models/bearing.png",
};

export default function MultifunctionButton({ mode = "centered", onClick }) {
  const iconSrc = ICON_MAP[mode] || ICON_MAP.centered;

  return (
    <div
      id="multifunction-container"
      className="absolute bottom-[190px] right-3 w-[46px] h-[46px] rounded-full origin-center z-3"
    >
      <button
        id="multifunction-button"
        type="button"
        onClick={onClick}
        title="Multifunction Navigation Control"
        aria-label={`Navigation state: ${mode}`}
        className={`multifunction-button ${mode} w-full h-full flex justify-center items-center p-0 bg-[rgba(4,26,42,0.93)] border border-border rounded-full cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow,transform] duration-[220ms] ease-custom hover:border-border-hi hover:shadow-[0_0_18px_rgba(0,180,255,0.25)] hover:scale-[1.06] active:scale-[0.97]`}
      >
        <Image
          id="centeredImage"
          src={iconSrc}
          alt="Multifunction Icon"
          width={28}
          height={28}
          unoptimized
          className="w-[62%] h-[62%] object-contain brightness-[1.15]"
        />
      </button>
    </div>
  );
}
