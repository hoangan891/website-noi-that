// src/components/layout/AdminLayout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header'; // <-- Import Header chung

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Thay đổi flex direction */}
      <Header /> {/* <-- Thêm Header */}
      <div className="flex flex-1"> {/* Container cho sidebar và content */}
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0"> {/* Ngăn sidebar co lại */}
          <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto"> {/* Cho phép scroll nếu nhiều link */}
            <Link to="/admin" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
              {/* <FaTachometerAlt className="mr-3" /> */}
              Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
              {/* <FaBoxOpen className="mr-3" /> */}
              Sản phẩm
            </Link>
             <Link to="/admin/products/add" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
               Thêm sản phẩm
             </Link>
            <Link to="/admin/categories" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
              {/* <FaTags className="mr-3" /> */}
              Danh mục
            </Link>
             {/* Thêm các link khác */}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {/* Outlet sẽ render component con tương ứng route */}
            <Outlet />
          </main>
        </div>
      </div>
      {/* <Footer /> */} {/* <-- Keep this commented out or remove if not needed */}
    </div>
  );
};

export default AdminLayout;