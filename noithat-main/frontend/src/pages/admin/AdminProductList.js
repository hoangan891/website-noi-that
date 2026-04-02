// src/pages/admin/AdminProductList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAdminProducts, deleteProduct, setCurrentAdminPage } from '../../redux/slices/productSlice';
import {
  Container, Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Paper, Snackbar, Alert,
  Checkbox, Tabs, Tab, Pagination, CircularProgress, Avatar
} from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    adminProducts: products,
    adminLoading: loading,
    adminError: error,
    deleting,
    deleteProductError,
    totalAdminProducts: totalProducts,
    totalAdminPages: totalPages,
    currentAdminPage: currentPage
  } = useSelector((state) => state.products);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  const productsPerPage = 5;

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    } else {
      dispatch(fetchAdminProducts({ page: currentPage, limit: productsPerPage }));
    }
  }, [user, navigate, dispatch, currentPage]);

  const refreshData = (page = currentPage) => {
    dispatch(fetchAdminProducts({ page: page, limit: productsPerPage }));
    setSelectedProducts([]);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này? Hành động này không thể hoàn tác.')) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          setSnackbarMessage('Xóa sản phẩm thành công!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        })
        .catch((err) => {
          setSnackbarMessage(err || deleteProductError || 'Xóa sản phẩm thất bại');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && products) {
      const newSelecteds = products.map((n) => n._id);
      setSelectedProducts(newSelecteds);
      return;
    }
    setSelectedProducts([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedProducts.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelected = newSelected.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1),
      );
    }
    setSelectedProducts(newSelected);
  };

  const isSelected = (id) => selectedProducts.indexOf(id) !== -1;

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    dispatch(setCurrentAdminPage(1));
    refreshData(1);
  };

  const handleChangePage = (event, value) => {
    if (value !== currentPage) {
      dispatch(setCurrentAdminPage(value));
    }
  };

  if (!user || !user.isAdmin) {
    return <div className="text-center py-8">Bạn không có quyền truy cập trang này. Vui lòng <Link to="/login" className="text-blue-600 hover:underline">đăng nhập</Link> với tài khoản admin.</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Quản lý Sản phẩm
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/products/add"
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Thêm sản phẩm mới
          </Button>
        </Box>

        <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleChangeTab} aria-label="product status tabs">
            <Tab label={`Tất cả (${typeof totalProducts === 'number' ? totalProducts : '...'})`} />
          </Tabs>
        </Box>

        {loading === 'pending' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        )}

        {loading === 'failed' && deleting !== 'pending' && (
          <Alert severity="error" sx={{ mb: 2 }}>{error || 'Tải danh sách sản phẩm thất bại.'}</Alert>
        )}

        {loading !== 'pending' && (
          <>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 750 }} aria-label="product table" size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell padding="checkbox"><Checkbox color="primary" indeterminate={products && selectedProducts.length > 0 && selectedProducts.length < products.length} checked={products && products.length > 0 && selectedProducts.length === products.length} onChange={handleSelectAllClick} inputProps={{ 'aria-label': 'select all products' }} /></TableCell><TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Ảnh</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Tên sản phẩm</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Mã SP (SKU)</TableCell><TableCell sx={{ fontWeight: 'bold', textAlign:'center' }}>Kho</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Giá bán</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Danh mục</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products && products.length === 0 && loading === 'succeeded' ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                        Không có sản phẩm nào.
                        <Button component={Link} to="/admin/products/add" size="small" sx={{ ml: 1 }}>Thêm ngay</Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products && products.map((product) => {
                      const isItemSelected = isSelected(product._id);
                      const labelId = `product-checkbox-${product._id}`;
                      const imageUrl = product.image?.startsWith('/')
                        ? `${process.env.REACT_APP_API_URL || ''}${product.image}`
                        : product.image || '/images/placeholder.png';

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, product._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={product._id}
                          selected={isItemSelected}
                          sx={{ '& > *': { verticalAlign: 'middle', py: 1 }, cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(event) => handleClick(event, product._id)}
                            />
                          </TableCell>
                          <TableCell sx={{ p: 0.5 }}>
                            <Avatar
                              variant="rounded"
                              src={imageUrl}
                              alt={product.name}
                              sx={{ width: 50, height: 50 }}
                              imgProps={{ onError: (e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row">
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500, display: 'block' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.name || 'N/A'}
                            </Link>
                          </TableCell>
                          <TableCell>{product.sku || 'N/A'}</TableCell>
                          <TableCell align="center">{product.countInStock ?? 'N/A'}</TableCell>
                          <TableCell>{product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'N/A'}</TableCell>
                          <TableCell>{product.category?.name || 'N/A'}</TableCell>
                          <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                            <IconButton
                              component={Link}
                              to={`/admin/products/edit/${product._id}`}
                              size="small"
                              title="Sửa"
                              color="primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaEdit />
                            </IconButton>
                            <IconButton
                              onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product._id); }}
                              size="small"
                              title="Xóa"
                              color="error"
                              disabled={deleting === 'pending'}
                            >
                              <FaTrash />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {products && totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            key={`${snackbarSeverity}-${snackbarMessage}`}
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AdminProductList;