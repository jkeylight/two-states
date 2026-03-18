"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef      = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const dot      = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const moveX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const fMoveX = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const fMoveY = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
      fMoveX(e.clientX);
      fMoveY(e.clientY);
    };

    const onEnterLink = () => {
      gsap.to(follower, { scale: 2.2, borderColor: "rgba(201,168,76,0.8)", duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };
    const onLeaveLink = () => {
      gsap.to(follower, { scale: 1, borderColor: "rgba(201,168,76,0.5)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}      className="cursor__dot" />
      <div ref={followerRef} className="cursor__follower" />
    </>
  );
}
