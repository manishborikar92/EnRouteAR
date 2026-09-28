"use client";

import { useEffect, useState, useRef } from "react";

const AR_SCRIPTS = [
  "https://aframe.io/releases/1.3.0/aframe.min.js",
  "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  "https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js",
  "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js",
];

export default function ARViewport({
  waypoints = [],
  destinationCoord = null,
  onSceneReady,
}) {
  const [scriptsLoaded, setScriptsLoaded] = useState(
    () => typeof window !== "undefined" && Boolean(window.AFRAME)
  );
  const [loadError, setLoadError] = useState(null);
  const sceneRef = useRef(null);

  // Sequential loading of A-Frame and AR.js scripts
  useEffect(() => {
    let isMounted = true;

    // If AFRAME is already loaded, nothing to do
    if (typeof window !== "undefined" && window.AFRAME) {
      return;
    }

    const loadScriptSequentially = (index) => {
      if (index >= AR_SCRIPTS.length) {
        if (isMounted) setScriptsLoaded(true);
        return;
      }

      const src = AR_SCRIPTS[index];

      // Check if script tag already exists in DOM
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        loadScriptSequentially(index + 1);
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Preserve execution order

      script.onload = () => {
        if (isMounted) {
          loadScriptSequentially(index + 1);
        }
      };

      script.onerror = () => {
        if (isMounted) {
          console.error(`Failed to load AR script: ${src}`);
          setLoadError(`Failed to load AR script: ${src}`);
        }
      };

      document.head.appendChild(script);
    };

    loadScriptSequentially(0);

    return () => {
      isMounted = false;
      // Cleanup any active webcam streams created by AR.js
      if (typeof navigator !== "undefined" && navigator.mediaDevices) {
        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          if (video.srcObject && typeof video.srcObject.getTracks === "function") {
            video.srcObject.getTracks().forEach((track) => track.stop());
          }
          video.remove();
        });
      }
    };
  }, []);

  // Notify parent when scene is ready
  useEffect(() => {
    if (scriptsLoaded && sceneRef.current) {
      onSceneReady?.(sceneRef.current);
    }
  }, [scriptsLoaded, onSceneReady]);

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg text-text-1 z-1 px-6 text-center">
        <div className="p-6 bg-surface border border-border rounded-lg max-w-[420px]">
          <div className="text-accent font-display text-sm mb-2">AR ENGINE ERROR</div>
          <p className="text-xs text-text-2 mb-4">{loadError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-bg font-display text-xs font-semibold rounded-md"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!scriptsLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg/80 backdrop-blur-sm text-text-1 z-1 pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <div className="font-display text-[0.68rem] tracking-[0.2em] text-primary uppercase animate-pulse">
            INITIALIZING AR ENGINE...
          </div>
        </div>
      </div>
    );
  }

  return (
    <a-scene
      ref={sceneRef}
      loading-screen="enabled: false"
      renderer="alpha: true; logarithmicDepthBuffer: true;"
      cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
      raycaster="objects: [gps-new-entity-place];"
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; sourceWidth: 1920; sourceHeight: 1080; displayWidth: 100%; displayHeight: 100%; debugUIEnabled: false;"
    >
      <a-camera gps-new-camera="minDistance: 10;" rotation-reader />

      {/* Render cylinder waypoints along the route */}
      {waypoints.map(([lng, lat], idx) => (
        <a-cylinder
          key={`wp-${idx}-${lng}-${lat}`}
          gps-new-entity-place={`latitude: ${lat}; longitude: ${lng};`}
          radius="0.5"
          height="0.15"
          color="#3882f6"
          opacity="1"
        />
      ))}

      {/* Render 3D GLB pointer marker at destination */}
      {destinationCoord && (
        <a-entity
          gps-new-entity-place={`latitude: ${destinationCoord.latitude}; longitude: ${destinationCoord.longitude};`}
          gltf-model="/models/map_pointer_3d_icon.glb"
          scale="0.5 0.5 0.5"
          position="0 1 0"
        />
      )}
    </a-scene>
  );
}
