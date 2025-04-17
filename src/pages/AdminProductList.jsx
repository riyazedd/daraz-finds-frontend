import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; 

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  // const [images, setImages] = useState({});

  useEffect(() => {
    try {
      API.get("/api/products").then((res) => {
        setProducts(res.data);
      });

      API.get("/api/category").then((res) => {
        setCategory(res.data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

 

  const getCategoryName = (catId) => {
    const category = categories.find((cat) => cat._id === catId);
    return category ? category.name : "Unknown";
  };

  const remove = (id) => {
    confirm("Do you want to delete this product?")
    try {
      API.delete(`/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      alert('Product Deleted Successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link to="/admin/addproducts">
						<button title="Add Products" className="hover:cursor-pointer flex items-center gap-2 p-3 rounded bg-green-500 text-white">
							<FaPlus /> Add Products
						</button>
					</Link>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                      <img
                        src={product.image}
                        alt="product"
                        className="w-10 h-10 object-cover"
                      />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                    <a
                      href={product.product_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {product.product_link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/editproduct/${product._id}`}>
                      <button className="text-white bg-blue-600 p-2 rounded-md hover:bg-blue-500">
                        <FaEdit />
                      </button>
                    </Link>
                    <button onClick={()=>remove(product._id)} className="ml-2 text-white bg-red-600 p-2 rounded-md hover:bg-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProductList;
