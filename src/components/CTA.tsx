import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-solid-inner',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta-solid-section">
      <div className="cta-solid-container">
        
        <div className="cta-solid-card">
          <div className="cta-solid-bg-img" />
          <div className="cta-solid-overlay" />
          
          <div className="cta-solid-content">
            {/* Left: The Call */}
            <div className="cta-solid-left">
              <span className="cta-solid-label">Global Partnerships</span>
              <h2 className="cta-solid-title">Scale your<br/>Vision with Us.</h2>
              <p className="cta-solid-desc">
                From bespoke retail collections to large-scale hotel outfitting, discover the precision of Jodhpur manufacturing.
              </p>
              <a href="mailto:inquiry@vishwakarma.com" className="cta-solid-btn interactive magnetic">
                Initiate Inquiry <ArrowRight size={18} />
              </a>
            </div>

            {/* Right: The Grid */}
            <div className="cta-solid-right">
              <div className="cta-contact-box">
                <div className="cta-c-icon"><Phone size={20} /></div>
                <div className="cta-c-info">
                  <span className="cta-c-label">Direct Export Line</span>
                  <a href="tel:+912912345678" className="cta-c-value">+91 (291) 234-5678</a>
                </div>
              </div>

              <div className="cta-contact-box">
                <div className="cta-c-icon"><Mail size={20} /></div>
                <div className="cta-c-info">
                  <span className="cta-c-label">Email Division</span>
                  <a href="mailto:inquiry@vishwakarma.com" className="cta-c-value">inquiry@vishwakarma.com</a>
                </div>
              </div>

              <div className="cta-contact-box">
                <div className="cta-c-icon"><MapPin size={20} /></div>
                <div className="cta-c-info">
                  <span className="cta-c-label">Manufacturing Unit</span>
                  <span className="cta-c-value">H-1/256, ITI Area,<br/>Jodhpur, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
