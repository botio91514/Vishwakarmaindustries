import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Exhibitions.css';

gsap.registerPlugin(ScrollTrigger);

const fairGallery = [
  {
    id: 1,
    title: "EPCH Delhi Fair",
    type: "feature",
    label: "Main Showcase",
    description: "Our dedicated space at the IHGF Delhi Fair, featuring our finest collections of industrial and handcrafted furniture for global markets.",
    img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1600&q=80"
  },
  {
    id: 2,
    title: "Global Interactions",
    type: "side",
    label: "B2B Meetings",
    description: "Engaging with international buyers and designers from over 100 countries during the fair.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80"
  },
  {
    id: 3,
    title: "Craft Highlights",
    type: "side",
    label: "Detailing",
    description: "Close-up demonstrations of our finishing techniques that caught the eyes of export professionals.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
  },
  {
    id: 4,
    title: "Design Awards Area",
    type: "bottom",
    label: "Excellence",
    description: "Recognition of our commitment to sustainable and innovative manufacturing.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
  },
  {
    id: 5,
    title: "Innovative Booth Layout",
    type: "bottom",
    label: "Experience",
    description: "Creating an immersive environment for guests to experience the texture and durability of our pieces.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
  },
  {
    id: 6,
    title: "Visitor Feedback",
    type: "bottom",
    label: "Collaborations",
    description: "Building long-term partnerships with retailers and boutique curators across the globe.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
  },
  {
    id: 7,
    title: "Future of Furniture",
    type: "bottom",
    label: "Roadmap",
    description: "Discussing the roadmap for eco-friendly industrial manufacturing at the Delhi Expo.",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80"
  }
];

export const Exhibitions: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.ex-header-left, .ex-header-right', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ex-header-wrap',
          start: 'top 85%'
        }
      });

      // Cards Parallax & Entrance
      gsap.utils.toArray<HTMLElement>('.ex-card-inner').forEach(card => {
        gsap.from(card, {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%'
          }
        });
      });

      // Membership Section reveal
      gsap.from('.ex-member-item', {
        x: -40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.ex-members-row',
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="ex-section">
      <div className="ex-container">
        <header className="ex-header-wrap">
          <div className="ex-header-left">
            <span className="ex-eyebrow">Fair Experience</span>
            <h2 className="ex-title">IHGF Delhi Expo <em>Highlights</em></h2>
          </div>
          <div className="ex-header-right">
            <p className="ex-subtitle">
              Showcasing the soul of Jodhpur’s industrial craft on the world’s biggest stage. 
              Our journey at the EPCH Fair is a testament to our global vision and heritage roots.
            </p>
          </div>
        </header>

        {/* ── Main Gallery Grid ── */}
        <div className="ex-main-gallery">
          {/* Main Feature */}
          <div className="ex-feature-card">
            <div className="ex-card-inner">
              <div 
                className="ex-card-img" 
                style={{ backgroundImage: `url(${fairGallery[0].img})` }}
              />
              <div className="ex-card-overlay" />
              <div className="ex-card-info">
                <span className="ex-card-label">{fairGallery[0].label}</span>
                <h3 className="ex-card-h">{fairGallery[0].title}</h3>
                <p className="ex-card-p">{fairGallery[0].description}</p>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="ex-side-cards">
            <div className="ex-side-card">
              <div 
                className="ex-card-img" 
                style={{ backgroundImage: `url(${fairGallery[1].img})` }}
              />
              <div className="ex-card-overlay" />
              <div className="ex-card-info">
                <span className="ex-card-label">{fairGallery[1].label}</span>
                <h3 className="ex-card-h">{fairGallery[1].title}</h3>
                <p className="ex-card-p">{fairGallery[1].description}</p>
              </div>
            </div>
            <div className="ex-side-card">
              <div 
                className="ex-card-img" 
                style={{ backgroundImage: `url(${fairGallery[2].img})` }}
              />
              <div className="ex-card-overlay" />
              <div className="ex-card-info">
                <span className="ex-card-label">{fairGallery[2].label}</span>
                <h3 className="ex-card-h">{fairGallery[2].title}</h3>
                <p className="ex-card-p">{fairGallery[2].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary Grid ── */}
        <div className="ex-bottom-row">
          {fairGallery.slice(3).map(item => (
            <div key={item.id} className="ex-small-card">
              <div className="ex-card-inner">
                <div 
                  className="ex-card-img" 
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="ex-card-overlay" />
                <div className="ex-card-info">
                  <span className="ex-card-label">{item.label}</span>
                  <h3 className="ex-card-h" style={{fontSize: '24px'}}>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Memberships Section ── */}
        <div className="ex-members-row">
          <div className="ex-member-item">
            <div className="ex-member-logo-wrap">
              <img src={new URL('../assets/EPCH.jpg', import.meta.url).href} alt="EPCH Logo" />
            </div>
            <div className="ex-member-text">
              <h4 className="ex-member-h">EPCH Official Member</h4>
              <p className="ex-member-p">Registered with the Export Promotion Council for Handicrafts for global trade compliance.</p>
            </div>
          </div>

          <div className="ex-member-item">
            <div className="ex-member-logo-wrap">
               <img src={new URL('../assets/jhea.jpg', import.meta.url).href} alt="JHEA Logo" />
            </div>
            <div className="ex-member-text">
              <h4 className="ex-member-h">JHEA Member</h4>
              <p className="ex-member-p">Member of JHEA, supporting the legacy of Jodhpur as the handicrafts hub of India.</p>
            </div>
          </div>

          <div className="ex-member-item">
            <div className="ex-member-logo-wrap">
               <img src={new URL('../assets/Vriksh.png', import.meta.url).href} alt="Vriksh Certification" />
            </div>
            <div className="ex-member-text">
              <h4 className="ex-member-h">Vriksh Certified</h4>
              <p className="ex-member-p">Ensuring all our wood products are legally and sustainably procured under the Vriksh standard.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
