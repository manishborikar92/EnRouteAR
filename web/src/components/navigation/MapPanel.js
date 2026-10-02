"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_ZOOM = 17;
const SOURCE_ID = "route";

export default function MapPanel({
  userLocation,
  destination,
  directionsData,
  isMapCentered,
  isBearing,
  onUserInteraction,
  onMapBearingChange,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const mapBearingRef = useRef(0);
  const compassHeadingRef = useRef(0);
  const isLoadedRef = useRef(false);

  const isMapCenteredRef = useRef(isMapCentered);
  const isBearingRef = useRef(isBearing);
  const userLocationRef = useRef(userLocation);

  useEffect(() => {
    isMapCenteredRef.current = isMapCentered;
  }, [isMapCentered]);

  useEffect(() => {
    isBearingRef.current = isBearing;
  }, [isBearing]);

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  // Keep latest callbacks in ref to avoid re-triggering map initialization
  const callbacksRef = useRef({ onUserInteraction, onMapBearingChange });
  useEffect(() => {
    callbacksRef.current = { onUserInteraction, onMapBearingChange };
  }, [onUserInteraction, onMapBearingChange]);

  // Helper to create or update the user location marker
  const updateOrCreateUserMarker = (latitude, longitude) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setLngLat([longitude, latitude]);
    } else {
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.style.backgroundImage = "url(/icons/current.svg)";
      markerEl.style.width = "30px";
      markerEl.style.height = "30px";

      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML("You are here!"))
        .addTo(map);

      marker.setRotation(compassHeadingRef.current - mapBearingRef.current);
      marker.setPitchAlignment("map");
      currentLocationMarkerRef.current = marker;
    }
  };

  // 1. Initialize Mapbox map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const token =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
      "pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw";

    mapboxgl.accessToken = token;

    const initialCenter =
      userLocationRef.current?.latitude && userLocationRef.current?.longitude
        ? [userLocationRef.current.longitude, userLocationRef.current.latitude]
        : [78, 20];
    const initialZoom =
      userLocationRef.current?.latitude && userLocationRef.current?.longitude
        ? DEFAULT_ZOOM
        : 0;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: initialCenter,
      zoom: initialZoom,
      bearing: 0,
      pitch: 0,
      projection: "globe",
    });

    // Explicitly ensure all mobile touch and gesture handlers are active
    map.dragPan.enable();
    map.touchZoomRotate.enable();
    map.touchPitch.enable();
    map.doubleClickZoom.enable();

    mapInstanceRef.current = map;

    map.on("load", () => {
      isLoadedRef.current = true;
      try {
        map.setFog({});
      } catch (err) {
        console.warn("Mapbox setFog warning:", err);
      }
      map.resize();

      // Immediate check: if userLocation is already available upon style load, fly without delay!
      const currentLoc = userLocationRef.current;
      if (currentLoc?.latitude && currentLoc?.longitude && isMapCenteredRef.current) {
        map.flyTo({
          center: [currentLoc.longitude, currentLoc.latitude],
          zoom: DEFAULT_ZOOM,
          essential: true,
          speed: 1.5,
        });
        updateOrCreateUserMarker(currentLoc.latitude, currentLoc.longitude);
      }
    });

    map.on("rotate", (e) => {
      const b = e.target.getBearing();
      mapBearingRef.current = b;
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setRotation(
          compassHeadingRef.current - b
        );
      }
      callbacksRef.current.onMapBearingChange?.(b);
    });

    // Detect user manual interaction matching vanilla touchstart
    const handleInteraction = () => {
      callbacksRef.current.onUserInteraction?.();
    };

    map.on("touchstart", handleInteraction);
    map.on("dragstart", handleInteraction);

    const handleWindowResize = () => {
      map.resize();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      isLoadedRef.current = false;
      window.removeEventListener("resize", handleWindowResize);
      map.off("touchstart", handleInteraction);
      map.off("dragstart", handleInteraction);
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.remove();
        currentLocationMarkerRef.current = null;
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.remove();
        destinationMarkerRef.current = null;
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // 2. Direct deviceorientation listener for high-performance 60fps bearing and marker updates
  useEffect(() => {
    let rafId = null;

    const handleOrientation = (event) => {
      if (typeof event.alpha === "number" && !isNaN(event.alpha)) {
        const heading = (360 - event.alpha) % 360;
        compassHeadingRef.current = heading;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const map = mapInstanceRef.current;
            if (!map) return;

            // Apply compass heading to map when in bearing mode
            if (isMapCenteredRef.current && isBearingRef.current) {
              map.setBearing(heading);
            }

            // Keep user marker pointing in direction of travel
            if (currentLocationMarkerRef.current) {
              currentLocationMarkerRef.current.setRotation(
                heading - mapBearingRef.current
              );
              currentLocationMarkerRef.current.setPitchAlignment("map");
            }
          });
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 3. Reset bearing to 0 ONLY when isBearing transitions to false (matching vanilla reset/button toggle)
  const prevIsBearingRef = useRef(isBearing);
  useEffect(() => {
    if (prevIsBearingRef.current && !isBearing && mapInstanceRef.current) {
      mapInstanceRef.current.setBearing(0);
    }
    prevIsBearingRef.current = isBearing;
  }, [isBearing]);

  // 4. Handle user location updates & fast flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation?.latitude || !userLocation?.longitude) return;

    const { latitude, longitude } = userLocation;

    // Follow user if centered
    if (isMapCentered) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: DEFAULT_ZOOM,
        essential: true,
        speed: 1.5,
      });
    }

    updateOrCreateUserMarker(latitude, longitude);
  }, [userLocation, isMapCentered]);

  // 5. Handle destination marker updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!destination) {
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.remove();
        destinationMarkerRef.current = null;
      }
      return;
    }

    const { latitude, longitude, name } = destination;

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    const marker = new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(name || "Destination"))
      .addTo(map);

    destinationMarkerRef.current = marker;
  }, [destination]);

  // 6. Handle route line drawing
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const updateRoute = () => {
      if (!isLoadedRef.current) return;

      const hasRoute =
        directionsData?.routes?.length &&
        directionsData.routes[0]?.geometry?.coordinates?.length;

      // Clean existing route if already present
      if (map.getSource(SOURCE_ID)) {
        try {
          if (map.getLayer(SOURCE_ID)) {
            map.removeLayer(SOURCE_ID);
          }
          map.removeSource(SOURCE_ID);
        } catch (err) {
          console.error("Error removing route layer/source:", err);
        }
      }

      if (!hasRoute) return;

      const routeCoordinates = directionsData.routes[0].geometry.coordinates;

      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        },
      });

      map.addLayer({
        id: SOURCE_ID,
        type: "line",
        source: SOURCE_ID,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3882f6",
          "line-width": 7,
        },
      });
    };

    if (map.isStyleLoaded()) {
      updateRoute();
    } else {
      map.once("style.load", updateRoute);
    }
  }, [directionsData]);

  return (
    <div
      id="map-container"
      className="fixed bottom-0 left-0 right-0 w-full h-[180px] border-t border-border shadow-[0_-8px_32px_rgba(0,0,0,0.5)] z-2 pointer-events-auto touch-none"
    >
      <div
        ref={mapContainerRef}
        id="map"
        className="w-full h-full pointer-events-auto touch-none"
      />
    </div>
  );
}
