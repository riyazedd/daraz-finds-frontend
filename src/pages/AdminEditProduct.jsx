import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../API";
import { fetchImage } from "../utils/productImage.js"; // ✅ Import utility function

const AdminEditProduct = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategory] = useState([]);
  const [productLink, setProductLink] = useState("");
  const [imageUrl, setImageUrl] = useState("/sampleProduct.jpg");
  const [categoryId,setCategoryId]=useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details
    API.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setProductLink(res.data.product_link);
      setCategoryId(res.data.category);  // ✅ Set category ID from fetched product
    });
  
    // Fetch categories
    API.get("/api/category").then((res) => {
      setCategory(res.data);
    });
  }, [id]);
  

  useEffect(() => {
   
    if (productLink) {
      handleImageFetch(productLink);
    }
  }, [productLink]); 

  const handleImageFetch = async (link) => {
    if (!link) return;
    setLoading(true);
    setError(null);

    const { imageUrl, error } = await fetchImage(link);
    if (error) {
      setError(error);
      setImageUrl("/sampleProduct.jpg"); 
    } else {
      setImageUrl(imageUrl);
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await API.put(
        `/api/products/${id}`,
        {
          product_link: productLink,
          category: categoryId
        },
        {
          headers: { "Content-Type": "application/json" } 
        }
      );
  
      if (response.data.success) {
        alert("Product Updated Successfully!");
        setProductLink("");
        setCategoryId("");
        setImageUrl("/sampleProduct.jpg");
        navigate('/admin/productlist');

      } else {
        alert("Cannot Update product!");
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

      <h1 className="md:text-3xl text-2xl font-semibold">Edit Product Details</h1>

      <div className="flex w-full gap-10">
        <div className="bg-white border rounded-lg shadow relative mt-10 w-1/2">
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
              </div>
          <div className="p-6 border-t border-gray-200 rounded-b">
            <button
              className="hover:cursor-pointer text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Save Changes
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
            <img
              src={imageUrl}
              alt="Product"
              className="w-40 h-40 object-cover rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
