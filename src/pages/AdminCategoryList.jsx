import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminCategoryList = () => {
    const [categories,setCategory]=useState([]);

    useEffect(()=>{
        try{
            API.get( '/api/category').then(res=>{
                setCategory(res.data)
            })
        }catch(err){
            console.error(err.message)
        }
    },[])

    const remove = (id) => {
        confirm("Do you want to delete this category?")
        try {
          API.delete(`/api/category/${id}`);
          setCategory(categories.filter(category => category._id !== id));
          alert('Category Deleted Successfully');
        } catch (err) {
          console.error(err);
        }
      };
	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">All Categories</h1>
				<Link to="/admin/addcategory">
					<button
						title="Add categorys"
						className="hover:cursor-pointer flex items-center gap-2 p-3 rounded bg-green-500 text-white"
					>
						<FaPlus /> Add Category
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
								Category Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{categories.length > 0 ? (
							categories.map((category) => (
								<tr key={category._id}>
									<td className="px-6 py-4 whitespace-nowrap">{category._id}</td>
									
									<td className="px-6 py-4 whitespace-nowrap">
										{category.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<Link to={`/admin/editcategory/${category._id}`}>
											<button className="text-white bg-blue-600 p-2 rounded-md hover:bg-blue-500">
												<FaEdit />
											</button>
										</Link>
										<button
											onClick={() => remove(category._id)}
											className="ml-2 text-white bg-red-600 p-2 rounded-md hover:bg-red-500"
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="8" className="text-center py-4 text-gray-500">
									No categories found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AdminCategoryList;
