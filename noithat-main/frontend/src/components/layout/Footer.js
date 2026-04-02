import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaCreditCard, 
  FaTruck, 
  FaUndo, 
  FaHeadset,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-orange-200 text-gray-700">
      {/* Services Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center transition-all duration-300 hover:text-green-600 group">
            <div className="mr-4 p-3 bg-orange-300 rounded-full text-orange-700 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <FaTruck className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Giao hàng miễn phí</h4>
              <p className="text-sm">Cho đơn hàng trên 2.000.000₫</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-green-600 group">
            <div className="mr-4 p-3 bg-orange-300 rounded-full text-orange-700 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <FaUndo className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Đổi trả dễ dàng</h4>
              <p className="text-sm">Trong vòng 30 ngày</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-green-600 group">
            <div className="mr-4 p-3 bg-orange-300 rounded-full text-orange-700 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <FaCreditCard className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Thanh toán an toàn</h4>
              <p className="text-sm">Bảo mật thông tin</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-green-600 group">
            <div className="mr-4 p-3 bg-orange-300 rounded-full text-orange-700 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <FaHeadset className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Hỗ trợ 24/7</h4>
              <p className="text-sm">Tư vấn trực tuyến</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-orange-300">
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600">Về chúng tôi</h3>
              <p className="text-sm mb-4 leading-relaxed">
                Chúng tôi cung cấp các sản phẩm nội thất cao cấp với chất lượng tốt nhất, đem lại không gian sống hoàn hảo cho ngôi nhà của bạn.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-orange-300 flex items-center justify-center text-orange-700 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/?lang=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-orange-300 flex items-center justify-center text-orange-700 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-orange-300 flex items-center justify-center text-orange-700 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-orange-300 flex items-center justify-center text-orange-700 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/promotion" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Khuyến mãi
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Tin tức
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600">Danh mục sản phẩm</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categories/phong-khach" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Phòng khách
                  </Link>
                </li>
                <li>
                  <Link to="/categories/phong-ngu" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Phòng ngủ
                  </Link>
                </li>
                <li>
                  <Link to="/categories/phong-bep" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Phòng bếp
                  </Link>
                </li>
                <li>
                  <Link to="/categories/phong-lam-viec" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Phòng làm việc
                  </Link>
                </li>
                <li>
                  <Link to="/categories/ngoai-that" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Ngoại thất
                  </Link>
                </li>
                <li>
                  <Link to="/categories/do-trang-tri" className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 transition-all duration-300 hover:bg-green-500"></span>
                    Đồ trang trí
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600">Thông tin liên hệ</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-orange-500" />
                  <span className="text-sm">123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-3 cape text-orange-500" />
                  <span className="text-sm">1900 633 305</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-orange-500" />
                  <span className="text-sm">noithat@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <FaClock className="mr-3 text-orange-500" />
                  <span className="text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-orange-50 py-4 border-t border-orange-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-2 md:mb-0">
            © {new Date().getFullYear()} Nội Thất Cao Cấp. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex space-x-4 items-center">
            <FaCcVisa className="text-blue-700 text-2xl" />
            <FaCcMastercard className="text-red-600 text-2xl" />
            <FaCcPaypal className="text-blue-800 text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;