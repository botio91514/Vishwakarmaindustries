import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BadgeCheck, ShieldCheck, Download, Layers, Ruler } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Particles } from '../components/Particles';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  { 
    id: 1, 
    title: 'Acacia Chevron Sideboard', 
    category: 'Storage', 
    features: 'FSC Certified / Jodhpur Joinery', 
    leadTime: '45-60 Days',
    certification: 'Vriksh Standard',
    finishing: 'Oil & Wax',
    material: 'Grade-A Acacia',
    img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1200&q=90',
    size: 'Large'
  },
  { 
    id: 2, 
    title: 'Forged Iron Dining Base', 
    category: 'Ironwork', 
    features: 'Hand Forged / Industrial Grade', 
    leadTime: '30-40 Days',
    certification: 'ISO 9001:2015',
    finishing: 'Powder Coat',
    material: 'Mild Steel / Wrought Iron',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=90',
    size: 'Medium'
  },
  { 
    id: 3, 
    title: 'Mango Wood Dining Set', 
    category: 'Tables', 
    features: 'Kiln Dried / Natural Finish', 
    leadTime: '55-70 Days',
    certification: 'EPCH Certified',
    finishing: 'Matte NC',
    material: 'Natural Mango Wood',
    img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=1200&q=90',
    size: 'Featured'
  },
  { 
    id: 4, 
    title: 'Boutique Hotel Console', 
    category: 'Bespoke', 
    features: 'Custom Specs / Brass Accents', 
    leadTime: '90 Days+',
    certification: 'Premium Custom',
    finishing: 'High Gloss Lacquer',
    material: 'Mixed Media',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=90',
    size: 'Medium'
  },
  { 
    id: 5, 
    title: 'Rattan & Teak Lounge Chair', 
    category: 'Seating', 
    features: 'Woven Cane / Ergonomic Frame', 
    leadTime: '40-50 Days',
    certification: 'Vriksh Standard',
    finishing: 'Protective Matte',
    material: 'Teak & Natural Cane',
    img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=90',
    size: 'Large'
  },
  { 
    id: 6, 
    title: 'Industrial Storage Rack', 
    category: 'Storage', 
    features: 'Powder-Coated / Heavy Duty', 
    leadTime: '25-35 Days',
    certification: 'Commercial Grade',
    finishing: 'Industrial Enamel',
    material: 'Cold Rolled Steel',
    img: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?w=1200&q=90',
    size: 'Medium'
  },
  { 
    id: 7, 
    title: 'Carved Royal Bedframe', 
    category: 'Bespoke', 
    features: 'Traditional Motifs / Rosewood', 
    leadTime: '120 Days',
    certification: 'Artisan Heritage',
    finishing: 'Shellac Polish',
    material: 'Indian Rosewood (Sheesham)',
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=90',
    size: 'Featured'
  },
  { 
    id: 8, 
    title: 'Minimalist Writing Desk', 
    category: 'Tables', 
    features: 'Knock-down Design / Export Ready', 
    leadTime: '35-45 Days',
    certification: 'Lacey Act Compliant',
    finishing: 'Water-based Clear',
    material: 'Sustainably Sourced Oak',
    img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=90',
    size: 'Large'
  }
];

const categories = ['All', 'Storage', 'Tables', 'Seating', 'Ironwork', 'Bespoke'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProducts(productData);
    } else {
      setFilteredProducts(productData.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation - Cinematic entrance
      gsap.fromTo('.catalog-hero-label', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
      
      gsap.fromTo('.catalog-hero-title .line-inner',
        { y: '100%' },
        { y: '0%', duration: 1.4, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo('.catalog-hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      );

      // Product Cards Reveal
      const cards = gsap.utils.toArray<HTMLElement>('.catalog-item');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Subtle Parallax on scroll
        const img = card.querySelector('.ci-main-img');
        if (img) {
          gsap.fromTo(img,
            { y: '-10%' },
            {
              y: '10%',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div ref={containerRef} className="catalog-master-page">
      <div className="noise-overlay" />
      <Particles />
      <Navbar />

      <div className="vertical-brand-tag">VISHWAKARMA INDUSTRIES // EST 2001</div>

      <main className="catalog-master-container main-container">

        {/* Cinematic Header Section */}
        <header className="catalog-header-section">
          <div className="catalog-header-left">
            <span className="catalog-hero-label">Series 4.0 // The Export Catalog</span>
            <h1 className="catalog-hero-title">
              <span className="line">
                <span className="line-inner">Refined</span>
              </span>
              <span className="line">
                <span className="line-inner gold-text">Artistry.</span>
              </span>
            </h1>
          </div>
          <div className="catalog-header-right">
            <p className="catalog-hero-desc">
              A curated manifestation of Indian heritage and industrial precision. Engineered to exceed global manufacturing standards while honoring the soul of Jodhpur craftsmanship.
            </p>
            <div className="header-meta-badges">
              <div className="meta-badge interactive">
                <ShieldCheck size={16} />
                <span>EPCH Certified</span>
              </div>
              <div className="meta-badge interactive">
                <BadgeCheck size={16} />
                <span>FSC Timber</span>
              </div>
            </div>
          </div>
        </header>

        {/* Fixed Navigation Bar */}
        <div className="catalog-nav-sticky">
          <nav className="catalog-filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`catalog-tab-link interactive magnetic ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span className="tab-label">{cat}</span>
                <span className="tab-count">
                  {cat === 'All' ? productData.length : productData.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </nav>
          <div className="catalog-actions">
            <button className="download-btn interactive magnetic">
              <Download size={14} />
              <span>Series Book</span>
            </button>
          </div>
        </div>

        {/* Structured Architectural Grid */}
        <div className="catalog-proper-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="catalog-item">
              <div className="ci-visual-wrap interactive">
                <div className="ci-img-inner-wrap">
                  <img src={product.img} alt={product.title} className="ci-main-img" loading="lazy" />
                  <div className="ci-material-sheen" />
                </div>
                
                <div className="ci-hover-overlay">
                  <div className="ci-specs-box">
                    <div className="spec-row">
                      <Layers size={14} />
                      <span>{product.material}</span>
                    </div>
                    <div className="spec-row">
                      <Ruler size={14} />
                      <span>{product.finishing}</span>
                    </div>
                  </div>
                  <a 
                    href={`mailto:export@vishwakarma.com?subject=Wholesale Request: ${product.title}`}
                    className="ci-request-btn interactive"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              
              <div className="ci-details">
                <div className="ci-top-line">
                  <span className="ci-category-tag">{product.category}</span>
                  <span className="ci-model-num">#{String(product.id).padStart(3, '0')}</span>
                </div>
                <h2 className="ci-product-title">{product.title}</h2>
                <div className="ci-bottom-line">
                  <p className="ci-specs-short">{product.features}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Trust Bar — Minimalist */}
        <section className="catalog-trust-bar">
          <div className="trust-col">
            <h3>Shipment Ready</h3>
            <p>Direct inland container port delivery to global hubs via ICD Luni.</p>
          </div>
          <div className="trust-col">
            <h3>Export Quality</h3>
            <p>100% Seasoned and chemically treated timber for maximum durability.</p>
          </div>
          <div className="trust-col">
            <h3>Mixed MOQs</h3>
            <p>Scalable manufacturing lines to accommodate boutique and volume orders.</p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
