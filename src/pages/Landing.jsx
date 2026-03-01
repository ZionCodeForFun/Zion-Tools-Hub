import React from "react";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Hero from "./home/Hero";
import Categories from "./home/Categories";
import Section from "../components/Section";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import FloatingWhatsApp from "./home/FloatingWhatsApp";
import { products } from "../data/MockData";
import "../styles/landing.css";

const Landing = () => {
  const recentlyAdded = products
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const popularTools = products.filter((product) => product.is_featured);

  return (

      <div className="landing">
        <Navbar />
        <SearchBar />
        <Hero />

        <Section title="Browse Categories">
          <Categories />
        </Section>

        <Section title="Recently Added">
          <ProductGrid products={recentlyAdded} />
        </Section>

        <Section title="Popular Tools">
          <ProductGrid products={popularTools} />
        </Section>

        <Footer />
        <FloatingWhatsApp />
      </div>

  );
};
export default Landing;
