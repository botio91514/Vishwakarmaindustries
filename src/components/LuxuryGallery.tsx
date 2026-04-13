import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './LuxuryGallery.css';

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80', title: 'Penthouse Living' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80', title: 'Bespoke Interiors' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80', title: 'Executive Lounge' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80', title: 'Bedroom Sanctuary' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80', title: 'Penthouse Living' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80', title: 'Bespoke Interiors' },
];

const row2 = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', title: 'Modern Office' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce54a3e1ad1d?w=700&q=80', title: 'Luxury Bedroom' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80', title: 'Minimalist Kitchen' },
  { src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=700&q=80', title: 'Executive Suite' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', title: 'Modern Office' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce54a3e1ad1d?w=700&q=80', title: 'Luxury Bedroom' },
];

export const LuxuryGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Title reveal ──────────────────────────────────────────
      const split = new SplitType('.gl-title', { types: 'words,chars' });
      gsap.fromTo(split.chars,
        { y: '110%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 1.2,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.gl-header', start: 'top 80%' }
        }
      );
      gsap.fromTo('.gl-label, .gl-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.gl-header', start: 'top 80%' }
        }
      );

      // ── Marquee infinite scroll ────────────────────────────────
      const speed = 0.4;

      // Row 1 → moves left
      gsap.to(row1Ref.current, {
        x: '-50%',
        ease: 'none',
        duration: 30 / speed,
        repeat: -1,
      });

      // Row 2 → moves right
      gsap.fromTo(row2Ref.current,
        { x: '-50%' },
        {
          x: '0%',
          ease: 'none',
          duration: 28 / speed,
          repeat: -1,
        }
      );

      // ── Scroll-driven perspective tilt ─────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress;
          const tiltY = gsap.utils.mapRange(0, 1, 8, -8, p);
          gsap.to(marqueeRef.current, {
            rotateX: tiltY,
            duration: 0.6,
            ease: 'power2.out',
          });

          // Slow down rows as they enter viewport for emphasis
          const scale = p > 0.3 && p < 0.7 ? 1 : 0.95;
          gsap.to('.gl-marquee-wrapper', {
            scale,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      });

      // ── Mouse parallax tilt ────────────────────────────────────
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rx = gsap.utils.mapRange(0, window.innerWidth, 3, -3, clientX);
        const ry = gsap.utils.mapRange(0, window.innerHeight, -3, 3, clientY);
        gsap.to(marqueeRef.current, {
          rotateY: rx,
          rotateX: ry,
          duration: 1.2,
          ease: 'power2.out',
        });
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause/slow-down on mouse over marquee
  const handleMarqueeEnter = () => {
    gsap.to([row1Ref.current, row2Ref.current], {
      timeScale: 0.2,
      duration: 0.6,
      ease: 'power2.out',
    });
  };
  const handleMarqueeLeave = () => {
    gsap.to([row1Ref.current, row2Ref.current], {
      timeScale: 1,
      duration: 0.6,
      ease: 'power2.in',
    });
  };

  return (
    <section ref={sectionRef} className="gl-section">

      {/* Header */}
      <div className="gl-header">
        <span className="gl-label">Portfolio</span>
        <h2 className="gl-title">Spaces <em>Transformed</em></h2>
        <p className="gl-sub">Five continents. One standard of excellence.</p>
      </div>

      {/* 3D Perspective Marquee Stage */}
      <div
        ref={marqueeRef}
        className="gl-marquee-stage"
        onMouseEnter={handleMarqueeEnter}
        onMouseLeave={handleMarqueeLeave}
      >
        <div className="gl-marquee-wrapper">

          {/* Row 1 — left */}
          <div className="gl-row">
            <div ref={row1Ref} className="gl-track">
              {[...row1, ...row1].map((item, i) => (
                <div key={i} className="gl-item interactive">
                  <div className="gl-item-img-wrap">
                    <img src={item.src} alt={item.title} className="gl-item-img" />
                    <div className="gl-item-overlay">
                      <span className="gl-item-title">{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="gl-row">
            <div ref={row2Ref} className="gl-track">
              {[...row2, ...row2].map((item, i) => (
                <div key={i} className="gl-item interactive">
                  <div className="gl-item-img-wrap">
                    <img src={item.src} alt={item.title} className="gl-item-img" />
                    <div className="gl-item-overlay">
                      <span className="gl-item-title">{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom tag line */}
      <div className="gl-footer-strip">
        {['Executive', 'Living', 'Dining', 'Bedroom', 'Office', 'Outdoor'].map((tag, i) => (
          <React.Fragment key={i}>
            <span className="gl-tag">{tag}</span>
            <span className="gl-dot-sep">·</span>
          </React.Fragment>
        ))}
      </div>

    </section>
  );
};
