import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicProducts, setCurrentPublicPage } from '../../redux/slices/productSlice';
import { setCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Box, Pagination, Paper } from '@mui/material';
import api from '../../services/api';
import { FaShoppingCart } from 'react-icons/fa';

const ProductList = () => {
    const dispatch = useDispatch();
    const { publicProducts: products, publicLoading: loading, publicError: error, totalPublicPages: totalPages, currentPublicPage: currentPage } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
            keyword: '',
        category: '',
        sortBy: 'latest',
        price: { gte: '', lte: '' },
        status: '',
    });
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories?active=true');
                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                }
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const activeFilters = {};
        if (filters.keyword) activeFilters.keyword = filters.keyword;
        if (filters.category) activeFilters.category = filters.category;
        if (filters.price.gte) activeFilters['price[gte]'] = filters.price.gte;
        if (filters.price.lte) activeFilters['price[lte]'] = filters.price.lte;
        if (filters.status) activeFilters.status = filters.status;
        if (filters.sortBy) activeFilters.sortBy = filters.sortBy;

        dispatch(fetchPublicProducts({ page: localCurrentPage, filters: activeFilters }));
        if (localCurrentPage !== currentPage) {
            dispatch(setCurrentPublicPage(localCurrentPage));
        }
    }, [dispatch, filters, localCurrentPage]);

    useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setLocalCurrentPage(1);
    };

    const handlePriceChange = (key, value) => {
        const numericValue = value === '' ? '' : Number(value.replace(/[^0-9]/g, ''));
        if (!isNaN(numericValue)) {
            setFilters((prev) => ({ ...prev, price: { ...prev.price, [key]: numericValue } }));
            setLocalCurrentPage(1);
        }
    };

    const handleClearFilters = () => {
        setFilters({
            keyword: '',
            category: '',
            sortBy: 'latest',
            price: { gte: '', lte: '' },
            status: '',
        });
        setLocalCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setLocalCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = async (product) => {
        if (!user) {
            setSnackbar({ open: true, message: 'Vui lòng đăng nhập để thêm vào giỏ hàng', severity: 'warning' });
            return;
        }

        if (!product || !product._id) {
            setSnackbar({ open: true, message: 'Dữ liệu sản phẩm không hợp lệ.', severity: 'error' });
            return;
        }

        if (product.countInStock < 1) {
            setSnackbar({ open: true, message: 'Sản phẩm đã hết hàng.', severity: 'warning' });
            return;
        }

        try {
            const { data } = await api.post('/cart', { productId: product._id, qty: 1 });
            dispatch(setCart(data));
            setSnackbar({ open: true, message: 'Đã thêm vào giỏ hàng thành công', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Thêm vào giỏ hàng thất bại', severity: 'error' });
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Typography
                variant="h4"
                className="font-bold mb-6 text-center md:text-left"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}
            >
                Danh sách Sản phẩm
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: '88px' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                            Bộ lọc
                        </Typography>
                        <TextField
                            label="Tìm tên sản phẩm..."
                            variant="outlined"
                            fullWidth
                            value={filters.keyword}
                            onChange={(e) => handleFilterChange('keyword', e.target.value)}
                            sx={{ mb: 2 }}
                            size="small"
                        />
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} size="small">
                            <InputLabel>Danh mục</InputLabel>
                            <Select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                label="Danh mục"
                            >
                                <MenuItem value=""><em>Tất cả danh mục</em></MenuItem>
                                {categories.map((cat) => (
                                    <MenuItem key={cat._id} value={cat.slug}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                            Khoảng giá (VNĐ)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                label="Từ"
                                variant="outlined"
                                type="text"
                                inputMode='numeric'
                                value={filters.price.gte === '' ? '' : Number(filters.price.gte).toLocaleString('vi-VN')}
                                onChange={(e) => handlePriceChange('gte', e.target.value)}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Đến"
                                variant="outlined"
                                type="text"
                                inputMode='numeric'
                                value={filters.price.lte === '' ? '' : Number(filters.price.lte).toLocaleString('vi-VN')}
                                onChange={(e) => handlePriceChange('lte', e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Box>
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} size="small">
                            <InputLabel>Sắp xếp theo</InputLabel>
                            <Select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                label="Sắp xếp theo"
                            >
                                <MenuItem value="latest">Mới nhất</MenuItem>
                                <MenuItem value="price-asc">Giá: Thấp đến Cao</MenuItem>
                                <MenuItem value="price-desc">Giá: Cao đến Thấp</MenuItem>
                                <MenuItem value="rating">Đánh giá cao</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} size="small">
                            <InputLabel>Tình trạng</InputLabel>
                            <Select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                label="Tình trạng"
                            >
                                <MenuItem value=""><em>Tất cả</em></MenuItem>
                                <MenuItem value="In Stock">Còn hàng</MenuItem>
                                <MenuItem value="Out of Stock">Hết hàng</MenuItem>
                                <MenuItem value="New Arrival">Hàng mới về</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleClearFilters} sx={{ textTransform: 'none' }}>
                            Xóa bộ lọc
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9}>
                    {loading === 'pending' ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                            <LoadingSpinner />
                        </Box>
                    ) : error ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                            <Typography color="error">Lỗi tải sản phẩm: {error}</Typography>
                        </Box>
                    ) : products && products.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                            <Typography variant="h6" color="text.secondary">
                                Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Grid container spacing={3}>
                                {products.map((product) => (
                                    <Grid item key={product._id} xs={12} sm={6} lg={4}>
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <img
                                                src={product.image || 'placeholder-image-url'}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded-md mb-4"
                                            />
                                            <Typography variant="h6" className="font-semibold">{product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.price.toLocaleString()} VND
                                            </Typography>
                                            <div className="mt-4 flex space-x-2">
                                                <Link to={`/product/${product.slug || product._id}`}>
                                                    <Button variant="outlined" color="primary" size="small">
                                                        Xem chi tiết
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<FaShoppingCart />}
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.countInStock === 0}
                                                >
                                                    Thêm giỏ hàng
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={localCurrentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductList;