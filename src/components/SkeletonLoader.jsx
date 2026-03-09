import React from "react";
import "../styles/skeleton.css";

export default function SkeletonLoader({ type = "card", count = 1 }) {
  if (type === "categories") {
    return (
      <div className="categories-skeleton">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="category-skeleton-card">
            <div className="category-skeleton-icon"></div>
            <div className="category-skeleton-name"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="dashboard-skeleton">
        <div className="dashboard-skeleton-header"></div>
        <div className="dashboard-skeleton-content">
          <div className="dashboard-skeleton-sidebar"></div>
          <div className="dashboard-skeleton-main">
            <div className="dashboard-skeleton-title"></div>
            <div className="dashboard-skeleton-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="dashboard-skeleton-card">
                  <div className="dashboard-skeleton-image"></div>
                  <div className="dashboard-skeleton-text"></div>
                  <div className="dashboard-skeleton-text short"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  );
}