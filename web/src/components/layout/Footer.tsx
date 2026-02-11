// ============================================================================
// Footer Component — Shared site footer
// ============================================================================

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy-dark px-6 py-5">
            <p className="text-center text-sm text-cream">
                &copy; {currentYear} EnRouteAR. All rights reserved.
            </p>
        </footer>
    );
}
