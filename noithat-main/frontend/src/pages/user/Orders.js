import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/user'); // Adjust the API endpoint as per your backend
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải danh sách đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 font-playfair">
        Đơn Hàng Của Tôi
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Đơn hàng #{order._id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'delivered'
                      ? 'bg-green-500 text-white'
                      : order.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Sản phẩm</h3>
                {order.items.map((item) => (
                  <div key={item.product} className="flex justify-between mb-2 items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <p>{item.name} (x{item.qty})</p>
                    </div>
                    <p>{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <p>Tạm tính</p>
                  <p>{formatPrice(order.items.reduce((sum, item) => sum + item.price * item.qty, 0))}</p>
                </div>
                <div className="flex justify-between">
                  <p>Phí vận chuyển</p>
                  <p>{formatPrice(order.shipping.shippingFee)}</p>
                </div>
                <div className="flex justify-between font-bold">
                  <p>Tổng cộng</p>
                  <p>{formatPrice(order.total)}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/order-success/${order._id}`)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Xem Chi Tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;