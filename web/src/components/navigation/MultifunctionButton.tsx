'use client';

import Image from 'next/image';
import type { MultifunctionState } from '@/types';

// ============================================================================
// MultifunctionButton — Context-sensitive navigation control button
// ============================================================================

interface MultifunctionButtonProps {
    state: MultifunctionState;
    onClick: () => void;
}

const BUTTON_IMAGES: Record<MultifunctionState, string> = {
    'reset-all': '/models/reset-all.png',
    centered: '/models/centered.png',
    recenter: '/models/recenter.png',
    bearing: '/models/bearing.png',
};

const BUTTON_LABELS: Record<MultifunctionState, string> = {
    'reset-all': 'Reset navigation',
    centered: 'Enable compass bearing',
    recenter: 'Re-center map on your location',
    bearing: 'Disable compass bearing',
};

export default function MultifunctionButton({
    state,
    onClick,
}: MultifunctionButtonProps) {
    return (
        <div
            id="multifunction-container"
            className="absolute bottom-[1%] right-[1%] z-20"
        >
            <button
                id="multifunction-button"
                onClick={onClick}
                className="flex h-12 w-12 items-center justify-center rounded-full
                   border border-navy bg-white/10 backdrop-blur-sm
                   transition-transform active:scale-90"
                aria-label={BUTTON_LABELS[state]}
                title={BUTTON_LABELS[state]}
            >
                <Image
                    src={BUTTON_IMAGES[state]}
                    alt={BUTTON_LABELS[state]}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </button>
        </div>
    );
}
