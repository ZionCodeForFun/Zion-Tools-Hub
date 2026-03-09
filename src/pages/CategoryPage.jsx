import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import BackToHome from "../components/BackToHome";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import Section from "../components/Section";
import EmptyState from "../components/EmptyState";
import useProducts from "../data/ProductApi";
import useCategories from "../data/CatigoriesApi";
import Spinner from "../components/Spinner";
import { useSearch } from "../context/SearchContext";
import "../styles/landing.css"; // reuse landing layout styles

export default function CategoryPage() {
  const { slug } = useParams();
  const { searchQuery } = useSearch();
  const { products, loadingProducts } = useProducts();
  const { categories, loadingCategories } = useCategories();

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

  if (loadingProducts || loadingCategories) {
    return <Spinner />;
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
          <EmptyState
            messageTitle="No products found"
            messageDescription="We couldn't find this tool right now."
            whatsappMessage={
              searchQuery
                ? `Hello, I'm looking for ${searchQuery} in the ${category?.name || slug} category but couldn't find any. Please can you help?`
                : `I'm looking for tools in the ${category?.name || slug} category but couldn't find any available.`
            }
          />
        )}
      </Section>

      <Footer />
    </div>
  );
}
