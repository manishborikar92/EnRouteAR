'use client';

// ============================================================================
// CompassWidget — Rotates with device heading to show compass direction
// ============================================================================

interface CompassWidgetProps {
    heading: number;
}

export default function CompassWidget({ heading }: CompassWidgetProps) {
    return (
        <div
            id="compass-container"
            className="absolute bottom-[195px] left-1.5 z-20"
        >
            <div
                className="h-7 w-7 rounded-full border border-navy bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/models/compass.png)',
                    transform: `rotate(${360 - heading}deg)`,
                }}
                aria-label={`Compass heading: ${Math.round(heading)}°`}
            />
        </div>
    );
}
