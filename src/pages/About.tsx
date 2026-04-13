import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.about-hero-media', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.8,
        ease: 'power4.inOut'
      })
        .from('.about-eyebrow, .about-title, .about-description', {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.8');

      // 2. Parallax Hero Image
      gsap.to('.about-hero-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3. Staggered Philosophy Reveal
      gsap.from('.ph-card', {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.ph-grid',
          start: 'top 80%'
        }
      });

      // 4. Timeline Rows Reveal
      const rows = gsap.utils.toArray<HTMLElement>('.journey-row');
      rows.forEach((row) => {
        const img = row.querySelector('.journey-img-wrap');
        const content = row.querySelector('.journey-content');

        gsap.from(img, {
          x: row.style.direction === 'rtl' ? 100 : -100,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 70%'
          }
        });

        gsap.from(content, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 70%'
          }
        });
      });

      // 5. Authenticity Badge Rotation (Infinite)
      gsap.to('.auth-badge-circle-outer', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-page">
      <Navbar />

      <main>
        {/* Cinematic Hero */}
        <section className="about-hero">
          <div className="about-hero-media">
            <img
              className="about-hero-img"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=80"
              alt="The Atelier"
            />
          </div>
          <div className="about-hero-content">
            <span className="about-eyebrow">— OUR STORY —</span>
            <h1 className="about-title">Crafting <em>Legacy</em> Since 1985</h1>
            <p className="about-description">
              Vishwakarma Industries (Jodhpur, Rajasthan) is a convergence of ancestral craft and modern dominance. We don't just export furniture; we curate heritage.
            </p>
          </div>
        </section>

        {/* Philosophy Grid */}
        <section className="about-philosophy">
          <div className="ph-grid">
            <div className="ph-card">
              <span className="ph-num">01</span>
              <h3 className="ph-title">Material Soul</h3>
              <p className="ph-text">We source only Vriksh Certified timber, ensuring every piece reflects the soul of the forest without harming its future.</p>
            </div>
            <div className="ph-card">
              <span className="ph-num">02</span>
              <h3 className="ph-title">Artisan Precision</h3>
              <p className="ph-text">Our craftsmen are masters of hand-carving techniques passed down through generations in the city of Jodhpur.</p>
            </div>
            <div className="ph-card">
              <span className="ph-num">03</span>
              <h3 className="ph-title">Global Vision</h3>
              <p className="ph-text">From desert sands to urban skyscrapers, our furniture lives in the world's most elite private residences.</p>
            </div>
          </div>
        </section>

        {/* Ancestral Journey (Timeline) */}
        <section className="about-journey">
          <div className="journey-header">
            <span className="about-eyebrow">— THE JOURNEY —</span>
            <h2 className="about-title">The <em>Timeline</em> of Wood</h2>
          </div>

          <div className="journey-timeline">
            <div className="journey-row">
              <div className="journey-img-wrap">
                <img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80" alt="1985 Origins" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content">
                <span className="journey-year">1985</span>
                <h3 className="ph-title">Founding the Atelier</h3>
                <p className="journey-text">Founded in the heart of Jodhpur, we began as a small family-led workshop specializing in traditional Rajasthani hand-carving.</p>
              </div>
            </div>

            <div className="journey-row" style={{ direction: 'rtl' }}>
              <div className="journey-img-wrap">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" alt="Global Expansion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content" style={{ direction: 'ltr' }}>
                <span className="journey-year">2005</span>
                <h3 className="ph-title">The Global Threshold</h3>
                <p className="journey-text">Our first international export marked a turning point. We combined traditional aesthetics with modern quality control (Vriksh Certification).</p>
              </div>
            </div>

            <div className="journey-row">
              <div className="journey-img-wrap">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80" alt="2026 Vision" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content">
                <span className="journey-year">2026</span>
                <h3 className="ph-title">The Modern Monolith</h3>
                <p className="journey-text">Today, we represent the peak of luxury Indian furniture, fusing industrial precision with artisanal soul. The future is handcrafted.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authenticity Badge */}
        <section className="about-auth">
          <div className="auth-badge-container">
            <div className="auth-badge-circle">
              <svg viewBox="0 0 100 100" className="auth-badge-circle-outer" style={{ position: 'absolute', width: '150%', height: '150%' }}>
                <path id="badgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text font-size="8.5" letter-spacing="2">
                  <textPath xlinkHref="#badgePath" startOffset="0%">
                    VRIKSH CERTIFIED • AUTHENTIC JODHPUR • 1985 • VRIKSH CERTIFIED •
                  </textPath>
                </text>
              </svg>
              <div className="auth-badge-text">VI</div>
            </div>
            <h2 className="auth-statement">Dedicated to Sustainable Luxury. <em>Forever.</em></h2>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
