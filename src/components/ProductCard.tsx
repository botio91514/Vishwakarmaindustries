import React from 'react';

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
      </div>
      
      <div className="product-info">
        <span className="product-category-label">{category}</span>
        <h3 className="product-name">{name}</h3>
      </div>
    </div>
  );
};
