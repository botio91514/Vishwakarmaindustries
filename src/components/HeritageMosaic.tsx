import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeritageMosaic.css';

gsap.registerPlugin(ScrollTrigger);

const mosaicItems = [
  {
    id: 1,
    title: 'Obsidian Desk',
    category: 'Executive',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    speed: 0.1,
    year: '1985'
  },
  {
    id: 2,
    title: 'Aeon Lounge',
    category: 'Comfort',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    speed: 0.35,
    year: '2012'
  },
  {
    id: 3,
    title: 'Nova Dining',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    speed: 0.15,
    year: '1998'
  },
  {
    id: 4,
    title: 'Zenith Unit',
    category: 'Modern',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    speed: 0.45,
    year: '2023'
  },
  {
    id: 5,
    title: 'Imperial Bed',
    category: 'Rest',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    speed: 0.2,
    year: '2005'
  },
  {
    id: 6,
    title: 'Classic Bureau',
    category: 'Legacy',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    speed: 0.38,
    year: '1992'
  },
  {
    id: 7,
    title: 'Handcrafted Detail',
    category: 'Artisanal',
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&q=80',
    speed: 0.5,
    year: 'Est.'
  },
  {
    id: 8,
    title: 'Texture & Grain',
    category: 'Materials',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
    speed: 0.28,
    year: 'Pure'
  }
];

export const HeritageMosaic: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax for items
            const items = gsap.utils.toArray<HTMLElement>('.hm-item');
            items.forEach((item) => {
                const speed = parseFloat(item.getAttribute('data-speed') || '0.1');
                gsap.fromTo(item, 
                    { y: 150 * speed },
                    {
                        y: -150 * speed,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );

                // Internal image parallax (Museum pan)
                const img = item.querySelector('.hm-img');
                gsap.fromTo(img,
                    { scale: 1.1, yPercent: -5 },
                    {
                        scale: 1.1,
                        yPercent: 5,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            });

            // Parallax bg text
            gsap.to('.hm-bg-text', {
                x: -150,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });

            gsap.to('.hm-bg-text-2', {
                x: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });

            // Header entrance
            gsap.from('.hm-header > *', {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.hm-header',
                    start: 'top 85%'
                }
            });

            // Item staggered reveal with CLIP reveal
            gsap.fromTo('.hm-img-wrap', 
                { clipPath: 'inset(100% 0 0 0)' },
                {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.8,
                    stagger: 0.15,
                    ease: 'expo.inOut',
                    scrollTrigger: {
                        trigger: '.hm-grid',
                        start: 'top 75%'
                    }
                }
            );

            // Stagger markers
            gsap.from('.hm-marker', {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.hm-grid',
                    start: 'top 70%'
                }
            });

            // Smooth mouse follow parallax for EACH item
            items.forEach((item) => {
                const img = item.querySelector('.hm-img');
                const handleMouseMove = (e: MouseEvent) => {
                    const { left, top, width, height } = item.getBoundingClientRect();
                    const x = (e.clientX - left) / width - 0.5;
                    const y = (e.clientY - top) / height - 0.5;

                    gsap.to(img, {
                        x: x * 30,
                        y: y * 30,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                };

                item.addEventListener('mousemove', handleMouseMove as any);
                item.addEventListener('mouseleave', () => {
                   gsap.to(img, { x: 0, y: 0, duration: 2, ease: 'power2.out' });
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="hm-section">
            <div className="hm-bg-text">CRAFTSMANSHIP</div>
            <div className="hm-bg-text-2">LEGACY</div>
            
            <div className="hm-header">
                <span className="ps-label">Masterpieces</span>
                <h2 className="ps-title-main">The <em>Heritage</em> Mosaic</h2>
                <div className="hm-header-line" />
            </div>

            <div className="hm-grid">
                {mosaicItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`hm-item hm-item-${item.id}`} 
                        data-speed={item.speed}
                    >
                        <div className="hm-marker hm-marker-1">+</div>
                        <div className="hm-marker hm-marker-2">+</div>
                        
                        <span className="hm-year">{item.year}</span>
                        <div className="hm-img-wrap">
                            <div className="hm-img-inner">
                                <img src={item.image} alt={item.title} className="hm-img" />
                                <div className="hm-overlay" />
                            </div>
                        </div>
                        <div className="hm-info">
                            <span className="hm-category">{item.category}</span>
                            <h3 className="hm-title">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
