import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// ============================================================================
// Root Layout — Shared wrapper for all pages
// ============================================================================

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'EnRouteAR — Augmented Reality Navigation',
    template: '%s | EnRouteAR',
  },
  description:
    'EnRouteAR is an innovative augmented reality navigation system for the KITS Ramtek campus. Navigate with AR markers, 2D maps, and real-time GPS directions.',
  keywords: [
    'augmented reality',
    'AR navigation',
    'campus navigation',
    'KITS Ramtek',
    'EnRouteAR',
    'Mapbox',
    'A-Frame',
    'WebXR',
  ],
  authors: [{ name: 'EnRouteAR Team' }],
  creator: 'EnRouteAR',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://enroutear.vercel.app'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'EnRouteAR — Augmented Reality Navigation',
    description:
      'Navigate the KITS Ramtek campus with augmented reality overlays, 3D markers, and real-time walking directions.',
    siteName: 'EnRouteAR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnRouteAR — Augmented Reality Navigation',
    description:
      'Navigate the KITS Ramtek campus with augmented reality overlays and real-time directions.',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/favicon.ico',
  },
  manifest: '/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-navy font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
