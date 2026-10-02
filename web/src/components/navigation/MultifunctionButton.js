"use client";

export default function MultifunctionButton({ mode = "centered", onClick }) {
  const validModes = ["centered", "bearing", "recenter", "reset-all"];
  const currentMode = validModes.includes(mode) ? mode : "centered";

  return (
    <div
      id="multifunction-container"
      className="absolute bottom-[190px] right-3 w-[46px] h-[46px] rounded-full origin-center z-3 pointer-events-auto"
    >
      <button
        id="multifunction-button"
        type="button"
        onClick={onClick}
        title="Multifunction Navigation Control"
        aria-label={`Navigation state: ${currentMode}`}
        className={`multifunction-button ${currentMode} w-full h-full flex justify-center items-center p-0 bg-[rgba(4,26,42,0.93)] border border-border rounded-full cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow,transform] duration-[220ms] ease-custom hover:border-border-hi hover:shadow-[0_0_18px_rgba(0,180,255,0.25)] hover:scale-[1.06] active:scale-[0.97]`}
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
