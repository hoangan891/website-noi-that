import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCart, clearCart } from '../../redux/slices/cartSlice';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    country: 'Vietnam',
    address: user?.address || '',
    paymentMethod: 'cash',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    country: '',
    address: '',
    paymentMethod: '',
  });
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [showDiscountConfirm, setShowDiscountConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [singleProduct, setSingleProduct] = useState(null);

  const shippingFee = 30000;
  const itemsToDisplay = singleProduct ? [singleProduct] : cartItems;
  const subtotal = itemsToDisplay.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalBeforeDiscount = subtotal + shippingFee;
  const total = totalBeforeDiscount - discountAmount;

  // Handle single-product checkout
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    console.log('Checkout.js: productId from URL:', productId);

    if (productId) {
      console.log('Fetching product with ID:', productId);
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${productId}`);
          console.log('Product data:', data);
          setSingleProduct({
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            qty: 1,
          });
        } catch (err) {
          console.error('Product fetch error:', err);
          setSnackbarMessage('Không thể tải sản phẩm. Vui lòng thử lại.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } finally {
          setFetchingData(false);
        }
      };
      fetchProduct();
    } else {
      console.log('No productId, fetching cart...');
      const fetchCart = async () => {
        try {
          const response = await api.get('/cart');
          console.log('Cart data:', response.data);
          dispatch(setCart({ items: response.data.items }));
        } catch (err) {
          console.error('Cart fetch error:', err);
          setSnackbarMessage('Không thể tải giỏ hàng.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } finally {
          setFetchingData(false);
        }
      };
      fetchCart();
    }
  }, [dispatch, location.search]);

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
        if (snackbarSeverity === 'success' && snackbarMessage === 'Mua hàng thành công!') {
          navigate(`/order-success/${orderId}`);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openSnackbar, snackbarSeverity, snackbarMessage, navigate, orderId]); // Added orderId

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error on input change
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
    setShowDiscountConfirm(false);
    setIsDiscountValid(false);
    setDiscountAmount(0);
  };

  const validateDiscountCode = () => {
    console.log('Validating discount code:', discountCode);
    if (discountCode.toLowerCase() === 'minhkhang10') {
      setIsDiscountValid(true);
      setShowDiscountConfirm(true);
      setSnackbarMessage('Mã giảm giá hợp lệ! Vui lòng xác nhận để áp dụng.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else {
      setIsDiscountValid(false);
      setShowDiscountConfirm(false);
      setDiscountAmount(0);
      setSnackbarMessage('Mã giảm giá không hợp lệ.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const confirmDiscountCode = () => {
    if (isDiscountValid) {
      setDiscountAmount(totalBeforeDiscount * 0.1); // 10% discount
      setSnackbarMessage('Áp dụng mã giảm giá thành công!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setShowDiscountConfirm(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Vui lòng nhập họ và tên.';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại.';
      isValid = false;
    } else if (!/^\d{10,11}$/.test(formData.phone.trim())) {
      errors.phone = 'Số điện thoại không hợp lệ (10-11 số).';
      isValid = false;
    }
    if (!formData.country) {
      errors.country = 'Vui lòng chọn quốc gia.';
      isValid = false;
    }
    if (!formData.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ.';
      isValid = false;
    }
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Vui lòng chọn phương thức thanh toán.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage('Vui lòng điền đầy đủ thông tin thanh toán.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        items: itemsToDisplay.map((item) => ({
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
        })),
        shipping: { ...formData, shippingFee },
        total,
        discount: discountAmount,
      };

      const response = await api.post('/orders/create', orderData);
      setOrderId(response.data.orderId);

      if (!singleProduct) {
        await api.delete('/orders/cart/clear');
        dispatch(clearCart());
      }

      setSnackbarMessage('Mua hàng thành công!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      const message = err.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại.';
      setError(message);
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12 font-playfair">
        Thanh Toán
      </h1>

      {error && (
        <p className="text-center text-red-600 mb-8 text-lg">{error}</p>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
              Tóm Tắt Đơn Hàng
            </h2>
            {itemsToDisplay.length === 0 ? (
              <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
            ) : (
              <>
                {itemsToDisplay.map((item) => (
                  <div key={item.product} className="flex items-center space-x-4 mb-6 border-b pb-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Số lượng: {item.qty}</p>
                      <p className="text-gray-800 font-semibold">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-800 font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {/* Discount Code Input */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Mã Giảm Giá</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tan-500"
                    />
                    {console.log('Rendering Áp Dụng button')}
                    <button
                      onClick={validateDiscountCode}
                      className="bg-tan-500 text-white px-4 py-3 rounded-lg hover:bg-tan-600 transition duration-300"
                      style={{ backgroundColor: '#D2B48C', minWidth: '100px', display: 'inline-block' }} // Fallback style
                    >
                      Áp Dụng
                    </button>
                  </div>
                  {showDiscountConfirm && (
                    <>
                      {console.log('Rendering Xác Nhận Mã Giảm Giá button')}
                      <button
                        onClick={confirmDiscountCode}
                        className="mt-2 w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                        style={{ backgroundColor: '#22C55E', minWidth: '100px', display: 'block' }} // Fallback style
                      >
                        Xác Nhận Mã Giảm Giá
                      </button>
                    </>
                  )}
                  {discountAmount > 0 && (
                    <p className="text-green-600 mt-2">Bạn đã được giảm {formatPrice(discountAmount)}!</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Payment Information Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
              Thông Tin Thanh Toán
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Họ và Tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.name ? 'border-red-500' : 'focus:ring-tan-500'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Số Điện Thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.phone ? 'border-red-500' : 'focus:ring-tan-500'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Quốc Gia *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.country ? 'border-red-500' : 'focus:ring-tan-500'
                  }`}
                >
                  <option value="Vietnam">Việt Nam</option>
                </select>
                {formErrors.country && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Địa Chỉ *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.address ? 'border-red-500' : 'focus:ring-tan-500'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phương Thức Thanh Toán *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.paymentMethod ? 'border-red-500' : 'focus:ring-tan-500'
                  }`}
                >
                  <option value="cash">Thanh Toán Khi Nhận Hàng</option>
                  <option value="bank">Chuyển Khoản Ngân Hàng</option>
                  <option value="credit">Thẻ Tín Dụng</option>
                </select>
                {formErrors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.paymentMethod}</p>
                )}
              </div>
              {console.log('Rendering Xác Nhận Thanh Toán button, itemsToDisplay:', itemsToDisplay)}
              <button
                type="submit"
                disabled={loading || itemsToDisplay.length === 0}
                className={`w-full py-4 text-white rounded-lg transition duration-300 ${
                  loading || itemsToDisplay.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-tan-500 hover:bg-tan-600'
                }`}
                style={{ backgroundColor: '#D2B48C', minHeight: '50px', display: 'block' }} // Fallback style
              >
                {loading ? <LoadingSpinner /> : 'Xác Nhận Thanh Toán'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white transition-opacity duration-300 ${
          openSnackbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${snackbarSeverity === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {snackbarMessage}
      </div>
    </div>
  );
};

export default Checkout;