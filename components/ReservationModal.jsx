"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ReservationModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      const tl = gsap.timeline();
      tl.from(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" })
        .from(panelRef.current, { y: 60, opacity: 0, duration: 0.6, ease: "power4.out" }, "-=0.2")
        .from(".modal__field", { y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.3");
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline({
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
      tl.to(panelRef.current, { y: 40, opacity: 0, duration: 0.4, ease: "power2.in" })
        .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="modal__overlay" style={{ display: "none" }} onClick={(e) => e.target === overlayRef.current && onClose()}>
      <div ref={panelRef} className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__header">
          <p className="modal__eyebrow">Reserve Your Evening</p>
          <h2 className="modal__title">Book a Table</h2>
          <p className="modal__sub">We look forward to welcoming you<br /><span style={{fontSize:"11px", color:"rgba(201,168,76,0.6)", letterSpacing:"0.08em"}}>H.No 50/A, Anakkatty Bridge Road, Anaikatti, TN</span></p>
        </div>

        <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label">Full Name</label>
              <input className="modal__input" type="text" placeholder="Your name" />
            </div>
            <div className="modal__field">
              <label className="modal__label">Phone</label>
              <input className="modal__input" type="tel" placeholder="+91 00000 00000" />
            </div>
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label">Date</label>
              <input className="modal__input" type="date" />
            </div>
            <div className="modal__field">
              <label className="modal__label">Time</label>
              <select className="modal__input modal__select">
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
                <option>21:30</option>
              </select>
            </div>
          </div>

          <div className="modal__field">
            <label className="modal__label">Guests</label>
            <select className="modal__input modal__select">
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
          </div>

          <div className="modal__field">
            <label className="modal__label">Special Requests</label>
            <textarea className="modal__input modal__textarea" placeholder="Dietary requirements, occasion, preferences..." rows={3} />
          </div>

          <button type="submit" className="modal__submit">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
