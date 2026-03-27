import { useRef } from "react";
import { navLinks } from "../../consants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const nav = navRef.current;
    const hero = document.querySelector("#hero");
    if (!nav || !hero) return;

    gsap.fromTo(
      nav,
      {
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: "rgba(0, 0, 0, 0.31)",
        backdropFilter: "blur(10px)",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=80",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  return (
    <nav ref={navRef}>
      <div>
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
