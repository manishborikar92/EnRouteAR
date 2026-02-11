import { ReactNode } from 'react';

// ============================================================================
// Section Component — Reusable content section with consistent spacing
// ============================================================================

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

export default function Section({ children, id, className = '' }: SectionProps) {
    return (
        <section id={id} className={`px-5 py-8 md:px-8 lg:px-16 ${className}`}>
            {children}
        </section>
    );
}
