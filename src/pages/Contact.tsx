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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        // For development with placeholder URL, we show success
        if (form.action.includes('your-id-here')) {
          setIsSubmitted(true);
        } else {
          alert("Submission failed. Please try again or contact us via email.");
        }
      }
    } catch (error) {
      if (form.action.includes('your-id-here')) {
        setIsSubmitted(true);
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 8000);
    }
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
              src="/luxury_hero.webp" 
              alt="Luxury Interior" 
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
                <div className="form-meta">EST. 1996 / JODHPUR_HQ</div>
              </div>

              {isSubmitted ? (
                <div className="success-message-luxe">
                  <h3 className="success-title">Collaboration Initialized</h3>
                  <p className="success-desc">Our design team has received your brief. We will reach out shortly to discuss the architectural details.</p>
                </div>
              ) : (
                  <form 
                    className="luxe-form" 
                    onSubmit={handleSubmit}
                    action="https://formspree.io/f/xjglqzqa" 
                    method="POST"
                  >
                    <div className="luxe-form-grid">
                      <div className="luxe-field interactive">
                        <label>Full Name</label>
                        <input 
                          name="full_name"
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
                          name="email"
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
                          name="inquiry_type"
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
                        name="message"
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
                    <button 
                      className="luxe-submit-btn interactive magnetic" 
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Transmitting Brief...' : 'Initialize Collaboration'}</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </form>
              )}
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
                Unit-1: H-355, Sangaria RIICO 2nd Phase<br />
                Unit 2: Plot No. 18, Sanagaria<br />
                Jodhpur, Rajasthan 342013
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
                <a href="mailto:info@thevishwakarmaindustries.com" className="info-value clickable-luxe">
                  info@thevishwakarmaindustries.com
                </a>
              </div>
              <div className="info-group">
                <span className="info-label">Principal Office</span>
                <a href="tel:+919166631034" className="info-value clickable-luxe">
                  +91-9166631034
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

