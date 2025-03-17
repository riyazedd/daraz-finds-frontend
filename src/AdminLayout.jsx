import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader />
    <div className="w-full p-10">
      <Outlet />
    </div>
    <ToastContainer />
    </>
  );
};

export default AdminLayout;
