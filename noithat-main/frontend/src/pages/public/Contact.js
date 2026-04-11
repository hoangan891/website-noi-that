import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#f6e8d7] p-10">
            <h1 className="text-4xl font-bold text-[#4f3e32] mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nếu bạn cần tư vấn thiết kế, hỗ trợ đặt hàng hoặc muốn thăm quan showroom, hãy liên hệ trực tiếp để đội ngũ Vũ An hỗ trợ nhanh nhất.
            </p>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#4f3e32] mb-2">Địa chỉ</h2>
                <p className="text-gray-600">123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#4f3e32] mb-2">Điện thoại</h2>
                <p className="text-gray-600">1900 633 305</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#4f3e32] mb-2">Email</h2>
                <p className="text-gray-600">noithat@gmail.com</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#4f3e32] mb-2">Giờ làm việc</h2>
                <p className="text-gray-600">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>
          </div>
          <div className="p-10">
            <h2 className="text-3xl font-bold text-[#4f3e32] mb-6">Gửi tin nhắn đến chúng tôi</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Họ và tên</label>
                <input id="name" type="text" className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#7c5a3a] focus:outline-none" placeholder="Nhập họ tên" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                <input id="email" type="email" className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#7c5a3a] focus:outline-none" placeholder="Nhập email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">Tiêu đề</label>
                <input id="subject" type="text" className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#7c5a3a] focus:outline-none" placeholder="Lựa chọn nội dung" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">Nội dung</label>
                <textarea id="message" rows="6" className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-[#7c5a3a] focus:outline-none" placeholder="Viết tin nhắn của bạn..."></textarea>
              </div>
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#7c5a3a] px-8 py-3 text-white font-semibold hover:bg-[#5c4331] transition-colors w-full">
                Gửi liên hệ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
