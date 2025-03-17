import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import "./index.css";
import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./pages/AdminLogin";
import AdminProductList from "./pages/AdminProductList";
import AdminAddProducts from "./pages/AdminAddProducts";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminCategoryList from "./pages/AdminCategoryList";
import AdminAddCategory from "./pages/AdminAddCategory";
import AdminEditCategory from "./pages/AdminEditCategory";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminEditProfile from "./pages/AdminEditProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Route>

      <Route path="/admin" element={<AdminLogin />} />

      {/* Protect Admin Pages */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/productlist" element={<AdminProductList />} />
          <Route path="/admin/addproducts" element={<AdminAddProducts />} />
          <Route path="/admin/editproduct/:id" element={<AdminEditProduct />} />
          <Route path="/admin/categorylist" element={<AdminCategoryList />} />
          <Route path="/admin/addcategory" element={<AdminAddCategory />} />
          <Route path="/admin/editcategory/:id" element={<AdminEditCategory />} />
          <Route path="/admin/updateprofile" element={<AdminEditProfile />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />  
    </AuthProvider>
  </StrictMode>
);
