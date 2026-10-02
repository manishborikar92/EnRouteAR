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
    <section className="sec white" id="vision" aria-labelledby="vision-h">
      <div className="wrap">
        <h2 id="vision-h" style={{ maxWidth: "18ch" }}>
          Navigation as an experience
        </h2>
        <div className="vision">
          {visions.map((item, idx) => (
            <article key={idx}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
