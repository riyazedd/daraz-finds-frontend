import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../API';

const AdminAddCategory = () => {
    const [categoryName,setCategoryName]=useState('');

    const insertCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post( '/api/category', [{ name: categoryName }]);
            
            if (response.data.success) {
                alert('Category Added Successfully!');
                setCategoryName('');
            } else {
                alert('Error Adding Category');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };
    
  return (
    <div>
      <div className="mb-4">
        <Link to="/admin/categorylist" className="underline text-gray-500">
          &larr; Go Back
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-semibold">Add Category</h1>

      <div className="flex w-full gap-10">
      <div className="bg-white border rounded-lg shadow relative mt-10 w-1/2">
        <div className="p-6 space-y-6">
          <form onSubmit={insertCategory}>
            <div className="flex flex-col">
              <div className="">
                <label
                  htmlFor="product-link"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="product-link"
                  id="product-link"
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
            className="hover:cursor-pointer text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Add
          </button>
        </div>
          </form>

         
          
        </div>

      </div>
      </div>
    </div>
  )
}

export default AdminAddCategory
