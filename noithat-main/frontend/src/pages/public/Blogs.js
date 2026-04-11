import React from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: '5 xu hướng nội thất 2025 bạn không nên bỏ qua',
    summary: 'Khám phá những phong cách thiết kế nội thất đang tạo nên xu hướng mới cho năm 2025, từ tối giản đến sang trọng.',
    href: '/blogs#trend-2025',
  },
  {
    title: 'Hướng dẫn chọn sofa phù hợp với không gian nhỏ',
    summary: 'Mẹo chọn sofa thông minh giúp tối ưu diện tích, mang lại cảm giác rộng rãi và tiện nghi cho căn hộ nhỏ.',
    href: '/blogs#sofa-small',
  },
  {
    title: 'Lựa chọn bàn ăn cho gia đình hiện đại',
    summary: 'Các yếu tố cần cân nhắc khi chọn bàn ăn: kích thước, chất liệu, phong cách và cách phối hợp với không gian bếp.',
    href: '/blogs#dining-table',
  },
];

const Blogs = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[#7c5a3a] mb-3">Tin tức và tư vấn</p>
          <h1 className="text-4xl font-bold text-[#4f3e32]">Cập nhật xu hướng nội thất mới nhất</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Các bài viết chuyên sâu về thiết kế, vật liệu, phong cách sống và cách tạo không gian nhà đẹp hơn mỗi ngày.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {blogs.map((post) => (
            <Link key={post.title} to={post.href} className="group block rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="h-52 bg-[#f3e4d3] flex items-center justify-center text-5xl text-[#7c5a3a] font-bold">W</div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#7c5a3a] transition-colors">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{post.summary}</p>
                <span className="inline-flex items-center text-[#7c5a3a] font-semibold">Xem chi tiết →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#f9f4ec] p-10">
          <h2 className="text-2xl font-bold text-[#4f3e32] mb-4">Tin tức nổi bật</h2>
          <p className="text-gray-700 leading-relaxed">
            Theo dõi Blog Vũ An để nhận thêm cảm hứng trang trí, kiến thức chọn vật liệu và thông tin khuyến mãi hấp dẫn. Chúng tôi cập nhật nội dung mới hàng tuần để giúp bạn làm mới không gian sống dễ dàng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
