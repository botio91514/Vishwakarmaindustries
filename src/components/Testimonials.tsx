import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import './Testimonials.css';

const testimonials = [
  {
    quote: "The craftsmanship from Vishwakarma is nothing short of <em>extraordinary</em>. It's not just furniture; it's a legacy piece.",
    name: "ADRIANNA ROSSI",
    role: "INTERIOR ARCHITECT, MILAN",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
  },
  {
    quote: "Every detail was meticulously thought out. The end result defines the entire atmosphere of our Manhattan residence.",
    name: "JULIAN VANCE",
    role: "ESTATE DEVELOPER",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
  },
  {
    quote: "A rare combination of <em>ancestral Jodhpur techniques</em> and global perfection. Truly a world-class experience.",
    name: "SARAH EL-IDRISSI",
    role: "ART COLLECTOR, DUBAI",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80"
  }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const stackRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Advanced 3D Stack Initialization
    const items = stackRef.current;
    items.forEach((item, idx) => {
      if (!item) return;
      const diff = idx - current;
      const isPast = diff < 0;
      
      gsap.to(item, {
        opacity: isPast ? 0 : 1 - (diff * 0.15),
        scale: 1 - (diff * 0.05),
        z: isPast ? 100 : -(diff * 100),
        y: isPast ? -30 : (diff * 40),
        rotationX: isPast ? 10 : 0,
        zIndex: testimonials.length - idx,
        pointerEvents: idx === current ? 'auto' : 'none',
        duration: 1.2,
        ease: 'expo.out'
      });
    });
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="t-section">
      <div className="t-bg-text t-bg-text-1">EXPERIENCE</div>
      <div className="t-bg-text t-bg-text-2">HERITAGE</div>

      <div className="t-container">
        {testimonials.map((col, idx) => (
          <div 
            key={idx} 
            ref={(el) => (stackRef.current[idx] = el as HTMLDivElement)} 
            className="t-card"
          >
            {/* Split Content Layer */}
            <div className="t-card-content">
              <div className="t-quote-icon">“</div>
              <h2 className="t-quote-text" 
                  dangerouslySetInnerHTML={{ __html: col.quote }}>
              </h2>
              <div className="t-author-block">
                <span className="t-name">{col.name}</span>
                <span className="t-role">{col.role}</span>
              </div>
            </div>

            <div className="t-card-image-wrap">
              <img src={col.img} alt={col.name} className="t-card-image" />
            </div>
          </div>
        ))}

        {/* Cinematic Controls */}
        <div className="t-controls">
          <button className="t-nav-btn" onClick={prevSlide}>
            <ArrowLeft size={18} />
            <span></span>
            PREV
          </button>
          <div className="t-counter gold-text">
            0{current + 1} / 0{testimonials.length}
          </div>
          <button className="t-nav-btn" onClick={nextSlide}>
            NEXT
            <span></span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
