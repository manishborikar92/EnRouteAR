"use client";

import { useEffect, useState, useRef } from "react";
import { generateIntermediaryPoints } from "@/lib/geo";

const LOCAL_AR_SCRIPTS = [
  "/vendor/aframe.min.js",
  "/vendor/aframe-look-at-component.min.js",
  "/vendor/ar-threex-location-only.js",
  "/vendor/aframe-ar.js",
];

const ROUTE_STEP_METERS = 2;

export default function ARViewport({
  userLocation = null,
  directionsData = null,
  destination = null,
  onSceneReady,
}) {
  const [scriptsLoaded, setScriptsLoaded] = useState(
    () => typeof window !== "undefined" && Boolean(window.AFRAME && window.THREEx)
  );
  const [loadError, setLoadError] = useState(null);
  const sceneRef = useRef(null);

  // Sequential loading of local vendor scripts
  useEffect(() => {
    let isMounted = true;

    if (typeof window !== "undefined" && window.AFRAME && window.THREEx) {
      return;
    }

    const loadScriptSequentially = (index) => {
      if (index >= LOCAL_AR_SCRIPTS.length) {
        if (isMounted) setScriptsLoaded(true);
        return;
      }

      const src = LOCAL_AR_SCRIPTS[index];
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        loadScriptSequentially(index + 1);
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false;

      script.onload = () => {
        if (isMounted) {
          loadScriptSequentially(index + 1);
        }
      };

      script.onerror = () => {
        if (isMounted) {
          console.error(`Failed to load local vendor script: ${src}`);
          setLoadError(`Failed to load script: ${src}`);
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

  // Update AR Waypoint Cylinders & 3D GLB Marker
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !scriptsLoaded) return;

    // Remove existing AR route entities (preserving camera)
    const existingEntities = scene.querySelectorAll("[gps-new-entity-place]");
    existingEntities.forEach((el) => {
      if (el.tagName.toLowerCase() !== "a-camera") {
        el.remove();
      }
    });

    if (!directionsData?.routes?.length) {
      return;
    }

    const routeCoordinates = directionsData.routes[0].geometry.coordinates;
    if (!routeCoordinates || routeCoordinates.length < 2) return;

    // 1. Place cylinder markers along every route segment
    for (let i = 0; i < routeCoordinates.length - 1; i++) {
      const points = generateIntermediaryPoints(
        routeCoordinates[i],
        routeCoordinates[i + 1],
        ROUTE_STEP_METERS
      );

      points.forEach(([lng, lat]) => {
        const cylinder = document.createElement("a-cylinder");
        cylinder.setAttribute("gps-new-entity-place", `latitude: ${lat}; longitude: ${lng};`);
        cylinder.setAttribute("radius", "0.5");
        cylinder.setAttribute("height", "0.15");
        cylinder.setAttribute("color", "#3882f6");
        cylinder.setAttribute("opacity", "1");
        scene.appendChild(cylinder);
      });
    }

    // 2. Place 3D GLB pointer marker at the final destination coordinate
    const lastCoord = routeCoordinates[routeCoordinates.length - 1];
    if (lastCoord) {
      const [destLng, destLat] = lastCoord;
      const marker = document.createElement("a-entity");
      marker.setAttribute("gps-new-entity-place", `latitude: ${destLat}; longitude: ${destLng};`);
      marker.setAttribute("gltf-model", "/models/map_pointer_3d_icon.glb");
      marker.setAttribute("scale", "0.5 0.5 0.5");
      marker.setAttribute("position", "0 1 0");
      scene.appendChild(marker);
    }
  }, [directionsData, destination, scriptsLoaded]);

  // Synchronize userLocation with AR.js ThreeLoc if GPS hasn't emitted position yet
  useEffect(() => {
    if (!scriptsLoaded || !userLocation?.latitude || !userLocation?.longitude) return;
    const camera = sceneRef.current?.querySelector("[gps-new-camera]");
    const threeLoc = camera?.components?.["gps-new-camera"]?.threeLoc;
    if (threeLoc && !threeLoc.initialPosition) {
      try {
        threeLoc.fakeGps(userLocation.longitude, userLocation.latitude);
      } catch (err) {
        console.warn("GPS sync warning:", err);
      }
    }
  }, [userLocation, scriptsLoaded]);

  // Enforce full-screen video styling over AR.js inline style overrides
  useEffect(() => {
    if (!scriptsLoaded) return;

    const enforceVideoStyles = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        video.style.setProperty("position", "fixed", "important");
        video.style.setProperty("top", "0px", "important");
        video.style.setProperty("left", "0px", "important");
        video.style.setProperty("width", "100vw", "important");
        video.style.setProperty("height", "100dvh", "important");
        video.style.setProperty("min-width", "100vw", "important");
        video.style.setProperty("min-height", "100dvh", "important");
        video.style.setProperty("max-width", "none", "important");
        video.style.setProperty("max-height", "none", "important");
        video.style.setProperty("margin", "0px", "important");
        video.style.setProperty("margin-left", "0px", "important");
        video.style.setProperty("margin-top", "0px", "important");
        video.style.setProperty("object-fit", "cover", "important");
        video.style.setProperty("z-index", "0", "important");
        video.style.setProperty("pointer-events", "none", "important");
        video.style.setProperty("display", "block", "important");
      });
    };

    enforceVideoStyles();
    window.addEventListener("arjs-video-loaded", enforceVideoStyles);
    window.addEventListener("resize", enforceVideoStyles);
    window.addEventListener("orientationchange", enforceVideoStyles);

    const interval = setInterval(enforceVideoStyles, 400);
    const timeout = setTimeout(() => clearInterval(interval), 6000);

    return () => {
      window.removeEventListener("arjs-video-loaded", enforceVideoStyles);
      window.removeEventListener("resize", enforceVideoStyles);
      window.removeEventListener("orientationchange", enforceVideoStyles);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [scriptsLoaded]);

  // Notify parent when scene mounts
  useEffect(() => {
    if (scriptsLoaded && sceneRef.current) {
      onSceneReady?.(sceneRef.current);
    }
  }, [scriptsLoaded, onSceneReady]);

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg/90 text-text-1 z-1 px-6 text-center">
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
    </a-scene>
  );
}
