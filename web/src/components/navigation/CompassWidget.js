"use client";

export default function CompassWidget({ heading = 0 }) {
  // Rotate the compass widget opposite to the heading so it points North, matching vanilla
  const rotationDegrees = (360 - (heading % 360)) % 360;

  return (
    <div id="compass-container" aria-hidden="true" className="pointer-events-auto">
      <div
        className="compass"
        style={{
          transform: `rotate(${rotationDegrees}deg)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
