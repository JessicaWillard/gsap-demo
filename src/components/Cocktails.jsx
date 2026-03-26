import { cocktailLists, mockTailLists } from "../../consants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    const parralaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
    parralaxTimeline.from(
      "#c-left-leaf",
      {
        x: -100,
        y: 100,
      },
      0,
    );
    parralaxTimeline.from(
      "#c-right-leaf",
      {
        x: 100,
        y: 100,
      },
      0,
    );
    tl.from("li", {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.06,
    });
  });
  return (
    <section id="cocktails" className="noisy">
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
      />
      <div className="list">
        <div className="popular">
          <h2>Popular Cocktails</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>{price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Loved Mocktails</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
