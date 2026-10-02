import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { WebAppJsonLd, CollegeJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";

export const viewport = {
  themeColor: "#07111E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "EnRouteAR — Augmented Reality Navigation",
    template: "%s | EnRouteAR",
  },
  description:
    "Web-based augmented reality campus navigation for KITS Ramtek. Overlay digital waypoints, 3D markers, and real-time directions onto your live camera feed.",
  applicationName: "EnRouteAR",
  keywords: [
    "EnRouteAR",
    "augmented reality navigation",
    "campus AR",
    "KITS Ramtek",
    "A-Frame",
    "AR.js",
    "Mapbox",
    "WebXR",
    "indoor outdoor navigation",
  ],
  authors: [{ name: "EnRouteAR Team" }],
  creator: "Manish Borikar",
  openGraph: {
    title: "EnRouteAR — Augmented Reality Navigation",
    description:
      "Web-based augmented reality campus navigation for KITS Ramtek. Overlay digital waypoints, 3D markers, and real-time directions onto your live camera feed.",
    url: APP_URL,
    siteName: "EnRouteAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-transparent-png.png",
        width: 1200,
        height: 630,
        alt: "EnRouteAR — Augmented Reality Navigation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EnRouteAR — Augmented Reality Navigation",
    description:
      "Overlay digital waypoints, 3D markers, and turn-by-turn directions directly onto your camera feed.",
    images: ["/logo-transparent-png.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${publicSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-t1 font-body">
        <WebAppJsonLd />
        <CollegeJsonLd />
        {children}
        <Toaster
          richColors
          position="bottom-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(18, 32, 54, 0.92)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(150, 185, 235, 0.34)",
              color: "#EAF0F8",
              fontFamily: "var(--font-public-sans), sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
