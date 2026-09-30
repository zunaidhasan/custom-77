"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const etsyUrl = "https://custom77co.etsy.com";
const instagramUrl = "https://www.instagram.com/custom77co/profilecard/?igsh=eGZ6eDNsdnZlcmN5";
const phone = "3036187437";

const projects = [
  { image: "/images/work/gallery01-3b75c350.webp", title: "Living room, made personal", category: "Furniture / Coffee table", alt: "Handmade wood and black steel coffee table in a bright living room" },
  { image: "/images/work/gallery02-e5dc949c.webp", title: "A handrail that belongs", category: "Architectural / Steel handrail", alt: "Custom black steel handrail fitted along an outdoor walkway" },
  { image: "/images/work/gallery03-9425f57c.webp", title: "Room for the little things", category: "Interiors / Floating shelves", alt: "Custom live-edge wood shelves with black metal brackets" },
];

const moreWork = [
  { image: "/images/work/gallery01-657fae6d.webp", title: "White steel dining table", alt: "Long wood dining table with geometric white steel base" },
  { image: "/images/work/gallery01-46585129.webp", title: "Wood and steel side table", alt: "Small wood and black steel side table beside a sofa" },
  { image: "/images/work/gallery02-3f921977.webp", title: "Fireplace mantel", alt: "Thick natural wood mantel above a modern fireplace" },
  { image: "/images/work/gallery03-d5c99dbc.webp", title: "Angular console table", alt: "Wood console table with sculptural black steel supports" },
];
const gallery = [...projects, ...moreWork];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? "M4 16 16 4M7 4h9v9" : "M3 10h13m-5-5 5 5-5 5"} /></svg>;
}
function Plus() { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3v14M3 10h14" /></svg>; }

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return <>
    <header className="site-header">
      <div className="header-inner shell">
        <a href="#top" className="brand" aria-label="Custom 77, back to top" onClick={() => setMenuOpen(false)}><Image src="/images/brand/logo.png" alt="Custom 77 — Welding & Woodwork" width={160} height={110} priority className="brand-logo" /></a>
        <nav className={menuOpen ? "header-nav is-open" : "header-nav"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>The work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Our process</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="mobile-nav-cta" href="#inquire" onClick={() => setMenuOpen(false)}>Start a project <Arrow diagonal /></a>
        </nav>
        <a className="header-cta button button-dark" href="#inquire">Let&apos;s talk about your project <Arrow diagonal /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
    </header>

    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> CUSTOM METAL + WOODWORK <span className="eyebrow-separator">/</span> DENVER, CO</div>
          <h1 id="hero-title">Made to fit.<br /><span>Built to last.</span></h1>
          <p className="hero-intro">Furniture and architectural pieces made with honest materials, good hands, and a purpose in mind.</p>
          <div className="hero-actions"><a href="#inquire" className="button button-dark">Start a custom project <Arrow diagonal /></a><a href="#work" className="text-link">Explore the work <Arrow /></a></div>
          <div className="hero-footnote"><span className="footnote-mark">✳</span><span>One-of-a-kind work for the spaces<br />where life happens.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><Image src="/images/work/container01.webp" alt="Custom live-edge wood console with angular black steel frame in a warm interior" fill priority sizes="(max-width: 900px) 100vw, 52vw" className="cover-image hero-image" /></div>
          <div className="image-label"><span className="label-index">01 / 04</span><span>WOOD, STEEL & A LITTLE INGENUITY</span></div>
        </div>
      </section>

      <div className="hero-bottom shell"><span>DESIGNED AND BUILT IN COLORADO</span><span>FUNCTION WITHOUT COMPROMISE</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>

      <section className="paths-section" aria-label="Ways to work with Custom 77"><div className="shell paths-grid">
        <div className="path-intro"><span className="section-kicker">01 / FIND YOUR FIT</span><h2>Good things take<br />their own shape.</h2></div>
        <a href="#inquire" className="path-option"><div className="path-top"><span>01</span><Arrow diagonal /></div><h3>Made for you.</h3><p>Have a space, a sketch, or just the start of an idea? Let&apos;s make something that fits it exactly.</p><span className="path-action">Explore custom work <Arrow /></span></a>
        <a href={etsyUrl} target="_blank" rel="noopener noreferrer" className="path-option"><div className="path-top"><span>02</span><Arrow diagonal /></div><h3>Ready to go.</h3><p>Looking for something already made? Shop our collection of handmade pieces on Etsy.</p><span className="path-action">Shop the Etsy collection <Arrow /></span></a>
      </div></section>

      <section className="work-section section-space shell" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><span className="section-kicker">02 / SELECTED WORK</span><h2 id="work-title">Built to be lived with.</h2></div><p>Every project starts with a purpose. Here are a few that found their place.</p></div>
        <div className="project-grid">{projects.map((project, index) => <button className="project-card" key={project.image} type="button" onClick={() => setLightboxIndex(index)} aria-label={`View ${project.title} photo larger`}><span className="project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="cover-image" /><span className="image-expand"><Plus /></span></span><span className="project-meta"><span><strong>{project.title}</strong><small>{project.category}</small></span><Arrow diagonal /></span></button>)}</div>
        <div className="more-work-heading"><span className="section-kicker">MORE FROM THE SHOP</span><span>THE DETAILS MATTER, TOO.</span></div>
        <div className="more-work-grid">{moreWork.map((item, index) => <button type="button" className="more-work-item" key={item.image} onClick={() => setLightboxIndex(index + projects.length)} aria-label={`View ${item.title} photo larger`}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 600px) 50vw, 25vw" className="cover-image" /><span className="image-expand"><Plus /></span></button>)}</div>
        <div className="work-end"><p>See what&apos;s taking shape lately.</p><a className="text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">Follow along on Instagram <Arrow diagonal /></a></div>
      </section>

      <section className="services-section section-space" id="services" aria-labelledby="services-title"><div className="shell">
        <div className="section-heading"><div><span className="section-kicker">03 / WHAT WE MAKE</span><h2 id="services-title">A little bit of everything.<br />Nothing off the shelf.</h2></div><p>From one-of-a-kind tables and floating shelves to architectural steel handrails. Made for your space, not the other way around.</p></div>
        <div className="service-list"><div className="service-row"><span className="service-number">01</span><div><h3>Furniture</h3><p>Tables, benches, consoles, and pieces that make a room work harder and feel more like you.</p></div><span className="service-icon">↗</span></div><div className="service-row"><span className="service-number">02</span><div><h3>Shelving & built-ins</h3><p>Thoughtful storage and display, measured to fit the places you actually have.</p></div><span className="service-icon">↗</span></div><div className="service-row"><span className="service-number">03</span><div><h3>Architectural metalwork</h3><p>Handrails, structural details, and custom steel work with a clean, lasting finish.</p></div><span className="service-icon">↗</span></div><div className="service-row"><span className="service-number">04</span><div><h3>Small commercial</h3><p>Durable, distinctive pieces for the businesses and gathering places people remember.</p></div><span className="service-icon">↗</span></div></div>
        <a className="button button-outline" href="#inquire">Tell us what you&apos;re thinking <Arrow diagonal /></a>
      </div></section>

      <section className="process-section section-space" id="process" aria-labelledby="process-title"><div className="shell"><div className="process-head"><div><span className="section-kicker">04 / THE PROCESS</span><h2 id="process-title">From a rough idea<br />to the real thing.</h2></div><p>No complicated production line. Just a conversation, a thoughtful plan, and the work it takes to get it right.</p></div><div className="process-grid"><div className="process-step"><span>01 / LET&apos;S TALK</span><h3>Tell us the idea.</h3><p>Share what you need, where it&apos;s going, and anything you&apos;ve been imagining. A sketch is great; a few words work too.</p></div><div className="process-step"><span>02 / MAKE A PLAN</span><h3>We work out the details.</h3><p>We&apos;ll talk dimensions, materials, finish, timeline, and what makes sense for your space and budget.</p></div><div className="process-step"><span>03 / MAKE IT REAL</span><h3>Built for the long haul.</h3><p>Every cut, weld, and finish is made with care, until the piece is ready to take its place in your space.</p></div></div></div></section>

      <section className="about-section section-space shell" id="about" aria-labelledby="about-title"><div className="about-images"><div className="about-image-main"><Image src="/images/work/container05.webp" alt="Handmade wood and steel bedside table in a warm living space" fill sizes="(max-width: 800px) 80vw, 35vw" className="cover-image" /></div><div className="about-image-small"><Image src="/images/work/gallery01-1dc0c8e6.webp" alt="Maker working with a wood and steel table in a home" fill sizes="(max-width: 800px) 40vw, 16vw" className="cover-image" /></div><span className="about-image-caption">REAL MATERIALS. REAL HANDS. REAL LIFE.</span></div><div className="about-copy"><span className="section-kicker">05 / THE HANDS BEHIND THE WORK</span><h2 id="about-title">Good materials.<br />Good work.<br /><em>No shortcuts.</em></h2><p>Custom 77 blends metalwork with woodwork, creating sleek, modern furniture with a rustic touch. Our goal is simple: to craft pieces that are not just beautiful, but also built to last — furniture that is classic, yet innovative.</p><p>We work with your space, not against it. No veneers, no cheap fasteners. Just hardwood, raw steel, durable finishes, and the belief that nature&apos;s beauty can do the talking.</p><div className="about-signoff"><span className="asterisk">✳</span><span>Made with purpose.<br />Built in Colorado.</span></div></div></section>

      <section className="quote-section"><div className="shell quote-inner"><span className="section-kicker">WHAT WE BELIEVE</span><blockquote>“Function without<br /><em>compromise.</em>”</blockquote><div className="quote-bottom"><span>— THE CUSTOM 77 APPROACH</span><p>Built-to-fit solutions for the way you live. Furniture that holds up. Details worth looking closer at.</p></div></div></section>

      <section className="inquiry-section section-space" id="inquire" aria-labelledby="inquire-title"><div className="shell inquiry-grid"><div className="inquiry-copy"><span className="section-kicker">06 / START SOMETHING</span><h2 id="inquire-title">Let&apos;s make<br />something <em>good.</em></h2><p>Have a project in mind? Tell us a little about it. We&apos;ll take it from there.</p><div className="contact-alternative"><span>RATHER TALK IT THROUGH?</span><a href={`tel:${phone}`}>Call or text 303-618-7437 <Arrow diagonal /></a><small>Serving the Denver area and beyond.</small></div></div><div className="form-panel">{status === "success" ? <div className="form-success" role="status"><span className="success-mark">✓</span><h3>Thanks for reaching out.</h3><p>We&apos;ve got your project details. We&apos;ll be in touch to talk through what comes next.</p><button type="button" className="text-link" onClick={() => setStatus("idle")}>Send another inquiry <Arrow /></button></div> : <form onSubmit={submitInquiry}><div className="form-heading"><h3>Tell us about your project.</h3><span>01 — 04</span></div><div className="form-row"><label>YOUR NAME <span>*</span><input type="text" name="name" placeholder="Your name" required maxLength={120} autoComplete="name" /></label><label>EMAIL ADDRESS <span>*</span><input type="email" name="email" placeholder="you@example.com" required maxLength={254} autoComplete="email" /></label></div><div className="form-row"><label>PHONE NUMBER <small>(OPTIONAL)</small><input type="tel" name="phone" placeholder="(303) 555-0000" maxLength={50} autoComplete="tel" /></label><label>WHAT ARE YOU THINKING? <span>*</span><select name="projectType" required defaultValue=""><option value="" disabled>Select a project type</option><option value="Furniture">Furniture</option><option value="Shelving & built-ins">Shelving & built-ins</option><option value="Architectural metalwork">Architectural metalwork</option><option value="Small commercial">Small commercial</option><option value="Something else">Something else</option></select></label></div><label>THE DETAILS <span>*</span><textarea name="details" placeholder="Tell us about the space, the idea, rough dimensions, timeline, or anything else we should know..." required minLength={10} maxLength={5000} rows={5} /></label><div className="honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>{status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}<div className="form-submit-row"><button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send your inquiry"} <Arrow diagonal /></button><p>Your info stays with us. We&apos;ll only use it to talk about your project.</p></div></form>}</div></div></section>
    </main>

    <footer className="site-footer"><div className="shell"><div className="footer-top"><div><a href="#top" className="brand footer-brand" aria-label="Custom 77, back to top"><span className="brand-main">CUSTOM<span className="brand-number">77</span></span><span className="brand-sub">WELDING & WOODWORK</span></a><p>Honest materials. Functional beauty.<br />Made to last.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#work">The work</a><a href="#services">What we do</a><a href="#process">Our process</a><a href="#about">About us</a></div><div><span>FIND US</span><a href={etsyUrl} target="_blank" rel="noopener noreferrer">Etsy ↗</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/share/16ZcSTBQP6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook ↗</a><a href={`tel:${phone}`}>303-618-7437</a></div></div><div className="footer-cta"><span>GOT AN IDEA?</span><a href="#inquire">Let&apos;s build it. <Arrow diagonal /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} CUSTOM 77. BUILT IN COLORADO.</span><span>PRIVACY MATTERS. WE NEVER SELL OR SHARE YOUR INFORMATION.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    <a href="#inquire" className="mobile-sticky-cta">Start a custom project <Arrow diagonal /></a>

    {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project photo gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}><button className="lightbox-close" type="button" autoFocus onClick={() => setLightboxIndex(null)} aria-label="Close gallery">×</button><button className="lightbox-prev" type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous image">←</button><div className="lightbox-content"><div className="lightbox-image"><Image src={gallery[lightboxIndex].image} alt={gallery[lightboxIndex].alt} fill sizes="90vw" className="lightbox-img" /></div><div className="lightbox-caption"><span>{gallery[lightboxIndex].title}</span><span>{String(lightboxIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span></div></div><button className="lightbox-next" type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)} aria-label="Next image">→</button></div>}
  </>;
}
