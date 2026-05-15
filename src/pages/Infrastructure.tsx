import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Settings, Shield, Zap, Globe, Package, Award } from 'lucide-react';
import './Infrastructure.css';

// Optimized WebP Assets
import woodImg from '../assets/woodfab.webp';
import ironImg from '../assets/iron.webp';
import expoImg from '../assets/export.webp';
import bespokeImg from '../assets/oemodm.webp';

gsap.registerPlugin(ScrollTrigger);

export default function Infrastructure() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.infra-hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      gsap.from('.stat-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.infra-stats',
          start: 'top 80%'
        }
      });

      gsap.from('.capability-row', {
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.4,
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top 70%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="infra-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="infra-hero">
        <div className="infra-hero-bg">
          <img src={expoImg} alt="Factory Hub" />
          <div className="infra-overlay" />
        </div>
        <div className="infra-hero-content">
          <span className="infra-badge">INDUSTRIAL SCALE</span>
          <h1>Advanced <em>Infrastructure</em></h1>
          <p>Global manufacturing ecosystem merging heritage craftsmanship with automated precision.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="infra-stats">
        <div className="stats-container">
          <div className="stat-card">
            <Zap className="stat-icon" />
            <div className="stat-val">50,000+</div>
            <div className="stat-label">SQ. FT FACILITY</div>
          </div>
          <div className="stat-card">
            <Settings className="stat-icon" />
            <div className="stat-val">15+</div>
            <div className="stat-label">40' HQ / MONTH</div>
          </div>
          <div className="stat-card">
            <Shield className="stat-icon" />
            <div className="stat-val">100%</div>
            <div className="stat-label">VRIKSH CERTIFIED</div>
          </div>
          <div className="stat-card">
            <Globe className="stat-icon" />
            <div className="stat-val">25+</div>
            <div className="stat-label">EXPORT MARKETS</div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="infra-capabilities">
        <div className="cap-container">
          <header className="cap-header">
            <h2>Our Operational Ecosystem</h2>
            <div className="cap-line" />
          </header>

          <div className="capabilities-grid">
            <div className="capability-row">
              <div className="cap-text">
                <Package className="cap-icon-large" />
                <h3>Wood Processing Unit</h3>
                <p>Equipped with state-of-the-art seasoning chambers and chemical treatment plants to ensure timber stability in any global climate.</p>
                <ul className="cap-list">
                  <li>Automated Kiln Seasoning</li>
                  <li>Pressure Impregnation Treatment</li>
                  <li>Multi-stage Sanding Lines</li>
                </ul>
              </div>
              <div className="cap-visual">
                <img src={woodImg} alt="Wood Processing" />
              </div>
            </div>

            <div className="capability-row reverse">
              <div className="cap-text">
                <Award className="cap-icon-large" />
                <h3>Precision Forging</h3>
                <p>Integrated ironwork facility capable of both ancestral hand-forging and high-precision industrial metalwork.</p>
                <ul className="cap-list">
                  <li>Powder Coating Lines</li>
                  <li>Argon & TIG Welding</li>
                  <li>Custom Patina Development</li>
                </ul>
              </div>
              <div className="cap-visual">
                <img src={ironImg} alt="Iron Forging" />
              </div>
            </div>

            <div className="capability-row">
              <div className="cap-text">
                <Globe className="cap-icon-large" />
                <h3>Quality Assurance Lab</h3>
                <p>Every piece undergoes rigorous stress testing and finish validation before container loading.</p>
                <ul className="cap-list">
                  <li>Moisture Content Validation</li>
                  <li>Drop & Stress Testing</li>
                  <li>Eco-friendly Finish Check</li>
                </ul>
              </div>
              <div className="cap-visual">
                <img src={bespokeImg} alt="Quality Lab" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
