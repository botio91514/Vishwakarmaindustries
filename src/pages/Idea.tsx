import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './About.css'; // Reusing about styles for consistency

gsap.registerPlugin(ScrollTrigger);

export default function Idea() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.idea-hero-title .char', {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 2,
        ease: 'power4.out',
      })
      .from('.idea-hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.2');

      gsap.from('.concept-card', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.concepts-grid',
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="about-page">
      <Navbar />
      <div className="grain-overlay" />

      <main>
        <section className="about-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div className="about-hero-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <span className="about-eyebrow">— THE STUDIO —</span>
            <h1 className="idea-hero-title about-title" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>
              {splitText('PURE INTENT.')}
            </h1>
            <p className="idea-hero-sub about-description" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Exploring the intersection of architectural geometry and ancestral Rajasthani woodwork. 
              Our ideas are born from the wood itself.
            </p>
          </div>
        </section>

        <section className="concepts-grid" style={{ padding: '10vh 8%', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6rem' }}>
            <div className="concept-card">
              <span className="about-eyebrow">01 / GEOMETRY</span>
              <h3 className="ph-title">Structural <br/><em>Honesty</em></h3>
              <p className="ph-text">We believe that the beauty of a piece of furniture lies in its structural truth. No hidden fasteners, no artificial reinforcements. Just the wood and its natural strength.</p>
            </div>
            <div className="concept-card" style={{ marginTop: '10vh' }}>
              <span className="about-eyebrow">02 / MATERIAL</span>
              <h3 className="ph-title">The <em>Seasoned</em> Soul</h3>
              <p className="ph-text">Every piece of timber we use undergoes a mandatory seasoning period. We don't rush nature; we wait for the moisture to settle into a permanent legacy.</p>
            </div>
            <div className="concept-card">
              <span className="about-eyebrow">03 / HUMANITY</span>
              <h3 className="ph-title">The <em>Hand</em> Mark</h3>
              <p className="ph-text">In an age of CNC precision, we prioritize the deliberate imperfection of the human hand. It is these minute variations that give each piece its unique life.</p>
            </div>
            <div className="concept-card" style={{ marginTop: '10vh' }}>
              <span className="about-eyebrow">04 / TIME</span>
              <h3 className="ph-title">Design for <em>Decades</em></h3>
              <p className="ph-text">We do not design for trends. We design for the year 2050. Our goal is to create heirlooms that gain value and character as they age.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '20vh 8%', textAlign: 'center' }}>
          <h2 className="about-title" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>Have a <em>Vision?</em></h2>
          <p className="about-description" style={{ margin: '0 auto 4rem' }}>We turn complex architectural concepts into tangible wooden masterpieces.</p>
          <a href="/contact" className="magnetic-btn">
            <span className="btn-text">Collaborate with us</span>
            <div className="btn-hover-bg"></div>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
