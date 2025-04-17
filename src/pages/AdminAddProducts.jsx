import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../API";

const AdminAddProducts = () => {
  const [categories, setCategory] = useState([]);
  const [productLink, setProductLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    API.get("/api/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err.message);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const insertProduct = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", categoryId);
    data.append("image", image);
    data.append("product_link", productLink);

    API.post("/api/products", data)
      .then((res) => {
        if (res.data.success) {
          alert("Product Added Successfully");
          setCategoryId("");
          setProductLink("");
          setImage(null);
          setImagePreview(null);
        } else {
          alert("Cannot Add Product");
        }
      })
      .catch((err) => {
        console.error("Product upload failed:", err);
      });
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
                onChange={(e) => setProductLink(e.target.value)}
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
                value={categoryId}
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

            <div>
              <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2.5 border rounded-lg bg-gray-50 shadow-sm text-gray-900"
                required
              />
            </div>

            <button
              className="w-full md:w-auto px-5 py-2.5 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Image Preview Section */}
        <div className="flex flex-col items-center justify-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />
          ) : (
            <p className="text-gray-500">Image preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;
