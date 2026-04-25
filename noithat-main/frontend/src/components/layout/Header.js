import React, { useState, useRef, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart, FaThList, FaSearch, FaChevronDown } from 'react-icons/fa';
import { logout } from '../../redux/slices/authSlice';
import logo from '../../assets/logo-vuan.svg';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const [search, setSearch] = useState('');
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accountMenuRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsAccountMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?keyword=${search}`);
        } else {
            navigate('/');
        }
    };

    const toggleAccountMenu = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setIsAccountMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [accountMenuRef]);

    return (
        <header className="bg-brand-soft sticky top-0 z-50 border-b border-brand-light shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center transition-transform duration-300 hover:scale-105"
                        aria-label="Trang chủ Vũ An"
                    >
                        <img src={logo} alt="Logo Vũ An" className="h-10 w-auto object-contain" />
                        <span className="hidden sm:inline ml-3 text-lg font-semibold tracking-wide text-[#5a4232]">
                            VŨ AN
                        </span>
                    </Link>

                    {/* Search bar - centralized and responsive */}
                    <div className="hidden md:block flex-grow max-w-xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm bg-white transition-all duration-300"
                                aria-label="Tìm kiếm sản phẩm"
                            />
                            <button 
                                type="submit" 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-dark transition-colors duration-300" 
                                aria-label="Tìm kiếm"
                            >
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Navigation Buttons */}
                    <nav className="flex items-center space-x-1 md:space-x-6">
                        {/* Mobile Search Button */}
                        <button 
                            className="md:hidden p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300"
                            onClick={() => navigate('/search')}
                            aria-label="Tìm kiếm"
                        >
                            <FaSearch className="text-lg" />
                        </button>
                        
                        {/* Home - show icon only on mobile */}
                        <Link 
                            to="/" 
                            className="flex items-center p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300 group"
                            title="Trang chủ"
                        >
                            <FaHome className="text-lg group-hover:scale-110 transition-transform duration-300" /> 
                            <span className="hidden md:inline ml-1 font-medium">Trang chủ</span>
                        </Link>
                        
                        {/* Categories */}
                        <Link 
                            to="/categories" 
                            className="flex items-center p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300 group"
                            title="Danh mục sản phẩm"
                        >
                            <FaThList className="text-lg group-hover:scale-110 transition-transform duration-300" /> 
                            <span className="hidden md:inline ml-1 font-medium">Danh mục</span>
                        </Link>
                        
                        {/* About - hidden on small screens */}
                        <Link 
                            to="/about" 
                            className="hidden sm:block p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300 font-medium"
                            title="Giới thiệu"
                        >
                            Giới thiệu
                        </Link>
                        
                        {/* Admin Panel - conditionally rendered */}
                        {user?.isAdmin && (
                            <Link 
                                to="/admin/products" 
                                className="hidden sm:block p-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 font-medium"
                                title="Quản lý"
                            >
                                Quản lý
                            </Link>
                        )}
                        
                        {/* Cart with improved animation and badge */}
                        <Link 
                            to="/cart" 
                            className="relative p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300 group"
                            title="Giỏ hàng"
                        >
                            <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-300" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
                                    {items.length > 99 ? '99+' : items.length}
                                </span>
                            )}
                        </Link>
                        
                        {/* User Menu with improved dropdown */}
                        <div className="relative" ref={accountMenuRef}>
                            <button
                                onClick={toggleAccountMenu}
                                className="flex items-center p-2 text-gray-700 hover:text-brand-dark transition-colors duration-300 group"
                                aria-label="Tài khoản"
                                aria-expanded={isAccountMenuOpen}
                                aria-haspopup="true"
                            >
                                <FaUser className="text-lg group-hover:scale-110 transition-transform duration-300" />
                                <FaChevronDown className={`ml-1 text-xs transition-transform duration-300 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isAccountMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-20 border border-gray-200 transform origin-top-right transition-all duration-200">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                                <p className="text-sm font-semibold truncate" title={user.name}>{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link 
                                                    to="/profile" 
                                                    onClick={() => setIsAccountMenuOpen(false)} 
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-brand-soft hover:text-brand-dark transition-colors duration-200"
                                                >
                                                    <span className="w-5 mr-2">👤</span>
                                                    Hồ sơ cá nhân
                                                </Link>
                                                <Link 
                                                    to="/orders" 
                                                    onClick={() => setIsAccountMenuOpen(false)} 
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-brand-soft hover:text-brand-dark transition-colors duration-200"
                                                >
                                                    <span className="w-5 mr-2">📦</span>
                                                    Đơn hàng của tôi
                                                </Link>
                                                <button 
                                                    onClick={handleLogout} 
                                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                                                >
                                                    <span className="w-5 mr-2">🚪</span>
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="py-1">
                                            <Link 
                                                to="/login" 
                                                onClick={() => setIsAccountMenuOpen(false)} 
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-brand-soft hover:text-brand-dark transition-colors duration-200"
                                            >
                                                <span className="w-5 mr-2">🔑</span>
                                                Đăng nhập
                                            </Link>
                                            <Link 
                                                to="/register" 
                                                onClick={() => setIsAccountMenuOpen(false)} 
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-brand-soft hover:text-brand-dark transition-colors duration-200"
                                            >
                                                <span className="w-5 mr-2">✏️</span>
                                                Đăng ký
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
                
                {/* Mobile Search bar - shown below the header on small screens */}
                <div className="md:hidden mt-3">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white transition-all duration-300"
                            aria-label="Tìm kiếm sản phẩm"
                        />
                        <button 
                            type="submit" 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300" 
                            aria-label="Tìm kiếm"
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;