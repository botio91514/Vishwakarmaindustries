import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './LuxuryAbout.css';

gsap.registerPlugin(ScrollTrigger);

export const LuxuryAbout: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveals with SplitType
      const splitTitle = new SplitType('.la-title', { types: 'chars' });
      
      // Title reveal animation
      gsap.fromTo(splitTitle.chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.la-title',
            start: 'top 85%',
          }
        }
      );

      // Left content entrance (origin tag, label, divider, text)
      gsap.fromTo('.la-origin-tag, .la-label, .la-divider, .la-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.la-content',
            start: 'top 80%',
          }
        }
      );

      // 2. Image Parallax & Reveal
      // Zoom out reveal
      gsap.fromTo('.la-image-wrap',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.la-image-wrap',
            start: 'top 80%',
          }
        }
      );

      // Subtle parallax on the image inside the wrapper
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: '.la-image-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // 3. Vriksh Badge rotation
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          rotate: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        });
        
        // Fade in badge
        gsap.fromTo(badgeRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.la-body-wrap',
              start: 'top 70%',
            }
          }
        );
      }

      // 4. Animated Counters
      const stats = document.querySelectorAll('.la-stat-num');
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
          },
          onUpdate: () => {
            // Format numbers with commas for pieces crafted
            if (target > 1000) {
              stat.textContent = Math.floor(obj.val).toLocaleString();
            } else {
              stat.textContent = Math.floor(obj.val).toString();
            }
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="la-section">
      <div className="la-container">
        <div className="la-grid">
          
          <div ref={contentRef} className="la-content">
            <div className="la-decoration">
              <span className="la-dec-line" />
              <span className="la-dec-dot" />
            </div>

            <div className="la-origin-tag">
              <span>✦</span> Jodhpur, Rajasthan
            </div>

            <span className="la-label">Atelier</span>
            <h2 className="la-title">Crafting <em>Legacy</em> Since 1985</h2>
            
            <div className="la-divider">
              <div className="la-divider-line" />
              <div className="la-divider-dot" />
              <div className="la-divider-line" style={{ background: 'linear-gradient(270deg, var(--gold-primary), transparent)' }} />
            </div>

            <div className="la-body-wrap">
              <p className="la-text">
                Based in the historic city of Jodhpur, Rajasthan, we are master craftsmen dedicated to the art of luxury furniture. At Vishwakarma Industries, we don't just build furniture; we curate heritage.
              </p>
              <p className="la-text">
                Our sustainable approach ensures every piece is Vriksh Certified, using timber sourced from genuine, eco-conscious origins to protect our planet while elevating your space for generations to come.
              </p>

              {/* Circular Badge */}
              <div ref={badgeRef} className="la-vriksh-badge">
                <svg viewBox="0 0 100 100">
                  <path
                    id="badgePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text font-size="8.5">
                    <textPath xlinkHref="#badgePath" startOffset="0%">
                      VRIKSH CERTIFIED • ECO CONSCIOUS • VRIKSH CERTIFIED • ECO CONSCIOUS •
                    </textPath>
                  </text>
                </svg>
                <div className="la-badge-center">VI</div>
              </div>
            </div>

            <div className="la-stats">
              <div className="la-stat">
                <div className="la-stat-header">
                  <span className="la-stat-num" data-target="40">0</span>
                  <span className="la-stat-plus">+</span>
                </div>
                <span className="la-stat-label">Years Experience</span>
              </div>
              <div className="la-stat">
                <div className="la-stat-header">
                  <span className="la-stat-num" data-target="100">0</span>
                  <span className="la-stat-plus">%</span>
                </div>
                <span className="la-stat-label">Certified Wood</span>
              </div>
              <div className="la-stat">
                <div className="la-stat-header">
                  <span className="la-stat-num" data-target="500">0</span>
                  <span className="la-stat-plus">+</span>
                </div>
                <span className="la-stat-label">Export Countries</span>
              </div>
              <div className="la-stat">
                <div className="la-stat-header">
                  <span className="la-stat-num" data-target="10000">0</span>
                  <span className="la-stat-plus">+</span>
                </div>
                <span className="la-stat-label">Pieces Crafted</span>
              </div>
            </div>
          </div>

          <div className="la-image-wrap">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80" 
              alt="Craftsmanship" 
              className="la-image" 
            />
            <div className="la-image-overlay" />
          </div>

        </div>
      </div>
    </section>
  );
};
