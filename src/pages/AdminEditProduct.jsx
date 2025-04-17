import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../API";

const AdminEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategory] = useState([]);
  const [productLink, setProductLink] = useState("");
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null); // New state to hold the image
  const [imagePreview, setImagePreview] = useState(null); // Preview of the image

  useEffect(() => {
    // Fetch product details
    API.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setProductLink(res.data.product_link);
      setCategoryId(res.data.category);  // ✅ Set category ID from fetched product
      setImagePreview(res.data.image);  // Set existing product image for preview
    });

    // Fetch categories
    API.get("/api/category").then((res) => {
      setCategory(res.data);
    });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview image when file is selected
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_link", productLink);
    formData.append("category", categoryId);

    // Append image if exists
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await API.put(`/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Product Updated Successfully!");
        setProductLink("");
        setCategoryId("");
        setImage(null); // Reset image
        setImagePreview(null); // Reset preview
        navigate("/admin/productlist");
      } else {
        alert("Cannot Update product!");
      }
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err.message);
      alert("Error updating product: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Link to="/admin/productlist" className="underline text-gray-500">
          &larr; Go Back
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-semibold text-center md:text-left">
        Edit Product Details
      </h1>

      <div className="flex flex-col md:flex-row w-full gap-10">
        <div className="bg-white border rounded-lg shadow relative mt-10 w-full md:w-1/2">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div>
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
                    onChange={(e) => setProductLink(e.target.value)} // Directly update productLink
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="https://www.daraz.com.np/sample-product"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required
                    value={categoryId}  // ✅ Use categoryId instead of product.category
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 rounded-b">
                <button
                  className="hover:cursor-pointer text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full md:w-auto"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-40 h-40 object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
