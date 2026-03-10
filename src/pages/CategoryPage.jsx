import React, { useState, useRef, useEffect } from "react";
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
import "../styles/landing.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const { searchQuery } = useSearch();
  const { products, loadingProducts } = useProducts();
  const { categories, loadingCategories } = useCategories();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const sectionRef = useRef(null);

  const category = categories.find((c) => c.slug === slug);

  let filteredProducts = products.filter((p) => p.category === slug);

  // Apply search filter on top of category filter
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug, searchQuery]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loadingProducts || loadingCategories) {
    return <Spinner />;
  }

  return (
    <div className="category-page">
      <Navbar />
      <BackToHome />
      <SearchBar />

      <div ref={sectionRef}>
        <Section
          title={
            searchQuery
              ? `${category?.name || slug} - Search Results`
              : category?.name || slug
          }
        >
          {filteredProducts.length > 0 ? (
            <>
              <ProductGrid products={currentProducts} />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`pagination-number ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              messageTitle="No products found"
              messageDescription="We couldn't find this tool right now."
              whatsappMessage={
                searchQuery
                  ? `Hello, I'm looking for ${searchQuery} in the ${
                      category?.name || slug
                    } category but couldn't find any. Please can you help?`
                  : `I'm looking for tools in the ${
                      category?.name || slug
                    } category but couldn't find any available.`
              }
            />
          )}
        </Section>
      </div>

      <Footer />
    </div>
  );
}