export default function VisionSection() {
  const visions = [
    {
      num: "01",
      title: "Redefining Navigation",
      desc: "Navigation should not merely serve as a means to an end but inspire and engage users on their journey. We fuse state-of-the-art AR with real-world utility.",
      delay: "0",
    },
    {
      num: "02",
      title: "Universal Accessibility",
      desc: "Whether exploring a bustling city or navigating a sprawling campus, EnRouteAR makes every journey unforgettable — for users of all backgrounds and ages.",
      delay: "150",
    },
    {
      num: "03",
      title: "Future-Forward Design",
      desc: "By combining cutting-edge AR with a user-centric approach, we aim to set new standards — paving the way for a future where exploration knows no bounds.",
      delay: "300",
    },
  ];

  return (
    <section className="content-section relative z-10 py-[100px] px-10 max-md:py-[72px] max-md:px-6" id="vision">
      <div className="section-inner max-w-[1200px] mx-auto">
        <div className="section-label reveal flex items-center gap-3.5 font-display text-[0.6rem] tracking-[0.22em] text-primary uppercase mb-5">
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
          PROJECT VISION
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
        </div>

        <h2 className="section-title reveal font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-text-1 mb-[52px]">
          Navigation as an{" "}
          <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="vision-grid grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-md:grid-cols-1 gap-[2px] bg-border border border-border rounded-lg overflow-hidden">
          {visions.map((item, idx) => (
            <div
              key={idx}
              className="vision-block reveal bg-bg px-8 py-10 transition-colors duration-250 hover:bg-bg-alt"
              data-delay={item.delay}
            >
              <div className="vision-num font-display text-[2.5rem] font-black text-[rgba(0,180,255,0.15)] leading-none mb-4">
                {item.num}
              </div>
              <h3 className="font-display text-[0.85rem] font-semibold tracking-[0.06em] text-accent mb-3">
                {item.title}
              </h3>
              <p className="text-[0.92rem] text-text-2 leading-[1.75]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
