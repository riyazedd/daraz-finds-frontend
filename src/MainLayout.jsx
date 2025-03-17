import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-white via-orange-500 to-orange-700 w-full lg:p-20 px-4 overflow-hidden">
      <div className="bg-[#09122C] p-5 sm:p-10 md:p-15 w-full lg:w-[80%] max-w-7xl m-auto rounded-2xl flex flex-col items-center min-h-screen">
        <Header />
        <div className="mt-10 w-full px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
