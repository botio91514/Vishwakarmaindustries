import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ElasticGrid.css';

gsap.registerPlugin(ScrollTrigger);

// ── Data ────────────────────────────────────────────────
const columns: { img: string; title: string; category: string }[][] = [
  // Column 1
  [
    { img: new URL('../assets/products/1.jpeg', import.meta.url).href, title: 'Precision Lathe', category: 'Machining' },
    { img: new URL('../assets/products/2.jpeg', import.meta.url).href, title: 'Industrial Mill', category: 'Heavy Duty' },
    { img: new URL('../assets/products/3.jpeg', import.meta.url).href, title: 'CNC Center', category: 'Automation' },
    { img: new URL('../assets/products/4.jpeg', import.meta.url).href, title: 'Forge Press', category: 'Metalwork' },
  ],
  // Column 2
  [
    { img: new URL('../assets/products/5.jpeg', import.meta.url).href, title: 'Drilling Station', category: 'Precision' },
    { img: new URL('../assets/products/6.jpeg', import.meta.url).href, title: 'Hydraulic Unit', category: 'Power' },
    { img: new URL('../assets/products/7.jpeg', import.meta.url).href, title: 'Grinding Hub', category: 'Finishing' },
    { img: new URL('../assets/products/8.jpeg', import.meta.url).href, title: 'Surface Grinder', category: 'Tools' },
  ],
  // Column 3
  [
    { img: new URL('../assets/products/9.jpeg', import.meta.url).href, title: 'Assembly Line', category: 'Production' },
    { img: new URL('../assets/products/11.jpeg', import.meta.url).href, title: 'Welding Station', category: 'Fabrication' },
    { img: new URL('../assets/products/12.jpeg', import.meta.url).href, title: 'Cutting System', category: 'Heavy Duty' },
    { img: new URL('../assets/products/13.jpeg', import.meta.url).href, title: 'Polishing Unit', category: 'Detailing' },
  ],
  // Column 4
  [
    { img: new URL('../assets/products/14.jpeg', import.meta.url).href, title: 'Quality Control', category: 'Standard' },
    { img: new URL('../assets/products/15.jpeg', import.meta.url).href, title: 'Inventory Hub', category: 'Logistics' },
    { img: new URL('../assets/products/16.jpeg', import.meta.url).href, title: 'Material Handling', category: 'Operations' },
    { img: new URL('../assets/products/1.jpeg', import.meta.url).href, title: 'Advanced Machining', category: 'Elite' },
  ],
];

// Elastic scroll speed per column (px of travel over the full section scroll)
// Small values = subtle. Odd/even inversion creates the elastic "breathing" feel.
const columnSpeeds = [-60, 60, -40, 80];

// ── Component ────────────────────────────────────────────
export const ElasticGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray<HTMLElement>('.eg-col');
      const items = gsap.utils.toArray<HTMLElement>('.eg-item');

      // ── 1. Column elastic scroll (the core effect) ────────
      cols.forEach((col, i) => {
        const speed = columnSpeeds[i] ?? 0;
        gsap.fromTo(col,
          { y: speed },
          {
            y: -speed,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,   // slight lag = elastic feel
            },
          }
        );
      });

      // ── 2. Image pan parallax (depth inside each card) ────
      items.forEach(item => {
        const img = item.querySelector<HTMLElement>('.eg-img');
        if (!img) return;
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // ── 3. Header entrance ────────────────────────────────
      gsap.from('.eg-eyebrow, .eg-title, .eg-subtitle, .eg-divider', {
        y: 40,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.eg-header',
          start: 'top 85%',
        },
      });

      // ── 4. Card clip-path reveal ─────────────────────────
      gsap.set('.eg-item-inner', { clipPath: 'inset(100% 0 0 0)' });
      gsap.to('.eg-item-inner', {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        stagger: { amount: 1.0, from: 'start' },
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: '.eg-grid',
          start: 'top 78%',
        },
      });

      // ── 5. Hover effects ──────────────────────────────────
      items.forEach(item => {
        const info = item.querySelector<HTMLElement>('.eg-info');
        const img = item.querySelector<HTMLElement>('.eg-img');

        item.addEventListener('mouseenter', () => {
          gsap.to(info, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
          gsap.to(img, { scale: 1.07, duration: 1.2, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(info, { opacity: 0, y: 14, duration: 0.4, ease: 'power2.in' });
          gsap.to(img, { scale: 1, duration: 1.0, ease: 'power2.out' });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="eg-section">
      <div className="eg-watermark">VISHWAKARMA INDUSTRIES</div>

      {/* ── Header ── */}
      <div className="eg-header">
        <span className="eg-eyebrow">Masterpieces</span>
        <h2 className="eg-title">The <em>Heritage</em> Collection</h2>
        <p className="eg-subtitle">
          Each piece, a convergence of artisan craft and timeless design.
          Built to outlast generations.
        </p>
        <div className="eg-divider">
          <div className="eg-divider-line" />
          <div className="eg-divider-dot" />
          <div className="eg-divider-line" />
        </div>
      </div>

      {/* ── Elastic Grid ── */}
      <div className="eg-grid">
        {columns.map((col, ci) => (
          <div key={ci} className={`eg-col eg-col--${ci + 1}`}>
            {col.map((item, ii) => (
              <div key={ii} className="eg-item">
                <div className="eg-item-inner">
                  <div className="eg-img-wrap">
                    <div
                      className="eg-img"
                      style={{ backgroundImage: `url(${item.img})` }}
                    />
                    <div className="eg-overlay" />
                  </div>
                  <div className="eg-info">
                    <span className="eg-cat">{item.category}</span>
                    <h3 className="eg-item-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
