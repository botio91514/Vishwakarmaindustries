import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  { id: 1, title: 'Obsidian Desk', category: 'Executive', price: '$12,500', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80' },
  { id: 2, title: 'Velvet Horizon', category: 'Lounge', price: '$4,800', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80' },
  { id: 3, title: 'Ivory Monolith', category: 'Dining', price: '$18,900', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80' },
  { id: 4, title: 'Imperial Canopy', category: 'Rest', price: '$22,000', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' },
  { id: 5, title: 'Marble Plinth', category: 'Bespoke', price: '$3,200', img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80' },
  { id: 6, title: 'Nordic Studio', category: 'Modern', price: '$7,500', img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80' },
  { id: 7, title: 'Aeon Lounge', category: 'Lounge', price: '$5,900', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80' },
  { id: 8, title: 'Classic Bureau', category: 'Executive', price: '$9,800', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80' }
];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProducts(productData);
    } else {
      setFilteredProducts(productData.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Reveal
      gsap.from('.gallery-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });

      // 2. Filters Entrance
      gsap.from('.filter-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });

      // 3. Product Cards Reveal
      gsap.from('.p-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.product-master-grid',
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProducts]); // Re-animate when filtered

  return (
    <div ref={containerRef} className="products-page">
      <Navbar />

      <main>
        {/* Gallery Header */}
        <section className="gallery-header">
          <h1 className="gallery-title">The Masterwork <em>Collection</em></h1>
          <div className="gallery-filters">
            {['All', 'Executive', 'Lounge', 'Dining', 'Rest', 'Bespoke'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Master Grid */}
        <div className="product-master-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="p-card">
              <div className="p-img-wrap">
                <img src={product.img} alt={product.title} className="p-img" />
                <div className="p-overlay">
                  <button className="p-view-btn magnetic">Inquire Privately</button>
                </div>
              </div>
              <div className="p-info">
                <span className="p-cat">{product.category}</span>
                <h2 className="p-title">{product.title}</h2>
                <span className="p-price">Starting from {product.price}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
