import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Giant title split reveal (majestic feel)
      const split = new SplitType('.cta-main-title', { types: 'words,chars' });
      gsap.fromTo(split.chars,
        { y: 150, opacity: 0, scaleY: 1.5, skewY: 10 },
        {
          y: 0, opacity: 1, scaleY: 1, skewY: 0,
          duration: 1.6,
          stagger: 0.02,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.cta-main-title', start: 'top 85%' }
        }
      );

      // 2. Info blocks reveal
      gsap.fromTo('.cta-info-block',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-info-grid', start: 'top 85%' }
        }
      );

      // 3. Ambient orb movement on mouse (more fluid)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 100;
        const y = (clientY / window.innerHeight - 0.5) * 100;
        gsap.to('.cta-orb-primary', { x: x * 0.5, y: y * 0.5, duration: 2.5, ease: 'power2.out' });
        gsap.to('.cta-orb-secondary', { x: -x * 0.3, y: -y * 0.3, duration: 3, ease: 'power2.out' });
      };
      
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        split.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta-section-luxe">
      <div className="cta-noise" />
      <div className="cta-orb cta-orb-primary" />
      <div className="cta-orb cta-orb-secondary" />

      <div className="cta-top">
        <span className="cta-eyebrow">— Begin Your Journey</span>
        <h2 className="cta-main-title">Let's Build Your<br /><span className="gold-text">Journey</span></h2>
        
        <div className="cta-divider-line" />
        
        <p className="cta-body-text">
          Experience the pinnacle of bespoke design. Schedule your private consultation at our Jodhpur atelier or via virtual appointment.
        </p>

        <a href="mailto:hello@vishwakarma.com" className="cta-action-btn interactive magnetic">
          Start Consultation
          <div className="cta-btn-arrow">
            <ArrowRight size={18} />
          </div>
        </a>
      </div>

      <div className="cta-info-grid">
        <div className="cta-info-block">
          <div className="cta-info-icon"><Phone size={22} /></div>
          <div className="cta-info-content">
            <span className="cta-info-label">Direct Line</span>
            <a href="tel:+15551234567" className="cta-info-value">+1 (555) 123-4567</a>
          </div>
        </div>
        <div className="cta-info-block">
          <div className="cta-info-icon"><Mail size={22} /></div>
          <div className="cta-info-content">
            <span className="cta-info-label">Email Atelier</span>
            <a href="mailto:hello@vishwakarma.com" className="cta-info-value">hello@vk.com</a>
          </div>
        </div>
        <div className="cta-info-block">
          <div className="cta-info-icon"><MapPin size={22} /></div>
          <div className="cta-info-content">
            <span className="cta-info-label">Main Atelier</span>
            <span className="cta-info-value">Jodhpur, Rajasthan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
