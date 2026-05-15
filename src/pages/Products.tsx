import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingBag } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SliderSection } from '../components/SliderSection';
import '../components/CarouselProducts.css';

import bed1 from '../assets/products/products/Bed1.webp';
import bed2 from '../assets/products/products/Bed2.webp';
import bed3 from '../assets/products/products/Bed3.webp';
import bed4 from '../assets/products/products/Bed4.webp';
import bed5 from '../assets/products/products/Bed5.webp';
import bed6 from '../assets/products/products/Bed6.webp';
import bed7 from '../assets/products/products/Bed7.webp';
import bed8 from '../assets/products/products/Bed8.webp';
import bed9 from '../assets/products/products/Bed9.webp';
import bed10 from '../assets/products/products/Bed10.webp';

import cab1 from '../assets/products/products/Cab1.webp';
import cab2 from '../assets/products/products/Cab2.webp';
import cab3 from '../assets/products/products/Cab3.webp';
import cab4 from '../assets/products/products/Cab4.webp';
import cab5 from '../assets/products/products/Cab5.webp';
import cab6 from '../assets/products/products/Cab6.webp';
import cab7 from '../assets/products/products/Cab7.webp';
import cab8 from '../assets/products/products/Cab8.webp';
import cab9 from '../assets/products/products/Cab9.webp';
import cab10 from '../assets/products/products/Cab10.webp';

import chair1 from '../assets/products/products/Chair1.webp';
import chair2 from '../assets/products/products/Chair2.webp';
import chair3 from '../assets/products/products/Chair3.webp';
import chair4 from '../assets/products/products/Chair4.webp';

import sml1 from '../assets/products/products/Sml1.webp';
import sml2 from '../assets/products/products/Sml2.webp';
import sml3 from '../assets/products/products/Sml3.webp';
import sml4 from '../assets/products/products/Sml4.webp';
import sml5 from '../assets/products/products/Sml5.webp';
import sml6 from '../assets/products/products/Sml6.webp';
import sml7 from '../assets/products/products/Sml7.webp';
import sml8 from '../assets/products/products/Sml8.webp';
import sml9 from '../assets/products/products/Sml9.webp';
import sml10 from '../assets/products/products/Sml10.webp';
import sml11 from '../assets/products/products/Sml11.webp';

import tab1 from '../assets/products/products/Tab1.webp';
import tab2 from '../assets/products/products/Tab2.webp';
import tab3 from '../assets/products/products/Tab3.webp';
import tab4 from '../assets/products/products/Tab4.webp';
import tab5 from '../assets/products/products/Tab5.webp';
import tab6 from '../assets/products/products/Tab6.webp';
import tab7 from '../assets/products/products/Tab7.webp';
import tab8 from '../assets/products/products/Tab8.webp';
import tab9 from '../assets/products/products/Tab9.webp';

import table1 from '../assets/products/products/Table1.webp';
import table2 from '../assets/products/products/Table2.webp';
import table3 from '../assets/products/products/Table3.webp';
import table4 from '../assets/products/products/Table4.webp';

import tipoi1 from '../assets/products/products/Tipoi1.webp';
import tipoi2 from '../assets/products/products/Tipoi2.webp';
import tipoi3 from '../assets/products/products/Tipoi3.webp';
import tipoi4 from '../assets/products/products/Tipoi4.webp';
import tipoi5 from '../assets/products/products/Tipoi5.webp';
import tipoi6 from '../assets/products/products/Tipoi6.webp';
import tipoi7 from '../assets/products/products/Tipoi7.webp';
import tipoi8 from '../assets/products/products/Tipoi8.webp';

import xyz1 from '../assets/products/products/Xyz1.webp';
import xyz2 from '../assets/products/products/Xyz2.webp';
import xyz3 from '../assets/products/products/Xyz3.webp';
import xyz4 from '../assets/products/products/Xyz4.webp';
import xyz5 from '../assets/products/products/Xyz5.webp';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  // SEATING
  { id: 1, title: 'Ergonomic Lounge Chair', category: 'Seating', img: chair1 },  { id: 2, title: 'Modern Minimalist Stool', category: 'Seating', img: chair2 },
  { id: 3, title: 'Premium Velvet Armchair', category: 'Seating', img: chair3 },
  { id: 4, title: 'Classic Nordic Seat', category: 'Seating', img: chair4 },

  // TABLES
  { id: 5, title: 'Executive Oak Desk', category: 'Tables', img: tab1 },
  { id: 6, title: 'Walnut Coffee Table', category: 'Tables', img: tab2 },
  { id: 7, title: 'Glass Top Side Table', category: 'Tables', img: tab3 },
  { id: 8, title: 'Reclaimed Wood Dining Table', category: 'Tables', img: tab4 },
  { id: 9, title: 'Industrial Metal Table', category: 'Tables', img: tab5 },
  { id: 10, title: 'Art Deco Console', category: 'Tables', img: tab6 },
  { id: 11, title: 'Marble Pedestal Table', category: 'Tables', img: tab7 },
  { id: 12, title: 'Minimalist Bistro Table', category: 'Tables', img: tab8 },
  { id: 13, title: 'Contemporary Work Station', category: 'Tables', img: tab9 },
  { id: 14, title: 'Grand Banquet Table', category: 'Tables', img: table1 },
  { id: 15, title: 'Oval Conference Table', category: 'Tables', img: table2 },
  { id: 16, title: 'Rustic Breakfast Table', category: 'Tables', img: table3 },
  { id: 17, title: 'Slim Entryway Table', category: 'Tables', img: table4 },
  { id: 18, title: 'Handcrafted Tipoi I', category: 'Tables', img: tipoi1 },
  { id: 19, title: 'Handcrafted Tipoi II', category: 'Tables', img: tipoi2 },
  { id: 20, title: 'Handcrafted Tipoi III', category: 'Tables', img: tipoi3 },
  { id: 21, title: 'Handcrafted Tipoi IV', category: 'Tables', img: tipoi4 },
  { id: 22, title: 'Handcrafted Tipoi V', category: 'Tables', img: tipoi5 },
  { id: 23, title: 'Handcrafted Tipoi VI', category: 'Tables', img: tipoi6 },
  { id: 24, title: 'Handcrafted Tipoi VII', category: 'Tables', img: tipoi7 },
  { id: 25, title: 'Handcrafted Tipoi VIII', category: 'Tables', img: tipoi8 },

  // STORAGE
  { id: 26, title: 'Modernist Sideboard', category: 'Storage', img: cab1 },
  { id: 27, title: 'Brushed Oak Credenza', category: 'Storage', img: cab2 },
  { id: 28, title: 'Industrial Utility Cabinet', category: 'Storage', img: cab3 },
  { id: 29, title: 'Glass Front Display Case', category: 'Storage', img: cab4 },
  { id: 30, title: 'Minimalist Wardrobe', category: 'Storage', img: cab5 },
  { id: 31, title: 'Tallboy Chest of Drawers', category: 'Storage', img: cab6 },
  { id: 32, title: 'Low-Profile TV Unit', category: 'Storage', img: cab7 },
  { id: 33, title: 'Modular Bookshelf System', category: 'Storage', img: cab8 },
  { id: 34, title: 'Aesthetic Pantry Storage', category: 'Storage', img: cab9 },
  { id: 35, title: 'Compact Nightstand', category: 'Storage', img: cab10 },

  // BEDS
  { id: 36, title: 'Royal Master Bed', category: 'Beds', img: bed1 },
  { id: 37, title: 'Contemporary Platform Bed', category: 'Beds', img: bed2 },
  { id: 38, title: 'Upholstered King Frame', category: 'Beds', img: bed3 },
  { id: 39, title: 'Minimalist Queen Base', category: 'Beds', img: bed4 },
  { id: 40, title: 'Artisan Carved Headboard', category: 'Beds', img: bed5 },
  { id: 41, title: 'Luxury Suite Bed', category: 'Beds', img: bed6 },
  { id: 42, title: 'Sleek Modern Bedframe', category: 'Beds', img: bed7 },
  { id: 43, title: 'Traditional Wood Bed', category: 'Beds', img: bed8 },
  { id: 44, title: 'Compact Guest Bed', category: 'Beds', img: bed9 },
  { id: 45, title: 'Premium Comfort Base', category: 'Beds', img: bed10 },

  // BESPOKE
  { id: 46, title: 'Custom Accent Piece I', category: 'Bespoke', img: sml1 },
  { id: 47, title: 'Custom Accent Piece II', category: 'Bespoke', img: sml2 },
  { id: 48, title: 'Custom Accent Piece III', category: 'Bespoke', img: sml3 },
  { id: 49, title: 'Custom Accent Piece IV', category: 'Bespoke', img: sml4 },
  { id: 50, title: 'Custom Accent Piece V', category: 'Bespoke', img: sml5 },
  { id: 51, title: 'Custom Accent Piece VI', category: 'Bespoke', img: sml6 },
  { id: 52, title: 'Custom Accent Piece VII', category: 'Bespoke', img: sml7 },
  { id: 53, title: 'Custom Accent Piece VIII', category: 'Bespoke', img: sml8 },
  { id: 54, title: 'Custom Accent Piece IX', category: 'Bespoke', img: sml9 },
  { id: 55, title: 'Custom Accent Piece X', category: 'Bespoke', img: sml10 },
  { id: 56, title: 'Custom Accent Piece XI', category: 'Bespoke', img: sml11 },

  // IRONWORK
  { id: 57, title: 'Forged Iron Sculpture I', category: 'Ironwork', img: xyz1 },
  { id: 58, title: 'Forged Iron Sculpture II', category: 'Ironwork', img: xyz2 },
  { id: 59, title: 'Forged Iron Sculpture III', category: 'Ironwork', img: xyz3 },
  { id: 60, title: 'Forged Iron Sculpture IV', category: 'Ironwork', img: xyz4 },
  { id: 61, title: 'Forged Iron Sculpture V', category: 'Ironwork', img: xyz5 },
];

const categories = ['All', 'Seating', 'Tables', 'Beds', 'Storage', 'Bespoke', 'Ironwork'];

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
  const beds = productData.filter(p => p.category === 'Beds');
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
          {categories.map(cat => (
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
        {(activeFilter === 'All' || activeFilter === 'Seating') && chairs.length > 0 && (
          <SliderSection title="Signature Seating" products={chairs} />
        )}
        {(activeFilter === 'All' || activeFilter === 'Tables') && tables.length > 0 && (
          <SliderSection title="Handcrafted Tables" products={tables} />
        )}
        {(activeFilter === 'All' || activeFilter === 'Storage') && storage.length > 0 && (
          <SliderSection title="Elegant Storage" products={storage} />
        )}
        {(activeFilter === 'All' || activeFilter === 'Beds') && beds.length > 0 && (
          <SliderSection title="Luxury Beds" products={beds} />
        )}
        {(activeFilter === 'All' || activeFilter === 'Bespoke') && bespoke.length > 0 && (
          <SliderSection title="Bespoke Collection" products={bespoke} />
        )}
        {(activeFilter === 'All' || activeFilter === 'Ironwork') && ironwork.length > 0 && (
          <SliderSection title="Artisan Ironwork" products={ironwork} />
        )}
      </main>

      <Footer />
    </div>
  );
}
