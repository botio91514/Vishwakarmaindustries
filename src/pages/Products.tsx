import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingBag } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SliderSection } from '../components/SliderSection';
import '../components/CarouselProducts.css';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  // SEATING
  { id: 1, title: 'Urbane Leather Sofa', category: 'Seating', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80' },
  { id: 2, title: 'Mid-Century Armchair', category: 'Seating', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200' },
  { id: 3, title: 'Rattan Lounge Chair', category: 'Seating', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200' },
  { id: 4, title: 'Midnight Velvet Chair', category: 'Seating', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200' },
  { id: 5, title: 'Hand-Knotted Stool', category: 'Seating', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200' },

  // TABLES
  { id: 6, title: 'Live Edge Walnut Table', category: 'Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200' },
  { id: 7, title: 'Circular Marble Table', category: 'Tables', img: 'https://images.unsplash.com/photo-1577145716161-042861c8a164?w=1200' },
  { id: 8, title: 'Brutalist Coffee Table', category: 'Tables', img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200' },
  { id: 9, title: 'Ash Writing Desk', category: 'Tables', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200' },
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
