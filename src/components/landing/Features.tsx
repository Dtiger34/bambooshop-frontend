'use client';

export default function Features() {
  const features = [
    {
      icon: '🌱',
      title: 'Hoàn toàn tự nhiên',
      description:
        'Tất cả sản phẩm được chế tác từ tre nguyên chất, không sử dụng hóa chất hay chất tẩy bleach.',
      color: 'from-emerald-50 to-green-50',
    },
    {
      icon: '♻️',
      title: 'Bền vững & Tái chế được',
      description:
        'Tre phân hủy sinh học trong vòng 5 năm, giảm thiểu tác động tiêu cực đến môi trường.',
      color: 'from-teal-50 to-emerald-50',
    },
    {
      icon: '🎨',
      title: 'Thiết kế độc đáo',
      description:
        'Mỗi sản phẩm là một tác phẩm handmade, kết hợp truyền thống thủ công với hiện đại.',
      color: 'from-green-50 to-lime-50',
    },
    {
      icon: '💪',
      title: 'Bền và chắc chắn',
      description:
        'Tre là vật liệu cứng cáp, nhẹ và bền với thời gian, phù hợp cho mọi hoàn cảnh sử dụng.',
      color: 'from-cyan-50 to-teal-50',
    },
    {
      icon: '🚚',
      title: 'Giao hàng nhanh',
      description:
        'Vận chuyển an toàn trên toàn quốc. Bao gồm bảo hành và hỗ trợ khách hàng 24/7.',
      color: 'from-emerald-50 to-cyan-50',
    },
    {
      icon: '❤️',
      title: 'Cọc xanh cho cộng đồng',
      description:
        'Một phần lợi nhuận được dùng để trồng cây xanh và bảo vệ rừng tự nhiên.',
      color: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#f1faee] to-[#e8f5e9]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            TẠI SAO CHỌN BAMBOO
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a3a2a] mb-4">
            Những lý do để yêu thích tre
          </h2>
          <p className="text-lg text-[#264653] max-w-2xl mx-auto">
            Sản phẩm tre của chúng tôi không chỉ đẹp, mà còn tốt cho bạn và hành tinh chúng ta
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.color} border border-emerald-200 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a3a2a] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#264653] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-[#264653] mb-6">
            Sẵn sàng bắt đầu hành trình bền vững của bạn?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Khám phá bộ sưu tập ngay
          </button>
        </div>
      </div>
    </section>
  );
}
