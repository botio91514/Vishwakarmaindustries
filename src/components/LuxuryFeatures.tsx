import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, Palette, Award, Shield } from 'lucide-react';
import './LuxuryFeatures.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Gem,
    title: 'Premium Materials',
    text: 'We source only the finest woods, metals, and fabrics from sustainable suppliers worldwide.'
  },
  {
    icon: Palette,
    title: 'Bespoke Design',
    text: 'Every piece can be customized to your exact specifications, ensuring a perfect fit for your space.'
  },
  {
    icon: Award,
    title: 'Lifetime Warranty',
    text: 'Our confidence in quality is backed by an industry-leading lifetime warranty on all products.'
  },
  {
    icon: Shield,
    title: 'White Glove Service',
    text: 'From consultation to installation, our team ensures a seamless luxury experience.'
  }
];

export const LuxuryFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered 3D reveal for cards
      gsap.fromTo(cardsRef.current,
        { 
          y: 150, 
          opacity: 0, 
          rotationX: -30,
          scale: 0.9 
        },
        {
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Spotlight Torch Effect on Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = cardsRef.current;
    
    cards.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section ref={containerRef} className="lf-section" onMouseMove={handleMouseMove}>
      <div className="lf-header">
        <span className="lf-label">Why Choose Us</span>
        <h2 className="lf-title">
          The <span className="gold-text">Difference</span>
        </h2>
      </div>

      <div className="lf-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index} 
              className="lf-card interactive"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="lf-card-border" />
              <div className="lf-card-inner">
                <div className="lf-icon-wrapper">
                  <IconComponent size={32} strokeWidth={1.5} className="lf-icon" />
                  <div className="lf-icon-glow" />
                </div>
                <h3 className="lf-feature-title">{feature.title}</h3>
                <p className="lf-feature-text">{feature.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
