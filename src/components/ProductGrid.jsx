import React from 'react';
import ProductCard from './ProductCard';
import '../styles/productGrid.css';

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
