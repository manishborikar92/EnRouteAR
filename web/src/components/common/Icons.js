export function BrandMark({ className = "w-[34px] h-[34px] shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" rx="9" fill="#14294A" stroke="#35568A" />
      <path
        d="M11 25c0-5 12-3 12-9"
        fill="none"
        stroke="#FFC53D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <circle cx="11" cy="25" r="3" fill="#fff" />
      <path
        d="M23 7a4.5 4.5 0 0 1 4.5 4.5c0 3.3-4.5 8-4.5 8s-4.5-4.7-4.5-8A4.5 4.5 0 0 1 23 7z"
        fill="#4C8DFF"
      />
      <circle cx="23" cy="11.5" r="1.7" fill="#fff" />
    </svg>
  );
}

export function PinIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function ScreenIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function ClockIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}

export function CompassIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  );
}

export function MapIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" />
    </svg>
  );
}

export function FlagIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 22V4M5 4h13l-2.5 4 2.5 4H5" />
    </svg>
  );
}

export function PlayIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4l14 8-14 8z" />
    </svg>
  );
}

export function DownIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export function SendIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

export function MailIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function ExternalIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

export function MenuIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
