// src/pages/admin/AdminAddProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { addProduct } from '../../redux/slices/productSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function AdminAddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('còn hàng');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [saleStartDate, setSaleStartDate] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading: loadingCategories, error: errorCategories } = useSelector((state) => state.categories);
  const { adding: addingProduct, addProductError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('status', status);
    formData.append('isFlashSale', isFlashSale);
    if (isFlashSale) {
      formData.append('discountPercentage', discountPercentage);
      formData.append('saleStartDate', saleStartDate);
      formData.append('saleEndDate', saleEndDate);
    }
    if (image) {
      formData.append('image', image);
    }

    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        console.log('Sản phẩm đã được thêm thành công');
        navigate('/admin/products');
      })
      .catch((error) => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>

      {addProductError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Lỗi! </strong>
          <span className="block sm:inline">{addProductError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết:</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Giá bán:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Số lượng:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Loại sản phẩm / Danh mục:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={loadingCategories === 'pending'}
          >
            <option value="">-- Chọn danh mục --</option>
            {loadingCategories === 'succeeded' && categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {loadingCategories === 'pending' && <p className="text-sm text-gray-500 mt-1">Đang tải danh mục...</p>}
          {errorCategories && <p className="text-sm text-red-600 mt-1">{errorCategories}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Xem trước ảnh" className="h-32 w-auto object-cover rounded-md border border-gray-300" />
            </div>
          )}
        </div>

        {/* Flash Sale Fields */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isFlashSale}
              onChange={(e) => setIsFlashSale(e.target.checked)}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Flash Sale</span>
          </label>
        </div>

        {isFlashSale && (
          <>
            <div className="mb-4">
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">Phần trăm giảm giá:</label>
              <input
                type="number"
                id="discountPercentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
                min="0"
                max="100"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="saleStartDate" className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu Flash Sale:</label>
                <input
                  type="date"
                  id="saleStartDate"
                  value={saleStartDate}
                  onChange={(e) => setSaleStartDate(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="saleEndDate" className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc Flash Sale:</label>
                <input
                  type="date"
                  id="saleEndDate"
                  value={saleEndDate}
                  onChange={(e) => setSaleEndDate(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái:</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                value="còn hàng"
                checked={status === 'còn hàng'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-700">Còn hàng</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                value="hết hàng"
                checked={status === 'hết hàng'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-700">Hết hàng</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                value="đang ẩn"
                checked={status === 'đang ẩn'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-700">Đang ẩn</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={addingProduct === 'pending'}
            className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${addingProduct === 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {addingProduct === 'pending' ? (
              <LoadingSpinner small white />
            ) : (
              'Thêm Sản Phẩm'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddProduct;