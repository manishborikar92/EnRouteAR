import NavigateClient from "@/components/navigation/NavigateClient";

export const metadata = {
  title: "Navigate in AR",
  description: "Choose an available destination and find your bearings with camera-based AR route markers and an interactive satellite map.",
  alternates: { canonical: "/navigate" },
  openGraph: { title: "Navigate in AR | EnRouteAR", description: "Walking navigation with a different perspective. Camera-based AR and a satellite map, together in your browser.", url: "/navigate" },
};

export default function NavigatePage() {
  return <NavigateClient />;
}
