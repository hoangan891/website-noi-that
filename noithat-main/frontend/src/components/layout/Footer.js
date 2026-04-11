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
    <footer className="bg-gradient-to-r from-[#f4ede5] to-[#ede3d6] text-[#4f3e32]">
      {/* Services Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center transition-all duration-300 hover:text-[#7c5a3a] group">
            <div className="mr-4 p-3 bg-[#d8b89e] rounded-full text-[#5f422f] group-hover:bg-[#856b57] group-hover:text-white transition-all duration-300">
              <FaTruck className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Giao hàng miễn phí</h4>
              <p className="text-sm">Cho đơn hàng trên 2.000.000₫</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-brand-dark group">
            <div className="mr-4 p-3 bg-brand-light rounded-full text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-all duration-300">
              <FaUndo className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Đổi trả dễ dàng</h4>
              <p className="text-sm">Trong vòng 30 ngày</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-brand-dark group">
            <div className="mr-4 p-3 bg-brand-light rounded-full text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-all duration-300">
              <FaCreditCard className="text-2xl" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Thanh toán an toàn</h4>
              <p className="text-sm">Bảo mật thông tin</p>
            </div>
          </div>
          
          <div className="flex items-center transition-all duration-300 hover:text-brand-dark group">
            <div className="mr-4 p-3 bg-brand-light rounded-full text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-all duration-300">
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
      <div className="border-t border-brand-light">
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#7c5a3a]">Về chúng tôi</h3>
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
              <h3 className="text-xl font-bold mb-4 text-[#7c5a3a]">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/promotion" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Khuyến mãi
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Tin tức
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#7c5a3a]">Danh mục sản phẩm</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categories?category=sofa" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Sofa
                  </Link>
                </li>
                <li>
                  <Link to="/categories?category=ban-an" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Bàn ăn
                  </Link>
                </li>
                <li>
                  <Link to="/categories?category=giuong" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Giường
                  </Link>
                </li>
                <li>
                  <Link to="/categories?category=ke" className="text-gray-700 hover:text-brand-dark transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2 transition-all duration-300 hover:bg-brand-dark"></span>
                    Kệ
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#7c5a3a]">Thông tin liên hệ</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-brand-dark" />
                  <span className="text-sm">123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-3 cape text-brand-dark" />
                  <span className="text-sm">1900 633 305</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-brand-dark" />
                  <span className="text-sm">noithat@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <FaClock className="mr-3 text-brand-dark" />
                  <span className="text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-brand-soft py-4 border-t border-brand-light">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#5f4a3f] mb-2 md:mb-0">
            © {new Date().getFullYear()} Nội Thất Vũ An. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex space-x-4 items-center">
            <FaCcVisa className="text-brand-dark text-2xl" />
            <FaCcMastercard className="text-brand text-2xl" />
            <FaCcPaypal className="text-brand-dark text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;