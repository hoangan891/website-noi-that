// src/pages/admin/AdminHome.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FaPlusCircle, FaFileInvoiceDollar, FaReceipt, FaUserPlus, FaTruckLoading, FaSearchDollar } from 'react-icons/fa';
// Đã xóa import FaBoxes, FaUsers

// --- Component StatCard và QuickActionButton giữ nguyên như trước ---
const StatCard = ({ title, value, icon, link = '#', bgColor = 'bg-white' }) => (
    <Link to={link} className={`p-4 rounded-lg shadow flex items-center justify-between ${bgColor} hover:shadow-md transition-shadow`}>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        {icon && <div className="text-3xl text-gray-400">{icon}</div>}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </Link>
);
const QuickActionButton = ({ title, icon, link, color = 'text-blue-600' }) => (
    <Link to={link} className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md ${color}`}>
        {icon}
        <span>{title}</span>
    </Link>
);
// --- Kết thúc components ---

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({
        pendingOrders: 0,
        preparingOrders: 0,
        shippingOrders: 0,
        deliveredOrders: 0,
        outOfStock: 0,
        lowStock: 0,
        customersNeedPaying: 0,
        customersOverdue: 0,
        revenue: '0',
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [orderResponse, productResponse] = await Promise.all([
                    api.get('/orders/counts'),
                    api.get('/products/counts'),
                ]);
                setStats((prev) => ({
                    ...prev,
                    ...orderResponse.data,
                    outOfStock: productResponse.data.outOfStockCount,
                    lowStock: productResponse.data.lowStockCount,
                }));
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };
        fetchStats();
    }, []);

    if (!user || !user.isAdmin) {
        return <div className="text-center py-8">Bạn không có quyền truy cập trang này</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-4">Cần xem xét</h1>
            {/* Grid thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Đơn chờ xác nhận" value={stats.pendingOrders} link="/admin/orders?status=pending" bgColor="bg-red-50 border border-red-200" />
                <StatCard title="Đơn đang chuẩn bị" value={stats.preparingOrders} link="/admin/orders?status=preparing" bgColor="bg-yellow-50 border border-yellow-200" />
                <StatCard title="Đơn đang giao" value={stats.shippingOrders} link="/admin/orders?status=shipping" bgColor="bg-blue-50 border border-blue-200" />
                <StatCard title="Đơn đã giao" value={stats.deliveredOrders} link="/admin/orders?status=delivered" bgColor="bg-green-50 border border-green-200" />
                <StatCard title="Sản phẩm hết hàng" value={stats.outOfStock} link="/admin/products?stock=out" bgColor="bg-red-50 border border-red-200" />
                <StatCard title="Sản phẩm tồn kho thấp" value={stats.lowStock} link="/admin/products?stock=low" bgColor="bg-orange-50 border border-orange-200" />
                <StatCard title="Khách hàng cần nhắc nợ" value={stats.customersNeedPaying} link="/admin/orders" bgColor="bg-yellow-50 border border-yellow-200" />
                <StatCard title="Khách chưa có lịch nhắc nợ" value={stats.customersOverdue} link="/admin/orders" bgColor="bg-yellow-50 border border-yellow-200" />
            </div>

            {/* Thao tác nhanh */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Thao tác nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                    {/* Cột Bán hàng */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Bán hàng</h3>
                        <div className="space-y-2">
                            {/* TODO: Cập nhật các link này */}
                            <QuickActionButton title="Tạo đơn hàng" icon={<FaPlusCircle />} link="/admin/orders/create" />
                            <QuickActionButton title="Tạo đơn tại bàn" icon={<FaPlusCircle />} link="/admin/pos" />
                        </div>
                    </div>
                    {/* Cột Hàng hóa */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Hàng hoá</h3>
                        <div className="space-y-2">
                            <QuickActionButton title="Tạo sản phẩm mới" icon={<FaPlusCircle />} link="/admin/products/add" />
                             {/* TODO: Cập nhật các link này */}
                            <QuickActionButton title="Nhập kho" icon={<FaTruckLoading />} link="/admin/inventory/import" />
                            <QuickActionButton title="Kiểm kho" icon={<FaSearchDollar />} link="/admin/inventory/check" />
                        </div>
                    </div>
                    {/* Cột Tài chính */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Tài chính</h3>
                        <div className="space-y-2">
                             {/* TODO: Cập nhật các link này */}
                            <QuickActionButton title="Tạo khoản thu" icon={<FaFileInvoiceDollar />} link="/admin/finances/income/create" />
                            <QuickActionButton title="Tạo khoản chi" icon={<FaReceipt />} link="/admin/finances/expense/create" />
                            <QuickActionButton title="Tạo nợ khách hàng" icon={<FaUserPlus />} link="/admin/customers/debt/create" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;