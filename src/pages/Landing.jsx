import React from "react";
import Navbar from "../components/NavBar";
import BackToHome from "../components/BackToHome";
import SearchBar from "../components/SearchBar";
import Hero from "./home/Hero";
import Categories from "./home/Categories";
import Section from "../components/Section";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import FloatingWhatsApp from "./home/FloatingWhatsApp";
import { products } from "../data/MockData";
import { useSearch } from "../context/SearchContext";
import "../styles/landing.css";

const Landing = () => {
  const { searchQuery } = useSearch();

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : products;

  const recentlyAdded = filteredProducts
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const popularTools = filteredProducts.filter(
    (product) => product.is_featured,
  );

  return (
    <div className="landing">
      <Navbar />
      <BackToHome />
      <SearchBar />
      {!searchQuery && <Hero />}

      {!searchQuery && (
        <Section title="Browse Categories">
          <Categories />
        </Section>
      )}

      <Section title={searchQuery ? "Search Results" : "Recently Added"}>
        {recentlyAdded.length > 0 ? (
          <ProductGrid products={recentlyAdded} />
        ) : (
          <p className="empty-message">
            {searchQuery
              ? "No tools found matching your search."
              : "No products found."}
          </p>
        )}
      </Section>

      {!searchQuery && (
        <Section title="Popular Tools">
          <ProductGrid products={popularTools} />
        </Section>
      )}

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
export default Landing;
