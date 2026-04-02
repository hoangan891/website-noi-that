import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Giả định bạn đã cấu hình axios
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    IconButton,
    Switch,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material';

const AdminCategory = () => {
    const { user } = useSelector((state) => state.auth); // Lấy thông tin user từ Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', slug: '', image: '', status: true });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    // Kiểm tra quyền admin
    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login'); // Chuyển hướng nếu không phải admin
        } else {
            fetchCategories();
        }
    }, [user, navigate, page, searchKeyword, filterStatus]);

    // Lấy danh sách danh mục từ API
    const fetchCategories = async () => {
        try {
            const params = {
                page: page - 1, // Backend thường dùng page 0-based
                limit: itemsPerPage,
                keyword: searchKeyword,
                status: filterStatus,
            };
            const { data, total } = await api.get('/api/categories', { params });
            setCategories(data);
            setTotalItems(total);
        } catch (err) {
            setSnackbarMessage('Không thể tải danh mục');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Mở dialog để thêm hoặc sửa danh mục
    const handleOpenDialog = (category = { name: '', slug: '', image: '', status: true }) => {
        setCurrentCategory(category);
        setIsEdit(!!category._id); // Nếu có _id thì là edit
        setOpenDialog(true);
        setSelectedImage(null); // Reset ảnh khi mở dialog
    };

    // Đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentCategory({ name: '', slug: '', image: '', status: true });
        setSelectedImage(null);
    };

    // Xử lý thay đổi input trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi ảnh đại diện
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        // Optionally display a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentCategory((prev) => ({ ...prev, image: reader.result }));
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setCurrentCategory((prev) => ({ ...prev, image: '' }));
        }
    };

    // Thêm hoặc sửa danh mục
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', currentCategory.name);
            formData.append('slug', currentCategory.slug);
            formData.append('status', currentCategory.status);
            if (selectedImage) {
                formData.append('image', selectedImage);
            } else if (currentCategory.image && !isEdit) {
                formData.append('image', currentCategory.image); // Nếu là thêm mới và có base64 image
            }

            if (isEdit) {
                // Sửa danh mục
                const { data } = await api.put(`/api/categories/${currentCategory._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setCategories((prevCategories) =>
                    prevCategories.map((cat) => (cat._id === data._id ? data : cat))
                );
                setSnackbarMessage('Cập nhật danh mục thành công');
            } else {
                // Thêm danh mục mới
                const { data } = await api.post('/api/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setCategories((prevCategories) => [...prevCategories, data]);
                setSnackbarMessage('Thêm danh mục thành công');
            }
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            handleCloseDialog();
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Lỗi khi lưu danh mục');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
            try {
                await api.delete(`/api/categories/${id}`);
                setCategories((prevCategories) => prevCategories.filter((cat) => cat._id !== id));
                setSnackbarMessage('Xóa danh mục thành công');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } catch (err) {
                setSnackbarMessage(err.response?.data?.message || 'Lỗi khi xóa danh mục');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    // Thay đổi trạng thái danh mục
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/api/categories/${id}`, { status: newStatus });
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat._id === id ? { ...cat, status: newStatus } : cat))
            );
            setSnackbarMessage(`Đã ${newStatus ? 'kích hoạt' : 'ẩn'} danh mục`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Xử lý tìm kiếm
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
        setPage(1); // Reset về trang đầu tiên khi tìm kiếm
    };

    // Xử lý lọc theo trạng thái
    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
        setPage(1); // Reset về trang đầu tiên khi lọc
    };

    // Xử lý thay đổi trang
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Đóng snackbar
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Quản lý danh mục</h1>

            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FaPlus />}
                    onClick={() => handleOpenDialog()}
                >
                    Thêm danh mục mới
                </Button>

                <div className="flex items-center space-x-4">
                    <TextField
                        label="Tìm kiếm theo tên"
                        variant="outlined"
                        size="small"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                    <FormControl variant="outlined" size="small">
                        <InputLabel id="status-filter-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            id="status-filter"
                            value={filterStatus}
                            onChange={handleFilterStatusChange}
                            label="Trạng thái"
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value={true}>Đang dùng</MenuItem>
                            <MenuItem value={false}>Ẩn</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Bảng danh mục */}
            <TableContainer component={Paper} className="shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold">Ảnh đại diện</TableCell>
                            <TableCell className="font-bold">Tên danh mục</TableCell>
                            <TableCell className="font-bold">Slug</TableCell>
                            <TableCell className="font-bold">Trạng thái</TableCell>
                            <TableCell className="font-bold">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Chưa có danh mục nào
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow key={category._id}>
                                    <TableCell>
                                        {category.image && (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevent infinite loop
                                                    e.target.src = '/assets/images/placeholder.png'; // Placeholder image
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={category.status}
                                            onChange={(e) => handleStatusChange(category._id, e.target.checked)}
                                            color="primary"
                                            name={`status-${category._id}`}
                                            id={`status-${category._id}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleOpenDialog(category)}
                                            aria-label="edit"
                                        >
                                            <FaEdit />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(category._id)}
                                            aria-label="delete"
                                        >
                                            <FaTrash />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Phân trang */}
            {totalItems > itemsPerPage && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        count={Math.ceil(totalItems / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}

            {/* Dialog thêm/sửa danh mục */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEdit ? 'Sửa danh mục' : 'Thêm danh mục mới'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên danh mục"
                        name="name"
                        value={currentCategory.name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Slug"
                        name="slug"
                        value={currentCategory.slug}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        helperText="Để trống nếu muốn tự động tạo từ tên"
                    />
                    <div className="mt-4">
                        <InputLabel htmlFor="image-upload">Ảnh đại diện</InputLabel>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="w-full mt-1"
                            onChange={handleImageChange}
                        />
                        {currentCategory.image && (
                            <img
                                src={currentCategory.image}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded mt-2"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = '/assets/images/placeholder.png'; // Placeholder image
                                }}
                            />
                        )}
                    </div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentCategory.status}
                                onChange={(e) => setCurrentCategory({...currentCategory, status: e.target.checked})}
                                name="status"
                                color="primary"
                            />
                        }
                        label="Hiển thị"
                        className="mt-2"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="inherit">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {isEdit ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar thông báo */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AdminCategory;