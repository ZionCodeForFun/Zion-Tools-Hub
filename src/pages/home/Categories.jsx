import React from 'react';
import { categories } from '../../data/MockData';
import '../../styles/categories.css';

export default function Categories() {
  return (
    <div className="categories-container">
      <div className="categories-scroll">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
