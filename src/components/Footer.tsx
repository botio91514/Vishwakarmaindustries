import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-bespoke">
      {/* Deep Watermark for Depth */}
      <div className="footer-b-watermark">VISHWAKARMA</div>

      <div className="footer-b-container">
        <div className="footer-main-grid">

          {/* Column 1: Brand Authority */}
          <div className="footer-col-brand">
            <h2 className="footer-h2">Vishwakarma<br />Industries</h2>
            <span className="footer-est-marker">EST. 2001 // JODHPUR HERITAGE</span>
            <p className="footer-certified">Vriksh Certified Manufacturing & Global Export.</p>
          </div>

          {/* Column 2: Structural Links */}
          <div className="footer-col-nav">
            <span className="footer-label">Navigation</span>
            <nav className="footer-nav-links">
              <a href="/about" className="interactive">Heritage</a>
              <a href="/products" className="interactive">Collections</a>
              <a href="/infrastructure" className="interactive">Infrastructure</a>
              <a href="/contact" className="interactive">Consultation</a>
            </nav>
          </div>

          {/* Column 3: Global Export / Contact */}
          <div className="footer-col-export">
            <span className="footer-label">Global Access</span>
            <div className="footer-contact-links">
              <a href="mailto:export@vishwakarma.com" className="interactive">export@vishwakarma.com</a>
              <p>H-1/256, ITI Area,<br />Jodhpur, RJ 342001</p>
            </div>
            <div className="footer-social-minimal">
              <a href="#" className="interactive magnetic">Instagram</a>
              <a href="#" className="interactive magnetic">LinkedIn</a>
            </div>
          </div>

        </div>

        {/* Legal & Utility bar */}
        <div className="footer-legal-bar">
          <div className="footer-legal-left">
            &copy; {new Date().getFullYear()} Vishwakarma Industries.
            <div className="legal-links">
              <a href="#privacy" className="interactive">Privacy</a>
              <a href="#terms" className="interactive">Terms</a>
            </div>
          </div>

          <button onClick={scrollToTop} className="footer-top-btn interactive magnetic">
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
