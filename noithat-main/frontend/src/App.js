import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Typography } from '@mui/material';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Page Components
import Home from './pages/public/Home';
import CategoryList from './pages/public/CategoryList';
import ProductDetail from './pages/public/ProductDetail';
import Cart from './pages/public/Cart';
import About from './pages/public/About';
import SearchResults from './pages/public/SearchResults';
import Checkout from './pages/public/Checkout';
import OrderSuccess from './pages/public/OrderSuccess';

// Auth Page Components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Page Components
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';

// Admin Page Components
import AdminHome from './pages/admin/AdminHome';
import AdminProductList from './pages/admin/AdminProductList';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminCategory from './pages/admin/AdminCategory';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import OrderManagement from './pages/admin/OrderManagement';

// Protected Route Component
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { user, token } = useSelector((state) => state.auth);
  console.log('ProtectedRoute - user:', user, 'token:', token); // Add debugging
  if (!token) {
    console.log('Redirecting to /login - No token');
    return <Navigate to="/login" replace />;
  }
  if (isAdmin && !user?.isAdmin) {
    console.log('Redirecting to / - Not admin');
    return <Navigate to="/" replace />;
  }
  return children;
};

// Default Layout for public pages
const DefaultLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path="/categories" element={<DefaultLayout><CategoryList /></DefaultLayout>} />
          <Route path="/product/:idOrSlug" element={<DefaultLayout><ProductDetail /></DefaultLayout>} />
          <Route path="/cart" element={<DefaultLayout><Cart /></DefaultLayout>} />
          <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
          <Route path="/search" element={<DefaultLayout><SearchResults /></DefaultLayout>} />
          <Route path="/checkout" element={<DefaultLayout><ProtectedRoute><Checkout /></ProtectedRoute></DefaultLayout>} />
          <Route path="/order-success/:orderId" element={<DefaultLayout><ProtectedRoute><OrderSuccess /></ProtectedRoute></DefaultLayout>} />

          {/* Auth Routes */}
          <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
          <Route path="/register" element={<DefaultLayout><Register /></DefaultLayout>} />

          {/* User Routes */}
          <Route path="/profile" element={<DefaultLayout><ProtectedRoute><Profile /></ProtectedRoute></DefaultLayout>} />
          <Route path="/profile/orders" element={<DefaultLayout><ProtectedRoute><Orders /></ProtectedRoute></DefaultLayout>} />
          <Route path="/orders" element={<DefaultLayout><ProtectedRoute><Orders /></ProtectedRoute></DefaultLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute isAdmin><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHome />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/edit/:id" element={<AdminEditProduct />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>

          {/* Fallback Route for 404 */}
          <Route path="*" element={<DefaultLayout><Typography variant="h4" sx={{ textAlign: 'center', py: 8 }}>404 - Page Not Found</Typography></DefaultLayout>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;