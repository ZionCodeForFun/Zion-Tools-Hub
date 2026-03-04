import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";

const App = () => {
  return (
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage/> } />
              <Route path="/category/:slug" element={<CategoryPage />} />
            </Route>
          </Routes>
          <ScrollToTop />
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  );
};

export default App;
