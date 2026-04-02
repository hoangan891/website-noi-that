import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails, updateProduct, clearProductDetails } from '../../redux/slices/productSlice';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import api from '../../services/api';

const AdminEditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetails, loadingDetails, errorDetails, updating, updateProductError } = useSelector((state) => state.products);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [saleStartDate, setSaleStartDate] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  const [totalFlashSaleSlots, setTotalFlashSaleSlots] = useState('');
  const [remainingFlashSaleSlots, setRemainingFlashSaleSlots] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetails) {
      setName(productDetails.name || '');
      setPrice(productDetails.price || '');
      setDescription(productDetails.description || '');
      setCategory(productDetails.category?._id || '');
      setQuantity(productDetails.countInStock || '');
      setIsFlashSale(productDetails.isFlashSale || false);
      setDiscountPercentage(productDetails.discountPercentage || '');
      setSaleStartDate(productDetails.saleStartDate ? new Date(productDetails.saleStartDate).toISOString().slice(0, 16) : '');
      setSaleEndDate(productDetails.saleEndDate ? new Date(productDetails.saleEndDate).toISOString().slice(0, 16) : '');
      setTotalFlashSaleSlots(productDetails.totalFlashSaleSlots || '0');
      setRemainingFlashSaleSlots(productDetails.remainingFlashSaleSlots || '0');
    }
  }, [productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for Flash Sale fields
    if (isFlashSale) {
      const totalSlots = Number(totalFlashSaleSlots);
      const remainingSlots = Number(remainingFlashSaleSlots);

      if (!totalFlashSaleSlots || !remainingFlashSaleSlots) {
        alert('Vui lòng điền đầy đủ số suất Flash Sale.');
        return;
      }
      if (totalSlots < remainingSlots) {
        alert('Tổng suất Flash Sale phải lớn hơn hoặc bằng suất còn lại.');
        return;
      }
      if (totalSlots < 0 || remainingSlots < 0) {
        alert('Số suất Flash Sale không được âm.');
        return;
      }
      if (!discountPercentage || discountPercentage < 0 || discountPercentage > 100) {
        alert('Phần trăm giảm giá phải từ 0 đến 100.');
        return;
      }
      if (!saleStartDate || !saleEndDate) {
        alert('Ngày bắt đầu và kết thúc Flash Sale là bắt buộc.');
        return;
      }
      if (new Date(saleStartDate) >= new Date(saleEndDate)) {
        alert('Ngày kết thúc phải sau ngày bắt đầu.');
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('isFlashSale', isFlashSale.toString());
    if (isFlashSale) {
      formData.append('discountPercentage', discountPercentage);
      formData.append('saleStartDate', saleStartDate);
      formData.append('saleEndDate', saleEndDate);
      formData.append('totalFlashSaleSlots', totalFlashSaleSlots);
      formData.append('remainingFlashSaleSlots', remainingFlashSaleSlots);
    }
    if (image) {
      formData.append('image', image);
    }
    images.forEach((img) => {
      formData.append('images', img);
    });

    try {
      await dispatch(updateProduct({ id, formData })).unwrap();
      navigate('/admin/products');
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  if (loadingDetails === 'pending') return <Typography>Đang tải...</Typography>;
  if (errorDetails) return <Typography color="error">{errorDetails}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sửa sản phẩm
      </Typography>
      {updateProductError && (
        <Typography color="error" sx={{ mb: 2 }}>
          Lỗi! {updateProductError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Giá (VND)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Danh mục</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Số lượng"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Switch
            checked={isFlashSale}
            onChange={(e) => setIsFlashSale(e.target.checked)}
          />
          <Typography>Flash Sale</Typography>
        </Box>
        {isFlashSale && (
          <>
            <TextField
              label="Phần trăm giảm giá"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Ngày bắt đầu"
              type="datetime-local"
              value={saleStartDate}
              onChange={(e) => setSaleStartDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Ngày kết thúc"
              type="datetime-local"
              value={saleEndDate}
              onChange={(e) => setSaleEndDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Tổng suất Flash Sale"
              type="number"
              value={totalFlashSaleSlots}
              onChange={(e) => setTotalFlashSaleSlots(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Suất Flash Sale còn lại"
              type="number"
              value={remainingFlashSaleSlots}
              onChange={(e) => setRemainingFlashSaleSlots(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </>
        )}
        <Box sx={{ my: 2 }}>
          <Typography>Ảnh đại diện mới (nếu muốn thay đổi)</Typography>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography>Ảnh phụ mới (nếu muốn thay đổi)</Typography>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={updating === 'pending'}
        >
          {updating === 'pending' ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
        </Button>
      </form>
    </Box>
  );
};

export default AdminEditProduct;