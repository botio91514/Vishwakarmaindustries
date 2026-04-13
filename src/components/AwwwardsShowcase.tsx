import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './AwwwardsShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Obsidian',
    category: 'Executive Series',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&q=80',
  },
  {
    id: 2,
    name: 'Aeon',
    category: 'Living Collection',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80',
  },
  {
    id: 3,
    name: 'Nova',
    category: 'Dining Experience',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80',
  },
  {
    id: 4,
    name: 'Zenith',
    category: 'Storage Solutions',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80',
  },
  {
    id: 5,
    name: 'Imperial',
    category: 'Bedroom Luxury',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80',
  }
];

export const AwwwardsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const section = sectionRef.current;
      if (!wrapper || !section) return;

      // Calculate total scroll distance
      const totalWidth = wrapper.scrollWidth - window.innerWidth;

      // 1. HORIZONTAL SCROLL PINNING & PROGRESS BAR
      gsap.to(wrapper, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth * 2}`,
          pin: true,
          scrub: 1,
        }
      });

      // Progress Bar Animation
      gsap.to('.awwwards-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth * 2}`,
          scrub: 1,
        }
      });

      // 2. VELOCITY SKEW & PARALLAX EFFECT ON CARDS
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const image = card.querySelector('.awwwards-image');
        const title = card.querySelector('.awwwards-title');

        // Image Parallax (Counter-scroll)
        gsap.to(image, {
          x: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${totalWidth * 2}`,
            scrub: 1.2,
          }
        });

        // Intro Reveal for Titles using SplitType
        const splitTitle = new SplitType(title as HTMLElement, { types: 'chars' });
        gsap.fromTo(splitTitle.chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top center",
            }
          }
        );

        // Velocity Skew Tracker
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth * 2}`,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = gsap.utils.clamp(-15, 15, velocity / -100);
            const scaleAmount = gsap.utils.clamp(0.9, 1, 1 - Math.abs(velocity / 5000));
            
            gsap.to(card, {
              skewX: skewAmount,
              scale: scaleAmount,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto"
            });
          }
        });
      });

      // Reset skew when scrolling stops
      ScrollTrigger.addEventListener("scrollEnd", () => {
        gsap.to('.awwwards-card', { skewX: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    sectionRef.current.style.setProperty('--x', `${clientX}px`);
    sectionRef.current.style.setProperty('--y', `${clientY}px`);
  };

  return (
    <section ref={sectionRef} className="awwwards-showcase" onMouseMove={handleMouseMove}>
      <div className="awwwards-spotlight"></div>
      <div className="awwwards-bg-text">MASTERPIECES</div>
      
      <div className="awwwards-progress-bar">
        <div className="awwwards-progress-fill"></div>
      </div>
      
      <div className="awwwards-pin-container" ref={wrapperRef}>
        <div className="awwwards-gallery-wrapper">
          {products.map((product, index) => (
            <div key={product.id} className="awwwards-card interactive" ref={el => cardsRef.current[index] = el}>
              <span className="awwwards-number">0{index + 1}</span>
              <div className="awwwards-image-container">
                <img className="awwwards-image" src={product.image} alt={product.name} />
              </div>
              <div className="awwwards-text-overlay">
                <h2 className="awwwards-title">{product.name}</h2>
                <span className="awwwards-category">{product.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
