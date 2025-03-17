import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// console.log(import.meta.env.VITE_BACKEND_URL)

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Adjust if needed
    withCredentials: true, // Allow sending cookies
});

export default API;
