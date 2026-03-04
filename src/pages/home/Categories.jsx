import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/MockData";
import "../../styles/categories.css";

export default function Categories() {
  return (
    <div className="categories-container">
      <div className="categories-scroll">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="category-card"
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
