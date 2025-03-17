import React, { useState, useEffect } from "react";
import API from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminEditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            if (!token) {
                console.error("No token found.");
                setMessage("Unauthorized: Please log in again.");
                return;
            }

            const { data } = await API.get("/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            setUser({
                username: data.username,
                email: data.email,
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setMessage("Failed to load profile.");
        }
    };

    fetchUserProfile();
}, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to save the changes?");
        if (!isConfirmed) return;

        try {
            await API.put(
                "/api/users/editprofile",
                { username: user.username, email: user.email, password: user.password },
                { withCredentials: true }
            );

            toast.success("Profile updated successfully.");
            navigate("/admin/productlist");

        } catch (error) {
            console.error("Update error:", error);
            setMessage("Error updating profile.");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
                <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">Update Profile</h2>
                {message && <p className="text-center text-red-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-indigo-900 font-semibold mb-2">Username</label>
                        <input 
                            type="text" name="username" value={user.username} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800" required 
                        />
                    </div>

                    <div>
                        <label className="block text-indigo-900 font-semibold mb-2">Email</label>
                        <input 
                            type="email" name="email" value={user.email} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800" required 
                        />
                    </div>

                    <div>
                        <label className="block text-indigo-900 font-semibold mb-2">Password</label>
                        <input 
                            type="password" name="password" value={user.password} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800" 
                        />
                    </div>

                    <div>
                        <label className="block text-indigo-900 font-semibold mb-2">Confirm Password</label>
                        <input 
                            type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800" 
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProfile;
