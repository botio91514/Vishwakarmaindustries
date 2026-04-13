import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: '01',
    title: 'The Obsidian',
    subtitle: 'Executive Desk',
    description: 'A masterpiece of dark ebony and hand-burnished steel. Crafted for leaders who define the future.',
    material: 'Burmese Ebony & Industrial Steel',
    price: 'Starting at $12,500',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80'
  },
  {
    id: '02',
    title: 'Velvet Horizon',
    subtitle: 'Lounge Chair',
    description: 'Designed to cradle the human form in absolute silence. Hand-stitched leather meets gold-brushed walnut.',
    material: 'Italian Leather & Solid Walnut',
    price: 'Starting at $4,800',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80'
  },
  {
    id: '03',
    title: 'Ivory Monolith',
    subtitle: 'Dining Table',
    description: 'Where conversations flow over ancient stone. A single slab of Carrara marble supported by floating brass.',
    material: 'Carrara Marble & Polished Brass',
    price: 'Starting at $18,900',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80'
  }
];

export const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.ps-item');
      const splits: any[] = [];

      items.forEach((item) => {
        const img = item.querySelector('.ps-img');
        const content = item.querySelector('.ps-content');
        const title = item.querySelector('.ps-title');

        // 1. Image Parallax
        gsap.fromTo(img,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        // 2. Content staggered reveal
        const split = new SplitType(title as HTMLElement, { types: 'chars' });
        splits.push(split);

        gsap.fromTo(split.chars,
          { y: 50, opacity: 0, rotateX: -90 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%',
            }
          }
        );

        gsap.fromTo(content,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 50%',
            }
          }
        );
      });

      return () => splits.forEach(s => s.revert());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="ps-section">
      <div className="ps-header">
        <span className="ps-label">The Collection</span>
        <h2 className="ps-title-main">Curated <em>Magnificence</em></h2>
      </div>

      {products.map((product) => (
        <div key={product.id} className="ps-item">
          <div className="ps-img-wrap">
            <img src={product.image} alt={product.title} className="ps-img" />
            <div className="ps-img-overlay" />
          </div>

          <div className="ps-container">
            <div className="ps-number">{product.id}</div>
            <div className="ps-content">
              <span className="ps-subtitle">{product.subtitle}</span>
              <h3 className="ps-title">{product.title}</h3>
              <p className="ps-desc">{product.description}</p>

              <div className="ps-meta">
                <div className="ps-meta-item">
                  <span className="ps-meta-label">Material</span>
                  <span className="ps-meta-value">{product.material}</span>
                </div>
                <div className="ps-meta-item">
                  <span className="ps-meta-label">Value</span>
                  <span className="ps-meta-value gold-text">{product.price}</span>
                </div>
              </div>

              <button className="ps-cta interactive magnetic">
                Request Private View
                <div className="ps-cta-line" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
