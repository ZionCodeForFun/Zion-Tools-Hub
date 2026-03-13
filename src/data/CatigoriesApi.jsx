import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";
export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, name, slug, icon, display_order")
          .order("display_order", { ascending: true });

        if (error) throw error;

        setCategories(
          data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            icon: cat.icon || "📦",
          
          })),
        );
      } catch (err) {
        setErrorCategories(err.message || "Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loadingCategories, errorCategories };
}
