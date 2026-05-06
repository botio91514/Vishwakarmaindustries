import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingBag } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SliderSection } from '../components/SliderSection';
import '../components/CarouselProducts.css';

import p2 from '../assets/products/2.jpeg';
import p5 from '../assets/products/5.jpeg';
import p6 from '../assets/products/6.jpeg';
import p7 from '../assets/products/7.jpeg';
import p8 from '../assets/products/8.jpeg';
import p9 from '../assets/products/9.jpeg';
import p11 from '../assets/products/11.jpeg';
import p13 from '../assets/products/13.jpeg';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  // SEATING
  { id: 23, title: 'Premium Seating Collection I', category: 'Seating', img: p8 },
  { id: 27, title: 'Premium Seating Collection II', category: 'Seating', img: p13 },
  { id: 24, title: 'Premium Seating Collection V', category: 'Seating', img: p5 },
  { id: 25, title: 'Premium Seating Collection VII', category: 'Seating', img: p7 },
  { id: 26, title: 'Premium Seating Collection IX', category: 'Seating', img: p9 },


  // TABLES
  { id: 6, title: 'Live Edge Walnut Table', category: 'Tables', img: p2 },
  { id: 7, title: 'Circular Marble Table', category: 'Tables', img: p5 },
  { id: 8, title: 'Brutalist Coffee Table', category: 'Tables', img: p6 },
  { id: 9, title: 'Ash Writing Desk', category: 'Tables', img: p11 },
  { id: 10, title: 'Mango Wood Dining Set', category: 'Tables', img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=1200' },

  // STORAGE
  { id: 11, title: 'Chevron Sideboard', category: 'Storage', img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1200' },
  { id: 12, title: 'Brass Inlay Credenza', category: 'Storage', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200' },
  { id: 13, title: 'Industrial Storage', category: 'Storage', img: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?w=1200' },
  { id: 14, title: 'Sun-Bleached Wardrobe', category: 'Storage', img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=1200' },
  { id: 15, title: 'Floating Oak Bookshelf', category: 'Storage', img: 'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?w=1200' },

  // BESPOKE
  { id: 16, title: 'Boutique Hotel Console', category: 'Bespoke', img: 'https://images.unsplash.com/photo-1505635330303-d3f8479ad395?w=1200' },
  { id: 17, title: 'Carved Royal Bed', category: 'Bespoke', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200' },
  { id: 18, title: 'Monolithic Stone Plinth', category: 'Bespoke', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200' },
  { id: 19, title: 'Velvet Headboard', category: 'Bespoke', img: 'https://images.unsplash.com/photo-1551298698-66b830a3f11c?w=1200' },

  // IRONWORK
  { id: 20, title: 'Forged Iron Base', category: 'Ironwork', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200' },
  { id: 21, title: 'Hammered Copper Sink', category: 'Ironwork', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200' },
  { id: 22, title: 'Sculptural Planter', category: 'Ironwork', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200' },
  { id: 23, title: 'Brass Chandelier', category: 'Ironwork', img: 'https://images.unsplash.com/photo-1542728928-1413eeae4d92?w=1200' }
];

const categories = ['All', 'Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Bespoke'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal top bar and first section
    const ctx = gsap.context(() => {
      gsap.to('.sticky-filter-bar', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'expo.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Filter products by category for specialized sections
  const chairs = productData.filter(p => p.category === 'Seating');
  const tables = productData.filter(p => p.category === 'Tables');
  const storage = productData.filter(p => p.category === 'Storage');
  const bespoke = productData.filter(p => p.category === 'Bespoke');
  const ironwork = productData.filter(p => p.category === 'Ironwork');

  return (
    <div ref={containerRef} className="premium-products-container">
      <Navbar />

      <header className="catalog-header-minimal" style={{ padding: '8rem 5% 4rem', background: 'var(--p-white)' }}>
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--p-accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
          Collection 2024
        </span>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', margin: 0, color: 'var(--p-text-main)', lineHeight: 1.1 }}>
          The Art of <br /> <i style={{ fontWeight: 400 }}>Modern Living.</i>
        </h1>
      </header>

      <div className="sticky-filter-bar" style={{ transform: 'translateY(-100%)', opacity: 0 }}>
        <div className="filter-group">
          {categories.slice(0, 5).map(cat => (
            <span
              key={cat}
              className={`filter-item ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-item"><Search size={20} /></span>
          <span className="filter-item"><ShoppingBag size={20} /></span>
        </div>
      </div>

      <main>
        <SliderSection title="Signature Seating" products={chairs} />
        <SliderSection title="Handcrafted Tables" products={tables} />
        <SliderSection title="Elegant Storage" products={storage} />
        <SliderSection title="Bespoke Collection" products={bespoke} />
        <SliderSection title="Artisan Ironwork" products={ironwork} />
      </main>

      <Footer />
    </div>
  );
}
