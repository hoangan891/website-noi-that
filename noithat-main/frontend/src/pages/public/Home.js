// src/pages/public/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import api from '../../services/api';
import { setTopProducts } from '../../redux/slices/productSlice';
import { Snackbar, Alert, Typography, Button as MuiButton, Box, Container, Grid, Divider } from '@mui/material';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import userImage1 from '../../assets/anh1.jpg';
import userImage2 from '../../assets/anh2.jpg';
import userImage3 from '../../assets/anh3.jpg';

const Home = () => {
    const dispatch = useDispatch();
    const { topProducts } = useSelector((state) => state.products);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState({});

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
        const fetchAndSetTopProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/products');
                if (data && data.products && Array.isArray(data.products)) {
                    const flashSaleProducts = data.products.filter((p) => p.isFlashSale === true);
                    console.log("Dữ liệu từ API:", data.products);
                    console.log("Sản phẩm Flash Sale:", flashSaleProducts);

                    if (flashSaleProducts.length === 0) {
                        console.warn("Không có sản phẩm Flash Sale nào được tìm thấy.");
                        setSnackbarMessage('Không có sản phẩm Flash Sale nào.');
                        setSnackbarSeverity('warning');
                        setOpenSnackbar(true);
                    } else {
                        dispatch(setTopProducts(flashSaleProducts));
                    }
                } else {
                    console.error("Invalid data format received:", data);
                    setSnackbarMessage('Lỗi định dạng dữ liệu');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);

                    const mockFlashSaleProducts = [
                        { _id: '1', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 1', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image1.jpg' },
                        { _id: '2', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 2', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image2.jpg' },
                        { _id: '3', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 3', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image3.jpg' },
                        { _id: '4', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 4', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image4.jpg' },
                    ];
                    dispatch(setTopProducts(mockFlashSaleProducts));
                }
            } catch (err) {
                console.error("Failed to fetch or set top products:", err);
                setSnackbarMessage('Không thể tải sản phẩm nổi bật');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);

                const mockFlashSaleProducts = [
                    { _id: '1', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 1', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image1.jpg' },
                    { _id: '2', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 2', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image2.jpg' },
                    { _id: '3', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 3', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image3.jpg' },
                    { _id: '4', name: 'Kệ đựng gia vị nhiệt tầng bằng inox 4', price: 3160000, oldPrice: 4000000, isFlashSale: true, image: 'path/to/image4.jpg' },
                ];
                dispatch(setTopProducts(mockFlashSaleProducts));
            } finally {
                setLoading(false);
            }
        };
        fetchAndSetTopProducts();
    }, [dispatch]);

    useEffect(() => {
        const fetchProductsForCategories = async () => {
            const productsByCategory = {};
            for (const category of categories) {
                try {
                    const { data } = await api.get('/products', {
                        params: { category: category.slug, limit: 4 },
                    });
                    if (data && data.products && Array.isArray(data.products)) {
                        productsByCategory[category.slug] = data.products;
                    } else {
                        productsByCategory[category.slug] = [];
                    }
                } catch (err) {
                    console.error(`Failed to fetch products for category ${category.slug}:`, err);
                    productsByCategory[category.slug] = [];
                    setSnackbarMessage(`Không thể tải sản phẩm cho danh mục ${category.name}`);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                }
            }
            setCategoryProducts(productsByCategory);
        };
        if (categories.length > 0) {
            fetchProductsForCategories();
        }
    }, [categories]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    const bannerImages = [
        { url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80', title: 'Không Gian Sống Đẳng Cấp', subtitle: 'Khám phá bộ sưu tập nội thất tinh tế, kiến tạo tổ ấm hoàn hảo.' },
        { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80', title: 'Thiết Kế Hiện Đại', subtitle: 'Nâng tầm không gian với đường nét tinh tế và công năng vượt trội.' },
        { url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80', title: 'Chất Liệu Cao Cấp', subtitle: 'Trải nghiệm sự khác biệt với những vật liệu được chọn lọc kỹ lưỡng.' },
    ];

    const testimonials = [
        { 
            name: 'Nguyễn Thị Mai', 
            role: 'Khách hàng tại TP. HCM', 
            comment: 'Tôi hoàn toàn hài lòng với bộ sofa mà Minh Khang cung cấp. Chất lượng sản phẩm vượt xa mong đợi, dịch vụ giao hàng và lắp đặt chuyên nghiệp.', 
            rating: 5,
            image: userImage1 
        },
        { 
            name: 'Trần Văn Hoàng', 
            role: 'Chủ căn hộ tại Hà Nội', 
            comment: 'Đã mua toàn bộ nội thất phòng ngủ tại Minh Khang và rất ưng ý. Thiết kế hiện đại, chất lượng tốt và giá cả hợp lý.', 
            rating: 5,
            image: userImage2 
        },
        { 
            name: 'Lê Minh Tâm', 
            role: 'Nhà thiết kế nội thất', 
            comment: 'Là một nhà thiết kế, tôi thường xuyên giới thiệu khách hàng đến Minh Khang vì sự đa dạng và chất lượng sản phẩm của họ.', 
            rating: 5,
            image: userImage3 
        },
    ];

    return (
        <Box sx={{ bgcolor: '#FAFAFA' }}>
            {/* Logo and Banner Section */}
            <Box className="relative">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    spaceBetween={0} slidesPerView={1}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ 
                        clickable: true, 
                        dynamicBullets: true, 
                        renderBullet: (index, className) => `<span class="${className}" style="width: 10px; height: 10px;"></span>` 
                    }}
                    navigation={{ 
                        nextEl: '.swiper-button-next-custom', 
                        prevEl: '.swiper-button-prev-custom' 
                    }}
                    effect="fade" loop={true}
                >
                    {bannerImages.map((banner, index) => (
                        <SwiperSlide key={index} className="relative">
                            <Box sx={{ position: 'relative', height: { xs: '50vh', sm: '65vh', md: '80vh' }, width: '100%', overflow: 'hidden' }}>
                                <Box 
                                    component="img" 
                                    src={banner.url} 
                                    alt={`Banner ${index + 1}`} 
                                    sx={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover', 
                                        display: 'block', 
                                        filter: 'brightness(0.7)' 
                                    }} 
                                />
                                <Box sx={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.3))', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    color: 'white', 
                                    textAlign: 'center', 
                                    px: 4, 
                                    maxWidth: '1200px', 
                                    margin: '0 auto', 
                                    left: 0, 
                                    right: 0 
                                }}>
                                    <Typography 
                                        variant="h1" 
                                        component="h1" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, 
                                            mb: 2, 
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                                            fontFamily: '"Playfair Display", serif', 
                                            letterSpacing: '0.5px',
                                            marginTop: { xs: '60px', sm: '80px', md: '100px' } 
                                        }}
                                    > 
                                        {banner.title} 
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        component="p" 
                                        sx={{ 
                                            mb: 6, 
                                            maxWidth: '800px', 
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.5)', 
                                            fontWeight: 300, 
                                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } 
                                        }}
                                    > 
                                        {banner.subtitle} 
                                    </Typography>
                                    <MuiButton 
                                        component={Link} 
                                        to="/categories" // Changed to static /categories
                                        variant="contained" 
                                        color="primary" 
                                        size="large" 
                                        sx={{ 
                                            fontWeight: 500, 
                                            px: 6, 
                                            py: 1.5, 
                                            borderRadius: '0', 
                                            background: '#D2B48C', 
                                            '&:hover': { background: '#C19A6B' }, 
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                                            textTransform: 'none', 
                                            fontSize: '1.1rem' 
                                        }}
                                    > 
                                        Khám Phá Ngay 
                                    </MuiButton>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Box 
                    className="swiper-button-prev-custom" 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '16px',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.7)' },
                    }}
                > 
                    <FaChevronLeft size={24} /> 
                </Box>
                <Box 
                    className="swiper-button-next-custom" 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '16px',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.7)' },
                    }}
                > 
                    <FaChevronRight size={24} /> 
                </Box>
            </Box>

            {/* Collection Showcase Section */}
            <Box sx={{ py: 8, bgcolor: '#FAFAFA' }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h2" component="h2" sx={{ 
                            fontWeight: 700, 
                            mb: 2, 
                            fontFamily: '"Playfair Display", serif', 
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            color: '#333'
                        }}>
                            Không Gian Mơ Ước
                        </Typography>
                        <Divider sx={{ width: '80px', margin: '0 auto', borderColor: '#D2B48C', borderWidth: 2, mt: 2, mb: 4 }} />
                        <Typography variant="body1" sx={{ 
                            maxWidth: '900px', 
                            margin: '0 auto', 
                            color: '#666', 
                            lineHeight: 1.8,
                            fontSize: '1rem',
                            px: 2
                        }}>
                            Khám phá bộ sưu tập nội thất cao cấp của chúng tôi, nơi sự tinh tế hòa quyện cùng công năng vượt trội, 
                            tạo nên không gian sống đẳng cấp và độc đáo cho mọi gia đình.
                        </Typography>
                    </Box>

                    {/* Categories with Products */}
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Box key={category.slug} sx={{ mb: 8 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                    <Typography 
                                        variant="h4" 
                                        component="h3" 
                                        sx={{ 
                                            color: '#333', 
                                            fontWeight: 600,
                                            fontFamily: '"Playfair Display", serif',
                                        }}
                                    > 
                                        {category.name} 
                                    </Typography>
                                    <Link to="/categories" style={{ textDecoration: 'none' }}>
                                        <MuiButton 
                                            variant="outlined"
                                            sx={{ 
                                                color: '#333', 
                                                borderColor: '#D2B48C', 
                                                '&:hover': { 
                                                    borderColor: '#C19A6B', 
                                                    backgroundColor: '#D2B48C',
                                                    color: 'white'
                                                }, 
                                                textTransform: 'none', 
                                                borderRadius: '0', 
                                                px: 3
                                            }}
                                        > 
                                            Xem Tất Cả Sản Phẩm 
                                        </MuiButton>
                                    </Link>
                                </Box>
                                {categoryProducts[category.slug] && categoryProducts[category.slug].length > 0 ? (
                                    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                                        {categoryProducts[category.slug].map((product) => (
                                            <Grid 
                                                key={product._id} 
                                                item 
                                                xs={12} 
                                                sm={6} 
                                                md={3} 
                                                sx={{ display: 'flex', justifyContent: 'center' }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: '300px',
                                                        bgcolor: 'white',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        overflow: 'hidden',
                                                        transition: 'transform 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-5px)',
                                                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: '200px',
                                                            bgcolor: 'gray.100',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        <img
                                                            src={product.image || 'https://via.placeholder.com/300'}
                                                            alt={product.name}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                transition: 'transform 0.3s ease-in-out',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ p: 2 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: 'text.primary',
                                                                mb: 1,
                                                                textOverflow: 'ellipsis',
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {product.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: 'text.secondary',
                                                                mb: 2,
                                                                textOverflow: 'ellipsis',
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {product.description}
                                                        </Typography>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: 'error.main',
                                                                mb: 2,
                                                            }}
                                                        >
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(product.price)}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <MuiButton
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{
                                                                    borderColor: 'error.main',
                                                                    color: 'error.main',
                                                                    '&:hover': {
                                                                        borderColor: 'error.dark',
                                                                        bgcolor: 'rgba(220, 38, 38, 0.1)',
                                                                    },
                                                                    textTransform: 'none',
                                                                    fontWeight: 500,
                                                                    borderRadius: '4px',
                                                                }}
                                                                component={Link}
                                                                to={`/product/${product._id}`}
                                                            >
                                                                Xem Chi Tiết
                                                            </MuiButton>
                                                            <MuiButton
                                                                variant="contained"
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: 'error.main',
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        bgcolor: 'error.dark',
                                                                    },
                                                                    textTransform: 'none',
                                                                    fontWeight: 500,
                                                                    borderRadius: '4px',
                                                                }}
                                                                component={Link}
                                                                to={`/checkout?product=${product._id}`}
                                                            >
                                                                Mua Ngay
                                                            </MuiButton>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography sx={{ textAlign: 'center', mt: 4, color: '#666' }}>
                                        Không có sản phẩm nào trong danh mục này.
                                    </Typography>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ textAlign: 'center', color: '#666' }}>
                            Đang tải danh mục...
                        </Typography>
                    )}
                </Container>
            </Box>

            {/* Flash Sale Section */}
            {topProducts && topProducts.length > 0 && (
                <Box sx={{ bgcolor: '#FFF8F0', py: 8 }}>
                    <Container maxWidth="xl">
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography variant="h6" component="p" sx={{ color: '#FF7043', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.875rem' }}>
                                Flash Sale
                            </Typography>
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 3, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }, color: '#333' }}>
                                Sản Phẩm Giảm Giá Sốc
                            </Typography>
                            <Divider sx={{ width: '100px', margin: '0 auto', borderColor: '#FF7043', borderWidth: 2, mt: 2, mb: 4 }} />
                        </Box>
                        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                            {topProducts.map((product) => (
                                <Grid key={product._id} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            maxWidth: '280px',
                                            bgcolor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: '200px',
                                                bgcolor: 'gray.100',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={product.image || 'https://via.placeholder.com/300'}
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease-in-out',
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ p: 3 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#333',
                                                    mb: 1,
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    mb: 2,
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {product.description}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#FF7043',
                                                    mb: 2,
                                                }}
                                            >
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.price)}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                                <MuiButton
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderColor: '#FF7043',
                                                        color: '#FF7043',
                                                        '&:hover': {
                                                            borderColor: '#FF5722',
                                                            bgcolor: 'rgba(255, 112, 67, 0.1)',
                                                        },
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        borderRadius: '4px',
                                                        px: 2,
                                                        py: 1,
                                                    }}
                                                    component={Link}
                                                    to={`/product/${product._id}`}
                                                >
                                                    Xem Chi Tiết
                                                </MuiButton>
                                                <MuiButton
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#FF7043',
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: '#FF5722',
                                                        },
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        borderRadius: '4px',
                                                        px: 2,
                                                        py: 1,
                                                    }}
                                                    component={Link}
                                                    to={`/checkout?product=${product._id}`}
                                                >
                                                    Mua Ngay
                                                </MuiButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            )}

            {/* Highlight Product Section */}
            <Box sx={{ bgcolor: '#F0EAE0', py: 10 }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h6" component="p" sx={{ color: '#D2B48C', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}> Sản Phẩm Nổi Bật </Typography>
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' } }}> Sản Phẩm Nổi Bật </Typography>
                        <Divider sx={{ width: '80px', margin: '0 auto', borderColor: '#D2B48C', borderWidth: 2, mt: 2, mb: 4 }} />
                    </Box>
                    {loading ? (
                        <Typography textAlign="center">Đang tải sản phẩm...</Typography>
                    ) : topProducts && topProducts.length > 0 ? (
                        <Box sx={{ position: 'relative' }}>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={24}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                navigation={{ 
                                    nextEl: '.swiper-button-next-custom', 
                                    prevEl: '.swiper-button-prev-custom' 
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 },
                                }}
                            >
                                {topProducts.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                maxWidth: '300px',
                                                bgcolor: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                overflow: 'hidden',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                                },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '100%',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: '200px',
                                                    bgcolor: 'gray.100',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <img
                                                    src={product.image || 'https://via.placeholder.com/300'}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.3s ease-in-out',
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ p: 2 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: 'text.primary',
                                                        mb: 1,
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        mb: 2,
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {product.description}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'error.main',
                                                        mb: 2,
                                                    }}
                                                >
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(product.price)}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                                    <MuiButton
                                                        variant="outlined"
                                                        size="medium"
                                                        sx={{
                                                            borderColor: '#D2B48C',
                                                            color: '#D2B48C',
                                                            '&:hover': {
                                                                borderColor: '#C19A6B',
                                                                bgcolor: 'rgba(210, 180, 140, 0.1)',
                                                            },
                                                            textTransform: 'none',
                                                            fontWeight: 500,
                                                            borderRadius: '4px',
                                                            px: 3,
                                                            py: 1,
                                                        }}
                                                        component={Link}
                                                        to={`/product/${product._id}`}
                                                    >
                                                        Xem Chi Tiết
                                                    </MuiButton>
                                                    <MuiButton
                                                        variant="contained"
                                                        size="medium"
                                                        sx={{
                                                            bgcolor: '#D2B48C',
                                                            color: 'white',
                                                            '&:hover': {
                                                                bgcolor: '#C19A6B',
                                                            },
                                                            textTransform: 'none',
                                                            fontWeight: 500,
                                                            borderRadius: '4px',
                                                            px: 3,
                                                            py: 1,
                                                        }}
                                                        component={Link}
                                                        to={`/checkout?product=${product._id}`}
                                                    >
                                                        Mua Ngay
                                                    </MuiButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Box 
                                className="swiper-button-prev-custom" 
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '16px',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    width: '48px',
                                    height: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(210, 180, 140, 0.3)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'rgba(210, 180, 140, 0.5)' },
                                }}
                            > 
                                <FaChevronLeft size={24} /> 
                            </Box>
                            <Box 
                                className="swiper-button-next-custom" 
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '16px',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    width: '48px',
                                    height: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(210, 180, 140, 0.3)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'rgba(210, 180, 140, 0.5)' },
                                }}
                            > 
                                <FaChevronRight size={24} /> 
                            </Box>
                        </Box>
                    ) : (
                        <Typography textAlign="center">Hiện không có sản phẩm nổi bật.</Typography>
                    )}
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <MuiButton component={Link} to="/categories" variant="contained" sx={{ bgcolor: '#D2B48C', color: 'white', '&:hover': { bgcolor: '#C19A6B' }, px: 4, py: 1.5, textTransform: 'none', borderRadius: '0' }}> Xem Tất Cả Sản Phẩm </MuiButton>
                    </Box>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h6" component="p" sx={{ color: '#D2B48C', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}> Khách Hàng Nói Gì </Typography>
                    <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' } }}> Trải Nghiệm Khách Hàng </Typography>
                    <Divider sx={{ width: '80px', margin: '0 auto', borderColor: '#D2B48C', borderWidth: 2, mt: 2, mb: 4 }} />
                </Box>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={24} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 5000 }}
                    breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <Box sx={{ p: 5, bgcolor: 'white', height: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderBottom: '3px solid #D2B48C', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                    <Box 
                                        component="img" 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        sx={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid #D2B48C'
                                        }}
                                    />
                                </Box>
                                <FaQuoteLeft style={{ fontSize: '30px', color: '#D2B48C', marginBottom: '20px' }} />
                                <Typography variant="body1" sx={{ flex: 1, mb: 4, color: '#555', lineHeight: 1.8, fontStyle: 'italic' }}> "{testimonial.comment}" </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    {[...Array(testimonial.rating)].map((_, i) => ( <FaStar key={i} style={{ color: '#FFD700', marginRight: '2px' }} /> ))}
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}> {testimonial.name} </Typography>
                                <Typography variant="body2" sx={{ color: '#777' }}> {testimonial.role} </Typography>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>

            {/* Value Proposition Section */}
            <Box sx={{ bgcolor: '#122340', color: 'white', py: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h6" component="p" sx={{ color: '#D2B48C', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}> Giá Trị Cốt Lõi </Typography>
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, color: 'white' }}> Vì Sao Chọn Minh Khang? </Typography>
                        <Divider sx={{ width: '80px', margin: '0 auto', borderColor: '#D2B48C', borderWidth: 2, mt: 2, mb: 4 }} />
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ fontSize: 50, color: '#D2B48C', mb: 3 }}>🌟</Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'white' }}> Chất Lượng Vượt Trội </Typography>
                                <Typography sx={{ color: '#CCC', lineHeight: 1.8 }}> Cam kết sử dụng vật liệu cao cấp từ các nguồn uy tín trên thế giới, quy trình sản xuất nghiêm ngặt và kiểm soát chất lượng toàn diện. </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ fontSize: 50, color: '#D2B48C', mb: 3 }}>🎨</Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'white' }}> Thiết Kế Đẳng Cấp </Typography>
                                <Typography sx={{ color: '#CCC', lineHeight: 1.8 }}> Đội ngũ thiết kế giàu kinh nghiệm, không ngừng cập nhật xu hướng mới nhất, sáng tạo những sản phẩm độc đáo và tinh tế. </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ fontSize: 50, color: '#D2B48C', mb: 3 }}>🚚</Box>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'white' }}> Dịch Vụ Tận Tâm </Typography>
                                <Typography sx={{ color: '#CCC', lineHeight: 1.8 }}> Tư vấn chuyên nghiệp, giao hàng nhanh chóng, lắp đặt tận nơi và chế độ bảo hành uy tín giúp khách hàng an tâm tuyệt đối. </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ py: 10, background: 'url(https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80) center/cover no-repeat', position: 'relative' }}>
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.7)' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Playfair Display", serif' }}> Đăng Ký Nhận Tin </Typography>
                        <Typography sx={{ mb: 4, color: '#DDD' }}> Nhận thông báo về bộ sưu tập mới nhất và các ưu đãi đặc biệt </Typography>
                        <Box component="form" sx={{ display: 'flex', maxWidth: '500px', margin: '0 auto' }}>
                            <input type="email" placeholder="Nhập email của bạn" className="flex-grow p-3 rounded-l text-gray-800 focus:outline-none w-full" style={{ border: 'none' }} />
                            <MuiButton type="submit" sx={{ bgcolor: '#D2B48C', color: 'white', '&:hover': { bgcolor: '#C19A6B' }, px: 4, borderRadius: '0 4px 4px 0', textTransform: 'none' }}> Đăng Ký </MuiButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Snackbar */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} 
                onClose={handleCloseSnackbar} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}> 
                    {snackbarMessage} 
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;