"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { places, findPlaceByName } from "@/lib/places";
import { getWalkingDirections, interpolateRouteCoordinates } from "@/lib/geo";
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
  const [waypoints, setWaypoints] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);

  // Map & Orientation State Machine
  const [compassRotation, setCompassRotation] = useState(0);
  const [isUserInteraction, setIsUserInteraction] = useState(false);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [isBearing, setIsBearing] = useState(false);

  // Compute Multifunction Button State
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

  // Handle Geolocation Tracking
  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
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
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Handle Device Orientation / Compass
  useEffect(() => {
    const handleOrientation = (event) => {
      if (typeof event.alpha === "number" && !isNaN(event.alpha)) {
        const rotation = (360 - event.alpha) % 360;
        setCompassRotation(rotation);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Multifunction button click handler
  const handleMultifunctionClick = useCallback(() => {
    if (destination && isMapCentered && isBearing) {
      // Full reset matching vanilla
      setDestination(null);
      setSelectedDestinationName("");
      setDirectionsData(null);
      setWaypoints([]);
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

      const routeCoords = data.routes[0].geometry.coordinates;
      const interpolated = interpolateRouteCoordinates(routeCoords, 2);
      setWaypoints(interpolated);

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
    <div className="flex flex-col h-screen w-full relative overflow-hidden bg-bg">
      {/* Return to Home link */}
      <Link
        href="/"
        className="absolute top-[2%] left-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(4,26,42,0.93)] border border-border text-primary hover:text-white hover:border-primary transition-colors shadow-md md:hidden"
        title="Return to Home"
        aria-label="Return to Home"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      {/* Top Destination Selector HUD */}
      <div className="relative z-5">
        <DestinationBar
          selectedDestination={selectedDestinationName}
          onDestinationChange={setSelectedDestinationName}
          onNavigate={handleNavigate}
          isNavigating={isNavigating}
          places={places}
        />
      </div>

      {/* AR Viewport */}
      <div className="absolute inset-0 z-0">
        <ARViewport
          waypoints={waypoints}
          destinationCoord={destination}
        />
      </div>

      {/* Dynamic HUD Compass */}
      <CompassWidget heading={compassRotation} />

      {/* 2D Satellite Mini-Map */}
      <MapPanel
        userLocation={userLocation}
        destination={destination}
        directionsData={directionsData}
        isMapCentered={isMapCentered}
        isBearing={isBearing}
        compassRotation={compassRotation}
        onUserInteraction={handleUserMapInteraction}
      />

      {/* 4-State Multifunction Control */}
      <MultifunctionButton
        mode={multifunctionMode}
        onClick={handleMultifunctionClick}
      />
    </div>
  );
}
