import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mouse Tracking Glow
      const handleMouseMove = (e: MouseEvent) => {
        const rect = footerRef.current?.getBoundingClientRect();
        if (rect && glowRef.current) {
          gsap.to(glowRef.current, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            duration: 1.5,
            ease: 'power3.out'
          });
        }
      };

      footerRef.current?.addEventListener('mousemove', handleMouseMove);

      // 2. Entrance Animations
      gsap.from('.f-animate', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%'
        }
      });

      // 3. Parallax Watermark
      gsap.to('.f-watermark-text', {
        y: -60,
        scrollTrigger: {
          trigger: '.footer-watermark',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="footer">
      <div ref={glowRef} className="f-mouse-glow" />

      <div className="footer-inner">
        {/* Top CTA */}
        <div className="footer-top f-animate">
          <div className="f-cta-text">
            <h2>Ready to transform<br /><span>Your Living Space?</span></h2>
          </div>
          <a href="#contact" className="f-cta-button magnetic">
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Main Grid */}
        <div className="footer-main">
          <div className="f-col f-col-brand f-animate">
            <span className="f-logo">VISHWAKARMA</span>
            <p className="f-brand-desc">
              Crafting timeless elegance and Jodhpur heritage since 1985. 
              Our pieces are more than furniture; they are heirlooms of precision.
            </p>
            <div className="f-socials">
              <a href="#" className="magnetic"><Instagram size={20} /></a>
              <a href="#" className="magnetic"><Linkedin size={20} /></a>
              <a href="#" className="magnetic"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="f-col f-animate">
            <h4>Collections</h4>
            <ul className="f-links">
              <li><a href="#executive" className="magnetic">Executive Series</a></li>
              <li><a href="#living" className="magnetic">Living Room</a></li>
              <li><a href="#dining" className="magnetic">Dining Room</a></li>
              <li><a href="#bedroom" className="magnetic">Bedroom</a></li>
            </ul>
          </div>

          <div className="f-col f-animate">
            <h4>Heritage</h4>
            <ul className="f-links">
              <li><a href="#about" className="magnetic">Our Story</a></li>
              <li><a href="#craftsmanship" className="magnetic">Craftsmanship</a></li>
              <li><a href="#atelier" className="magnetic">The Atelier</a></li>
              <li><a href="#journal" className="magnetic">Luxe Journal</a></li>
            </ul>
          </div>

          <div className="f-col f-animate">
            <h4>Connect</h4>
            <ul className="f-links">
              <li><a href="mailto:bespoke@vishwakarma.com" className="magnetic">bespoke@vishwakarma.com</a></li>
              <li><a href="tel:+912911234567" className="magnetic">+91 291 123 4567</a></li>
              <li><p className="f-address">Industrial Area, Jodhpur,<br />Rajasthan, India</p></li>
            </ul>
          </div>
        </div>

        {/* Watermark Branding */}
        <div className="footer-watermark">
          <span className="f-watermark-text">VISHWAKARMA</span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom f-animate">
          <div className="f-copy">
            © 2026 VISHWAKARMA INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
          
          <div className="f-bottom-links">
            <a href="/privacy" className="magnetic">Privacy Policy</a>
            <a href="/terms" className="magnetic">Terms of Service</a>
          </div>

          <button onClick={scrollToTop} className="back-to-top magnetic">
            <ArrowUp size={16} />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};


