import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Particles } from '../components/Particles';
import { Navbar } from '../components/Navbar';
import { LuxuryAbout } from '../components/LuxuryAbout';
import { ElasticGrid } from '../components/ElasticGrid';
import { ManufacturingExcellence } from '../components/ManufacturingExcellence';
import { Exhibitions } from '../components/Exhibitions';
import { CTA } from '../components/CTA';
import { ScrollingBanner } from '../components/ScrollingBanner';
import { Footer } from '../components/Footer';
import { Preloader } from '../components/Preloader';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const bgImages = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
    'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=80',
  ];

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.5 });

      heroTl
        .from('.hero-bg-image', {
          filter: 'blur(20px)',
          opacity: 0,
          duration: 2.5,
          ease: 'power3.inOut',
        })
        .to('.hero-title .line-inner', {
          y: '0%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        }, '-=1.5')
        .to('.hero-subtitle', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.8')
        .to('.hero-cta', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
        .to('.scroll-indicator', {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.4');

      // Hero parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to('.hero-bg-image', {
          x: -xPos,
          y: -yPos,
          duration: 1.5,
          ease: 'power3.out',
        });

        gsap.to('.hero-content', {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1.5,
          ease: 'power3.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Hero scroll fade out
      const heroTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.hero-content', {
            opacity: 1 - progress * 1.5,
            y: progress * 100,
          });
          gsap.set('.hero-bg', {
            y: progress * 200,
          });
        },
      });
      triggersRef.current.push(heroTrigger);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <Preloader onComplete={() => ScrollTrigger.refresh()} />
      <Navbar />

      <div ref={containerRef} className="main-container">
        <div className="noise-overlay" />
        <Particles />

        {/* Hero Section */}
        <section ref={heroRef} className="hero">
          <div className="hero-bg">
            {bgImages.map((img, index) => (
              <div
                key={index}
                className="hero-bg-image"
                style={{
                  backgroundImage: `url(${img})`,
                  opacity: currentBg === index ? 1 : 0,
                  transition: 'opacity 2s ease-in-out',
                }}
              />
            ))}
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line">
                <span className="line-inner">{splitText('VISHWAKARMA')}</span>
              </span>
              <span className="line">
                <span className="line-inner gold-text">{splitText('INDUSTRIES')}</span>
              </span>
            </h1>
            <p className="hero-subtitle">Your Desire, We Design</p>
            <Link to="/products" className="hero-cta interactive magnetic">
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="scroll-indicator">
            <span className="scroll-text">Scroll to Discover</span>
            <div className="scroll-line" />
          </div>
        </section>

        <LuxuryAbout />
        <ElasticGrid />
        <ManufacturingExcellence />
        <Exhibitions />
        <CTA />
        <ScrollingBanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
