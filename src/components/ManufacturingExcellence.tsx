import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManufacturingExcellence.css';
import woodImg from '../assets/woodfab.jpg';
import ironImg from '../assets/iron.jpg';
import expoImg from '../assets/export.jpg';
import bespokeImg from '../assets/oemodm.jpg';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: "01",
    title: "Wood Fabrication",
    tagline: "Vriksh-Certified Timber",
    desc: "Sourcing only ethical woods, our artisans employ generational Suthar joinery techniques to craft enduring structures with impeccable, hand-rubbed finishes.",
    img: woodImg
  },
  {
    id: "02",
    title: "Iron Hand Forging",
    tagline: "Ancestral Ironwork",
    desc: "From industrial frameworks to delicate accents, every iron component is fire-forged by hand in Jodhpur, ensuring unmatched tensile strength and unique patina.",
    img: ironImg
  },
  {
    id: "03",
    title: "Global Procurement",
    tagline: "40' HQ Container Output",
    desc: "Operating with high-capacity infrastructure, we deliver seamless wholesale logistics and bespoke production to core markets including Germany, UK, Saudi Arabia, and the USA.",
    img: expoImg
  },
  {
    id: "04",
    title: "Bespoke OEM/ODM",
    tagline: "Custom Large-Scale Projects",
    desc: "From boutique hotels to global retail chains, we provide comprehensive OEM/ODM solutions, translating complex design blueprints into physical reality with engineering precision.",
    img: bespokeImg
  }
];

export const ManufacturingExcellence: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic parallax: stays perfectly bounded inside the section
      ScrollTrigger.matchMedia({
        "(min-width: 1025px)": () => {
          gsap.fromTo('.mfg-sticky-content',
            { y: 0 },
            {
              y: () => {
                const container = document.querySelector('.mfg-container');
                const sidebar = document.querySelector('.mfg-sticky-content');
                if (!container || !sidebar) return 0;
                // Move exactly the difference in height, staying inside the section
                return container.clientHeight - sidebar.clientHeight;
              },
              ease: 'none',
              scrollTrigger: {
                trigger: '.mfg-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true, // Switched from 1.5 to true to remove the lag
                invalidateOnRefresh: true // Re-calculate on window resize
              }
            }
          );
        }
      });

      // Reveal list items
      const items = gsap.utils.toArray<HTMLElement>('.mfg-item');
      items.forEach(item => {
        gsap.fromTo(item.querySelector('.mfg-item-body'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mfg-section">
      <div className="mfg-container">

        {/* Left Sticky Column */}
        <div className="mfg-sidebar">
          <div className="mfg-sticky-content">
            <div className="mfg-badge">
              <span className="mfg-badge-dot"></span>
              <span className="mfg-badge-text">Infrastructure</span>
            </div>
            <h2 className="mfg-title">The Foundry &<br />The Workshop</h2>
            <p className="mfg-intro">
              Located in the heart of Jodhpur, our facility operates perfectly as a complete ecosystem. We merge the generational heritage of the Suthar community with high-capacity global supply lines, delivering unprecedented precision at scale.
            </p>
          </div>
        </div>

        {/* Right Scroll Column */}
        <div className="mfg-content-list">
          {capabilities.map((item) => (
            <div key={item.id} className="mfg-item">
              <div className="mfg-item-header">
                <span className="mfg-item-num">{item.id}</span>
                <h3 className="mfg-item-title">{item.title}</h3>
              </div>
              <div className="mfg-item-body">
                <div className="mfg-item-img-wrap">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="mfg-item-text-wrap">
                  <div className="mfg-item-tag-wrapper">
                    <span className="mfg-item-tagline">{item.tagline}</span>
                    <div className="mfg-item-line"></div>
                  </div>
                  <p className="mfg-item-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
