import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../adminStyles/AdminProductForm.css";

export default function AdminProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    condition: "New",
    location: "",
    description: "",
    free_delivery: false,
    images: [],
    specifications: [{ key: "", value: "" }],
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) setError("Failed to fetch categories: " + error.message);
    else setCategories(data);
  };

  // Fetch products with images and specifications
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (*),
        product_specifications (*)
      `);
    if (error) setError("Failed to fetch products: " + error.message);
    else setProducts(data);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  // Remove image from formData
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Specifications handlers
  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    });
  };

  const updateSpecification = (index, field, value) => {
    const newSpecs = formData.specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    setFormData({ ...formData, specifications: newSpecs });
  };

  const removeSpecification = (index) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs });
  };

  // Upload image and return public URL
  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Upload new images if needed
      const imageUrls = await Promise.all(
        formData.images.map(async (img) => {
          if (typeof img === "string") return img;
          return await uploadImage(img);
        })
      );

      const slug =
        formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category_id: formData.category,
        slug,
        condition: formData.condition,
        location: formData.location,
        description: formData.description,
        free_delivery: formData.free_delivery,
      };

      let productId;

      if (editingId) {
        // Update product
        const { data, error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId)
          .select();

        if (error) throw error;
        productId = editingId;

        // Delete old images & specs
        await supabase.from("product_images").delete().eq("product_id", editingId);
        await supabase
          .from("product_specifications")
          .delete()
          .eq("product_id", editingId);
      } else {
        // Insert new product
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select();
        if (error) throw error;
        productId = data[0].id;
      }

      // Insert images
      const imageInserts = imageUrls.map((url) => ({
        product_id: productId,
        image_url: url,
      }));
      const { error: imageError } = await supabase
        .from("product_images")
        .insert(imageInserts);
      if (imageError) throw imageError;

      // Insert specifications
      const specInserts = formData.specifications
        .filter((spec) => spec.key && spec.value)
        .map((spec) => ({
          product_id: productId,
          key: spec.key,
          value: spec.value,
        }));
      const { error: specError } = await supabase
        .from("product_specifications")
        .insert(specInserts);
      if (specError) throw specError;

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        condition: "New",
        location: "",
        description: "",
        free_delivery: false,
        images: [],
        specifications: [{ key: "", value: "" }],
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.log("FULL ERROR:", err);
      setError("Failed to save product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category_id,
      condition: product.condition,
      location: product.location,
      description: product.description || "",
      free_delivery: product.free_delivery,
      images: product.product_images.map((img) => img.image_url),
      specifications: product.product_specifications.map((spec) => ({
        key: spec.key,
        value: spec.value,
      })),
    });
    setEditingId(product.id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminproductform-container">
      <h1 className="adminproductform-title">
        {editingId ? "Edit Product" : "Add New Product"}
      </h1>
      {error && <div className="adminproductform-error">{error}</div>}
      <form className="adminproductform-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="adminproductform-input"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="adminproductform-input"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          className="adminproductform-select"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="condition"
          className="adminproductform-select"
          value={formData.condition}
          onChange={handleInputChange}
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="adminproductform-input"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          className="adminproductform-textarea"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
        />
        <label className="adminproductform-checkbox">
          <input
            type="checkbox"
            name="free_delivery"
            checked={formData.free_delivery}
            onChange={handleInputChange}
          />
          Free Delivery
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="adminproductform-file"
        />

        {/* Image previews */}
        <div className="adminproductform-image-preview">
          {formData.images.map((image, index) => (
            <div key={index} className="adminproductform-image-item">
              <img
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="adminproductform-image-thumb"
              />
              <button
                type="button"
                className="adminproductform-image-remove"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Specifications */}
        <div className="adminproductform-specifications">
          <h3>Specifications</h3>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="adminproductform-spec-row">
              <input
                type="text"
                placeholder="Key"
                value={spec.key}
                onChange={(e) => updateSpecification(index, "key", e.target.value)}
                className="adminproductform-spec-input"
              />
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                className="adminproductform-spec-input"
              />
              <button
                type="button"
                className="adminproductform-spec-remove"
                onClick={() => removeSpecification(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="adminproductform-spec-add"
            onClick={addSpecification}
          >
            Add Specification
          </button>
        </div>

        <button type="submit" className="adminproductform-submit" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product list */}
      <div className="adminproductform-products">
        <h2>All Products</h2>
        <div className="adminproductform-product-grid">
          {products.map((product) => (
            <div key={product.id} className="adminproductform-card">
              <div className="adminproductform-card-images">
                {product.product_images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.image_url}
                    alt={product.name}
                    className="adminproductform-card-image"
                  />
                ))}
              </div>
              <div className="adminproductform-card-content">
                <h3 className="adminproductform-card-title">{product.name}</h3>
                <p className="adminproductform-card-price">₦{product.price}</p>
                <p className="adminproductform-card-category">{product.category_id}</p>
                <p className="adminproductform-card-location">{product.location}</p>
                {product.free_delivery && (
                  <span className="adminproductform-card-badge">Free Delivery</span>
                )}
                <span className="adminproductform-card-condition">{product.condition}</span>

                {/* Show description */}
                <p className="adminproductform-card-description">{product.description}</p>

                {/* Show specifications */}
                {product.product_specifications.length > 0 && (
                  <ul className="adminproductform-card-specs">
                    {product.product_specifications.map((spec, idx) => (
                      <li key={idx}>
                        <strong>{spec.key}:</strong> {spec.value}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="adminproductform-card-actions">
                  <button
                    className="adminproductform-card-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="adminproductform-card-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}