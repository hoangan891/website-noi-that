import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import { setCart } from '../../redux/slices/cartSlice';
import { FaShoppingCart, FaStar, FaRegStar, FaThumbsUp, FaShare, FaRegCommentDots } from 'react-icons/fa';
import { Snackbar, Alert, Avatar } from '@mui/material';
import placeholderImage from '../../assets/images/placeholder.png';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';

const ProductDetail = () => {
  const { idOrSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const reviewRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string' || !imagePath.startsWith('/')) {
      console.warn("Invalid imagePath received:", imagePath);
      return null;
    }
    return `${backendUrl}${imagePath}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setProduct(null);
      setRelatedProducts([]);
      try {
        const { data: mainProductData } = await api.get(`/products/${idOrSlug}`);
        setProduct(mainProductData);

        if (mainProductData.relatedProducts && Array.isArray(mainProductData.relatedProducts)) {
          setRelatedProducts(mainProductData.relatedProducts);
        } else if (mainProductData.category?.slug) {
          console.warn("Controller không trả về relatedProducts, đang fetch riêng...");
          try {
            const related = await api.get(`/products?category=${mainProductData.category.slug}&pageSize=5`);
            setRelatedProducts(related.data.products.filter((p) => p._id !== mainProductData._id).slice(0, 4));
          } catch (relatedErr) {
            console.error("Lỗi khi tải sản phẩm liên quan:", relatedErr);
            setRelatedProducts([]);
          }
        } else {
          setRelatedProducts([]);
        }

        try {
          const { data: reviewsData } = await api.get(`/products/${mainProductData._id}/reviews`);
          setReviews(reviewsData);
        } catch (reviewsErr) {
          console.error("Lỗi khi tải đánh giá:", reviewsErr);
          setReviews([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
        setSnackbarMessage(err.response?.data?.message || 'Không thể tải sản phẩm');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [idOrSlug]);

  const addToCart = async () => {
    if (!user) {
      setSnackbarMessage('Vui lòng đăng nhập để thêm vào giỏ hàng');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      navigate('/login', { state: { from: `/product/${idOrSlug}` } });
      return;
    }

    if (!product || !product._id) {
      setSnackbarMessage('Dữ liệu sản phẩm chưa tải xong, vui lòng thử lại.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (qty > product.countInStock) {
      setSnackbarMessage(`Số lượng tồn kho không đủ (${product.countInStock} sản phẩm).`);
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      setQty(product.countInStock);
      return;
    }

    try {
      const { data } = await api.post('/cart', { productId: product._id, qty });
      dispatch(setCart(data));
      setSnackbarMessage('Đã thêm vào giỏ hàng thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || 'Thêm vào giỏ hàng thất bại');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setSnackbarMessage('Vui lòng đăng nhập để bình luận');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      navigate('/login', { state: { from: `/product/${idOrSlug}` } });
      return;
    }

    if (!userReview.comment.trim()) {
      setSnackbarMessage('Vui lòng nhập nội dung bình luận');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsSubmittingReview(true);
      const { data } = await api.post(`/products/${product._id}/reviews`, {
        rating: userReview.rating,
        comment: userReview.comment,
      });
      setReviews([...reviews, data]);
      setUserReview({ rating: 5, comment: '' });
      setSnackbarMessage('Đánh giá của bạn đã được gửi thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || 'Không thể gửi đánh giá');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const scrollToReviews = () => {
    setActiveTab(1);
    setTimeout(() => {
      if (reviewRef.current) {
        reviewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Đang tải chi tiết sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl text-red-600 mb-4">{snackbarMessage || 'Sản phẩm không tồn tại hoặc đã có lỗi xảy ra.'}</h2>
        <Link to="/" className="text-indigo-600 hover:underline">
          Quay lại trang chủ
        </Link>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  const mainImageUrl = getAbsoluteImageUrl(product.image) || placeholderImage;
  const additionalImages = product.additionalImages || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center mb-8 text-sm text-gray-600 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          {product.category && (
            <>
              <Link to={`/categories?category=${product.category.slug}`} className="hover:text-indigo-600 transition-colors">
                {product.category.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8 mb-10">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative overflow-hidden rounded-xl shadow-md cursor-zoom-in group"
              onClick={() => openImageModal(mainImageUrl)}
            >
              <img
                src={mainImageUrl}
                alt={product.name}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
              />
            </div>
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {additionalImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => openImageModal(getAbsoluteImageUrl(img) || placeholderImage)}
                  >
                    <img
                      src={getAbsoluteImageUrl(img) || placeholderImage}
                      alt={`${product.name} - ảnh ${idx + 1}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            {product.category && (
              <p className="text-sm text-gray-600">
                Danh mục: <Link to={`/categories?category=${product.category.slug}`} className="text-indigo-600 hover:underline">{product.category.name}</Link>
              </p>
            )}
            <p className="text-sm text-gray-500">Mã SP: {product._id}</p>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                    size={20}
                  />
                ))}
              </div>
              <button
                onClick={scrollToReviews}
                className="text-indigo-600 hover:underline text-sm flex items-center"
              >
                <span>{product.numReviews || 0} đánh giá</span>
                <FaRegCommentDots className="ml-1" />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-red-600">{product.price?.toLocaleString()} VND</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center space-x-2">
                  <p className="text-gray-500 line-through text-lg">{product.originalPrice.toLocaleString()} VND</p>
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <p className="text-lg">
              Trạng thái:{' '}
              {product.countInStock > 0 ? (
                <span className="text-green-600 font-semibold">Còn hàng ({product.countInStock} sản phẩm)</span>
              ) : (
                <span className="text-red-600 font-semibold">Hết hàng</span>
              )}
            </p>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Mô tả ngắn:</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                  disabled={qty <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.countInStock > 0 ? product.countInStock : 1}
                  value={qty}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value) || 1);
                    if (product.countInStock === 0 || val <= product.countInStock) {
                      setQty(val);
                    } else {
                      setQty(product.countInStock);
                      setSnackbarMessage(`Chỉ còn ${product.countInStock} sản phẩm tồn kho.`);
                      setSnackbarSeverity('warning');
                      setOpenSnackbar(true);
                    }
                  }}
                  className="w-16 py-2 border-x border-gray-300 text-center focus:outline-none"
                  disabled={product.countInStock === 0}
                />
                <button
                  onClick={() => setQty(Math.min(product.countInStock || 1, qty + 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                  disabled={product.countInStock === 0 || qty >= product.countInStock}
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className={`flex-1 flex items-center justify-center py-3 rounded-lg font-semibold transition ${
                  product.countInStock === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                disabled={product.countInStock === 0 || isLoading}
              >
                <FaShoppingCart className="mr-2" /> Thêm vào giỏ hàng
              </button>
            </div>

            {product.countInStock > 0 && product.countInStock <= 5 && (
              <p className="text-orange-600 font-medium">Chỉ còn {product.countInStock} sản phẩm!</p>
            )}

            {/* Social Sharing */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
              <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
                <FaThumbsUp className="mr-2" /> Thích
              </button>
              <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
                <FaShare className="mr-2" /> Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-4">
              {['Chi tiết sản phẩm', `Đánh giá (${reviews.length})`, 'Chính sách mua hàng'].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`pb-4 px-2 font-semibold text-lg border-b-2 transition ${
                    activeTab === idx ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 0 && (
            <div>
              {product.detailedDescription ? (
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.detailedDescription }} />
              ) : (
                <p className="text-gray-500 italic">Chưa có thông tin chi tiết cho sản phẩm này.</p>
              )}
            </div>
          )}

          {activeTab === 1 && (
            <div ref={reviewRef}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ khách hàng</h2>

              {reviews.length > 0 && (
                <div className="flex flex-col md:flex-row gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-600">{product.rating?.toFixed(1) || "0.0"}</div>
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} size={20} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{reviews.length} đánh giá</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                      const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center">
                          <div className="w-12 text-sm text-gray-600">{star} sao</div>
                          <div className="flex-1 mx-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <div className="w-16 text-xs text-gray-500">{count} ({percentage.toFixed(0)}%)</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Review Form */}
              <div className="mb-8 p-6 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Xếp hạng:</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setUserReview({ ...userReview, rating: star })}
                          className="text-2xl mr-2 focus:outline-none"
                        >
                          {star <= userReview.rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-gray-300 hover:text-yellow-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="review-comment" className="block mb-2 text-sm font-medium text-gray-700">
                      Nhận xét của bạn:
                    </label>
                    <textarea
                      id="review-comment"
                      rows="4"
                      value={userReview.comment}
                      onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !user}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      user ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isSubmittingReview ? 'Đang gửi...' : user ? 'Gửi đánh giá' : 'Đăng nhập để đánh giá'}
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={review._id || index} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start">
                        <Avatar src={review.user?.avatar || avatarPlaceholder} alt={review.user?.name || 'User'} className="mr-4" />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-semibold text-gray-900 mr-2">{review.user?.name || 'Người dùng ẩn danh'}</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < Math.round(review.rating) ? 'text-yellow-400' : 'text-gray-300'}
                                  size={14}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="mt-3 flex items-center space-x-4">
                            <button className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                              <FaThumbsUp className="mr-1" size={12} /> Hữu ích
                            </button>
                            <button className="text-sm text-gray-500 hover:text-indigo-600">Báo cáo</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaRegCommentDots className="mx-auto mb-3 text-gray-400" size={32} />
                  <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                  <p className="mt-2">
                    Hãy là người đầu tiên đánh giá!{' '}
                    <button onClick={() => reviewRef.current.scrollIntoView({ behavior: 'smooth' })} className="text-indigo-600 hover:underline">
                      Viết đánh giá ngay
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chính sách mua hàng</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.</li>
                <li>Miễn phí vận chuyển cho đơn hàng từ 2.000.000 VND.</li>
                <li>Thanh toán khi nhận hàng (COD) hoặc qua chuyển khoản.</li>
                <li>Bảo hành 12 tháng cho các sản phẩm nội thất.</li>
                <li>Liên hệ hotline 1900 1234 để được hỗ trợ nhanh chóng.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct.slug || relatedProduct._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getAbsoluteImageUrl(relatedProduct.image) || placeholderImage}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-red-600 font-semibold">{relatedProduct.price.toLocaleString()} VND</p>
                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                      <p className="text-gray-500 text-xs line-through">{relatedProduct.originalPrice.toLocaleString()} VND</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-3xl w-full">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img src={selectedImage} alt="Zoomed product" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            </div>
          </div>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ProductDetail;