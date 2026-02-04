'use client';

import Link from 'next/link';

export default function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: 'Bộ cốc ăn tre cao cấp',
      description: 'Bộ 3 cốc ăn cơm tre tự nhiên, an toàn sức khỏe',
      icon: '🥢',
      price: '250.000 VNĐ',
      badge: 'Bán chạy',
    },
    {
      id: 2,
      name: 'Thớt cắt thực phẩm tre',
      description: 'Thớt cắt kích thước lớn, bền và không mẫn cảm',
      icon: '🍽️',
      price: '180.000 VNĐ',
      badge: 'Mới',
    },
    {
      id: 3,
      name: 'Bộ muỗng canh tre',
      description: 'Bộ 6 muỗng canh handmade, hoàn thiện tỉ mỉ',
      icon: '🥄',
      price: '320.000 VNĐ',
      badge: 'Phổ biến',
    },
    {
      id: 4,
      name: 'Khay đựng tre trang trí',
      description: 'Khay đựng đồ dùng bàn, thiết kế hiện đại',
      icon: '📦',
      price: '420.000 VNĐ',
      badge: '',
    },
    {
      id: 5,
      name: 'Hộp bảo quản đa năng',
      description: 'Hộp bảo quản thực phẩm khô, kín không khí',
      icon: '🎁',
      price: '380.000 VNĐ',
      badge: 'Tiết kiệm',
    },
    {
      id: 6,
      name: 'Bộ dụng cụ phòng bếp',
      description: 'Bộ 8 dụng cụ nhà bếp, công dụng đa năng',
      icon: '🔪',
      price: '650.000 VNĐ',
      badge: 'Khuyến mãi',
    },
  ];

  return (
    <section id="products" className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#e8f5e9] to-[#f0f7f2]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            KHÁM PHÁ BỘ SƯU TẬP
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a3a2a] mb-4">
            Sản phẩm tre tinh tế & chất lượng cao
          </h2>
          <p className="text-lg text-[#264653] max-w-2xl mx-auto">
            Mỗi sản phẩm được chọn lọc kỹ càng và chế tác bằng tay với tiêu chuẩn chất lượng cao nhất
          </p>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-300"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product card body */}
              <div className="p-8">
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a3a2a] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#264653] text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-[#2d6a4f]">
                    {product.price}
                  </span>
                </div>

                {/* Add to cart button */}
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-600 transform group-hover:-translate-y-1 transition-all duration-300">
                  Thêm vào giỏ
                </button>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View all products CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-white border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold rounded-lg hover:bg-emerald-50 transform hover:-translate-y-1 transition-all duration-300"
          >
            Xem tất cả sản phẩm (50+ mục)
          </Link>
        </div>
      </div>
    </section>
  );
}
