"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const loaderRef  = useRef(null);
  const countRef   = useRef(null);
  const lineRef    = useRef(null);
  const textRef    = useRef(null);
  const logoRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete,
          });
        },
      });

      // Count up 0 → 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate() {
          if (countRef.current) {
            countRef.current.textContent = Math.round(counter.val);
          }
        },
      }, 0);

      // Progress line
      tl.from(lineRef.current, { scaleX: 0, transformOrigin: "left", duration: 2.2, ease: "power2.inOut" }, 0);

      // Text reveal
      tl.from(textRef.current, { opacity: 0, y: 10, duration: 0.6, ease: "power3.out" }, 0.3);
      tl.from(logoRef.current, { opacity: 0, y: -16, duration: 0.8, ease: "power3.out" }, 0.1);

      // Logo pulse
      tl.to(logoRef.current, {
        opacity: 0.4,
        duration: 0.4,
        ease: "power2.inOut",
        repeat: 1,
        yoyo: true,
      }, 1.8);

    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="preloader">
      <div className="preloader__inner">
        <p ref={logoRef} className="preloader__logo">Two States</p>

        <div className="preloader__line-wrap">
          <div ref={lineRef} className="preloader__line" />
        </div>

        <div className="preloader__bottom">
          <p ref={textRef} className="preloader__sub">Kerala × Tamil Nadu</p>
          <span ref={countRef} className="preloader__count">0</span>
        </div>
      </div>
    </div>
  );
}
