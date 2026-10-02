import { Navigation, LoaderCircle } from "lucide-react";

export default function LoadingState({ label = "Loading EnRouteAR…" }) {
  return <main id="main" className="grid min-h-dvh place-items-center bg-paper px-6 text-ink"><div role="status" className="flex flex-col items-center gap-5"><span className="grid size-16 place-items-center rounded-2xl bg-ink text-lime"><Navigation className="size-7" aria-hidden="true" /></span><p className="flex items-center gap-2 text-sm"><LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />{label}</p></div></main>;
}
