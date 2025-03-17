import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';  
import API from '../API.jsx';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Use AuthContext

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await API.post('/api/users/login', { email, password });

            // Store token using AuthContext
            login(data.token);

            toast.success('Login successful');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="w-1/2 bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Admin!</h2>
                    <p className="text-gray-700 mb-6">Please sign in to your account</p>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
