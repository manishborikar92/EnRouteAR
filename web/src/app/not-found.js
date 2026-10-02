import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Atmosphere from "@/components/common/Atmosphere";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The requested route does not exist within the campus spatial index.",
};

export default function NotFound() {
  return (
    <>
      <Atmosphere />
      <Header />

      <main
        id="main"
        className="min-h-[calc(100vh-var(--hdr)-140px)] flex items-center justify-center pt-[calc(var(--hdr)+40px)] pb-20"
      >
        <div className="wrap text-center max-w-[640px] px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.3)] text-signal font-mono text-[0.8rem] font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>404 // COORDINATE UNRESOLVED</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Waypoint Not Found
          </h1>

          <p className="text-t2 text-base md:text-lg mb-8 leading-relaxed max-w-[500px] mx-auto">
            The spatial coordinates or page you are attempting to access do not exist
            within the KITS Ramtek campus index.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/" className="btn">
              <Home className="w-4 h-4" />
              Return to Campus Home
            </Link>
            <Link href="/navigate" className="btn signal">
              <Compass className="w-4 h-4" />
              Launch AR Wayfinding
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
