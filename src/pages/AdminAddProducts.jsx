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
    <div>
      <div className="mb-4">
        <Link to="/admin/productlist" className="underline text-gray-500">
          &larr; Go Back
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-semibold">Add Product</h1>

      <div className="flex w-full gap-10">
      <div className="bg-white border rounded-lg shadow relative mt-10 w-1/2">
        <div className="p-6 space-y-6">
          <form onSubmit={insertProduct}>
            <div className="flex flex-col">
              <div className="">
                <label
                  htmlFor="product-link"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Link
                </label>
                <input
                  type="text"
                  name="product-link"
                  id="product-link"
                  value={productLink}
                  onChange={(e) => {
                    setProductLink(e.target.value);
                    handleImageFetch(e.target.value); 
                  }}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="https://www.daraz.com.np/sample-product"
                  required
                />
              </div>
              <div className=" mt-4">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>
                <select
                  name="category"
                  onChange={(e)=>setCategoryId(e.target.value)}
                  id="category"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
            </div>
        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            className="hover:cursor-pointer text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Add
          </button>
        </div>
          </form>

         
          
        </div>

      </div>
      <div className="mt-10">
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
