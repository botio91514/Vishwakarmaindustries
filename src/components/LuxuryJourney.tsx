import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './LuxuryJourney.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'The Design Consultation',
    desc: 'Every masterpiece begins with a conversation. We collaborate closely to translate your vision into a unique design concept.',
    image: 'https://images.unsplash.com/photo-1544200175-ca6e80a7b323?w=1200&q=80',
    meta: { label: 'Location', value: 'Private Showroom' }
  },
  {
    num: '02',
    title: 'Material Selection',
    desc: 'Uncompromising in quality, we source the finest Vriksh-certified teak, walnut, and Burmese ebony from genuine eco-conscious origins.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=80',
    meta: { label: 'Origins', value: 'Certified Forests' }
  },
  {
    num: '03',
    title: 'Precision Craftsmanship',
    desc: 'Our master artisans in Jodhpur combine ancient techniques with modern precision, hand-carving each detail to absolute perfection.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    meta: { label: 'Artisans', value: '3rd Generation' }
  },
  {
    num: '04',
    title: 'Global Installation',
    desc: 'Your masterpiece is delivered with white-glove global service, ensuring the culmination of your journey is as effortless as it is extraordinary.',
    image: 'https://images.unsplash.com/photo-1558231221-ca1af98bb02b?w=1200&q=80',
    meta: { label: 'Service', value: 'Global Delivery' }
  }
];

export const LuxuryJourney: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Reveal
      const titleSplit = new SplitType('.journey-title', { types: 'words,chars' });
      gsap.fromTo(titleSplit.chars,
        { y: 60, opacity: 0, rotateX: -90 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.journey-title', start: 'top 85%' }
        }
      );

      // 2. Timeline Progress Animation
      gsap.fromTo('.journey-progress-fill',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.journey-grid',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );

      // 3. Staggered reveal for each journey item
      const journeyItems = gsap.utils.toArray<HTMLElement>('.journey-item');
      journeyItems.forEach((item) => {
        const image = item.querySelector('.journey-image-wrap');
        const content = item.querySelector('.journey-content');
        const tag = item.querySelector('.journey-step-tag');

        // Image reveal with parallax
        gsap.fromTo(image,
          { y: 100, opacity: 0, scale: 1.1 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 75%' }
          }
        );

        // Content reveal
        gsap.fromTo(content,
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 70%' }
          }
        );

        // Step tag bounce
        gsap.fromTo(tag,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: item, start: 'top 60%' }
          }
        );
      });

      // 4. Parallax on the background accents
      gsap.to('.journey-accent-1', {
        yPercent: -40,
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.to('.journey-accent-2', {
        yPercent: 40,
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });

      return () => titleSplit.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="journey-section">
      <div className="journey-accent journey-accent-1">EXCELLENCE</div>
      <div className="journey-accent journey-accent-2">CRAFTSMANSHIP</div>

      <div ref={containerRef} className="journey-container">
        <header className="journey-header">
          <div className="journey-label">How We Build Your Vision</div>
          <h2 className="journey-title">A Journey of <em>Unparalleled</em> Craft</h2>
        </header>

        <div className="journey-grid">
          <div className="journey-progress-line" />
          <div className="journey-progress-fill" />

          {steps.map((step, index) => (
            <div key={index} className="journey-item">
              <div className="journey-step-tag">{step.num}</div>

              <div className="journey-image-wrap">
                <img src={step.image} alt={step.title} className="journey-image" />
              </div>

              <div className="journey-content">
                <div className="journey-step-num">— Step {step.num}</div>
                <h3 className="journey-step-title">{step.title}</h3>
                <p className="journey-step-desc">{step.desc}</p>

                <div className="journey-meta">
                  <div className="journey-meta-item">
                    <span className="journey-meta-label">{step.meta.label}</span>
                    <span className="journey-meta-val gold-text">{step.meta.value}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
