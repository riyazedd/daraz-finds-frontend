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
    const { login } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await API.post('/api/users/login', { email, password });

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
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 px-4">
    {/* Background Image */}
    <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('banner.jpg')" }}
    >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md bg-white/90 opacity-90 backdrop-blur-lg rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Welcome Admin!</h2>
        <p className="text-gray-700 mb-6 text-center">Please sign in to your account</p>
        
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full shadow-md border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                    className="w-full shadow-md border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    className={`w-full bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

    );
};

export default AdminLogin;
