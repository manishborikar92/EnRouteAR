import NavigateClient from "@/components/navigation/NavigateClient";

export const metadata = {
  title: "Navigate in AR",
  description:
    "Real-world Augmented Reality navigation and interactive satellite wayfinding with live camera waypoints and interactive 2D tracking.",
  alternates: {
    canonical: "/navigate",
  },
  openGraph: {
    title: "Navigate in AR | EnRouteAR",
    description:
      "Real-world Augmented Reality navigation and interactive satellite wayfinding with live camera waypoints and interactive 2D tracking.",
    url: "/navigate",
  },
  keywords: [
    "AR Navigation",
    "Augmented Reality",
    "Outdoor Navigation",
    "Wayfinding",
    "Spatial Wayfinding",
    "A-Frame",
    "AR.js",
  ],
};

export default function NavigatePage() {
  return <NavigateClient />;
}
