import NavigateClient from "@/components/navigation/NavigateClient";

export const metadata = {
  title: "Navigate in AR",
  description:
    "Real-world Augmented Reality navigation and interactive satellite wayfinding across KITS Ramtek campus.",
  alternates: {
    canonical: "/navigate",
  },
  openGraph: {
    title: "Navigate in AR | EnRouteAR",
    description:
      "Real-world Augmented Reality navigation and interactive satellite wayfinding across KITS Ramtek campus.",
    url: "/navigate",
  },
  keywords: [
    "AR Navigation",
    "Augmented Reality",
    "KITS Ramtek",
    "Wayfinding",
    "Campus Navigation",
    "A-Frame",
    "AR.js",
  ],
};

export default function NavigatePage() {
  return <NavigateClient />;
}
