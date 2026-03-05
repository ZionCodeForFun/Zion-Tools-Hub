import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import "../styles/productGrid.css";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        messageTitle="No products available"
        messageDescription="We couldn't find any tools right now."
        whatsappMessage={
          "Hello, I'm looking for products on Zion Tools Hub but none are available. Please can you assist?"
        }
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
