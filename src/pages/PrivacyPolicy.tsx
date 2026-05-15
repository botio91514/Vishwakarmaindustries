import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page-container">
      <Navbar />
      <main style={{ padding: '12rem 5% 8rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
        <p style={{ color: '#666', lineHeight: '1.8' }}>Last Updated: May 15, 2024</p>
        
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            Vishwakarma Industries collects information to provide better services to our clients. This includes information you provide via our contact form, such as your name, email address, and project details.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Information</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            We use the information we collect to communicate with you about projects, provide technical support, and improve our manufacturing processes. We do not sell your personal data to third parties.
          </p>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Data Security</h2>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            We implement industry-standard security protocols to protect your project data and personal information from unauthorized access.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
