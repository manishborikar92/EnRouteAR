export default function HowSection() {
  return (
    <section className="sec" id="how" aria-labelledby="how-h">
      <div className="wrap">
        <h2 id="how-h">How it works</h2>
        <ol className="steps">
          <li>
            <h3>Point your phone</h3>
            <p>
              Allow location access and your live camera feed becomes the map.
            </p>
          </li>
          <li>
            <h3>Pick a destination</h3>
            <p>
              Choose from 14 pre-mapped places: departments, hostels, canteen,
              library, gym and more.
            </p>
          </li>
          <li>
            <h3>Walk</h3>
            <p>
              Follow the markers and route arrows. The route redraws as you
              move.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
