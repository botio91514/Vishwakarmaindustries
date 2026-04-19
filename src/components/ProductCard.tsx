import React from 'react';
import { Maximize2 } from 'lucide-react';

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, category, image }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={image} alt={name} loading="lazy" />
        
        <div className="product-overlay">
          <button className="overlay-btn primary">
            <Maximize2 size={16} style={{ marginRight: '8px' }} />
            View Detail
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-category-label">{category}</span>
        <h3 className="product-name">{name}</h3>
      </div>
    </div>
  );
};
