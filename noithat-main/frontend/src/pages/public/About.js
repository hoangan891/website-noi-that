import React from 'react';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Hà Phương Linh',
      position: 'Giám đốc điều hành',
      description: 'Linh dẫn dắt đội ngũ với tầm nhìn chiến lược và định hướng phát triển đột phá, tạo nên những sản phẩm nội thất thời thượng.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Đỗ Minh Quân',
      position: 'Trưởng phòng thiết kế sáng tạo',
      description: 'Quân tạo ra những concept đậm chất sống, kết hợp phong cách và công năng cho mỗi công trình.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Phan Thanh Tùng',
      position: 'Giám đốc trải nghiệm khách hàng',
      description: 'Tùng đảm bảo khách hàng luôn nhận được hỗ trợ tận tâm và dịch vụ bàn giao hoàn chỉnh từng chi tiết.',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Nguyễn Mỹ Linh',
      position: 'Quản lý dự án',
      description: 'Linh điều phối tiến độ thi công và giám sát chất lượng, đảm bảo mọi hạng mục đều hoàn thành đúng kỳ hạn.',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Trần Hữu Phước',
      position: 'Chuyên gia mua hàng',
      description: 'Phước chọn lọc vật liệu cao cấp và giải pháp sản xuất tối ưu nhằm giữ chất lượng đồng đều cho mọi dự án.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Lê Thanh Hòa',
      position: 'Trưởng phòng kinh doanh',
      description: 'Hòa xây dựng mối quan hệ bền vững với khách hàng và đảm bảo mọi yêu cầu đều được đáp ứng chuyên nghiệp.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Milestone data
  const milestones = [
    { title: 'Khởi đầu', description: '2010 - Vũ An được thành lập với mục tiêu tạo ra những không gian sống tinh tế và hiện đại.' },
    { title: 'Mở rộng trải nghiệm', description: '2015 - Khai trương showroom mới và triển khai thiết kế nội thất trọn gói cho căn hộ và văn phòng.' },
    { title: 'Sáng tạo bền vững', description: '2018 - Ra mắt bộ sưu tập thân thiện với môi trường và lựa chọn vật liệu tái chế cao cấp.' },
    { title: 'Chuỗi giải pháp', description: '2021 - Phát triển dịch vụ tư vấn phong cách sống, ánh sáng và bố cục nội thất toàn diện.' },
    { title: 'Tin cậy khách hàng', description: '2024 - Hơn 50.000 khách hàng tin tưởng và hơn 2.000 dự án hoàn thiện trên toàn quốc.' },
  ];

  const partners = [
    { name: 'Linea Decor', logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'MobiCraft', logo: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'UrbanNest', logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Studio L', logo: 'https://images.unsplash.com/photo-1519222970733-f546218fa6d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'HomeCraft', logo: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'EcoLiving', logo: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const testimonials = [
    {
      name: 'Hà Thị An',
      role: 'Kiến trúc sư nội thất',
      content: 'Vũ An đã cùng tôi hoàn thiện một dự án căn hộ mẫu với tiêu chuẩn cao, đồng hành chuyên nghiệp và linh hoạt theo yêu cầu thiết kế.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Tuấn Anh',
      role: 'Chủ showroom thời trang',
      content: 'Không gian trưng bày của tôi được thiết kế cực kỳ hiệu quả. Khách đến xem sản phẩm cảm nhận được sự sang trọng và gọn gàng ngay từ lần đầu.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Ngọc Lan',
      role: 'CEO startup công nghệ',
      content: 'Dự án văn phòng mới của chúng tôi tạo nên một môi trường làm việc sáng tạo và ấm cúng. Dịch vụ chăm sóc khách hàng rất chu đáo và tận tâm.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
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
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Không gian nội thất sang trọng"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent">
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Giới thiệu</h1>
                <div className="w-16 h-1 bg-brand mb-6"></div>
                <p className="text-base md:text-lg text-white leading-relaxed">
                  Hành trình kiến tạo không gian sống đẳng cấp cùng Shop Nội Thất Vũ An
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Về Shop Nội Thất Vũ An</h2>
            <div className="w-16 h-1 bg-brand mb-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Chào mừng bạn đến với <strong className="text-brand-dark">Shop Nội Thất Vũ An</strong> - điểm đến lý tưởng cho những ai yêu thích không gian sống hiện đại, sang trọng và tiện nghi. Thành lập từ năm 2010, chúng tôi tự hào là thương hiệu nội thất hàng đầu tại Việt Nam, mang đến những sản phẩm chất lượng cao, thiết kế tinh tế và dịch vụ tận tâm.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Với sứ mệnh "Biến ngôi nhà của bạn thành tổ ấm hoàn hảo", chúng tôi không ngừng nỗ lực để cung cấp các giải pháp nội thất phù hợp với mọi phong cách sống. Từ ghế sofa cao cấp, bàn ăn hiện đại đến giường ngủ sang trọng, mỗi sản phẩm đều được chọn lọc kỹ lưỡng để đáp ứng tiêu chuẩn cao nhất về thẩm mỹ và công năng.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Trải qua hơn một thập kỷ phát triển, Vũ An đã phục vụ hơn 50.000 khách hàng trên toàn quốc, từ các căn hộ hiện đại đến biệt thự sang trọng và văn phòng doanh nghiệp. Chúng tôi tự hào là đối tác tin cậy trong việc kiến tạo không gian sống và làm việc hoàn hảo cho khách hàng.
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
      <div className="bg-brand-soft py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
            <div className="w-16 h-1 bg-brand mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Những giá trị cốt lõi tạo nên thương hiệu Vũ An và sự khác biệt trong từng sản phẩm của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center text-2xl mb-4">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hành trình tạo dựng</h2>
          <div className="w-16 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Năm giai đoạn quan trọng cho thấy cách Vũ An phát triển từ ý tưởng đến thương hiệu nội thất đầy uy tín.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-dark font-semibold">Giai đoạn {index + 1}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-3">{milestone.title}</h3>
                </div>
                <div className="w-14 h-14 rounded-full bg-brand-light text-brand-dark flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Đội ngũ nhiều gương mặt</h2>
            <div className="w-16 h-1 bg-brand mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Một đội hình đa chuyên môn với những nhân sự am hiểu thiết kế, thi công và trải nghiệm khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <p className="text-brand-dark font-medium mb-4">{member.position}</p>
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
            <div className="w-16 h-1 bg-brand mb-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Với hệ thống showroom rộng lớn trên toàn quốc, chúng tôi mang đến trải nghiệm mua sắm trực quan và tiện lợi nhất cho khách hàng. Mỗi showroom của Vũ An đều được thiết kế như một ngôi nhà mẫu, giúp khách hàng dễ dàng hình dung được không gian sống lý tưởng của mình.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">Hãy ghé thăm showroom của chúng tôi tại:</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-brand-dark text-white rounded-full p-1 mr-3 mt-1">
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
                <div className="bg-brand-dark text-white rounded-full p-1 mr-3 mt-1">
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
                <div className="bg-brand-dark text-white rounded-full p-1 mr-3 mt-1">
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
                alt="Showroom Vũ An"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-brand-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hãy cùng chúng tôi tạo nên không gian sống mơ ước
          </h2>
          <p className="text-brand-light mb-8 max-w-2xl mx-auto text-lg">
            Đội ngũ chuyên viên tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc lựa chọn sản phẩm phù hợp nhất với không gian và nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:1900633305"
              className="px-8 py-3 bg-white text-brand-dark font-bold rounded-lg hover:bg-brand-soft transition-colors flex items-center justify-center"
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
              className="px-8 py-3 bg-brand text-brand-dark font-bold rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center"
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
          <div className="w-16 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Chúng tôi đồng hành cùng những thương hiệu nội thất, vật liệu và thiết kế hàng đầu để tạo ra giá trị toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center h-32"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 object-contain mb-3"
                loading="lazy"
              />
              <p className="text-sm text-gray-600 font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Khách hàng nói gì</h2>
            <div className="w-16 h-1 bg-brand mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Những phản hồi thực tế từ khách hàng đã trải nghiệm dịch vụ và sản phẩm của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-brand flex mb-4">
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
        <div className="bg-brand-dark rounded-xl p-8 md:p-12 shadow-xl">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Đăng ký nhận tin</h3>
              <p className="text-brand-light text-lg">
                Hãy đăng ký để nhận thông tin về các sản phẩm mới, chương trình khuyến mãi và mẹo trang trí nội thất.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-4 py-3 rounded-l-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-brand"
                  aria-label="Nhập email để đăng ký nhận tin"
                />
                <button
                  className="bg-brand text-brand-dark font-bold px-6 py-3 rounded-r-lg hover:bg-brand-dark transition-colors"
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