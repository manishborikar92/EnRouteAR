export default function VisionSection() {
  const visions = [
    {
      title: "Redefining navigation",
      desc: "Navigation should not merely serve as a means to an end but inspire and engage users on their journey. We fuse state-of-the-art AR with real-world utility.",
    },
    {
      title: "Universal accessibility",
      desc: "Whether exploring a bustling city or navigating a sprawling campus, EnRouteAR makes every journey unforgettable — for users of all backgrounds and ages.",
    },
    {
      title: "Future-forward design",
      desc: "By combining cutting-edge AR with a user-centric approach, we aim to set new standards — paving the way for a future where exploration knows no bounds.",
    },
  ];

  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1 bg-gradient-to-b from-white/[0.04] to-white/[0.008] border-y border-line"
      id="vision"
      aria-labelledby="vision-h"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto">
        <h2
          id="vision-h"
          className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] max-w-[18ch]"
        >
          Navigation as an experience
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-5 mt-[clamp(36px,5vw,64px)]">
          {visions.map((item, idx) => (
            <article
              key={idx}
              className="group relative isolate overflow-hidden border border-line bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_48px_-28px_rgba(0,0,0,0.7)] rounded-3xl p-10 max-md:p-7 transition-[border-color,transform] duration-250 ease-smooth hover:border-line-bright hover:-translate-y-[3px] before:content-[''] before:absolute before:inset-0 before:-z-10 before:opacity-0 before:pointer-events-none before:[background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0),rgba(76,141,255,0.22),transparent_65%)] before:transition-opacity before:duration-300 hover:before:opacity-100 after:content-[''] after:absolute after:left-0 after:top-0 after:h-[3px] after:w-14 after:bg-gradient-to-r after:from-signal after:to-signal/0 after:transition-[width] after:duration-500 after:ease-smooth hover:after:w-full"
            >
              <h3 className="font-display text-[1.35rem] font-bold mb-3 text-t1 tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-t2 text-[0.96rem] leading-relaxed [text-wrap:pretty]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
