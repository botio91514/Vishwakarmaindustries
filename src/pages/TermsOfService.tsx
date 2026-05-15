import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="legal-page-container">
      <Navbar />
      <main style={{ padding: '12rem 5% 8rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Terms of Service</h1>
        <p style={{ color: '#666', lineHeight: '1.8' }}>Last Updated: May 15, 2024</p>
        
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            By accessing or using the Vishwakarma Industries website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Intellectual Property</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            All furniture designs, technical blueprints, images, and content displayed on this site are the exclusive property of Vishwakarma Industries unless otherwise noted.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Quotations & Commissions</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            Formal quotations provided via the website are estimates based on design intent. Final pricing is subject to material availability and technical specifications confirmed at the time of order.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
