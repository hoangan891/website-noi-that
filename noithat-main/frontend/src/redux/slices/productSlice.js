import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // Đảm bảo đường dẫn đúng

// --- Async Thunks ---

// Fetch public products with filters (for CategoryList)
export const fetchPublicProducts = createAsyncThunk(
  'products/fetchPublicProducts',
  async ({ page = 1, filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products', {
        params: {
          pageNumber: page,
          ...filters, // Includes keyword, sortBy, price[gte], price[lte], isFlashSale, category, status
        },
      });
      if (!data || !Array.isArray(data.products)) {
        throw new Error('Dữ liệu trả về từ API không hợp lệ');
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Không thể tải sản phẩm';
      return rejectWithValue(message);
    }
  }
);

// Fetch products with filters (for Admin)
export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async ({ page = 1, limit = 5, filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products', { // Assuming admin also uses the same endpoint with auth
        params: {
          pageNumber: page, // API của bạn có thể dùng page hoặc pageNumber
          limit,
          ...filters,
        },
      });
       if (!data || !Array.isArray(data.products)) {
         throw new Error('Dữ liệu trả về từ API không hợp lệ');
       }
      return data; // API nên trả về { products, page, pages, totalProducts } cho admin
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Không thể tải sản phẩm (admin)';
      return rejectWithValue(message);
    }
  }
);


// Fetch product details (for edit page or product detail page)
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (idOrSlug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${idOrSlug}`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Không thể tải chi tiết sản phẩm';
      return rejectWithValue(message);
    }
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Optional: Có thể fetch lại trang 1 hoặc không làm gì cả, để AdminProductList tự fetch lại
      // dispatch(fetchAdminProducts({ page: 1, limit: 5 }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Thêm sản phẩm thất bại';
      return rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, formData }, { rejectWithValue, dispatch, getState }) => {
    if (!id) {
      return rejectWithValue('Missing product ID for update');
    }
    try {
      const { data } = await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Optional: Fetch lại trang hiện tại của admin list
      // const { currentPage } = getState().products;
      // dispatch(fetchAdminProducts({ page: currentPage, limit: 5 }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Cập nhật sản phẩm thất bại';
      return rejectWithValue(message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue, dispatch, getState }) => {
    try {
      await api.delete(`/products/${productId}`);
      // Optional: Fetch lại trang admin, xử lý nếu xóa hết item trang cuối
      // const { currentPage, products } = getState().products.adminProductList; // Giả sử state admin khác
      // const pageToFetch = products.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      // dispatch(fetchAdminProducts({ page: pageToFetch, limit: 5 }));
      return productId; // Trả về ID để reducer biết xóa sản phẩm nào khỏi state
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Xóa sản phẩm thất bại';
      return rejectWithValue(message);
    }
  }
);

// <<<--- THÊM THUNK MỚI CHO TÌM KIẾM ---<<<
export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (keyword, { rejectWithValue }) => {
        if (!keyword || !keyword.trim()) {
            return { products: [] }; // Trả về mảng rỗng nếu không có keyword
        }
        try {
            // Gọi API search mới
            const { data } = await api.get(`/products/search?keyword=${keyword}`);
            return data; // API nên trả về { products: [...] }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Lỗi khi tìm kiếm sản phẩm';
            return rejectWithValue(message);
        }
    }
);


// --- Slice Definition ---

const initialState = {
  // State cho danh sách sản phẩm công khai (CategoryList, Home)
  publicProducts: [],
  publicLoading: 'idle',
  publicError: null,
  totalPublicProducts: 0,
  totalPublicPages: 1,
  currentPublicPage: 1,

  // State cho danh sách sản phẩm admin (AdminProductList)
  adminProducts: [], // Đổi tên từ 'products' để rõ ràng hơn
  adminLoading: 'idle', // Đổi tên từ 'loading'
  adminError: null, // Đổi tên từ 'error'
  totalAdminProducts: 0, // Đổi tên
  totalAdminPages: 1, // Đổi tên
  currentAdminPage: 1, // Đổi tên

  // State cho chi tiết sản phẩm (ProductDetail, AdminEditProduct)
  productDetails: null,
  loadingDetails: 'idle',
  errorDetails: null,

  // State cho các hành động CUD (Admin)
  adding: 'idle',
  addProductError: null,
  updating: 'idle',
  updateProductError: null,
  deleting: 'idle',
  deleteProductError: null,

  // State cho Top Products (Home)
  topProducts: [],
  loadingTopProducts: 'idle',
  errorTopProducts: null,

  // >>>--- THÊM STATE MỚI CHO SEARCH RESULTS ---<<<
  searchResults: [],
  searchLoading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  searchError: null,
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducers để cập nhật trang hiện tại (nếu dùng pagination control riêng)
    setCurrentAdminPage: (state, action) => {
      state.currentAdminPage = action.payload;
    },
    setCurrentPublicPage: (state, action) => {
      state.currentPublicPage = action.payload;
    },
    // Reducer để set top products (nếu fetch ở component khác)
    setTopProducts: (state, action) => {
      state.topProducts = action.payload || [];
    },
    // Clear chi tiết sản phẩm khi rời trang edit/detail
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.loadingDetails = 'idle';
      state.errorDetails = null;
    },
    // >>>--- THÊM REDUCER ĐỂ CLEAR KẾT QUẢ TÌM KIẾM ---<<<
    clearSearchResults: (state) => {
        state.searchResults = [];
        state.searchLoading = 'idle';
        state.searchError = null;
    },
    // Reset trạng thái lỗi CUD
    resetCUDStatus: (state) => {
        state.adding = 'idle';
        state.addProductError = null;
        state.updating = 'idle';
        state.updateProductError = null;
        state.deleting = 'idle';
        state.deleteProductError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Public Products ---
      .addCase(fetchPublicProducts.pending, (state) => {
        state.publicLoading = 'pending';
        state.publicError = null;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.publicLoading = 'succeeded';
        state.publicProducts = action.payload?.products || [];
        state.totalPublicProducts = action.payload?.count || 0; // API của bạn có thể trả về 'count'
        state.totalPublicPages = action.payload?.pages || 1;
        state.currentPublicPage = action.payload?.page || state.currentPublicPage;
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.publicLoading = 'failed';
        state.publicError = action.payload;
      })
      // --- Fetch Admin Products ---
      .addCase(fetchAdminProducts.pending, (state) => {
        state.adminLoading = 'pending';
        state.adminError = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.adminLoading = 'succeeded';
        state.adminProducts = action.payload?.products || [];
        state.totalAdminProducts = action.payload?.totalProducts || 0; // API của bạn có thể trả về 'totalProducts'
        state.totalAdminPages = action.payload?.totalPages || 1;
        state.currentAdminPage = action.payload?.page || state.currentAdminPage;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.adminLoading = 'failed';
        state.adminError = action.payload;
      })
      // --- Fetch Product Details ---
      .addCase(fetchProductDetails.pending, (state) => {
        state.loadingDetails = 'pending';
        state.errorDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loadingDetails = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loadingDetails = 'failed';
        state.errorDetails = action.payload;
      })
      // --- Add Product ---
      .addCase(addProduct.pending, (state) => {
        state.adding = 'pending';
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.adding = 'succeeded';
        // Không cần thêm vào list ở đây vì AdminProductList sẽ fetch lại
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.adding = 'failed';
        state.addProductError = action.payload;
      })
      // --- Update Product ---
      .addCase(updateProduct.pending, (state) => {
        state.updating = 'pending';
        state.updateProductError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = 'succeeded';
        // Cập nhật trong admin list nếu cần thiết ngay lập tức
        // const index = state.adminProducts.findIndex((p) => p._id === action.payload?._id);
        // if (index !== -1 && action.payload) {
        //   state.adminProducts[index] = action.payload;
        // }
        // Cập nhật details nếu đang xem trang edit
        if (state.productDetails?._id === action.payload?._id) {
          state.productDetails = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = 'failed';
        state.updateProductError = action.payload;
      })
      // --- Delete Product ---
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = 'pending';
        state.deleteProductError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = 'succeeded';
        // Xóa khỏi admin list nếu cần thiết ngay lập tức
        // state.adminProducts = state.adminProducts.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = 'failed';
        state.deleteProductError = action.payload;
      })

      // >>>--- THÊM ADDCASE CHO SEARCH THUNK ---<<<
      .addCase(searchProducts.pending, (state) => {
          state.searchLoading = 'pending';
          state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
          state.searchLoading = 'succeeded';
          state.searchResults = action.payload?.products || []; // API trả về { products: [...] }
      })
      .addCase(searchProducts.rejected, (state, action) => {
          state.searchLoading = 'failed';
          state.searchError = action.payload;
      });
  },
});

// Export actions và reducer
export const {
    setCurrentAdminPage,
    setCurrentPublicPage,
    setTopProducts,
    clearProductDetails,
    clearSearchResults, // <<<--- Export action mới
    resetCUDStatus
} = productSlice.actions;

export default productSlice.reducer;