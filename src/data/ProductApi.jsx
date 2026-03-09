import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        // Fetch products with related images and categories
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            price,
            location,
            condition,
            free_delivery,
            created_at,
            category_id,
            categories (id, name, slug),
            product_images (id, product_id, image_url),
            product_specifications (*)
          `,
          )
          .order("created_at", { ascending: false });

        if (productsError) throw productsError;

        // Format products to match UI expectations
        const formattedProducts = productsData.map((product) => {
          // Transform specifications to object
          const specifications = {};
          product.product_specifications?.forEach(spec => {
            specifications[spec.key] = spec.value;
          });

          return {
            id: product.id,
            name: product.name,
            price: `₦${product.price.toLocaleString()}`,
            location: product.location,
            condition: product.condition,
            free_delivery: product.free_delivery,
            created_at: product.created_at,
            category: product.categories?.slug || "",
            images: product.product_images?.map((img) => img.image_url) || [],
            specifications: specifications,
          };
        });

        setProducts(formattedProducts);
      } catch (err) {
        setErrorProducts(err.message || "Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loadingProducts, errorProducts };
}
