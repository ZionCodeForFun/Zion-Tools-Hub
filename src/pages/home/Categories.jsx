import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../data/CatigoriesApi";
import SkeletonLoader from "../../components/SkeletonLoader";
import "../../styles/categories.css";

export default function Categories() {
  const { categories, loadingCategories, errorCategories } = useCategories();

  if (loadingCategories) {
    return <SkeletonLoader type="categories" />;
  }

  if (errorCategories) {
    return <div className="categories-error">Error: {errorCategories}</div>;
  }

  if (categories.length === 0) {
    return <div className="categories-empty">No categories available</div>;
  }

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
