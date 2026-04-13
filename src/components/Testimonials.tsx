import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Testimonials.css';

const testimonials = [
  {
    quote: "The craftsmanship from Vishwakarma is nothing short of extraordinary. It's not just furniture; it's a legacy piece.",
    name: "ADRIANNA ROSSI",
    role: "INTERIOR ARCHITECT, MILAN",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80"
  },
  {
    quote: "Every detail was meticulously thought out. The end result defines the entire atmosphere of our residence.",
    name: "JULIAN VANCE",
    role: "ESTATE DEVELOPER",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"
  },
  {
    quote: "A rare combination of ancestral Jodhpur techniques and global perfection. Truly a world-class experience.",
    name: "SARAH EL-IDRISSI",
    role: "ART COLLECTOR, DUBAI",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=400&q=80"
  }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 second auto-scroll

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Elegant transition between quotes
    gsap.fromTo('.t-min-content',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    );
  }, [current]);

  return (
    <section className="t-min-section">
      <div className="t-min-container">
        <div className="t-min-label">Client Stories</div>

        <div className="t-min-display">
          <div className="t-min-content">
            <div className="t-min-image">
              <img src={testimonials[current].img} alt={testimonials[current].name} />
            </div>

            <div className="t-min-text">
              <p className="t-min-quote">“{testimonials[current].quote}”</p>
              <div className="t-min-author">
                <span className="t-min-name">{testimonials[current].name}</span>
                <span className="t-min-role">{testimonials[current].role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="t-min-dots">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`t-min-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
