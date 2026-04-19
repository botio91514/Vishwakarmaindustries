import React, { useRef, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number | string;
  title: string;
  category: string;
  img: string;
}

interface SliderSectionProps {
  title: string;
  products: Product[];
}

export const SliderSection: React.FC<SliderSectionProps> = ({ title, products }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robust reveal that ensures visibility even if triggered late
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );

      if (sliderRef.current) {
        const cards = sliderRef.current.querySelectorAll('.product-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="slider-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <a href="#" className="view-all-btn">
          Explore All <ArrowRight size={18} />
        </a>
      </div>

      <div className="slider-outer-wrapper">
        {showLeftArrow && (
          <button 
            className="slider-nav-btn left" 
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {showRightArrow && (
          <button 
            className="slider-nav-btn right" 
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div 
          ref={sliderRef}
          className="products-slider"
          onScroll={handleScroll}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.title}
                category={product.category}
                image={product.img}
              />
            ))
          ) : (
            <div className="slider-empty-state">
              Preparing these pieces for the collection...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
