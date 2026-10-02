import { ArrowUp, ScanLine } from "lucide-react";

export default function CameraPreview() {
  return <figure className="relative overflow-hidden rounded-2xl border border-white/20 bg-forest">
    <svg viewBox="0 0 500 420" fill="none" className="w-full" role="img" aria-label="Illustration of AR route markers following a path between buildings">
      <rect width="500" height="420" fill="#a5b8a5" /><path d="M0 227 500 203V420H0Z" fill="#718f70" />
      <path d="M0 65 111 113 111 252 0 319Z" fill="#e1e0cd" /><path d="m111 113 55-31v144l-55 26Z" fill="#b7bdab" />
      <path d="m333 108 67-44 100 11v199l-100-31-67-26Z" fill="#d7d9c8" /><path d="m333 108 67-44v179l-67-26Z" fill="#b9c2ae" />
      <path d="m14 102 80 34v11l-80-30Zm0 37 80 26v11l-80-22Zm0 38 80 16v11l-80-12Zm344-55 42-25v58l-42 16Zm70-29 65 8v61l-65-16Z" fill="#738a79" />
      <path d="M203 223h75l143 197H53Z" fill="#c9cebc" /><path d="m214 225 46-5 85 200H152Z" fill="#d7ef85" fillOpacity=".45" />
      <g fill="#d7ef85" stroke="#f1ffd0" strokeWidth="2"><ellipse cx="247" cy="383" rx="45" ry="12" /><ellipse cx="243" cy="327" rx="31" ry="9" /><ellipse cx="241" cy="286" rx="20" ry="6" /><ellipse cx="239" cy="257" rx="12" ry="4" /><ellipse cx="237" cy="237" rx="6" ry="2" /></g>
      <path d="M252 154v61" stroke="#172d29" strokeWidth="2" strokeDasharray="4 4" /><path d="M238 142a14 14 0 1 1 28 0c0 12-14 24-14 24s-14-12-14-24Z" fill="#172d29" /><circle cx="252" cy="141" r="5" fill="#d7ef85" />
    </svg>
    <div className="absolute inset-x-4 top-4 flex items-center justify-between text-white"><span className="flex items-center gap-2 rounded-full bg-ink/90 px-3 py-2 text-xs"><ScanLine className="size-3.5 text-lime" aria-hidden="true" />Through your camera</span><span className="rounded-full bg-ink/90 px-3 py-2 font-mono text-[10px]">AR VIEW</span></div>
    <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl border border-white/15 bg-ink/95 p-4 text-white"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-ink"><ArrowUp className="size-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold">A path in perspective</p><p className="mt-0.5 text-xs text-mist">Illustration, not a live camera feed</p></div></figcaption>
  </figure>;
}
