export default function HowSection() {
  const steps = [
    {
      title: "Point your phone",
      desc: "Allow location access and your live camera feed becomes the map.",
    },
    {
      title: "Pick a destination",
      desc: "Choose from available destinations or pre-mapped waypoints to plot your route.",
    },
    {
      title: "Walk",
      desc: "Follow the markers and route arrows. The route redraws as you move.",
    },
  ];

  return (
    <section className="py-[clamp(64px,9vw,120px)] relative z-1" id="how" aria-labelledby="how-h">
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto">
        <h2 id="how-h" className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em]">
          How it works
        </h2>
        <ol className="grid gap-8 mt-[clamp(32px,5vw,56px)] [counter-reset:s] min-[50em]:grid-cols-3 min-[50em]:gap-[clamp(24px,4vw,56px)] list-none p-0">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="relative [counter-increment:s] pl-[72px] min-h-14 min-[50em]:pl-0 min-[50em]:pt-[72px] before:content-[counter(s)] before:absolute before:left-0 before:top-0 before:grid before:place-items-center before:w-12 before:h-12 before:rounded-full before:text-white before:bg-gradient-to-br before:from-blue-dk before:to-blue before:font-display before:font-extrabold before:text-[1.1rem] before:shadow-[0_0_0_6px_rgba(76,141,255,0.16),0_10px_30px_-8px_rgba(42,100,245,0.8)] after:content-[''] after:absolute after:left-[23px] after:top-[60px] after:-bottom-[26px] after:w-0.5 after:[background:repeating-linear-gradient(var(--color-route)_0_6px,transparent_6px_12px)] after:opacity-55 last:after:hidden min-[50em]:after:left-16 min-[50em]:after:right-[calc(-1*clamp(24px,4vw,56px)+8px)] min-[50em]:after:top-[23px] min-[50em]:after:bottom-auto min-[50em]:after:w-auto min-[50em]:after:h-0.5 min-[50em]:after:[background:repeating-linear-gradient(90deg,var(--color-route)_0_6px,transparent_6px_12px)]"
            >
              <h3 className="font-display text-[1.3rem] font-bold mb-1.5 text-t1 tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-t2 text-[0.96rem] max-w-[36ch]">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
