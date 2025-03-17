import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import { fetchImage } from "../utils/productImage.js"; // ✅ Import utility function

const AdminAddProducts = () => {
  const [categories, setCategory] = useState([]);
  const [productLink, setProductLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("/sampleProduct.jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      API.get("/api/category").then((res) => {
        setCategory(res.data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const handleImageFetch = async (link) => {
    if (!link) return;
    setLoading(true);
    setError(null);

    const { imageUrl, error } = await fetchImage(link);
    if (error) {
      setError(error);
      setImageUrl("sampleProduct.jpg"); // Fallback image
    } else {
      setImageUrl(imageUrl);
    }

    setLoading(false);
  };

  const insertProduct = async (e) => {
    e.preventDefault();
  
    try {
      const response = await API.post(
        "/api/products",
        {
          product_link: productLink,
          category: categoryId
        },
        {
          headers: { "Content-Type": "application/json" } 
        }
      );
  
      if (response.data.success) {
        alert("Product Added Successfully!");
        setProductLink("");
        setCategoryId("");
        setImageUrl("/sampleProduct.jpg");
      } else {
        alert("Cannot add product!");
      }
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      alert("Error adding product: " + err.response?.data?.message || err.message);
    }
  };
  
  return (
    <div className="p-4 md:p-8">
      {/* Back Link */}
      <div className="mb-4">
        <Link to="/admin/productlist" className="underline text-gray-500">
          &larr; Go Back
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-semibold mb-4">Add Product</h1>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Form Section */}
        <div className="bg-white border rounded-lg shadow p-6 w-full md:w-1/2">
          <form onSubmit={insertProduct} className="space-y-6">
            <div>
              <label htmlFor="product-link" className="text-sm font-medium text-gray-900 block mb-2">
                Product Link
              </label>
              <input
                type="text"
                id="product-link"
                value={productLink}
                onChange={(e) => {
                  setProductLink(e.target.value);
                  handleImageFetch(e.target.value);
                }}
                className="w-full p-2.5 border rounded-lg bg-gray-50 shadow-sm text-gray-900"
                placeholder="https://www.daraz.com.np/sample-product"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">
                Category
              </label>
              <select
                id="category"
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-gray-50 shadow-sm text-gray-900"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-full md:w-auto px-5 py-2.5 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex flex-col items-center">
          {loading ? (
            <p className="text-gray-500">Loading image...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <img src={imageUrl} alt="Product" className="w-40 h-40 object-cover rounded-md" />
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminAddProducts;
