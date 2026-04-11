import React from 'react';
import { Link } from 'react-router-dom';

const promotions = [
  {
    title: 'Ưu đãi 20% cho sofa cao cấp',
    summary: 'Chọn mua sofa bọc da và vải cao cấp trong tháng này để nhận ngay ưu đãi 20% cùng dịch vụ vận chuyển miễn phí.',
  },
  {
    title: 'Tặng kèm thảm khi mua bàn ăn',
    summary: 'Mua bàn ăn từ bộ sưu tập Modern Dining và nhận ngay thảm trang trí trị giá 1.500.000₫.',
  },
  {
    title: 'Giảm giá 15% cho khách hàng mới',
    summary: 'Khách hàng lần đầu mua hàng sẽ được giảm 15% và hỗ trợ tư vấn thiết kế riêng.',
  },
];

const Promotion = () => (
  <div className="container mx-auto px-4 py-20">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7c5a3a] mb-3">Khuyến mãi đặc biệt</p>
        <h1 className="text-4xl font-bold text-[#4f3e32]">Chương trình ưu đãi tháng này</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Các ưu đãi mới nhất dành cho sản phẩm sofa, bàn ăn, giường ngủ và trang trí nội thất. Chỉ áp dụng trong thời gian có hạn.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {promotions.map((item) => (
          <div key={item.title} className="rounded-3xl border border-[#e6d5c3] bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-[#4f3e32] mb-3">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{item.summary}</p>
            <Link to="/categories" className="inline-flex items-center text-[#7c5a3a] font-semibold hover:text-[#5c4331] transition-colors">
              Xem ngay
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Promotion;
