import { socials, openingHours } from "../../consants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Contact = () => {
  useGSAP(() => {
    const build = () => {
      const split = SplitText.create("#contact h2", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top center",
          end: "bottom bottom",
        },
      });

      tl.from(split.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
        duration: 0.6,
      }).fromTo(
        "#contact h3, #contact p",
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, stagger: 0.02, duration: 0.8 },
        "<0.1",
      );
      // Leaf parallax (scrubbed)
      gsap.to("#f-right-leaf", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("#f-left-leaf", {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(build);
    } else {
      build();
    }
  }, []);

  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="right-leaf"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="left-leaf"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Where to Find Us</h2>
        <div>
          <h3>Visit our store</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>
        <div>
          <h3>Contact us</h3>
          <p>(555) 987-6543</p>
          <p>hello@velvetpour.com</p>
        </div>
        <div>
          <h3>Opening hours</h3>
          {openingHours.map((hour) => (
            <p key={hour.day}>
              {hour.day}: {hour.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Follow us</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
