"use client";


import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCity,
  handleCityReturn,
  staggerRevealClose,
} from "./Animations";

import dallas from "../assets/dallas.webp";
import austin from "../assets/austin.webp";
import newyork from "../assets/newyork.webp";
import sanfrancisco from "../assets/sanfrancisco.webp";

interface HamburgerProps {
  state: {
    initial: boolean | null;
    clicked: boolean | null;
    menuName: string;
  };
}

const cities = [
  { name: "Github", image: dallas },
  { name: "Linkedin", image: austin },
  { name: "Behance", image: newyork },
  { name: "Instagram", image: sanfrancisco },
];

const Hamburger: React.FC<HamburgerProps> = ({ state }) => {
  const menuLayer = useRef<HTMLDivElement | null>(null);
  const reveal1 = useRef<HTMLDivElement | null>(null);
  const reveal2 = useRef<HTMLDivElement | null>(null);
  const cityBackground = useRef<HTMLDivElement | null>(null);
  const line1 = useRef<HTMLLIElement | null>(null);
  const line2 = useRef<HTMLLIElement | null>(null);
  const line3 = useRef<HTMLLIElement | null>(null);
  const info = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state.clicked === false) {
      staggerRevealClose(reveal2.current, reveal1.current);
      gsap.to(menuLayer.current, { duration: 1, css: { display: "none" } });
    } else if (state.clicked) {
      gsap.to(menuLayer.current, { duration: 0, css: { display: "block" } });
      gsap.to([reveal1.current, reveal2.current], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(reveal1.current, reveal2.current);
      fadeInUp(info.current);
      staggerText(line1.current, line2.current, line3.current);
    }
  }, [state]);

  return (
    <div ref={menuLayer} className="hamburger-menu">
      <div ref={reveal1} className="menu-secondary-background-color"></div>
      <div ref={reveal2} className="menu-layer">
        <div ref={cityBackground} className="menu-city-background"></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li ref={line1}>
                    <Link href="/about" onMouseEnter={handleHover} onMouseOut={handleHoverExit}>
                      About me
                    </Link>
                  </li>
                  <li ref={line2}>
                    <Link href="/portfolio" onMouseEnter={handleHover} onMouseOut={handleHoverExit}>
                      Portfolio
                    </Link>
                  </li>
                  <li ref={line3}>
                    <Link href="/contact" onMouseEnter={handleHover} onMouseOut={handleHoverExit}>
                      Contact me
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={info} className="info">
                <h3>My Ethos</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with
                  their software.
                </p>
              </div>
              <div className="locations">
                Socials:
                {cities.map((city) => (
                  <span
                    key={city.name}
                    onMouseEnter={() => handleCity(city.image, cityBackground.current)}
                    onMouseOut={() => handleCityReturn(cityBackground.current)}
                  >
                    {city.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
