'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#1a3a2a] to-[#0f2b1f] text-emerald-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Newsletter section */}
        <div className="mb-16 p-8 bg-gradient-to-r from-emerald-700 to-green-700 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Nhận cập nhật & ưu đãi độc quyền</h3>
          <p className="text-emerald-100 mb-6">
            Đăng ký nhận tin để biết về những sản phẩm mới và các chương trình khuyến mãi đặc biệt
          </p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-[#1a3a2a] focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>

        {/* Footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🎋</span>
              <span className="text-xl font-bold">BambooShop</span>
            </div>
            <p className="text-emerald-200 mb-4">
              Sản phẩm tre chất lượng cao, bền vững và thân thiện với môi trường.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                📸
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-emerald-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ khách hàng</h4>
            <ul className="space-y-2 text-emerald-200">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Vận chuyển
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Đổi trả
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3 text-emerald-200">
              <div>
                <p className="text-sm font-semibold text-white">Địa chỉ</p>
                <p>123 Đường Tre, Q. 1, TP. HCM</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <p>
                  <a href="mailto:info@bambooshop.vn" className="hover:text-white transition-colors">
                    info@bambooshop.vn
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Điện thoại</p>
                <p>
                  <a href="tel:+84901234567" className="hover:text-white transition-colors">
                    +84 90 123 4567
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-emerald-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-200 text-sm">
            <p>
              &copy; {currentYear} BambooShop. All rights reserved. Sản phẩm bền vững cho cuộc sống xanh.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Chính sách riêng tư
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
