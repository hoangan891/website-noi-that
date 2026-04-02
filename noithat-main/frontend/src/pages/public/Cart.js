// src/pages/public/Cart.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { setCart, clearCart } from '../../redux/slices/cartSlice';
import { FaTrash, FaSpinner, FaShoppingCart, FaPlus, FaMinus, FaTag } from 'react-icons/fa';
import { Snackbar, Alert, TextField } from '@mui/material';
import debounce from 'lodash.debounce';

const PLACEHOLDER_IMAGE_PATH = '/images/placeholder.png';

const Cart = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // State cho component
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedItems, setSelectedItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  // Fetch giỏ hàng
  const fetchCart = useCallback(async () => {
    console.log('fetchCart called', JSON.stringify({ user }, null, 2));
    if (user) {
      if (fetchCart.isFetching) {
        console.log('Fetch already in progress, skipping...');
        return;
      }
      fetchCart.isFetching = true;
      setIsLoading(true);
      try {
        const { data } = await api.get('/cart');
        console.log('Cart data from API:', JSON.stringify(data, null, 2));
        dispatch(setCart(data));
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setSnackbarMessage('Không thể tải giỏ hàng');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsLoading(false);
        fetchCart.isFetching = false;
      }
    } else {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  fetchCart.isFetching = false;

  useEffect(() => {
    console.log('useEffect for fetchCart triggered');
    fetchCart();
  }, [fetchCart]);

  // Use a ref to hold the debounced function
  const debouncedUpdateQtyRef = useRef();

  useEffect(() => {
    debouncedUpdateQtyRef.current = debounce(
      async (productId, qty) => {
        setUpdatingItemId(productId);
        try {
          const { data } = await api.put(`/cart/${productId}`, { qty });
          dispatch(setCart(data));
        } catch (err) {
          console.error('Failed to update cart quantity:', err.response?.data || err.message);
          setSnackbarMessage(err.response?.data?.message || 'Cập nhật thất bại');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } finally {
          setUpdatingItemId(null);
        }
      },
      500
    );

    return () => {
      debouncedUpdateQtyRef.current.cancel();
    };
  }, [dispatch, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, setUpdatingItemId]);

  // Hàm xử lý thay đổi số lượng
  const handleQtyChange = useCallback(
    (productId, currentItem, newQtyString) => {
      const newQty = Math.max(1, Number(newQtyString) || 1);
      const stockCount = currentItem.product?.countInStock;

      let finalQty = newQty;
      if (stockCount !== undefined && newQty > stockCount) {
        finalQty = stockCount;
        setSnackbarMessage(`Số lượng tối đa cho sản phẩm này là ${stockCount}`);
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
      if (finalQty === 0 && stockCount === 0) finalQty = 0;
      else if (finalQty <= 0) finalQty = 1;

      const updatedItems = cartItems.map((item) =>
        (item.product?._id || item.product) === productId ? { ...item, qty: finalQty } : item
      );
      dispatch(setCart({ items: updatedItems }));

      if (finalQty > 0) {
        debouncedUpdateQtyRef.current(productId, finalQty);
      } else if (stockCount === 0 && finalQty === 0) {
        // Do nothing for now
      } else {
        debouncedUpdateQtyRef.current(productId, 1);
      }
    },
    [cartItems, dispatch, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]
  );

  // Increment and decrement quantity handlers
  const incrementQuantity = (productId, currentItem) => {
    const currentQty = currentItem.qty || 1;
    const stockCount = currentItem.product?.countInStock;
    
    if (stockCount === undefined || currentQty < stockCount) {
      handleQtyChange(productId, currentItem, currentQty + 1);
    } else {
      setSnackbarMessage(`Số lượng tối đa cho sản phẩm này là ${stockCount}`);
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const decrementQuantity = (productId, currentItem) => {
    const currentQty = currentItem.qty || 1;
    if (currentQty > 1) {
      handleQtyChange(productId, currentItem, currentQty - 1);
    }
  };

  // Hàm xóa sản phẩm
  const removeItem = async (productId) => {
    setRemovingItemId(productId);
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      dispatch(setCart(data));
      setSelectedItems(selectedItems.filter((id) => id !== productId));
      setSnackbarMessage('Đã xóa sản phẩm khỏi giỏ hàng');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to remove item:', err.response?.data || err.message);
      setSnackbarMessage(err.response?.data?.message || 'Xóa thất bại');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setRemovingItemId(null);
    }
  };

  // Hàm xử lý chọn sản phẩm
  const handleSelectItem = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Select all items
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      // If all items are selected, deselect all
      setSelectedItems([]);
    } else {
      // Otherwise, select all available items
      const availableItemIds = cartItems
        .filter(item => item.product?.countInStock !== 0)
        .map(item => item.product?._id || item.product);
      setSelectedItems(availableItemIds);
    }
  };

  // Tính tổng giá trị và số lượng của các sản phẩm được chọn
  const calculateSelectedTotal = () => {
    return cartItems.reduce((acc, item) => {
      const productId = item.product?._id || item.product;
      if (!selectedItems.includes(productId)) return acc;

      const price = item.product?.price ?? item.price ?? 0;
      const qty = item.qty || 0;
      return acc + price * qty;
    }, 0);
  };

  const calculateSelectedQuantity = () => {
    return cartItems.reduce((acc, item) => {
      const productId = item.product?._id || item.product;
      if (!selectedItems.includes(productId)) return acc;
      return acc + (item.qty || 0);
    }, 0);
  };

  // Áp dụng mã giảm giá (giả lập)
  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'DISCOUNT10') {
      const total = calculateSelectedTotal();
      const discount = total * 0.1; // 10% discount
      setDiscountApplied(discount);
      setSnackbarMessage('Áp dụng mã giảm giá thành công!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else if (discountCode) {
      setDiscountApplied(0);
      setSnackbarMessage('Mã giảm giá không hợp lệ');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } else {
      setDiscountApplied(0);
    }
  };

  // Đóng Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Render Logic
  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
              <FaShoppingCart className="text-blue-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Vui lòng <Link to="/login" state={{ from: '/cart' }} className="text-blue-600 hover:underline font-medium">đăng nhập</Link> để xem giỏ hàng của bạn.
            </p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-xl font-medium">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <span>/</span>
          <span className="font-medium text-gray-800">Giỏ hàng</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaShoppingCart className="mr-3 text-blue-600" />
            Giỏ hàng của bạn
          </h1>
          {cartItems.length > 0 && (
            <button 
              onClick={handleSelectAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              {selectedItems.length === cartItems.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </button>
          )}
        </div>

        {/* Giỏ hàng trống */}
        {!isLoading && cartItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
              <FaShoppingCart className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">Hãy khám phá các sản phẩm và thêm vào giỏ hàng của bạn</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
              Bắt đầu mua sắm
            </Link>
          </div>
        )}

        {/* Giỏ hàng có sản phẩm */}
        {!isLoading && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Cart header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-700">Sản phẩm trong giỏ hàng ({cartItems.length})</h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const imagePath = item.product?.image || item.image;
                    // Normalize the path by replacing backslashes with forward slashes
                    let normalizedImagePath = imagePath ? imagePath.replace(/\\/g, '/') : imagePath;
                    // Remove 'backend/' prefix if present
                    normalizedImagePath = normalizedImagePath ? normalizedImagePath.replace(/^backend\//, '') : normalizedImagePath;
                    // Use relative path to match ProductCard (hypothesis)
                    const imageUrl = normalizedImagePath || PLACEHOLDER_IMAGE_PATH;

                    const productId = item.product?._id || item.product;
                    const productName = item.product?.name ?? item.name ?? 'Sản phẩm không xác định';

                    if (!productId) {
                      console.warn("Cart item missing product ID:", item);
                      return (
                        <div key={item._id || Math.random()} className="p-4 text-red-600 bg-red-50">
                          <p className="text-center">Sản phẩm này trong giỏ hàng bị lỗi dữ liệu (thiếu ID).</p>
                        </div>
                      );
                    }

                    const productPrice = item.product?.price ?? item.price ?? 0;
                    const stockCount = item.product?.countInStock;
                    const productSlug = item.product?.slug;
                    const detailLink = productSlug ? `/product/${productSlug}` : (productId ? `/product/${productId}` : '#');
                    const outOfStock = stockCount === 0;

                    return (
                      <div key={productId} className={`p-6 relative ${outOfStock ? 'bg-gray-50' : ''}`}>
                        {(updatingItemId === productId || removingItemId === productId) && (
                          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10 rounded">
                            <FaSpinner className="animate-spin text-2xl text-blue-500" />
                          </div>
                        )}
                        
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 pt-2">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(productId)}
                              onChange={() => handleSelectItem(productId)}
                              disabled={outOfStock}
                              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                            />
                          </div>
                          
                          <Link to={detailLink} className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 block rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={productName}
                              className={`w-full h-full object-cover transition-opacity ${outOfStock ? 'opacity-50' : 'hover:opacity-80'}`}
                              loading="lazy"
                              onError={(e) => {
                                console.warn(`Failed to load cart image for ${productName}: ${imageUrl}`);
                                e.target.onerror = null;
                                e.target.src = PLACEHOLDER_IMAGE_PATH;
                              }}
                            />
                          </Link>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div>
                                <Link to={detailLink} className={`text-lg font-medium hover:text-blue-600 transition line-clamp-2 mb-1 block ${outOfStock ? 'text-gray-500' : 'text-gray-800'}`} title={productName}>
                                  {productName}
                                </Link>
                                <p className="text-sm text-gray-500 mb-2">Đơn giá: <span className="font-medium">{productPrice.toLocaleString()} VND</span></p>
                              </div>
                              
                              <div className="mt-2 sm:mt-0 flex flex-col items-end">
                                <p className="font-semibold text-base text-red-600">
                                  {((productPrice || 0) * (item.qty || 0)).toLocaleString()} VND
                                </p>
                                
                                {stockCount !== undefined && stockCount !== null && (
                                  <p className={`text-xs mt-1 ${outOfStock ? 'text-red-600 font-semibold' : (stockCount < item.qty ? 'text-orange-600 font-semibold' : 'text-gray-500')}`}>
                                    {outOfStock ? 'Hết hàng' : `Còn ${stockCount} sản phẩm`}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <div className={`flex items-center border rounded-lg overflow-hidden ${outOfStock ? 'opacity-50' : ''}`}>
                                  <button
                                    onClick={() => decrementQuantity(productId, item)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                                    disabled={outOfStock || item.qty <= 1 || updatingItemId === productId}
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <input
                                    type="number"
                                    min={outOfStock ? "0" : "1"}
                                    max={stockCount}
                                    value={item.qty || (outOfStock ? 0 : 1)}
                                    onChange={(e) => handleQtyChange(productId, item, e.target.value)}
                                    className="w-12 py-1 border-x text-center focus:outline-none focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500"
                                    aria-label={`Số lượng cho ${productName}`}
                                    disabled={updatingItemId === productId || removingItemId === productId || outOfStock}
                                  />
                                  <button
                                    onClick={() => incrementQuantity(productId, item)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                                    disabled={outOfStock || (stockCount !== undefined && item.qty >= stockCount) || updatingItemId === productId}
                                  >
                                    <FaPlus size={12} />
                                  </button>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => removeItem(productId)}
                                className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Xóa ${productName} khỏi giỏ hàng`}
                                title="Xóa sản phẩm"
                                disabled={updatingItemId === productId || removingItemId === productId}
                              >
                                <FaTrash size="1em" />
                              </button>
                            </div>
                            
                            {stockCount !== undefined && stockCount < item.qty && stockCount > 0 && (
                              <p className="text-red-500 text-xs mt-2">Số lượng chọn vượt quá tồn kho!</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:sticky lg:top-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h2 className="font-semibold text-gray-800">Tóm tắt đơn hàng</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Số lượng sản phẩm:</span>
                      <span className="font-medium">{calculateSelectedQuantity()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tổng tiền hàng:</span>
                      <span className="font-medium">{calculateSelectedTotal().toLocaleString()} VND</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-medium text-green-600">Miễn phí</span>
                    </div>
                    
                    {discountApplied > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span className="flex items-center"><FaTag className="mr-1" /> Giảm giá:</span>
                        <span className="font-medium">-{discountApplied.toLocaleString()} VND</span>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t mt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-medium text-gray-800">Tổng thanh toán:</span>
                        <span className="font-bold text-red-600">{(calculateSelectedTotal() - discountApplied).toLocaleString()} VND</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex gap-2 mb-2">
                      <TextField
                        label="Mã giảm giá"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        fullWidth
                        size="small"
                        placeholder="Nhập mã giảm giá"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.5rem',
                            backgroundColor: '#fff'
                          }
                        }}
                      />
                      <button
                        onClick={applyDiscount}
                        className="shrink-0 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!discountCode.trim()}
                      >
                        Áp dụng
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 italic">Gợi ý: Thử mã "DISCOUNT10" để được giảm 10%</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      className={`block w-full text-white text-center py-3 rounded-lg transition font-medium ${
                        calculateSelectedTotal() > 0 && selectedItems.length > 0
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                      onClick={(e) => (calculateSelectedTotal() === 0 || selectedItems.length === 0) && e.preventDefault()}
                      aria-disabled={calculateSelectedTotal() === 0 || selectedItems.length === 0}
                    >
                      Tiến hành thanh toán
                    </Link>
                    
                    <Link 
                      to="/" 
                      className="block w-full text-center py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                    >
                      Tiếp tục mua hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} 
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;