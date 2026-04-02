import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaShoppingBag } from 'react-icons/fa';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow-lg border border-red-200 text-center max-w-md">
          <p className="text-red-500 font-medium text-lg">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );

  const statusSteps = ['pending', 'preparing', 'shipping', 'delivered'];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {showConfetti && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="confetti-container">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  backgroundColor: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'][Math.floor(Math.random() * 6)],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-50 transition-all duration-500 hover:shadow-2xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/30 backdrop-blur-sm mb-4">
              <FaCheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-white/90">
              Thank you for your purchase. Your order #{orderId} has been received.
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <FaBox className="mr-2 text-teal-500" size={24} />
                  Order Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Items Section */}
                  <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
                    <h3 className="font-medium text-lg mb-4 text-gray-700 border-b pb-2">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.product} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={item.image || 'https://via.placeholder.com/50'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-500 text-sm">×{item.qty}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-800">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium">{formatPrice(order.items.reduce((sum, item) => sum + item.price * item.qty, 0))}</p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Shipping Fee</p>
                        <p className="font-medium">{formatPrice(order.shipping.shippingFee)}</p>
                      </div>
                      <div className="flex justify-between mt-4 pt-2 border-t">
                        <p className="font-bold text-lg">Total</p>
                        <p className="font-bold text-lg text-teal-600">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
                    <h3 className="font-medium text-lg mb-4 text-gray-700 border-b pb-2">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-gray-600 w-32">Name:</span>
                        <span className="font-medium text-gray-800">{order.shipping.name}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">Phone:</span>
                        <span className="font-medium text-gray-800">{order.shipping.phone}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">Address:</span>
                        <span className="font-medium text-gray-800">
                          {order.shipping.address}, {order.shipping.country}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">Payment:</span>
                        <span className="font-medium text-gray-800">{order.shipping.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-6 text-gray-800 flex items-center">
                <FaTruck className="mr-2 text-teal-500" size={24} />
                Order Status
              </h3>

              <div className="relative">
                {/* Progress bar */}
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / statusSteps.length) * 100}%` }}
                  />
                </div>

                {/* Status steps */}
                <div className="flex justify-between">
                  {statusSteps.map((status, index) => (
                    <div
                      key={status}
                      className={`text-center flex flex-col items-center ${
                        index <= currentStep ? 'text-teal-600' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center transition-all duration-300 ${
                          index < currentStep
                            ? 'bg-teal-500 text-white'
                            : index === currentStep
                            ? 'animate-pulse bg-teal-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {index < currentStep ? <FaCheckCircle size={16} /> : <span>{index + 1}</span>}
                      </div>
                      <span className={`capitalize font-medium ${index <= currentStep ? 'text-gray-800' : 'text-gray-500'}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
              >
                <FaShoppingBag className="mr-2" size={20} />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0.7;
          border-radius: 10%;
          animation: fall 5s ease-in-out forwards;
        }

        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;