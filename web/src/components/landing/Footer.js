import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinkClass =
    "py-2 text-t2 font-medium text-[0.92rem] no-underline hover:text-lk hover:underline transition-colors";

  return (
    <footer className="pt-12 pb-8 border-t border-line bg-gradient-to-b from-transparent to-black/25 relative z-1">
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto flex flex-wrap justify-between gap-7">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-t1 no-underline font-display font-extrabold text-[1.3rem] leading-none tracking-[-0.03em]"
            aria-label="EnRouteAR, back to top"
          >
            <span>
              EnRoute<b className="text-route font-extrabold">AR</b>
            </span>
          </Link>
          <p className="text-t3 text-[0.9rem] max-w-[34ch] mt-2.5">
            Augmented Reality Navigation for KITS Ramtek Campus.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 content-start" aria-label="Footer">
          <Link href="/#how" className={footerLinkClass}>
            How it works
          </Link>
          <Link href="/#about" className={footerLinkClass}>
            About
          </Link>
          <Link href="/#college" className={footerLinkClass}>
            Campus
          </Link>
          <Link href="/#vision" className={footerLinkClass}>
            Vision
          </Link>
          <Link href="/#contact" className={footerLinkClass}>
            Contact
          </Link>
          <a
            href="https://www.kits.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            kits.edu
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
      <p className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-3rem)] mx-auto mt-8 pt-5 border-t border-line text-t3 text-[0.84rem]">
        &copy; <span>{currentYear}</span> EnRouteAR. All rights reserved.
      </p>
    </footer>
  );
}
