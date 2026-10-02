import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { WebAppJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap", weight: ["500", "700", "800"] });
const publicSans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin"], display: "swap", weight: ["400", "500", "600"] });
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";
const description = "A clearer way to find your bearings. EnRouteAR combines camera-based AR route markers, live GPS, and satellite maps for walking navigation.";

export const viewport = { themeColor: "#f5f4ee", colorScheme: "light", width: "device-width", initialScale: 1, viewportFit: "cover" };
export const metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: "EnRouteAR — A clearer way forward", template: "%s | EnRouteAR" },
  description,
  applicationName: "EnRouteAR",
  keywords: ["EnRouteAR", "augmented reality navigation", "walking navigation", "browser-based wayfinding", "A-Frame", "AR.js", "Mapbox", "outdoor navigation"],
  authors: [{ name: "EnRouteAR Team" }],
  creator: "Manish Borikar",
  openGraph: { title: "EnRouteAR — A clearer way forward", description, url: APP_URL, siteName: "EnRouteAR", locale: "en_US", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "EnRouteAR — The real world. A clearer way." }] },
  twitter: { card: "summary_large_image", title: "EnRouteAR — A clearer way forward", description, images: ["/opengraph-image"] },
};

export default function RootLayout({ children }) {
  return <html lang="en" className={`${bricolage.variable} ${publicSans.variable} scroll-pt-28 motion-safe:scroll-smooth antialiased has-[#navigation-app]:fixed! has-[#navigation-app]:inset-0! has-[#navigation-app]:h-dvh! has-[#navigation-app]:overflow-hidden!`}>
    <body className="min-h-screen bg-paper font-body text-ink selection:bg-lime selection:text-ink [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-current motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none has-[#navigation-app]:fixed! has-[#navigation-app]:inset-0! has-[#navigation-app]:m-0! has-[#navigation-app]:h-dvh! has-[#navigation-app]:w-full! has-[#navigation-app]:overflow-hidden! has-[#navigation-app]:bg-transparent!">
      <a href="#main" className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded-xl bg-ink px-5 py-3 font-semibold text-white focus:translate-y-0">Skip to content</a>
      <WebAppJsonLd />
      {children}
      <Toaster position="top-center" offset={160} mobileOffset={160} theme="light" closeButton toastOptions={{ unstyled: true, classNames: {
        toast: "relative flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-4 font-body text-sm text-ink shadow-panel",
        content: "flex-1", description: "mt-1 text-muted", closeButton: "absolute -right-2 -top-2 grid size-7 place-items-center rounded-full border border-line bg-white text-ink", success: "border-success/30", error: "border-danger/30",
      } }} />
    </body>
  </html>;
}
