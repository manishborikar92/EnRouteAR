import {
  PinIcon,
  ScreenIcon,
  ClockIcon,
  CompassIcon,
  MapIcon,
  FlagIcon,
} from "@/components/common/Icons";

export default function AboutSection() {
  const features = [
    {
      icon: PinIcon,
      title: "Real-world navigation",
      desc: "Navigate physical spaces with GPS-accurate positioning. Your live camera feed becomes the map.",
    },
    {
      icon: ScreenIcon,
      title: "3D AR overlays",
      desc: "Destination markers, route arrows, and 3D models anchored to real-world GPS coordinates.",
    },
    {
      icon: ClockIcon,
      title: "Live route tracking",
      desc: "Watches your GPS position in real time and redraws the walking route dynamically as you move.",
    },
    {
      icon: CompassIcon,
      title: "Compass-corrected",
      desc: "Device orientation sensor keeps the AR scene and map bearing locked to your heading automatically.",
    },
    {
      icon: MapIcon,
      title: "Satellite map view",
      desc: "Embedded Mapbox satellite-streets mini-map keeps context grounded even while you look through the AR lens.",
    },
    {
      icon: FlagIcon,
      title: "14 campus destinations",
      desc: "Pre-mapped locations including departments, hostels, canteen, library, gym and more within KITS campus.",
    },
  ];

  return (
    <section className="sec white" id="about" aria-labelledby="about-h">
      <div className="wrap split a">
        <div>
          <h2 id="about-h">What is EnRouteAR?</h2>
        </div>
        <ul className="feats">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <li key={idx}>
                <Icon className="feat-icon" />
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
