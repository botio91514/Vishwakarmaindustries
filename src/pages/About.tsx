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
      // 1. Hero Entrance Animation - Cinematic Reveal
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.about-hero-media', {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.2,
        duration: 2.5,
        ease: 'expo.inOut'
      })
      .from('.about-title .char', {
        y: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 1.5,
        ease: 'power4.out'
      }, '-=1.2')
      .from('.about-eyebrow, .about-description', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      }, '-=1');

      // 2. Parallax & Scale Hero Image
      gsap.to('.about-hero-img', {
        scale: 1.15,
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3. Floating Decorative Elements
      gsap.to('.deco-line', {
        scaleX: 1.5,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 4. Staggered Philosophy Reveal
      gsap.from('.ph-card', {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.ph-grid',
          start: 'top 85%'
        }
      });

      // 5. Visionary Section Reveal
      const visionaryTL = gsap.timeline({
        scrollTrigger: {
          trigger: '.visionary-section',
          start: 'top 60%',
        }
      });

      visionaryTL.from('.visionary-image-wrap', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.5,
        ease: 'expo.inOut'
      })
      .from('.visionary-content > *', {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8');

      // 6. Ideas Section (Layered Entrance)
      const ideaCards = gsap.utils.toArray<HTMLElement>('.idea-card');
      ideaCards.forEach((card) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%'
          }
        });
      });

      // 7. Timeline Reveal with Progressive Drawing
      gsap.from('.journey-row', {
        opacity: 0,
        y: 100,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.journey-timeline',
          start: 'top 70%'
        }
      });

      // 8. Authenticity Badge Rotation (Infinite)
      gsap.to('.auth-badge-circle-outer', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text for chars
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
            <h1 className="about-title">{splitText('A 25-Year Legacy of Craft')}</h1>
            <p className="about-description">
              Vishwakarma Industries (Jodhpur, Rajasthan) is a convergence of ancestral craft and modern dominance. We don't just export furniture; we curate heritage.
            </p>
            <div className="deco-line"></div>
          </div>
        </section>

        {/* The Visionary Section */}
        <section className="visionary-section">
          <div className="visionary-container">
            <div className="visionary-content">
              <span className="about-eyebrow">— THE VISIONARY —</span>
              <h2 className="visionary-name">Mr. MalaRam Suthar</h2>
              <p className="visionary-quote">“Allow your passion to become your purpose and it will one day become your profession.”</p>
              <div className="visionary-text">
                <p>Establishing Vishwakarma Industries 25 years ago, Mr. MalaRam Suthar's story is one of relentless passion. Coming from a traditional Suthar (Carpenter) family, he was captivated by furniture-making techniques from a young age.</p>
                <p>After honing his skills for over 10 years in the Jodhpur handicrafts industry, he founded his own manufacturing company. Today, his vision continues to drive our growth, providing best-in-class furniture to the global market.</p>
              </div>
            </div>
            <div className="visionary-image-wrap">
              <img src="https://images.unsplash.com/photo-1558444479-79a071060965?w=1200&q=80" alt="Founder MalaRam Suthar" className="visionary-img" />
            </div>
          </div>
        </section>

        {/* Core Values / Vision & Mission */}
        <section className="about-philosophy">
          <div className="ph-grid">
            <div className="ph-card">
              <span className="ph-num">01</span>
              <h3 className="ph-title">Our Vision</h3>
              <p className="ph-text">To become a prime performer in the global marketplace by providing best-in-class furniture to our clients and achieving a worldwide reputation through our work.</p>
            </div>
            <div className="ph-card">
              <span className="ph-num">02</span>
              <h3 className="ph-title">Our Mission</h3>
              <p className="ph-text">To establish ourselves as the leading furniture brand from India, serving customers by delivering high-quality furniture while ensuring excellence in every detail.</p>
            </div>
            <div className="ph-card">
              <span className="ph-num">03</span>
              <h3 className="ph-title">Global Reach</h3>
              <p className="ph-text">Proudly fulfilling promises of quality across Germany, the United Kingdom, Saudi Arabia, and the USA, growing constantly with our dedicated buyers.</p>
            </div>
          </div>
        </section>

        {/* The Ideas Section */}
        <section className="about-ideas">
          <div className="ideas-header">
            <span className="about-eyebrow">— OUR PHILOSOPHY —</span>
            <h2 className="about-title">The <em>Ideas</em> That Define Us</h2>
          </div>
          
          <div className="ideas-grid">
            {/* Idea 01 */}
            <div className="idea-card">
              <span className="idea-number">01</span>
              <div className="idea-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="idea-svg">
                  <path d="M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9z" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6z" />
                  <path d="M12 8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4z" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
              <h3 className="idea-title">Sustainable <br /><em>Development</em></h3>
              <p className="idea-text">We believe in meeting today’s needs without compromising future generations. We use only Vriksh Certified timber wood from genuine sources, guided by GICIA India and EPCH.</p>
              <div className="idea-accent-line"></div>
            </div>

            {/* Idea 02 */}
            <div className="idea-card">
              <span className="idea-number">02</span>
              <div className="idea-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="idea-svg">
                  <path d="M20.24 12.24a6 6 0 10-8.49-8.49L5 10.5V19h8.5z" />
                  <path d="M16 8l-4 4M17 13l-4 4" />
                </svg>
              </div>
              <h3 className="idea-title">Buyer <br /><em>Engagement</em></h3>
              <p className="idea-text">Our product development team collaborates deeply with buyers, customizing material, structure, and finish until every detail meets their trend and satisfaction.</p>
              <div className="idea-accent-line"></div>
            </div>

            {/* Idea 03 */}
            <div className="idea-card">
              <span className="idea-number">03</span>
              <div className="idea-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="idea-svg">
                  <path d="M3 21h18M3 7l9-4 9 4M5 7v14M19 7v14M10 21V11h4v10" />
                </svg>
              </div>
              <h3 className="idea-title">Better <br /><em>Workspace</em></h3>
              <p className="idea-text">Customer satisfaction starts with employee satisfaction. We treat our team like family, ensuring a safe, child-labor-free environment where people can thrive.</p>
              <div className="idea-accent-line"></div>
            </div>

            {/* Idea 04 */}
            <div className="idea-card">
              <span className="idea-number">04</span>
              <div className="idea-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="idea-svg">
                  <path d="M12 3l1.912 5.885H21L14.456 12.518 16.368 18.403 12 14.77 7.632 18.403 9.544 12.518 3 8.885H9.088z" />
                </svg>
              </div>
              <h3 className="idea-title">Attention <br /><em>to Detail</em></h3>
              <p className="idea-text">It’s our USP. We believe the difference between average and stunning lies in the minute details. Every order receives our full focus to achieve the perfect woodwork.</p>
              <div className="idea-accent-line"></div>
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
                <img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80" alt="Tradition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content">
                <span className="journey-year">Legacy</span>
                <h3 className="ph-title">Suthar Heritage</h3>
                <p className="journey-text">Born into a family of traditional woodworkers, the foundation was laid long before the first factory gates opened.</p>
              </div>
            </div>

            <div className="journey-row" style={{ direction: 'rtl' }}>
              <div className="journey-img-wrap">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" alt="Crafting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content" style={{ direction: 'ltr' }}>
                <span className="journey-year">25 Yrs</span>
                <h3 className="ph-title">The First Workshop</h3>
                <p className="journey-text">Two and a half decades ago, MalaRam Suthar translated personal passion into professional excellence, founding Vishwakarma Industries.</p>
              </div>
            </div>

            <div className="journey-row">
              <div className="journey-img-wrap">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80" alt="Global" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="journey-content">
                <span className="journey-year">Today</span>
                <h3 className="ph-title">A Global Presence</h3>
                <p className="journey-text">From Jodhpur to the world, we now serve major markets in Germany, the UK, Saudi Arabia, and the USA with Vriksh Certified brilliance.</p>
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
                <text fontSize="8.5" letterSpacing="2">
                  <textPath xlinkHref="#badgePath" startOffset="0%">
                    VRIKSH CERTIFIED • AUTHENTIC JODHPUR • 25 YEARS • VRIKSH CERTIFIED •
                  </textPath>
                </text>
              </svg>
              <div className="auth-badge-text">VI</div>
            </div>
            <h2 className="auth-statement">Dedicated to Sustainable Luxury. <em>Forever.</em></h2>
          </div>
        </section>

        {/* Magnetic CTA Section */}
        <section className="about-cta-section">
          <div className="cta-content">
            <span className="about-eyebrow">— INQUIRE —</span>
            <h2 className="cta-title">Bring <em>Mastery</em> Home</h2>
            <a href="/contact" className="magnetic-btn">
              <span className="btn-text">Experience the Collection</span>
              <div className="btn-hover-bg"></div>
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
