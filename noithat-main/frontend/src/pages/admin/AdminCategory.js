// frontend/src/pages/admin/AdminCategory.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Đảm bảo import api service
import {
    Container, Typography, Table, TableContainer, TableHead, TableBody,
    TableRow, TableCell, IconButton, Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle, Paper, Snackbar, Alert, Box, CircularProgress, Avatar
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';

const AdminCategory = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [openDialog, setOpenDialog] = useState(false); // Gộp dialog thêm/sửa
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ _id: null, name: '', image: null }); // State cho form
    const [selectedFile, setSelectedFile] = useState(null); // State cho file ảnh đã chọn
    const [imagePreview, setImagePreview] = useState(null); // State cho ảnh preview
    const fileInputRef = useRef(null); // Ref cho input file

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Base URL của API Backend từ biến môi trường
    // Cung cấp giá trị mặc định nếu biến môi trường không được set
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate]); // Chỉ chạy khi user hoặc navigate thay đổi

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            // Lấy dữ liệu từ API - Giả sử API trả về { image: '/uploads/filename.ext' }
            const response = await api.get('/categories'); // Sử dụng endpoint đúng
            setCategories(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể tải danh mục.');
            setSnackbarMessage(err.response?.data?.message || 'Không thể tải danh mục.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddDialog = () => {
        setIsEditMode(false);
        setCurrentCategory({ _id: null, name: '', image: null });
        setSelectedFile(null);
        setImagePreview(null);
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (category) => {
        setIsEditMode(true);
        setCurrentCategory({ // Giữ _id để biết đang sửa item nào
            _id: category._id,
            name: category.name,
            image: category.image // Giữ ảnh hiện tại (là đường dẫn tương đối)
        });
        setSelectedFile(null); // Reset file chọn mới
        // Hiển thị ảnh hiện tại bằng cách ghép Base URL
        const currentImageUrl = category.image ? `${API_URL}${category.image}` : null;
        setImagePreview(currentImageUrl);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Tạo preview từ file mới chọn (dạng base64)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
             setSelectedFile(null);
             // Nếu hủy chọn file khi sửa, quay về ảnh gốc (nếu có)
             const originalImageUrl = isEditMode && currentCategory.image ? `${API_URL}${currentCategory.image}` : null;
             setImagePreview(originalImageUrl);
        }
    };

    const handleSaveCategory = async () => {
        const formData = new FormData();
        formData.append('name', currentCategory.name);
        if (selectedFile) {
            // Key phải khớp với backend (multer field name) - 'categoryImage' theo code của bạn
            formData.append('categoryImage', selectedFile);
        }
        // Thêm các trường khác nếu cần
        // formData.append('slug', currentCategory.slug || '');
        // formData.append('description', currentCategory.description || '');

        setLoading(true); // Bắt đầu loading khi lưu

        try {
            if (isEditMode) {
                // Gọi API Update (PUT) - endpoint phải khớp backend
                await api.put(`/categories/${currentCategory._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // Gọi API Create (POST) - endpoint phải khớp backend
                await api.post('/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setSnackbarMessage(isEditMode ? 'Cập nhật danh mục thành công!' : 'Thêm danh mục thành công!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            fetchCategories(); // Tải lại danh sách
            handleCloseDialog();
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Lỗi khi lưu danh mục.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const handleOpenDeleteDialog = (id) => {
        setDeletingCategoryId(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeletingCategoryId(null);
        setOpenDeleteDialog(false);
    };

    const handleDeleteCategory = async () => {
        if (!deletingCategoryId) return;
        setLoading(true); // Bắt đầu loading khi xóa
        try {
            // Endpoint phải khớp backend
            await api.delete(`/categories/${deletingCategoryId}`);
            setSnackbarMessage('Xóa danh mục thành công!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            fetchCategories(); // Tải lại danh sách
            handleCloseDeleteDialog();
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Lỗi khi xóa danh mục.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
             setLoading(false); // Kết thúc loading
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    // Kiểm tra quyền sớm để tránh render không cần thiết
    if (!user || !user.isAdmin) {
        // Có thể hiển thị thông báo hoặc chuyển hướng ở đây thay vì return null
        return (
             <Container sx={{mt: 4}}>
                 <Alert severity="error">Bạn không có quyền truy cập trang này.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            <Box sx={{ px: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                        Quản lý Danh mục
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FaPlus />}
                        onClick={handleOpenAddDialog}
                        sx={{ textTransform: 'none' }}
                    >
                        THÊM DANH MỤC MỚI
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                         <CircularProgress />
                    </Box>
                )}

                {!loading && error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="category table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold', width: '100px' }}>Ảnh</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tên Danh mục</TableCell>
                                    {/* Thêm các cột khác nếu cần (Slug, Mô tả...) */}
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.length === 0 ? (
                                     <TableRow>
                                         <TableCell colSpan={3} align="center">Không có danh mục nào.</TableCell>
                                     </TableRow>
                                ) : (
                                    categories.map((category) => (
                                        <TableRow key={category._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>
                                                <Avatar
                                                    // SỬA Ở ĐÂY: Ghép Base URL vào trước đường dẫn ảnh tương đối
                                                    src={category.image ? `${API_URL}${category.image}` : '/placeholder.png'}
                                                    alt={category.name}
                                                    variant="rounded" // Hoặc "square"
                                                    sx={{ width: 56, height: 56 }}
                                                    // Xử lý lỗi nếu ảnh không tải được (ví dụ: URL sai, file bị xóa)
                                                    onError={(e) => {
                                                        console.error(`Failed to load image: ${e.target.src}`); // Log lỗi để debug
                                                        e.target.onerror = null; // Ngăn lặp vô hạn nếu placeholder cũng lỗi
                                                        e.target.src='/placeholder.png'; // Thay bằng ảnh placeholder
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">{category.name}</TableCell>
                                            {/* Hiển thị các cột khác */}
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleOpenEditDialog(category)} aria-label="edit">
                                                    <FaEdit color="#0073aa" />
                                                </IconButton>
                                                <IconButton onClick={() => handleOpenDeleteDialog(category._id)} aria-label="delete">
                                                    <FaTrash color="#dd3333" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            {/* Dialog thêm/sửa danh mục */}
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{isEditMode ? 'Sửa Danh mục' : 'Thêm Danh mục Mới'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name" // Thêm name attribute
                        label="Tên Danh mục"
                        type="text"
                        fullWidth
                        value={currentCategory.name}
                        onChange={handleInputChange}
                        required // Nên thêm required nếu tên là bắt buộc
                        sx={{ mb: 2 }}
                    />
                    {/* Thêm các input khác nếu cần (slug, description...) */}

                    {/* Input chọn ảnh */}
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            component="label" // Dùng label để input file ẩn hoạt động
                            startIcon={<FaImage />}
                        >
                            {selectedFile ? 'Đổi ảnh' : 'Chọn ảnh'}
                             <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </Button>
                        {imagePreview && (
                            <Avatar
                                src={imagePreview} // Hiển thị preview (có thể là base64 hoặc URL ảnh cũ)
                                alt="Preview"
                                variant="rounded"
                                sx={{ width: 56, height: 56 }}
                            />
                        )}
                        {!imagePreview && selectedFile && ( // Hiển thị tên file nếu không có preview (hiếm khi xảy ra với logic hiện tại)
                             <Typography sx={{ ml: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                 {selectedFile.name}
                             </Typography>
                        )}
                         {!imagePreview && !selectedFile && !isEditMode && (
                            <Typography color="textSecondary">Chưa chọn ảnh</Typography>
                         )}
                          {!imagePreview && !selectedFile && isEditMode && !currentCategory.image && (
                            <Typography color="textSecondary">Danh mục này chưa có ảnh</Typography>
                         )}

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Hủy
                    </Button>
                    {/* Disable nút lưu khi đang loading */}
                    <Button onClick={handleSaveCategory} color="primary" disabled={loading}>
                         {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Lưu' : 'Thêm')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xác nhận xóa */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận xóa danh mục?"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Hủy
                    </Button>
                     {/* Disable nút xóa khi đang loading */}
                    <Button onClick={handleDeleteCategory} color="error" autoFocus disabled={loading}>
                         {loading ? <CircularProgress size={24} color="error"/> : 'Xóa'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar thông báo */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminCategory;