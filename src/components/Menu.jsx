"use client";

import { sliderLists } from "../../consants";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = sliderLists.length;
  const contentRef = useRef();
  const goToSlide = (index) => {
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIndex + indexOffset + totalSlides) % totalSlides
    ];
  };

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      },
    );
    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".details h2, .details p",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      },
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .to(
        "#m-right-leaf",
        {
          y: -200,
          scale: 1.2,
        },
        0,
      )
      .to(
        "#m-left-leaf",
        {
          y: 200,
          scale: 1.2,
        },
        0,
      );
  }, [currentIndex]);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              aria-label={`View ${cocktail.name} cocktails`}
              onClick={() => goToSlide(index)}
              className={isActive ? "active" : ""}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{getCocktailAt(-1).name}</span>
            <img
              src="/images/right-arrow.png"
              alt="arrow-right"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{getCocktailAt(1).name}</span>
            <img
              src="/images/left-arrow.png"
              alt="arrow-left"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img
            src={getCocktailAt(0).image}
            alt="cocktail"
            className="object-contain"
          />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{getCocktailAt(0).name}</p>
          </div>
          <div className="details">
            <h2>{getCocktailAt(0).title}</h2>
            <p>{getCocktailAt(0).description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
