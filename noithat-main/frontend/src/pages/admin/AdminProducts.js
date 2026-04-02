// src/pages/admin/AdminAddProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import { fetchCategories } from '../../redux/slices/categorySlice'; // Import action fetchCategories
import { addProduct } from '../../redux/slices/productSlice'; // Import action addProduct
import LoadingSpinner from '../../components/common/LoadingSpinner'; // Import component loading (nếu có)

function AdminAddProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State cho ảnh preview
    const [status, setStatus] = useState('còn hàng');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy state từ Redux
    const { categories, loading: loadingCategories, error: errorCategories } = useSelector((state) => state.categories);
    const { adding: addingProduct, addProductError } = useSelector((state) => state.products); // Lấy trạng thái thêm SP và lỗi

    // Fetch categories khi component mount
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            // Tạo preview
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
        formData.append('quantity', quantity); // Gửi số lượng
        formData.append('category', category); // Gửi id hoặc tên category tùy backend
        formData.append('status', status); // Gửi trạng thái
        if (image) {
            formData.append('image', image);
        }

        // Dispatch action addProduct
        dispatch(addProduct(formData))
            .unwrap() // Sử dụng unwrap để xử lý kết quả promise (thành công/thất bại)
            .then(() => {
                console.log('Sản phẩm đã được thêm thành công');
                // Có thể hiển thị thông báo thành công
                navigate('/admin/products'); // Chuyển hướng về trang danh sách
            })
            .catch((error) => {
                console.error('Lỗi khi thêm sản phẩm:', error);
                // Lỗi đã được lưu trong addProductError, có thể hiển thị thông báo lỗi từ state
            });
    };

    return (
        // Sử dụng container và padding của Tailwind
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Thêm Sản Phẩm Mới</h2>

            {/* Hiển thị lỗi thêm sản phẩm */}
            {addProductError && (
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Lỗi! </strong>
                    <span className="block sm:inline">{addProductError}</span>
                </div>
            )}

            {/* Form với styling Tailwind */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {/* Tên sản phẩm */}
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

                {/* Mô tả */}
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

                {/* Giá và số lượng (trên cùng 1 hàng) */}
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

                {/* Danh mục */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Loại sản phẩm / Danh mục:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={loadingCategories === 'pending'} // Disable khi đang load category
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {loadingCategories === 'succeeded' && categories.map((cat) => (
                            // Giả sử category có _id và name
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                     {loadingCategories === 'pending' && <p className="text-sm text-gray-500 mt-1">Đang tải danh mục...</p>}
                     {errorCategories && <p className="text-sm text-red-600 mt-1">{errorCategories}</p>}
                </div>

                {/* Ảnh sản phẩm */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="Xem trước ảnh" className="h-32 w-auto object-cover rounded-md border border-gray-300" />
                        </div>
                    )}
                </div>

                 {/* Trạng thái */}
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
                                value="đang ẩn" // Hoặc giá trị khác tùy backend
                                checked={status === 'đang ẩn'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <span className="ml-2 text-sm text-gray-700">Đang ẩn</span>
                        </label>
                    </div>
                </div>

                {/* Nút Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={addingProduct === 'pending'} // Disable nút khi đang thêm
                        className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${addingProduct === 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {addingProduct === 'pending' ? (
                            <LoadingSpinner small white /> // Component loading nhỏ
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