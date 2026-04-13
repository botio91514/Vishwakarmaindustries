import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: '01',
    title: 'The Obsidian',
    subtitle: 'Executive Desk',
    description: 'A masterpiece of dark ebony and hand-burnished steel. Crafted for leaders who define the future.',
    material: 'Burmese Ebony & Industrial Steel',
    price: 'By Inquiry',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80'
  },
  {
    id: '02',
    title: 'Velvet Horizon',
    subtitle: 'Lounge Chair',
    description: 'Designed to cradle the human form in absolute silence. Hand-stitched leather meets gold-brushed walnut.',
    material: 'Italian Leather & Solid Walnut',
    price: 'By Inquiry',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80'
  },
  {
    id: '03',
    title: 'Ivory Monolith',
    subtitle: 'Dining Table',
    description: 'Where conversations flow over ancient stone. A single slab of Carrara marble supported by floating brass.',
    material: 'Carrara Marble & Polished Brass',
    price: 'By Inquiry',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80'
  }
];

export const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.ps-item');

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const imgWrap = item.querySelector('.ps-img-wrap');
        const content = item.querySelector('.ps-content');
        const number = item.querySelector('.ps-number');

        // 1. Image Reveal (Clipped Mask)
        gsap.fromTo(imgWrap,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );

        // 2. Subtle Parallax on image inside
        gsap.fromTo(item.querySelector('.ps-img'),
          { scale: 1.2, y: -20 },
          {
            scale: 1, y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        // 3. Content Staggered Reveal
        gsap.fromTo(content,
          { x: isEven ? 50 : -50, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
            }
          }
        );

        // 4. Large Number Reveal
        gsap.fromTo(number,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 0.05, scale: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="ps-section">
      <div className="ps-header">
        <span className="ps-label">Masterwork Portfolio</span>
        <h2 className="ps-title-main">Curated <em>Magnificence</em></h2>
      </div>

      <div className="ps-items-list">
        {products.map((product, index) => (
          <div key={product.id} className={`ps-item ${index % 2 !== 0 ? 'ps-reverse' : ''}`}>
            <div className="ps-number">{product.id}</div>
            
            <div className="ps-img-col">
              <div className="ps-img-wrap">
                <img src={product.image} alt={product.title} className="ps-img" />
                <div className="ps-img-overlay" />
              </div>
            </div>

            <div className="ps-content-col">
              <div className="ps-content">
                <span className="ps-subtitle">{product.subtitle}</span>
                <h3 className="ps-title">{product.title}</h3>
                <p className="ps-desc">{product.description}</p>
                
                <div className="ps-meta">
                  <div className="ps-meta-item">
                    <span className="ps-meta-label">Primary Material</span>
                    <span className="ps-meta-value">{product.material}</span>
                  </div>
                </div>

                <div className="ps-footer">
                   <span className="ps-price gold-text">{product.price}</span>
                   <button className="ps-cta interactive magnetic">
                     Business Inquiry
                     <div className="ps-cta-line" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ps-outro">
        <h2 className="ps-outro-title">Crafting your <em>Vision</em></h2>
        <button className="ps-final-button magnetic">Request Catalog</button>
      </div>
    </section>
  );
};
