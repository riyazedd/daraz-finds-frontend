import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../API';

const AdminEditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    API.get(`/api/category/${id}`).then((res) => {
      setCategoryName(res.data.name);
    });
  }, [id]);

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/api/category/${id}`, { name: categoryName });

      if (response.data.success) {
        alert('Category updated Successfully!');
        setCategoryName('');
        navigate('/admin/categorylist');
      } else {
        alert('Error Adding Category');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Link to="/admin/categorylist" className="underline text-gray-500">
          &larr; Go Back
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-semibold text-center md:text-left">
        Edit Category
      </h1>

      <div className="flex flex-col items-center md:items-start w-full gap-10">
        <div className="bg-white border rounded-lg shadow relative mt-10 w-full md:w-1/2">
          <div className="p-6 space-y-6">
            <form onSubmit={updateCategory}>
              <div className="flex flex-col">
                <div>
                  <label
                    htmlFor="category-name"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="category-name"
                    id="category-name"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Dashain Sale"
                    required
                  />
                </div>
              </div>
              <div className="mt-5 border-gray-200 rounded-b">
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
      </div>
    </div>
  );
};

export default AdminEditCategory;
