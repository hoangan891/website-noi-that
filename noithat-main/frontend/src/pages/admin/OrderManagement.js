import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const statusQuery = new URLSearchParams(location.search).get('status') || 'pending';
  const statusSteps = ['pending', 'preparing', 'shipping', 'delivered'];
  const statusLabelMap = {
    pending: 'chờ xác nhận',
    preparing: 'đang chuẩn bị',
    shipping: 'đang giao',
    delivered: 'đã giao',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const nextStatus = statusSteps.includes(statusQuery) ? statusQuery : 'pending';
        const response = await api.get(`/orders?status=${nextStatus}`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [location.search]);

  const handleUpdateStatus = async (orderId, currentStatus) => {
    const currentStep = statusSteps.indexOf(currentStatus);
    if (currentStep < statusSteps.length - 1) {
      const nextStatus = statusSteps[currentStep + 1];
      try {
        await api.put(`/orders/${orderId}/status`, { status: nextStatus }); // Ensure this endpoint updates the status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: nextStatus } : order
          )
        );
      } catch (err) {
        console.error('Error updating order status:', err);
        setError(err.response?.data?.message || 'Failed to update order status.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const orderMode = statusLabelMap[statusQuery] || 'tất cả';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Quản Lý Đơn Hàng - {orderMode}</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Không có đơn hàng {orderMode}.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Đơn hàng #{order._id}</h2>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Sản phẩm</h3>
                {order.items.map((item) => (
                  <div key={item.product} className="flex justify-between mb-2">
                    <p>{item.name} (x{item.qty})</p>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Trạng thái đơn hàng</h3>
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                      style={{
                        width: `${((statusSteps.indexOf(order.status) + 1) / statusSteps.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    {statusSteps.map((status, index) => (
                      <div
                        key={status}
                        className={`text-center flex flex-col items-center ${
                          index <= statusSteps.indexOf(order.status)
                            ? 'text-teal-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center transition-all duration-300 ${
                            index < statusSteps.indexOf(order.status)
                              ? 'bg-teal-500 text-white'
                              : index === statusSteps.indexOf(order.status)
                              ? 'animate-pulse bg-teal-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="capitalize font-medium">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleUpdateStatus(order._id, order.status)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                disabled={order.status === 'delivered'}
              >
                {order.status === 'delivered' ? 'Đã Giao Hàng' : 'Cập Nhật Trạng Thái'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;