"use client";

export default function MultifunctionButton({ mode = "centered", onClick }) {
  const validModes = ["centered", "bearing", "recenter", "reset-all"];
  const currentMode = validModes.includes(mode) ? mode : "centered";

  return (
    <div
      id="multifunction-container"
      className="absolute bottom-[195px] right-3.5 w-[44px] h-[44px] rounded-full origin-center z-3 pointer-events-auto"
    >
      <button
        id="multifunction-button"
        type="button"
        onClick={onClick}
        title="Multifunction Navigation Control"
        aria-label={`Navigation state: ${currentMode}`}
        className={`multifunction-button ${currentMode} w-full h-full flex justify-center items-center p-0 bg-[rgba(7,17,30,0.92)] backdrop-blur-[14px] border border-[rgba(150,185,235,0.25)] rounded-full cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_16px_rgba(76,141,255,0.2)] transition-all hover:border-route hover:shadow-[0_0_24px_rgba(76,141,255,0.4)] hover:scale-[1.06] active:scale-[0.96]`}
      >
        <svg
          id="centeredImage"
          aria-hidden="true"
          viewBox="0 0 500 500"
          className="w-[62%] h-[62%] object-contain brightness-[1.15] pointer-events-none"
        >
          <use href={`/icons/nav-controls.svg#icon-${currentMode}`} />
        </svg>
      </button>
    </div>
  );
}
