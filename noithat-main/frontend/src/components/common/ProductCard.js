// src/components/common/ProductCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import placeholderImage from '../../assets/images/placeholder.png';

const ProductCard = ({ product }) => {
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const imageUrl = product.image
        ? `${backendUrl}${product.image}`
        : placeholderImage;

    // Calculate discounted price if in Flash Sale
    const discountedPrice = product.isFlashSale && product.discountPercentage > 0
        ? product.price - (product.price * product.discountPercentage) / 100
        : product.price;

    // State for countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Update countdown timer every second
    useEffect(() => {
        if (!product.isFlashSale || !product.saleEndDate) return;

        const calculateTimeLeft = () => {
            const endDate = new Date(product.saleEndDate).getTime();
            const now = new Date().getTime();
            const difference = endDate - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        calculateTimeLeft(); // Initial calculation
        const timer = setInterval(calculateTimeLeft, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on unmount
    }, [product.isFlashSale, product.saleEndDate]);

    // Check if Flash Sale is still active
    const isFlashSaleActive = product.isFlashSale && product.saleEndDate && new Date(product.saleEndDate) > new Date();

    return (
        <Card
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            style={{ border: '1px solid #e0e0e0' }}
        >
            {/* Flash Sale Badge */}
            {isFlashSaleActive && (
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 z-10">
                    <Typography variant="body2" className="font-bold tracking-wide">
                        FLASH SALE GIÁ SỐC
                    </Typography>
                </div>
            )}
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={product.name}
                className="object-cover pt-8 transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                }}
            />
            <CardContent className="p-4">
                <Typography
                    variant="h6"
                    component="div"
                    className="text-gray-800 font-semibold truncate"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}
                >
                    {product.name}
                </Typography>
                {isFlashSaleActive ? (
                    <div className="mt-2">
                        <Typography
                            variant="h6"
                            color="text.primary"
                            className="font-bold text-red-600"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            {discountedPrice.toLocaleString()}đ
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="line-through text-gray-500"
                        >
                            {product.price.toLocaleString()}đ -{product.discountPercentage}%
                        </Typography>
                    </div>
                ) : (
                    <Typography
                        variant="h6"
                        color="text.primary"
                        className="font-bold text-gray-800 mt-2"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        {product.price.toLocaleString()}đ
                    </Typography>
                )}
                {/* Flash Sale Countdown Timer and Remaining Slots */}
                {isFlashSaleActive && (
                    <div className="mt-2">
                        <Typography
                            variant="body2"
                            className="text-orange-600 font-semibold"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            Kết thúc sau: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </Typography>
                        <Typography
                            variant="body2"
                            className="text-white font-semibold mt-1 bg-orange-500 rounded-full px-3 py-1 inline-block"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            Còn {product.remainingFlashSaleSlots}/{product.totalFlashSaleSlots} suất
                        </Typography>
                    </div>
                )}
                {product.countInStock > 0 ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-green-600 mt-2"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Còn hàng
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-red-600 mt-2"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Hết hàng
                    </Typography>
                )}
            </CardContent>
            <CardActions className="justify-between px-4 pb-4">
                <Button
                    component={Link}
                    to={`/product/${product.slug || product._id}`}
                    variant="outlined"
                    color="primary"
                    size="small"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    style={{ fontFamily: 'Roboto, sans-serif', textTransform: 'none' }}
                >
                    Xem chi tiết
                </Button>
                <Button
                    component={Link}
                    to={`/product/${product.slug || product._id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    className="bg-blue-600 hover:bg-blue-700"
                    style={{ fontFamily: 'Roboto, sans-serif', textTransform: 'none' }}
                >
                    Mua ngay
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;