import { Compass, Home } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Atmosphere from "@/components/common/Atmosphere";
import Button from "@/components/common/Button";

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
        className="min-h-[calc(100vh-var(--hdr)-140px)] flex items-center justify-center pt-[calc(var(--hdr)+40px)] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] relative z-1"
      >
        <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto text-center max-w-[640px] px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.3)] text-signal font-mono text-[0.8rem] font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>404 // COORDINATE UNRESOLVED</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 text-t1 tracking-[-0.03em]">
            Waypoint Not Found
          </h1>

          <p className="text-t2 text-base md:text-lg mb-8 leading-relaxed max-w-[500px] mx-auto [text-wrap:pretty]">
            The spatial coordinates or page you are attempting to access do not exist
            within the KITS Ramtek campus index.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button href="/" className="w-full sm:w-auto">
              <Home className="w-4 h-4 shrink-0" />
              <span>Return to Campus Home</span>
            </Button>
            <Button variant="signal" href="/navigate" className="w-full sm:w-auto">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Launch AR Wayfinding</span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
