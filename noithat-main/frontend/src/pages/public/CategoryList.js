import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicProducts, setCurrentPublicPage } from '../../redux/slices/productSlice';
import api from '../../services/api'; // Ensure `api` is imported
import {
  Snackbar,
  Alert,
  TextField,
  Button,
  Slider,
  Chip,
  Badge,
  Fade,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt'; // Ensure `FilterAltIcon` is imported

const CategoryList = () => {
  const dispatch = useDispatch();
  const { publicProducts, publicLoading, publicError, totalPublicPages, currentPublicPage } = useSelector(
    (state) => state.products
  );

  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [email, setEmail] = useState('');

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const statuses = ['In Stock', 'Out of Stock', 'New Arrival'];

  // Scroll to top when location/URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (err) {
        setSnackbarMessage('Không thể tải danh mục');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filters = {};
    if (searchTerm) filters.keyword = searchTerm;
    if (priceRange[0] > 0) filters['price[gte]'] = priceRange[0];
    if (priceRange[1] < 10000000) filters['price[lte]'] = priceRange[1];
    if (selectedCategory) filters.category = selectedCategory;
    if (status) filters.status = status;

    let count = 0;
    if (searchTerm) count++;
    if (priceRange[0] > 0 || priceRange[1] < 10000000) count++;
    if (status) count++;
    setActiveFiltersCount(count);

    dispatch(fetchPublicProducts({ page: currentPublicPage, filters }));
  }, [dispatch, currentPublicPage, searchTerm, priceRange, selectedCategory, status]);

  useEffect(() => {
    if (activeTab !== 'all') {
      setSelectedCategory(activeTab);
    } else {
      setSelectedCategory('');
    }
  }, [activeTab]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    if (categoryQuery) {
      setActiveTab(categoryQuery);
      setSelectedCategory(categoryQuery);
      dispatch(setCurrentPublicPage(1));
    }
  }, [location.search, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setCurrentPublicPage(1));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    dispatch(setCurrentPublicPage(1));
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    dispatch(setCurrentPublicPage(1));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 10000000]);
    setSelectedCategory('');
    setStatus('');
    setActiveTab('all');
    dispatch(setCurrentPublicPage(1));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewsletterSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage('Vui lòng nhập email hợp lệ');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      await api.post('/newsletter/subscribe', { email });
      setSnackbarMessage('Đăng ký nhận thông tin thành công!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setEmail('');
    } catch (err) {
      setSnackbarMessage('Đăng ký thất bại, vui lòng thử lại');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const filteredProducts = activeTab === 'all'
    ? publicProducts
    : publicProducts.filter((product) => product.category?.slug === activeTab);

  const productsByCategory = categories.reduce((acc, category) => {
    const productsInCategory = publicProducts.filter(
      (product) => product.category?._id === category._id
    );
    if (productsInCategory.length > 0) {
      acc[category._id] = {
        category,
        products: productsInCategory,
      };
    }
    return acc;
  }, {});

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Roboto',sans-serif]">
      {/* Import Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Search and Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextField
              placeholder="Tìm kiếm sản phẩm..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-50 rounded-full"
              InputProps={{
                style: {
                  borderRadius: 50,
                  paddingLeft: 50,
                  paddingRight: 20,
                  height: 48,
                  backgroundColor: '#f3f4f6',
                },
                'aria-label': 'Tìm kiếm sản phẩm',
              }}
            />
          </div>
          <div className="flex gap-3 self-stretch">
            <Badge badgeContent={activeFiltersCount} color="error">
              <Button
                variant="contained"
                startIcon={<FilterAltIcon />}
                onClick={toggleFilter}
                sx={{
                  borderRadius: '50px',
                  backgroundColor: isFilterOpen ? '#dc2626' : '#f3f4f6',
                  color: isFilterOpen ? '#fff' : '#374151',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: isFilterOpen ? '#b91c1c' : '#e5e7eb',
                    boxShadow: 'none',
                  },
                  height: '48px',
                }}
                aria-label="Mở bộ lọc"
              >
                Bộ lọc
              </Button>
            </Badge>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            aria-current={activeTab === 'all' ? 'true' : 'false'}
          >
            Tất cả danh mục
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveTab(category.slug)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.slug
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-current={activeTab === category.slug ? 'true' : 'false'}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <Fade in={isFilterOpen}>
            <div
              className={`md:w-80 flex-shrink-0 transition-all ${
                isFilterOpen ? 'block' : 'hidden md:hidden'
              }`}
              role="region"
              aria-label="Bộ lọc sản phẩm"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-500 pl-3">
                    Bộ Lọc Sản Phẩm
                  </h2>
                  <button
                    onClick={toggleFilter}
                    className="text-gray-500 hover:text-gray-800"
                    aria-label="Đóng bộ lọc"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Khoảng Giá</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="off"
                      min={0}
                      max={10000000}
                      step={100000}
                      aria-labelledby="price-range-slider"
                      sx={{
                        color: '#dc2626',
                        height: 8,
                        '& .MuiSlider-thumb': {
                          backgroundColor: '#fff',
                          border: '2px solid #dc2626',
                          width: 16,
                          height: 16,
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: '#e5e7eb',
                          height: 8,
                          borderRadius: 4,
                        },
                        '& .MuiSlider-track': {
                          height: 8,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 font-medium w-24 text-center">
                      {formatCurrency(priceRange[0])}
                    </div>
                    <div className="border-t-2 border-gray-200 w-8"></div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 font-medium w-24 text-center">
                      {formatCurrency(priceRange[1])}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Trạng thái</label>
                  <div className="flex flex-wrap gap-2">
                    <Chip
                      label="Tất cả"
                      onClick={() => handleStatusChange('')}
                      variant={status === '' ? 'filled' : 'outlined'}
                      color={status === '' ? 'primary' : 'default'}
                      sx={{
                        backgroundColor: status === '' ? '#dc2626' : 'transparent',
                        borderColor: status === '' ? '#dc2626' : '#e5e7eb',
                        '&:hover': {
                          backgroundColor: status === '' ? '#b91c1c' : '#f9fafb',
                        },
                      }}
                      aria-label="Lọc tất cả trạng thái"
                    />
                    {statuses.map((stat) => (
                      <Chip
                        key={stat}
                        label={stat === 'In Stock' ? 'Còn hàng' : stat === 'Out of Stock' ? 'Hết hàng' : 'Hàng mới'}
                        onClick={() => handleStatusChange(stat)}
                        variant={status === stat ? 'filled' : 'outlined'}
                        color={status === stat ? 'primary' : 'default'}
                        sx={{
                          backgroundColor: status === stat ? '#dc2626' : 'transparent',
                          borderColor: status === stat ? '#dc2626' : '#e5e7eb',
                          '&:hover': {
                            backgroundColor: status === stat ? '#b91c1c' : '#f9fafb',
                          },
                        }}
                        aria-label={`Lọc trạng thái ${stat}`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<RestartAltIcon />}
                  onClick={handleResetFilters}
                  sx={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    '&:hover': { backgroundColor: '#e5e7eb' },
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                  }}
                  aria-label="Xóa tất cả bộ lọc"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </Fade>

          {/* Product Display */}
          <div className="flex-grow">
            {publicLoading === 'pending' ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div
                  className="inline-block w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"
                  role="status"
                  aria-label="Đang tải"
                ></div>
                <p className="mt-6 text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : publicError ? (
              <div className="text-center text-red-600 py-16 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-lg">{publicError}</p>
              </div>
            ) : (
              <>
                {activeTab === 'all' ? (
                  Object.values(productsByCategory).map(({ category, products }) => (
                    <div key={category._id} className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                        <Link
                          to="#"
                          onClick={() => setActiveTab(category.slug)}
                          className="flex items-center text-sm text-gray-800 hover:text-red-600 transition-colors font-medium group"
                          aria-label={`Xem tất cả sản phẩm trong danh mục ${category.name}`}
                        >
                          Xem tất cả{' '}
                          <ArrowRightAltIcon className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                          <div
                            key={product._id}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={product.image || 'https://via.placeholder.com/300'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                              <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>
                              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                              <p className="text-lg font-bold text-red-600">{formatCurrency(product.price)}</p>
                              <div className="mt-3 flex justify-between items-center">
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    borderColor: '#dc2626',
                                    color: '#dc2626',
                                    '&:hover': { borderColor: '#b91c1c', backgroundColor: 'rgba(220, 38, 38, 0.04)' },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    borderRadius: '0.5rem',
                                  }}
                                  component={Link}
                                  to={`/product/${product._id}`}
                                >
                                  Xem Chi Tiết
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#dc2626',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#b91c1c' },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    borderRadius: '0.5rem',
                                  }}
                                  component={Link}
                                  to={`/checkout?product=${product._id}`}
                                >
                                  Mua Ngay
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {categories.find((cat) => cat.slug === activeTab)?.name}
                      </h2>
                      <Link
                        to="#"
                        className="flex items-center text-sm text-gray-800 hover:text-red-600 transition-colors font-medium group"
                        aria-label={`Xem tất cả sản phẩm trong danh mục ${
                          categories.find((cat) => cat.slug === activeTab)?.name
                        }`}
                      >
                        Xem tất cả{' '}
                        <ArrowRightAltIcon className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.map((product) => (
                        <div
                          key={product._id}
                          className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                              src={product.image || 'https://via.placeholder.com/300'}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(product.price)}</p>
                            <div className="mt-3 flex justify-between items-center">
                              <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderColor: '#dc2626',
                                  color: '#dc2626',
                                  '&:hover': { borderColor: '#b91c1c', backgroundColor: 'rgba(220, 38, 38, 0.04)' },
                                  textTransform: 'none',
                                  fontWeight: 500,
                                  borderRadius: '0.5rem',
                                }}
                                component={Link}
                                to={`/product/${product._id}`}
                              >
                                Xem Chi Tiết
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  backgroundColor: '#dc2626',
                                  color: '#fff',
                                  '&:hover': { backgroundColor: '#b91c1c' },
                                  textTransform: 'none',
                                  fontWeight: 500,
                                  borderRadius: '0.5rem',
                                }}
                                component={Link}
                                to={`/checkout?product=${product._id}`}
                              >
                                Mua Ngay
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {publicProducts.length === 0 && publicLoading !== 'pending' && (
                  <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                    <div className="text-6xl mb-6 opacity-30">🔍</div>
                    <p className="text-xl text-gray-600 mb-4">Không tìm thấy sản phẩm nào.</p>
                    <Button
                      variant="outlined"
                      onClick={handleResetFilters}
                      startIcon={<RestartAltIcon />}
                      sx={{
                        borderColor: '#dc2626',
                        color: '#dc2626',
                        '&:hover': { borderColor: '#b91c1c', backgroundColor: 'rgba(220, 38, 38, 0.04)' },
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1.5rem',
                      }}
                      aria-label="Xóa bộ lọc và xem lại sản phẩm"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                )}

                {totalPublicPages > 1 && (
                  <nav className="flex justify-center mt-10" aria-label="Phân trang">
                    <div className="inline-flex shadow-sm rounded-lg overflow-hidden">
                      {Array.from({ length: totalPublicPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => dispatch(setCurrentPublicPage(i + 1))}
                          className={`px-5 py-3 border border-gray-200 ${
                            i > 0 ? 'border-l-0' : ''
                          } ${
                            currentPublicPage === i + 1
                              ? 'bg-gray-800 text-white font-medium'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          } transition-colors`}
                          aria-current={currentPublicPage === i + 1 ? 'page' : undefined}
                          aria-label={`Trang ${i + 1}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gray-800 text-white mt-16 py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng Ký Nhận Thông Tin</h2>
          <p className="text-gray-300 mb-8">Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TextField
              placeholder="Email của bạn"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              className="bg-white rounded-lg max-w-md"
              InputProps={{
                style: {
                  borderRadius: 8,
                  height: 50,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                },
                'aria-label': 'Email để đăng ký nhận thông tin',
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#fff' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleNewsletterSubmit}
              sx={{
                backgroundColor: '#fff',
                color: '#111827',
                '&:hover': { backgroundColor: '#f3f4f6' },
                height: '50px',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                minWidth: '120px',
              }}
              aria-label="Đăng ký nhận thông tin"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryList;