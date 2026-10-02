import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div>
          <Link href="/" className="brand" aria-label="EnRouteAR, back to top">
            <span>
              EnRoute<b>AR</b>
            </span>
          </Link>
          <p>Augmented Reality Navigation for KITS Ramtek Campus.</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/#how">How it works</Link>
          <Link href="/#about">About</Link>
          <Link href="/#college">Campus</Link>
          <Link href="/#vision">Vision</Link>
          <Link href="/#contact">Contact</Link>
          <a
            href="https://www.kits.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            kits.edu
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
      <p className="copy">
        &copy; <span>{currentYear}</span> EnRouteAR. All rights reserved.
      </p>
    </footer>
  );
}
