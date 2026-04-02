import React from 'react';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Nguyễn Văn Minh',
      position: 'Nhà sáng lập & CEO',
      description: 'Với hơn 15 năm kinh nghiệm trong ngành nội thất cao cấp, anh Minh đã xây dựng Minh Khang thành thương hiệu uy tín hàng đầu.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Trần Thu Hà',
      position: 'Giám đốc thiết kế',
      description: 'Tốt nghiệp chuyên ngành Thiết kế nội thất tại Ý, chị Hà mang đến những ý tưởng thiết kế độc đáo và tinh tế.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Lê Quang Khang',
      position: 'Trưởng phòng dịch vụ khách hàng',
      description: 'Với phương châm "Khách hàng là trên hết", anh Khang luôn đảm bảo mỗi khách hàng đều nhận được trải nghiệm tốt nhất.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Milestone data
  const milestones = [
    { year: '2010', event: 'Thành lập Shop Nội Thất Minh Khang tại TP.HCM' },
    { year: '2015', event: 'Mở rộng showroom thứ hai tại Hà Nội' },
    { year: '2018', event: 'Đạt chứng nhận "Thương hiệu nội thất xuất sắc"' },
    { year: '2020', event: 'Ra mắt dòng sản phẩm eco-friendly từ vật liệu tái chế' },
    { year: '2023', event: 'Mở rộng thị trường xuất khẩu sang các nước Đông Nam Á' },
    { year: '2024', event: 'Kỷ niệm phục vụ hơn 50,000 khách hàng trên toàn quốc' },
  ];

  // Features/values data
  const values = [
    {
      title: 'Chất lượng vượt trội',
      description: 'Chúng tôi cam kết mang đến những sản phẩm với chất lượng cao nhất, được làm từ vật liệu bền bỉ và công nghệ tiên tiến.',
      icon: '✓',
    },
    {
      title: 'Thiết kế đương đại',
      description: 'Mỗi sản phẩm đều được thiết kế với sự kết hợp giữa tính thẩm mỹ và công năng, phù hợp với xu hướng hiện đại.',
      icon: '★',
    },
    {
      title: 'Dịch vụ tận tâm',
      description: 'Đội ngũ tư vấn chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn từ khâu lựa chọn đến lắp đặt và bảo hành.',
      icon: '♥',
    },
    {
      title: 'Thiết kế không gian toàn diện',
      description: 'Không chỉ bán từng sản phẩm riêng lẻ, chúng tôi cung cấp giải pháp thiết kế không gian sống hoàn chỉnh.',
      icon: '⌂',
    },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Không gian nội thất sang trọng"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent">
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Giới thiệu</h1>
                <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
                <p className="text-base md:text-lg text-white leading-relaxed">
                  Hành trình kiến tạo không gian sống đẳng cấp cùng Shop Nội Thất Minh Khang
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Về Shop Nội Thất Minh Khang</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Chào mừng bạn đến với <strong className="text-blue-600">Shop Nội Thất Minh Khang</strong> - điểm đến lý tưởng cho những ai yêu thích không gian sống hiện đại, sang trọng và tiện nghi. Thành lập từ năm 2010, chúng tôi tự hào là thương hiệu nội thất hàng đầu tại Việt Nam, mang đến những sản phẩm chất lượng cao, thiết kế tinh tế và dịch vụ tận tâm.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Với sứ mệnh "Biến ngôi nhà của bạn thành tổ ấm hoàn hảo", chúng tôi không ngừng nỗ lực để cung cấp các giải pháp nội thất phù hợp với mọi phong cách sống. Từ ghế sofa cao cấp, bàn ăn hiện đại đến giường ngủ sang trọng, mỗi sản phẩm đều được chọn lọc kỹ lưỡng để đáp ứng tiêu chuẩn cao nhất về thẩm mỹ và công năng.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Trải qua hơn một thập kỷ phát triển, Minh Khang đã phục vụ hơn 50.000 khách hàng trên toàn quốc, từ các căn hộ hiện đại đến biệt thự sang trọng và văn phòng doanh nghiệp. Chúng tôi tự hào là đối tác tin cậy trong việc kiến tạo không gian sống và làm việc hoàn hảo cho khách hàng.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-lg h-64">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Không gian phòng khách hiện đại"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-64 mt-8">
              <img
                src="https://kimfurniture.com/wp-content/uploads/2021/11/thiet-ke-noi-that-phong-ngu-20.jpg"
                alt="Thiết kế phòng ngủ sang trọng"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-64">
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Không gian bếp hiện đại"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-64 mt-8">
              <img
                src="https://th.bing.com/th/id/OIP.XUEoGrUB6xzfpmylgpeYmwHaFs?w=220&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Góc làm việc tiện nghi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Những giá trị cốt lõi tạo nên thương hiệu Minh Khang và sự khác biệt trong từng sản phẩm của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hành trình phát triển</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Chặng đường phát triển và những cột mốc quan trọng của Shop Nội Thất Minh Khang
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center relative">
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{milestone.year}</h3>
                    <p className="text-gray-700 text-base">{milestone.event}</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Đội ngũ lãnh đạo</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Gặp gỡ những người sáng lập và đội ngũ lãnh đạo tài năng đứng sau thành công của Shop Nội Thất Minh Khang
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600 text-base">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Showroom Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Showroom đẳng cấp</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Với hệ thống showroom rộng lớn trên toàn quốc, chúng tôi mang đến trải nghiệm mua sắm trực quan và tiện lợi nhất cho khách hàng. Mỗi showroom của Minh Khang đều được thiết kế như một ngôi nhà mẫu, giúp khách hàng dễ dàng hình dung được không gian sống lý tưởng của mình.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">Hãy ghé thăm showroom của chúng tôi tại:</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="block text-gray-800">TP.HCM:</strong>
                  <span className="text-gray-600">167-169 Nguyễn Đình Chiểu, P. 6, Q. 3, TP. HCM</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="block text-gray-800">Hà Nội:</strong>
                  <span className="text-gray-600">28 Nguyễn Chí Thanh, Q. Đống Đa, Hà Nội</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <strong className="block text-gray-800">Đà Nẵng:</strong>
                  <span className="text-gray-600">255 Nguyễn Văn Linh, Q. Thanh Khê, Đà Nẵng</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Showroom Minh Khang"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hãy cùng chúng tôi tạo nên không gian sống mơ ước
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Đội ngũ chuyên viên tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc lựa chọn sản phẩm phù hợp nhất với không gian và nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:1900633305"
              className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              aria-label="Gọi hotline 1900 633 305"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              1900 633 305
            </a>
            <a
              href="mailto:noithat@gmail.com"
              className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
              aria-label="Gửi email đến noithat@gmail.com"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              noithat@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Đối tác của chúng tôi</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Chúng tôi hợp tác với các thương hiệu hàng đầu trong ngành để mang đến những sản phẩm chất lượng nhất
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center h-24"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt={`Đối tác ${index + 1}`}
                className="max-h-16 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Khách hàng nói gì về chúng tôi</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Sự hài lòng của khách hàng luôn là thước đo cho thành công của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Thị Mai',
                role: 'Chủ căn hộ tại The Riviera Point',
                content: 'Tôi rất hài lòng với bộ sofa mà Minh Khang đã tư vấn cho gia đình. Chất lượng sản phẩm tuyệt vời và dịch vụ vận chuyển, lắp đặt rất chuyên nghiệp.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              },
              {
                name: 'Trần Minh Đức',
                role: 'Giám đốc công ty ABC',
                content: 'Chúng tôi đã chọn Minh Khang để thiết kế và trang bị nội thất cho toàn bộ văn phòng. Kết quả thật sự ấn tượng, không gian làm việc vừa hiện đại vừa thể hiện được văn hóa công ty.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              },
              {
                name: 'Lê Thanh Hương',
                role: 'Khách hàng tại Hà Nội',
                content: 'Đã hợp tác với Minh Khang trong việc trang trí nội thất cho ngôi nhà mới của gia đình. Đội ngũ thiết kế rất tận tâm, lắng nghe và đưa ra những gợi ý phù hợp với sở thích và ngân sách của chúng tôi.',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-yellow-400 flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic text-base">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="bg-blue-600 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Đăng ký nhận tin</h3>
              <p className="text-blue-100 text-lg">
                Hãy đăng ký để nhận thông tin về các sản phẩm mới, chương trình khuyến mãi và mẹo trang trí nội thất.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-4 py-3 rounded-l-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Nhập email để đăng ký nhận tin"
                />
                <button
                  className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-r-lg hover:bg-yellow-300 transition-colors"
                  aria-label="Đăng ký nhận tin"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;