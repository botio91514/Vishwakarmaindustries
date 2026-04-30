import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Particles } from '../components/Particles';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-title-luxe .char', {
        y: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 1.5,
        ease: 'power4.out'
      })
      .from('.hero-eyebrow-luxe, .hero-desc-luxe', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1');

      // 2. Blueprint Section Reveal
      gsap.from('.blueprint-step', {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blueprint-sidebar',
          start: 'top 80%'
        }
      });

      gsap.from('.form-header-luxe, .luxe-field', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.form-blueprint-wrapper',
          start: 'top 75%'
        }
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

      <main className="contact-main">
        {/* SECTION 1: CINEMATIC HERO */}
        <section className="contact-hero-luxe">
          <div className="hero-visual-wrapper">
            <img 
              src="/luxury_hero.png" 
              alt="Luxury Furniture" 
              className="hero-img-luxe" 
            />
            <div className="hero-visual-overlay" />
          </div>
          
          <div className="hero-text-luxe">
            <div className="hero-eyebrow-luxe">CONVERSATIONS — 01</div>
            <h1 className="hero-title-luxe">
              <span className="line">
                <span className="line-inner">{splitText('Architectural')}</span>
              </span>
              <span className="line">
                <span className="line-inner gold-text">{splitText('Partnership.')}</span>
              </span>
            </h1>
            <p className="hero-desc-luxe">
              From bespoke commissions to large-scale commercial furnishing, we partner with architects to bridge the gap between design intent and physical reality.
            </p>
          </div>
        </section>

        {/* SECTION 2: THE BLUEPRINT FORM */}
        <section className="contact-blueprint-section">
          <div className="blueprint-container">
            <div className="blueprint-sidebar">
              <div className={`blueprint-step ${activeStep === 0 ? 'active' : ''}`}>
                <span className="step-num">01</span>
                <span className="step-label">IDENTITY</span>
              </div>
              <div className={`blueprint-step ${activeStep === 1 ? 'active' : ''}`}>
                <span className="step-num">02</span>
                <span className="step-label">THE VISION</span>
              </div>
              <div className="blueprint-info">
                <h4>Response Protocol</h4>
                <p>Expect a detailed technical response from our lead designers within 24-48 business hours.</p>
              </div>
            </div>

            <div className="form-blueprint-wrapper">
              <div className="form-header-luxe">
                <h2 className="form-title-luxe">Project Brief</h2>
                <div className="form-meta">EST. 1985 / JODHPUR_HQ</div>
              </div>

              <form className="luxe-form" onSubmit={(e) => e.preventDefault()}>
                <div className="luxe-form-grid">
                  <div className="luxe-field interactive">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="YOUR NAME" 
                      required 
                      onFocus={() => setActiveStep(0)}
                    />
                    <div className="field-border" />
                  </div>
                  <div className="luxe-field interactive">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="EMAIL@ADDRESS.COM" 
                      required 
                      onFocus={() => setActiveStep(0)}
                    />
                    <div className="field-border" />
                  </div>
                  <div className="luxe-field full interactive">
                    <label>Inquiry Type</label>
                    <select 
                      defaultValue="" 
                      required 
                      onFocus={() => setActiveStep(1)}
                    >
                      <option value="" disabled hidden>SELECT PROJECT TYPE</option>
                      <option value="architectural">Architectural Partnership</option>
                      <option value="commercial">Commercial / Hospitality</option>
                      <option value="residential">Residential Commission</option>
                      <option value="other">General Inquiry</option>
                    </select>
                    <div className="field-border" />
                  </div>
                </div>

                <div className="luxe-field full interactive">
                  <label>Message / Brief</label>
                  <textarea 
                    placeholder="DESCRIBE YOUR VISION OR REQUIREMENTS..." 
                    required 
                    onFocus={() => setActiveStep(1)}
                    style={{ height: '120px' }}
                  />
                  <div className="field-border" />
                </div>

                <div className="luxe-form-footer">
                  <div className="form-agreement">
                    By submitting, you agree to our privacy protocols regarding project data.
                  </div>
                  <button className="luxe-submit-btn interactive magnetic">
                    <span>Initialize Collaboration</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE GLOBAL HUB (ASIMMETRIC BENTO) */}
        <section className="contact-hub-section">
          <div className="hub-header">
            <h2 className="hub-title">Global Presence</h2>
            <div className="hub-line" />
          </div>

          <div className="hub-grid-editorial">
            <div className="hub-card hq-card">
              <div className="hub-card-label">Main Atelier & Export Hub</div>
              <h3 className="hub-card-title">Jodhpur, India</h3>
              <p className="hub-card-text">
                H-1/256, ITI Industrial Area,<br />
                Jodhpur, Rajasthan 342001
              </p>
              <div className="hub-card-cta">
                <Globe size={16} />
                <span>EXPORT LOGISTICS READY</span>
              </div>
            </div>

            <div className="hub-card info-card">
              <div className="hub-card-label">Direct Communication</div>
              <div className="info-group">
                <span className="info-label">Global Inquiries</span>
                <a href="mailto:export@vkindustries.com" className="info-value clickable-luxe">
                  export@vkindustries.com
                </a>
              </div>
              <div className="info-group">
                <span className="info-label">Principal Office</span>
                <a href="tel:+912912741234" className="info-value clickable-luxe">
                  +91 (291) 274 1234
                </a>
              </div>
            </div>

            <div className="hub-card schedule-card">
              <div className="hub-card-label">Production Cycle</div>
              <p className="hub-card-text">
                MONDAY — SATURDAY<br />
                09:00 — 19:00 [IST]
              </p>
              <div className="timezone-tag">VRIKSH CERTIFIED ATELIER</div>
            </div>

            <div className="hub-card quote-card-luxe">
              <p className="quote-text-luxe">
                "Bridging Jodhpur's heritage with global architectural standards."
              </p>
              <div className="signature-mark">Vishwakarma Industries — Manufacturing Excellence</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

