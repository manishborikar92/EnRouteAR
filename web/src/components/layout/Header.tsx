import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// Header Component — Shared site header with logo
// ============================================================================

export default function Header() {
    return (
        <header className="bg-navy-dark px-4 py-3">
            <Link href="/" aria-label="EnRouteAR Home">
                <div className="relative mx-auto h-16 w-full max-w-md">
                    <Image
                        src="/logos/logo-transparent-svg.svg"
                        alt="EnRouteAR Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>
        </header>
    );
}
