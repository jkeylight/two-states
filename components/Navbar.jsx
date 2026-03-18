"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin();

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(".mobile-nav", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(".mobile-nav__link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <Link href="/" className="navbar__logo">
          Two <span>States</span>
        </Link>

        <div className="navbar__links">
          <Link href="#about"      className="navbar__link">About</Link>
          <Link href="#menu"       className="navbar__link">Menu</Link>
          <Link href="#experience" className="navbar__link">Experience</Link>
          <Link href="#contact"    className="navbar__link">Contact</Link>
        </div>

        <Link href="#reserve" className="navbar__reserve">Reserve a Table</Link>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger__line${menuOpen ? " open" : ""}`} />
          <span className={`hamburger__line${menuOpen ? " open" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-nav__list">
            {["About", "Menu", "Experience", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="mobile-nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#reserve" className="mobile-nav__link" onClick={() => setMenuOpen(false)}>
                Reserve
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
