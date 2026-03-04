import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import BackToHome from "../components/BackToHome";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import Section from "../components/Section";
import { products, categories } from "../data/MockData";
import { useSearch } from "../context/SearchContext";
import "../styles/landing.css"; // reuse landing layout styles

export default function CategoryPage() {
  const { slug } = useParams();
  const { searchQuery } = useSearch();
  const category = categories.find((c) => c.slug === slug);

  let filteredProducts = products.filter((p) => p.category === slug);

  // Apply search filter on top of category filter
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  return (
    <div className="category-page">
      <Navbar />
      <BackToHome />
      <SearchBar />

      <Section
        title={
          searchQuery
            ? `${category?.name || slug} - Search Results`
            : category?.name || slug
        }
      >
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="empty-message">
            {searchQuery
              ? "No products found matching your search in this category."
              : "No products found in this category."}
          </p>
        )}
      </Section>

      <Footer />
    </div>
  );
}
