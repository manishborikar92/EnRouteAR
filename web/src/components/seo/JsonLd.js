export default function JsonLd({ schema }) {
  if (!schema) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}

export function WebAppJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";
  return <JsonLd schema={{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EnRouteAR",
    applicationCategory: "NavigationApplication",
    operatingSystem: "A compatible mobile browser with camera, GPS, and WebGL support",
    url: baseUrl,
    description: "Browser-based walking navigation with camera-based AR route markers, live GPS, and a satellite map. Currently uses a fixed destination list.",
    author: { "@type": "Person", name: "Manish Borikar" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Camera-based AR route markers", "Interactive satellite map", "Live GPS position", "Device heading follow", "Walking route calculation", "3D destination marker"],
  }} />;
}

export function BreadcrumbJsonLd({ items }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";
  return <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${baseUrl}${item.path}` })) }} />;
}
