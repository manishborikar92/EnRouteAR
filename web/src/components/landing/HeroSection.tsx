'use client';

import { useRouter } from 'next/navigation';
import { useGeolocationPermission } from '@/hooks/useGeolocation';

// ============================================================================
// HeroSection — Landing page hero with CTA
// ============================================================================

export default function HeroSection() {
    const router = useRouter();
    const { requestPermission } = useGeolocationPermission();

    const handleNavigate = async () => {
        await requestPermission();
        router.push('/navigation');
    };

    return (
        <section className="px-5 py-12 md:px-8 lg:px-16">
            <h2 className="mb-4 text-2xl font-bold text-gold md:text-3xl">
                EnRouteAR — Augmented Reality Navigation
            </h2>
            <p className="mb-4 text-justify leading-relaxed text-sky">
                EnRouteAR is an innovative augmented reality (AR) navigation system that
                combines real-world navigation with immersive AR experiences. It enables
                users to navigate through physical spaces by overlaying digital
                information, 3D models, and directional cues onto the real environment
                through their mobile devices.
            </p>
            <p className="mb-6 text-justify leading-relaxed text-sky">
                EnRouteAR utilizes A-Frame, AR.js, and Mapbox technologies to create a
                seamless AR navigation experience. Users can select destinations, receive
                turn-by-turn directions, and view 3D markers and route arrows in their
                real-world surroundings. The project provides an engaging and intuitive
                way to explore and navigate both familiar and unfamiliar environments.
            </p>
            <div className="flex justify-center">
                <button
                    id="navigate-btn"
                    onClick={handleNavigate}
                    className="rounded-xl bg-blue px-10 py-3 font-semibold text-white
                     transition-all duration-300 hover:bg-navy-mid hover:shadow-lg
                     hover:shadow-blue/20 active:scale-95"
                >
                    Navigate
                </button>
            </div>
        </section>
    );
}
