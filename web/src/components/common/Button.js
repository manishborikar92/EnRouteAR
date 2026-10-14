"use client";

import Link from "next/link";

export default function Button({
  as: Component,
  variant = "primary",
  size = "default",
  busy = false,
  href,
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-xl font-body font-semibold cursor-pointer select-none no-underline transition-[transform,box-shadow,opacity] duration-200 ease-smooth active:scale-[0.98] after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] after:-translate-x-[120%] after:transition-transform after:duration-600 after:ease-smooth hover:after:translate-x-[120%] [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-smooth hover:[&>svg]:translate-x-[3px] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeStyles = {
    default: "min-h-12 px-6 text-[0.95rem] leading-none",
    sm: "min-h-10 px-4.5 text-[0.88rem] leading-none",
  }[size] || "min-h-12 px-6 text-[0.95rem] leading-none";

  const variantStyles = {
    primary:
      "text-white bg-gradient-to-br from-blue-dk to-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_30px_-10px_rgba(42,100,245,0.8)] hover:-translate-y-[1px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_40px_-8px_rgba(60,120,255,0.95)]",
    signal:
      "text-[#0A1626] bg-signal shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_32px_-10px_rgba(255,197,61,0.7)] hover:-translate-y-[1px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_16px_44px_-8px_rgba(255,197,61,0.9)]",
    ghost:
      "text-t1 bg-white/[0.04] border border-line-bright shadow-none hover:bg-white/10 hover:shadow-none hover:-translate-y-[1px]",
  }[variant] || "";

  const busyStyles = busy ? "pointer-events-none opacity-80 cursor-wait" : "";

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${busyStyles} ${className}`.trim();

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !props.target) {
      return (
        <Link href={href} className={combinedClasses} aria-busy={busy || undefined} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClasses} aria-busy={busy || undefined} {...props}>
        {children}
      </a>
    );
  }

  const Tag = Component || "button";
  return (
    <Tag className={combinedClasses} aria-busy={busy || undefined} disabled={busy || props.disabled} {...props}>
      {children}
    </Tag>
  );
}
