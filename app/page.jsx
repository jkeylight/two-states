"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Link from "next/link";
import ReservationModal from "@/components/ReservationModal";

gsap.registerPlugin(ScrollTrigger);

const Ornament = () => (
  <svg viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" suppressHydrationWarning>
    <path d="M20 2 L38 10 L20 18 L2 10 Z" stroke="currentColor" strokeWidth="0.8" fill="none" suppressHydrationWarning />
    <circle cx="20" cy="10" r="3" fill="currentColor" suppressHydrationWarning />
    <line x1="0" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="0.6" suppressHydrationWarning />
    <line x1="26" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="0.6" suppressHydrationWarning />
  </svg>
);

const MENU_ITEMS = [
  { name: "Meen Moilee",       desc: "Kerala fish curry — coconut milk, turmeric, green chilli, curry leaf",   price: "₹680" },
  { name: "Chettinad Chicken", desc: "Slow-cooked in stone-ground spice blend, kalpasi, marathi mokku",        price: "₹720" },
  { name: "Avial",             desc: "Seventeen vegetables, raw coconut, yoghurt, tempered in coconut oil",    price: "₹420" },
  { name: "Prawn Masala",      desc: "Tiger prawns, Malabar pepper, Koorka chips, kokum reduction",            price: "₹880" },
];

const MENU_ITEMS_2 = [
  { name: "Puttu & Kadala",    desc: "Steamed rice cylinders with black chickpea curry, grated coconut",       price: "₹320" },
  { name: "Rasam Soup",        desc: "Tamarind & tomato broth, black pepper, garlic, dried chilli tadka",      price: "₹280" },
  { name: "Kozhukatta",        desc: "Steamed rice dumplings, jaggery coconut filling, cardamom",              price: "₹340" },
  { name: "Payasam",           desc: "Rice & vermicelli in reduced milk, saffron, cashew, raisin",             price: "₹380" },
];

const CHEFS = [
  { name: "Chef Rajan Pillai",    role: "Executive Chef — Kerala",   bio: "Born in Alappuzha, trained under Leela Kempinski. Rajan brings the coastal kitchen of Kerala to every plate — the slow Moilee, the precise Avial." },
  { name: "Chef Meenakshi Gopal", role: "Head Chef — Tamil Nadu",    bio: "Raised in a Chettinad household in Karaikudi. Meenakshi grinds her spices fresh daily, as her grandmother taught her." },
  { name: "Chef Arjun Das",       role: "Pastry & Desserts",         bio: "A Thiruvananthapuram native with European pastry training. His Payasam reimagined is the dessert people return for." },
];

const PRESS = [
  { outlet: "Condé Nast Traveller", date: "Oct 2024", headline: "The Most Exciting New Restaurant in Pune", tag: "Restaurant" },
  { outlet: "Vogue India",          date: "Sep 2024", headline: "How Two States' Menu Shaped Our Palate",   tag: "Feature"    },
  { outlet: "The Hindu",            date: "Aug 2024", headline: "A Love Letter to South Indian Cuisine",    tag: "Review"     },
];

const TESTIMONIALS = [
  { quote: "Two States is unlike anything I have experienced — the Chettinad spices meet Kerala coconut in absolute harmony. This is what South Indian fine dining should always have been.", author: "Arjun Nair — Mumbai" },
  { quote: "The Meen Moilee alone is worth the journey. Extraordinary restraint in flavour — you taste every layer. A restaurant born from love for two great cuisines.",                     author: "Priya Krishnan — Bangalore" },
  { quote: "From the Avial to the Chettinad Chicken, every dish tells a story of place. The ambience, the service, the food — nothing is out of place.",                                   author: "Vikram Menon — Chennai" },
];

const MARQUEE_WORDS = ["Sadya","Rasam","Avial","Chettinad","Appam","Kozhukatta","Parotta","Payasam","Meen","Puttu","Kadala","Sambar"];

export default function HomePage() {
  const [loaded,           setLoaded]           = useState(true);
  const [modalOpen,        setModalOpen]         = useState(false);
  const [activeTestimonial,setActiveTestimonial] = useState(0);
  const [activeMenuTab,    setActiveMenuTab]     = useState("kerala");

  const mainRef       = useRef(null);
  const heroRef       = useRef(null);
  const pinnedRef     = useRef(null);
  const aboutRef      = useRef(null);
  const menuRef       = useRef(null);
  const chefsRef      = useRef(null);
  const chefsTrackRef = useRef(null);
  const experienceRef = useRef(null);
  const infoRef       = useRef(null);
  const pressRef      = useRef(null);

  const handlePreloaderComplete = () => {
    setLoaded(true);
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" });
  };

  /* HERO */
  useGSAP(() => {
    const title = new SplitType(".hero__title", { types: "chars" });
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(title.chars,      { y: 100, opacity: 0, rotateX: -30, stagger: 0.025, duration: 1.1, ease: "power4.out" })
      .from(".hero__eyebrow", { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, 0)
      .from(".hero__sub",     { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.45")
      .from(".hero__cta-wrap",{ y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
      .from(".hero__circle",  { scale: 0.9, opacity: 0, duration: 1.5, ease: "power3.out" }, 0.05)
      .from(".hero__meta",    { y: 16, opacity: 0, duration: 0.5 }, "-=0.5")
      .from(".hero__meta-right",   { y: 16, opacity: 0, duration: 0.5 }, "<")
      .from(".hero__scroll-hint",  { opacity: 0, duration: 0.5 }, "-=0.2");

    gsap.to(".hero__bg-gradient", { scale: 1.06, duration: 14, ease: "none", repeat: -1, yoyo: true });
    gsap.to(".hero__circle", { y: 140, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 } });
    gsap.to(".hero__content", { y: 80, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "60% top", scrub: 1 } });
  }, { scope: heroRef, dependencies: [loaded] });

  /* PINNED statement */
  useGSAP(() => {
    const words = new SplitType(".pinned__statement", { types: "words" });
    gsap.set(words.words, { opacity: 0.12 });
    gsap.to(words.words, {
      opacity: 1,
      stagger: { each: 0.1, from: "start" },
      ease: "none",
      scrollTrigger: {
        trigger: pinnedRef.current,
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: 1,
      },
    });
  }, { scope: pinnedRef, dependencies: [loaded] });

  /* ABOUT */
  useGSAP(() => {
    const heading = new SplitType(".about__heading", { types: "lines" });
    gsap.from(heading.lines, {
      scrollTrigger: { trigger: ".about-section", start: "top 80%" },
      y: 64, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
    });
    gsap.from(".about__body", { scrollTrigger: { trigger: ".about-section", start: "top 74%" }, y: 28, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.15 });
    gsap.from(".about__stats-item", { scrollTrigger: { trigger: ".about__stats", start: "top 88%" }, y: 24, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" });
    gsap.from(".about__img-wrap",   { scrollTrigger: { trigger: ".about-section", start: "top 78%" }, x: 72, opacity: 0, duration: 1.3, ease: "power3.out" });
    gsap.from(".about__img-tag",    { scrollTrigger: { trigger: ".about-section", start: "top 70%" }, x: -28, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.25 });
  }, { scope: aboutRef, dependencies: [loaded] });

  /* MENU */
  useGSAP(() => {
    const title = new SplitType(".menu__title", { types: "chars" });
    gsap.from(title.chars, {
      scrollTrigger: { trigger: ".menu-section", start: "top 82%" },
      y: 56, opacity: 0, stagger: 0.03, duration: 1.1, ease: "power4.out",
    });
    gsap.from(".menu__tab",  { scrollTrigger: { trigger: ".menu__tabs", start: "top 88%" }, y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" });
    gsap.from(".menu__item", { scrollTrigger: { trigger: ".menu__list-wrap", start: "top 85%" }, y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
    gsap.from(".menu__img-placeholder", { scrollTrigger: { trigger: ".menu-section", start: "top 82%" }, scale: 0.94, opacity: 0, duration: 1.3, ease: "power3.out" });
  }, { scope: menuRef, dependencies: [loaded] });

  /* CHEFS — horizontal scroll */
  useGSAP(() => {
    if (!loaded || !chefsTrackRef.current) return;
    const track = chefsTrackRef.current;
    const totalW = track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -totalW,
      ease: "none",
      scrollTrigger: {
        trigger: chefsRef.current,
        start: "top top",
        end: () => `+=${totalW + 300}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    gsap.from(".chef-card", {
      opacity: 0, x: 60, stagger: 0.15, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: chefsRef.current, start: "top 80%" },
    });
  }, { scope: chefsRef, dependencies: [loaded] });

  /* EXPERIENCE */
  useGSAP(() => {
    gsap.from(".experience__cell", {
      scrollTrigger: { trigger: ".experience__gallery", start: "top 85%" },
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
    });
  }, { scope: experienceRef, dependencies: [loaded] });

  /* PRESS */
  useGSAP(() => {
    gsap.from(".press__item", {
      scrollTrigger: { trigger: ".press-section", start: "top 85%" },
      y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
    });
  }, { scope: pressRef, dependencies: [loaded] });

  /* INFO */
  useGSAP(() => {
    gsap.from(".info__block", {
      scrollTrigger: { trigger: ".info__grid", start: "top 85%" },
      y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
    });
  }, { scope: infoRef, dependencies: [loaded] });

  /* GENERIC REVEALS */
  useGSAP(() => {
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: "top 88%" }, y: 48, opacity: 0, duration: 1, ease: "power3.out" });
    });
  }, { dependencies: [loaded] });

  /* FOOTER */
  useGSAP(() => {
    gsap.from(".footer__inner > *", {
      scrollTrigger: { trigger: ".footer", start: "top 90%" },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
    });
  }, { dependencies: [loaded] });

  /* testimonial auto-rotate */
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div ref={mainRef} style={{ opacity: 1 }}>
        <main>

          {/* HERO */}
          <section className="hero" ref={heroRef} id="home">
            <div className="hero__bg">
              <div className="hero__bg-gradient" />
              <div className="hero__bg-overlay" />
            </div>
            <div className="hero__circle">
              <img
                src="/images/hero.jpg"
                alt="Two States Restaurant"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="hero__content">
              <p className="hero__eyebrow">Kerala × Tamil Nadu</p>
              <h1 className="hero__title">Two States</h1>
              <p className="hero__sub">Where two great cuisines become one extraordinary table</p>
              <div className="hero__cta-wrap">
                <button className="hero__cta" onClick={() => setModalOpen(true)}>Reserve a Table <span>→</span></button>
                <Link href="#menu" className="hero__cta hero__cta--ghost">Explore Menu</Link>
              </div>
            </div>
            <div className="hero__meta">
              <p className="hero__meta-item">Address</p>
              <p className="hero__meta-val">12, Boat Club Road, Pune 411 001</p>
              <p className="hero__meta-item" style={{ marginTop: 14 }}>Reservations</p>
              <p className="hero__meta-val">+91 20 2686 0000</p>
            </div>
            <div className="hero__meta-right">
              <p className="hero__meta-item">Opening Hours</p>
              <p className="hero__meta-val">Lunch &nbsp; Mon–Fri &nbsp; 12:00–15:00</p>
              <p className="hero__meta-val">Dinner &nbsp; Daily &nbsp;&nbsp;&nbsp;&nbsp; 19:00–23:00</p>
            </div>
            <div className="hero__scroll-hint"><div className="hero__scroll-line" /></div>
          </section>

          {/* MARQUEE */}
          <div className="marquee-section">
            <div className="marquee__track">
              {[...Array(3)].flatMap((_, r) =>
                MARQUEE_WORDS.map((w, i) => (
                  <span className="marquee__item" key={`${r}-${i}`}>
                    {w} <span className="marquee__dot" />
                  </span>
                ))
              )}
            </div>
          </div>

          {/* ABOUT */}
          <section className="about-section" ref={aboutRef} id="about">
            <div className="container">
              <div className="about__grid">
                <div className="about__text">
                  <span className="section-label">Our Story</span>
                  <h2 className="about__heading">
                    Where Kerala's <em>coast</em><br />
                    meets Tamil Nadu's<br />
                    <em>heartland</em>
                  </h2>
                  <p className="about__body">
                    Two States is a celebration of South India's two most distinct culinary identities.
                    Kerala's coconut-drenched coastal flavours — the gentle Moilee, the layered Avial —
                    meet the bold, aromatic depth of Chettinad and Tamil Brahmin kitchens. Every dish
                    is a bridge between two great states, two great traditions.
                  </p>
                  <p className="about__body">
                    Our chefs were raised in both kitchens. The spices are sourced weekly from Kochi
                    and Madurai markets. Nothing is diluted. Nothing is fusion. This is both cuisines,
                    at their finest, sharing the same table.
                  </p>
                  <div className="about__stats">
                    {[
                      { num: "12+", label: "Years of Craft" },
                      { num: "2",   label: "Culinary Traditions" },
                      { num: "48",  label: "Dishes on Menu" },
                    ].map((s) => (
                      <div className="about__stats-item" key={s.label}>
                        <span className="about__stats-num">{s.num}</span>
                        <span className="about__stats-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <button className="about__cta" onClick={() => setModalOpen(true)}>Reserve a Table →</button>
                </div>
                <div className="about__img-wrap">
                  <img src="/images/about-dish.jpg" alt="Signature dish at Two States" className="about__img" />
                  <div className="about__img-tag">
                    <span className="about__img-tag-num">★ 4.9</span>
                    <span className="about__img-tag-label">Guest Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PINNED STATEMENT */}
          <section className="pinned-section" ref={pinnedRef}>
            <div className="container">
              <p className="pinned__statement">
                Food is memory. Food is identity. Food is the story of a people
                passed from hand to hand across generations — and at Two States,
                we serve it with reverence and joy.
              </p>
            </div>
          </section>

          {/* MENU */}
          <section className="menu-section" ref={menuRef} id="menu">
            <div className="container">
              <div className="menu__header">
                <div className="gold-divider"><Ornament /></div>
                <span className="section-label" style={{ textAlign: "center", display: "block" }}>À La Carte</span>
                <h2 className="menu__title">The Menu</h2>
              </div>
              <div className="menu__tabs">
                {["kerala", "tamilnadu"].map((tab) => (
                  <button key={tab} className={`menu__tab${activeMenuTab === tab ? " menu__tab--active" : ""}`} onClick={() => setActiveMenuTab(tab)}>
                    {tab === "kerala" ? "Kerala Kitchen" : "Tamil Nadu Kitchen"}
                  </button>
                ))}
              </div>
              <div className="menu__grid">
                <div className="menu__img-wrap">
                  <img
                    src={activeMenuTab === "kerala" ? "/images/menu-kerala.jpg" : "/images/menu-tamilnadu.jpg"}
                    alt={activeMenuTab === "kerala" ? "Kerala Kitchen" : "Tamil Nadu Kitchen"}
                    className="menu__img"
                  />
                </div>
                <div className="menu__list-wrap">
                  <p className="menu__list-title">{activeMenuTab === "kerala" ? "Kerala Signatures" : "Tamil Nadu Signatures"}</p>
                  {(activeMenuTab === "kerala" ? MENU_ITEMS : MENU_ITEMS_2).map((item) => (
                    <div className="menu__item" key={item.name}>
                      <div className="menu__item-info">
                        <h3 className="menu__item-name">{item.name}</h3>
                        <p className="menu__item-desc">{item.desc}</p>
                      </div>
                      <span className="menu__item-price">{item.price}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 36 }}>
                    <Link href="#" className="about__cta">Full Menu →</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CHEFS — horizontal scroll */}
          <section className="chefs-section" ref={chefsRef} id="chefs">
            <div className="chefs__header container">
              <div className="gold-divider reveal"><Ornament /></div>
              <span className="section-label reveal" style={{ textAlign: "center", display: "block" }}>The Hands Behind</span>
              <h2 className="chefs__title reveal">Our Chefs</h2>
            </div>
            <div className="chefs__viewport">
              <div className="chefs__track" ref={chefsTrackRef}>
                {CHEFS.map((chef, i) => (
                  <div className="chef-card" key={chef.name}>
                    <img src={`/images/chef-${i + 1}.jpg`} alt={chef.name} style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "top" }} />
                    <div className="chef-card__body">
                      <span className="chef-card__num">0{i + 1}</span>
                      <h3 className="chef-card__name">{chef.name}</h3>
                      <p className="chef-card__role">{chef.role}</p>
                      <p className="chef-card__bio">{chef.bio}</p>
                    </div>
                  </div>
                ))}
                <div className="chef-card chef-card--quote">
                  <blockquote className="chef-card__bigquote">"Two kitchens.<br />One soul."</blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="experience-section" ref={experienceRef} id="experience">
            <div className="container">
              <div className="experience__header reveal">
                <div className="gold-divider"><Ornament /></div>
                <span className="section-label" style={{ textAlign: "center", display: "block" }}>The Ambience</span>
                <h2 className="experience__title">A Romantic Dining Experience</h2>
                <p className="experience__sub">An atmosphere born of tradition</p>
              </div>
              <div className="experience__gallery">
                <div className="experience__cell experience__cell--tall"><img src="/images/exp-ambience.jpg" alt="Dining Room" className="experience__img" /></div>
                <div className="experience__cell experience__cell--wide"><img src="/images/exp-events.jpg" alt="Private Events" className="experience__img" /></div>
                <div className="experience__cell experience__cell--normal"><img src="/images/exp-detail.jpg" alt="Table Detail" className="experience__img" /></div>
                <div className="experience__cell experience__cell--normal"><img src="/images/exp-wine.jpg" alt="Wine & Spirits" className="experience__img" /></div>
                <div className="experience__cell experience__cell--normal"><img src="/images/exp-kitchen.jpg" alt="Open Kitchen" className="experience__img" /></div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="testimonials-section">
            <div className="container">
              <div className="testimonials__header reveal">
                <div className="gold-divider"><Ornament /></div>
                <h2 className="testimonials__title">They say about us</h2>
              </div>
              <div className="testimonial reveal">
                <p className="testimonial__quote">"{TESTIMONIALS[activeTestimonial].quote}"</p>
                <p className="testimonial__author">— {TESTIMONIALS[activeTestimonial].author}</p>
                <div className="testimonial__dots">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} className={`testimonial__dot${i === activeTestimonial ? " testimonial__dot--active" : ""}`} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PRESS */}
          <section className="press-section" ref={pressRef}>
            <div className="container">
              <div className="press__header reveal">
                <div className="gold-divider"><Ornament /></div>
                <span className="section-label" style={{ textAlign: "center", display: "block" }}>In the Press</span>
                <h2 className="press__title">As Featured In</h2>
              </div>
              <div className="press__list">
                {PRESS.map((p) => (
                  <article className="press__item" key={p.headline}>
                    <div className="press__item-left">
                      <span className="press__tag">{p.tag}</span>
                      <p className="press__date">{p.date}</p>
                    </div>
                    <div className="press__item-center">
                      <p className="press__outlet">{p.outlet}</p>
                      <h3 className="press__headline">{p.headline}</h3>
                    </div>
                    <Link href="#" className="press__arrow">→</Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* INFO */}
          <section className="info-section" ref={infoRef} id="contact">
            <div className="container">
              <div className="info__grid">
                <div className="info__block">
                  <span className="info__block-label">Visit Us</span>
                  <h3 className="info__block-title">Find Us</h3>
                  <p className="info__block-text"><strong>12, Boat Club Road</strong>Pune, Maharashtra 411 001<br />Near Bund Garden, Pune</p>
                </div>
                <div className="info__block">
                  <span className="info__block-label">Opening Hours</span>
                  <h3 className="info__block-title">Hours</h3>
                  <p className="info__block-text">
                    <strong>Lunch</strong>Monday – Friday · 12:00–15:00<br /><br />
                    <strong>Dinner</strong>Daily · 19:00–23:00<br /><br />
                    <strong>Sunday Brunch</strong>11:00–15:00
                  </p>
                </div>
                <div className="info__block">
                  <span className="info__block-label">Reservations</span>
                  <h3 className="info__block-title">Book a Table</h3>
                  <p className="info__block-text" style={{ marginBottom: 28 }}>
                    <strong>+91 20 2686 0000</strong>twostates@restaurant.com<br /><br />
                    Walk-ins welcome · subject to availability
                  </p>
                  <button className="about__cta" onClick={() => setModalOpen(true)}>Reserve Now →</button>
                </div>
              </div>
            </div>
          </section>

          {/* CONNECT */}
          <section className="connect-section">
            <div className="container">
              <div className="connect__header reveal">
                <div className="gold-divider"><Ornament /></div>
                <h2 className="connect__title">Connect With Us</h2>
                <p className="connect__handle">@twostates.restaurant</p>
              </div>
            </div>
            <div className="connect__gallery">
              {["Appam", "Rasam", "Chettinad", "Avial", "Payasam"].map((label) => (
                <div className="connect__cell" key={label}>
                  <img
                    src={`/images/insta-${["Appam","Rasam","Chettinad","Avial","Payasam"].indexOf(label)+1}.jpg`}
                    alt={label}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <div className="container">
              <div className="footer__inner">
                <div>
                  <p className="footer__brand">Two States</p>
                  <p className="footer__tagline">A celebration of Kerala and Tamil Nadu — two cuisines, one extraordinary table. Rooted in tradition, alive in every dish.</p>
                  <div className="footer__social">
                    {["IG", "FB", "YT"].map((s) => (<a key={s} href="#" className="footer__social-link">{s}</a>))}
                  </div>
                </div>
                <div>
                  <span className="footer__col-title">Navigate</span>
                  <ul className="footer__list">
                    {["About", "Menu", "Chefs", "Experience", "Reservations", "Contact"].map((l) => (
                      <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="footer__col-title">Opening Hours</span>
                  {[["Monday – Friday","12:00 – 15:00"],["Saturday","Dinner Only"],["Daily","19:00 – 23:00"],["Sunday Brunch","11:00 – 15:00"]].map(([day,time]) => (
                    <div className="footer__hours-item" key={day}>
                      <span className="footer__hours-day">{day}</span>
                      <span className="footer__hours-time">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="footer__bottom">
                <p className="footer__copy">© 2025 Two States Restaurant. All rights reserved.</p>
                <div className="footer__legal">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Use</a>
                  <a href="#">Cookie Policy</a>
                </div>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
