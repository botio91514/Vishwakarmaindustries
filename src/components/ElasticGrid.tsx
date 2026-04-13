import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ElasticGrid.css';

gsap.registerPlugin(ScrollTrigger);

// ── Data ────────────────────────────────────────────────
const columns: { img: string; title: string; category: string }[][] = [
  // Column 1
  [
    { img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80', title: 'Obsidian Desk', category: 'Executive' },
    { img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80', title: 'Imperial Bed', category: 'Rest' },
    { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', title: 'Velvet Chair', category: 'Lounge' },
    { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', title: 'Royal Sofa', category: 'Velvet' },
  ],
  // Column 2
  [
    { img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', title: 'Aeon Lounge', category: 'Comfort' },
    { img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80', title: 'Studio Corner', category: 'Nordic' },
    { img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', title: 'White Canvas', category: 'Minimal' },
    { img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80', title: 'Luna Chair', category: 'Sculptural' },
  ],
  // Column 3
  [
    { img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80', title: 'Nova Dining', category: 'Heritage' },
    { img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80', title: 'Zenith Unit', category: 'Modern' },
    { img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', title: 'Warm Palette', category: 'Classic' },
    { img: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80', title: 'Eclipse Desk', category: 'Minimalist' },
  ],
  // Column 4
  [
    { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', title: 'The Sofa', category: 'Living' },
    { img: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&q=80', title: 'Handcrafted', category: 'Artisanal' },
    { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', title: 'Classic Bureau', category: 'Legacy' },
    { img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80', title: 'Marble Plinth', category: 'Bespoke' },
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
