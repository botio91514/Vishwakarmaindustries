import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, FileText } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Particles } from '../components/Particles';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-title-main .char', {
        y: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 1.5,
        ease: 'power4.out'
      })
      .from('.hero-subtext', {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1');

      // 2. Sections Reveal
      const sections = gsap.utils.toArray<HTMLElement>('.contact-section-reveal');
      sections.forEach((sec) => {
        gsap.from(sec, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%'
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="contact-page">
      <div className="noise-overlay" />
      <Particles />
      <Navbar />

      <div className="vertical-brand-tag">ARCHITECTURAL DESIGN // DIV 0.9</div>

      <main className="contact-container">
        
        {/* SECTION 1: HERO INTRO */}
        <section className="contact-hero-intro hero-reveal">
          <div className="hero-content-centered">
            <h1 className="hero-title-main">
              <span className="line">
                <span className="line-inner">{splitText('Let’s Build Something')}</span>
              </span>
              <span className="line">
                <span className="line-inner gold-text">{splitText('Timeless.')}</span>
              </span>
            </h1>
            <p className="hero-subtext">
              Connect with us to design and deliver furniture crafted for modern architectural spaces.
            </p>
          </div>
        </section>

        {/* SECTION 2: CONTACT FORM */}
        <section className="contact-form-section contact-section-reveal">
          <div className="form-wrapper">
            <form className="minimal-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group-minimal">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Name</label>
                  <div className="input-underline" />
                </div>
                
                <div className="form-group-minimal">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email</label>
                  <div className="input-underline" />
                </div>

                <div className="form-group-minimal">
                  <input type="tel" id="phone" placeholder=" " required />
                  <label htmlFor="phone">Phone</label>
                  <div className="input-underline" />
                </div>

                <div className="form-group-minimal">
                  <select id="project-type" defaultValue="" required>
                    <option value="" disabled>Project Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial / Office</option>
                    <option value="hospitality">Hospitality / Hotel</option>
                    <option value="bespoke">Bespoke Commission</option>
                  </select>
                  <div className="input-underline" />
                </div>
              </div>

              <div className="form-group-minimal full-width">
                <textarea id="message" placeholder=" " required style={{ height: '100px' }} />
                <label htmlFor="message">Message</label>
                <div className="input-underline" />
              </div>

              <div className="form-actions-centered">
                <button className="submit-black-btn interactive magnetic">
                  <span>Send Inquiry</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION 3: CONTACT DETAILS */}
        <section className="contact-details-split contact-section-reveal">
          <div className="details-left">
            <div className="detail-item">
              <span className="detail-label">Address</span>
              <p className="detail-content">H-1/256, ITI Industrial Area,<br />Jodhpur, Rajasthan 342001, INDIA</p>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <p className="detail-content">+91 (291) 123 4567</p>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <p className="detail-content">inquiry@vishwakarma.com</p>
            </div>
          </div>

          <div className="details-right">
            <div className="detail-item">
              <span className="detail-label">Business Hours</span>
              <p className="detail-content">Monday — Saturday<br />09:00 AM — 07:00 PM IST</p>
            </div>
            <div className="trust-line-box">
              <p className="trust-text">
                "Serving architects, designers, and enterprises with precision-crafted furniture."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: MAP (Placeholder for Architectural Brand) */}
        <section className="contact-map-section contact-section-reveal">
          <div className="map-placeholder">
            <Globe className="map-icon" size={40} />
            <p>Jodhpur Logistics Hub — Connection Ready</p>
            <div className="map-coordinates">26.2389° N, 73.0243° E</div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="contact-final-cta contact-section-reveal">
          <div className="final-cta-content">
            <h2 className="final-cta-title">Have a project in mind?</h2>
            <button className="catalogue-btn interactive magnetic">
              <FileText size={16} />
              <span>Request Catalogue</span>
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

