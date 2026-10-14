export default function JsonLd({ schema }) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebAppJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EnRouteAR",
    applicationCategory: "NavigationApplication",
    operatingSystem: "All (Modern WebXR/Camera/GPS-capable browser)",
    url: baseUrl,
    description:
      "Web-based augmented reality navigation platform. Overlay digital waypoints, 3D markers, and real-time directions onto your live camera feed.",
    author: {
      "@type": "Person",
      name: "Manish Borikar",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time Augmented Reality Camera Overlay",
      "Interactive 2D Mapbox Satellite Map",
      "Dynamic Compass Heading Tracking",
      "Multi-touch Map Gestures",
      "Turn-by-turn Route Waypoints",
      "3D Destination Marker",
    ],
  };

  return <JsonLd schema={schema} />;
}

export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EnRouteAR",
    url: baseUrl,
    logo: `${baseUrl}/logo-transparent-png.png`,
    description: "Augmented Reality Navigation Platform",
  };

  return <JsonLd schema={schema} />;
}

export function BreadcrumbJsonLd({ items }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };

  return <JsonLd schema={schema} />;
}
