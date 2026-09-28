"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { places, findPlaceByName } from "@/lib/places";
import { getWalkingDirections } from "@/lib/geo";
import DestinationBar from "./DestinationBar";
import CompassWidget from "./CompassWidget";
import MapPanel from "./MapPanel";
import MultifunctionButton from "./MultifunctionButton";
import ARViewport from "./ARViewport";

export default function NavigateClient() {
  const [selectedDestinationName, setSelectedDestinationName] = useState("");
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [directionsData, setDirectionsData] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Map & Orientation State Machine
  const [isUserInteraction, setIsUserInteraction] = useState(false);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [isBearing, setIsBearing] = useState(false);

  // Compute Multifunction Button State matching vanilla priority
  const multifunctionMode = useMemo(() => {
    if (destination && isMapCentered && isBearing) {
      return "reset-all";
    }
    if (isMapCentered && !isBearing) {
      return "centered";
    }
    if (isUserInteraction) {
      return "recenter";
    }
    if (isBearing) {
      return "bearing";
    }
    return "centered";
  }, [destination, isMapCentered, isBearing, isUserInteraction]);

  // Handle Geolocation Tracking with fast-start first fix
  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation((prev) => {
        if (
          Math.abs(prev.latitude - latitude) < 0.000001 &&
          Math.abs(prev.longitude - longitude) < 0.000001
        ) {
          return prev;
        }
        return { latitude, longitude };
      });
    };

    const handleError = (error) => {
      switch (error.code) {
        case 1:
          toast.error("Location permission denied. Please allow location access to navigate.");
          break;
        case 2:
          toast.error("Position information is unavailable. Please check your GPS signal.");
          break;
        case 3:
          toast.error("Location request timed out. Retrying...");
          break;
        default:
          console.error("Geolocation error:", error.message);
      }
    };

    // 1. Immediate one-shot query to acquire initial fix as fast as possible
    navigator.geolocation.getCurrentPosition(
      handlePosition,
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );

    // 2. Continuous watch for high-accuracy movement updates
    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Multifunction button click handler
  const handleMultifunctionClick = useCallback(() => {
    if (destination && isMapCentered && isBearing) {
      // Full reset matching vanilla
      setDestination(null);
      setSelectedDestinationName("");
      setDirectionsData(null);
      setIsBearing(false);
      setIsMapCentered(true);
      setIsUserInteraction(false);
      toast.info("Route cleared.");
    } else if (isMapCentered) {
      // Toggle bearing on/off
      setIsBearing((prev) => !prev);
    } else {
      // Re-centre the map on the user
      setIsUserInteraction(false);
      setIsMapCentered(true);
    }
  }, [destination, isMapCentered, isBearing]);

  // Destination Selection & Route Request
  const handleNavigate = useCallback(async () => {
    if (!selectedDestinationName) return;

    const targetPlace = findPlaceByName(selectedDestinationName);
    if (!targetPlace) {
      toast.error("Destination not found.");
      return;
    }

    if (!userLocation.latitude || !userLocation.longitude) {
      toast.warning("Waiting for GPS position before calculating route...");
      return;
    }

    setIsNavigating(true);

    try {
      const data = await getWalkingDirections(userLocation, targetPlace);

      if (!data?.routes?.length) {
        toast.error("No walking route found to the destination.");
        setIsNavigating(false);
        return;
      }

      setDestination(targetPlace);
      setDirectionsData(data);

      // Align map state with active route
      setIsUserInteraction(false);
      setIsMapCentered(true);
      setIsBearing(true);

      const distanceMeters = Math.round(data.routes[0].distance || 0);
      const durationMin = Math.ceil((data.routes[0].duration || 0) / 60);
      toast.success(`Route calculated: ~${distanceMeters}m (${durationMin} min walk)`);
    } catch (err) {
      console.error("Navigation routing error:", err);
      toast.error("Failed to retrieve walking route. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  }, [selectedDestinationName, userLocation]);

  const handleUserMapInteraction = useCallback(() => {
    setIsUserInteraction(true);
    setIsMapCentered(false);
    setIsBearing(false);
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] w-full fixed inset-0 overflow-hidden bg-transparent select-none pointer-events-none z-10">
      {/* 1. Top Destination Selector HUD */}
      <DestinationBar
        selectedDestination={selectedDestinationName}
        onDestinationChange={setSelectedDestinationName}
        onNavigate={handleNavigate}
        isNavigating={isNavigating}
      />

      {/* 2. AR Viewport with camera feed background */}
      <ARViewport
        userLocation={userLocation}
        directionsData={directionsData}
        destination={destination}
      />

      {/* 3. Dynamic HUD Compass */}
      <CompassWidget />

      {/* 4. 2D Satellite Mini-Map */}
      <MapPanel
        userLocation={userLocation}
        destination={destination}
        directionsData={directionsData}
        isMapCentered={isMapCentered}
        isBearing={isBearing}
        onUserInteraction={handleUserMapInteraction}
      />

      {/* 5. 4-State Multifunction Control */}
      <MultifunctionButton
        mode={multifunctionMode}
        onClick={handleMultifunctionClick}
      />
    </div>
  );
}
