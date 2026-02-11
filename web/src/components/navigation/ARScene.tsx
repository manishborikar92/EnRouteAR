'use client';

import { useEffect, useRef } from 'react';
import type { DirectionsResponse, LngLat } from '@/types';
import { AR_CONFIG } from '@/lib/constants';
import { generateIntermediaryPoints } from '@/lib/geo-utils';

// ============================================================================
// ARScene — A-Frame/AR.js augmented reality view
// Loaded dynamically with SSR disabled (browser-only APIs)
// ============================================================================

interface ARSceneProps {
    directionsData: DirectionsResponse | null;
}

export default function ARScene({ directionsData }: ARSceneProps) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const scriptsLoaded = useRef(false);

    // Load A-Frame and AR.js scripts dynamically (client-side only)
    useEffect(() => {
        if (scriptsLoaded.current) return;

        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                // Check if already loaded
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = false; // Maintain loading order
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load: ${src}`));
                document.head.appendChild(script);
            });
        };

        const loadAll = async () => {
            try {
                await loadScript('https://aframe.io/releases/1.3.0/aframe.min.js');
                await loadScript(
                    'https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js'
                );
                await loadScript(
                    'https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js'
                );
                await loadScript(
                    'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'
                );
                scriptsLoaded.current = true;

                // Inject the A-Frame scene after scripts load
                if (sceneRef.current) {
                    sceneRef.current.innerHTML = `
            <a-scene
              cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
              raycaster="objects: [gps-new-entity-place];"
              vr-mode-ui="enabled: false"
              embedded
              arjs="sourceType: webcam; sourceWidth: 1920; sourceHeight: 1080; displayWidth: 100%; displayHeight: 100%; debugUIEnabled: false;"
              style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;"
            >
              <a-camera gps-new-camera="minDistance: 10; videoTexture: true;" rotation-reader></a-camera>
            </a-scene>
          `;
                }
            } catch (err) {
                console.error('Error loading AR scripts:', err);
            }
        };

        loadAll();
    }, []);

    // Update AR markers when directions data changes
    useEffect(() => {
        if (!scriptsLoaded.current || !directionsData) return;

        const scene = document.querySelector('a-scene');
        if (!scene) return;

        // Remove existing route markers
        const existingMarkers = document.querySelectorAll('[gps-new-entity-place]');
        existingMarkers.forEach((marker) => marker.remove());

        if (!directionsData.routes?.length) return;

        const routeCoordinates = directionsData.routes[0].geometry.coordinates;

        // Create intermediary AR markers along the route
        for (let i = 0; i < routeCoordinates.length - 1; i++) {
            const currentCoord = routeCoordinates[i] as LngLat;
            const nextCoord = routeCoordinates[i + 1] as LngLat;

            const intermediaryPoints = generateIntermediaryPoints(
                currentCoord,
                nextCoord,
                AR_CONFIG.distanceBetweenMarkers
            );

            intermediaryPoints.forEach((point) => {
                const marker = document.createElement('a-cylinder');
                marker.setAttribute(
                    'gps-new-entity-place',
                    `latitude: ${point[1]}; longitude: ${point[0]}`
                );
                marker.setAttribute('radius', String(AR_CONFIG.markerRadius));
                marker.setAttribute('height', String(AR_CONFIG.markerHeight));
                marker.setAttribute('color', AR_CONFIG.markerColor);
                marker.setAttribute('opacity', String(AR_CONFIG.markerOpacity));
                scene.appendChild(marker);
            });
        }

        // Add 3D destination marker at the end
        const lastCoord = routeCoordinates[routeCoordinates.length - 1];
        const glbMarker = document.createElement('a-entity');
        glbMarker.setAttribute(
            'gps-new-entity-place',
            `latitude: ${lastCoord[1]}; longitude: ${lastCoord[0]}`
        );
        glbMarker.setAttribute('gltf-model', AR_CONFIG.glbModelPath);
        glbMarker.setAttribute('scale', AR_CONFIG.glbScale);
        glbMarker.setAttribute('position', AR_CONFIG.glbPosition);
        scene.appendChild(glbMarker);
    }, [directionsData]);

    return (
        <div
            ref={sceneRef}
            id="ar-scene-container"
            className="fixed inset-0 z-0"
            aria-label="Augmented Reality scene"
        />
    );
}
