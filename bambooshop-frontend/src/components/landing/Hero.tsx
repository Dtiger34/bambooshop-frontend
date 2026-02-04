'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f7f2] via-[#e8f5e9] to-[#f1faee] pt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-8 left-10 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  ♻️ Sản phẩm bền vững & Thân thiện với môi trường
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#1a3a2a]">
                Tre tự nhiên,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
                  Cuộc sống xanh
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#264653] leading-relaxed max-w-xl">
                Khám phá bộ sưu tập sản phẩm tre cao cấp handmade, kết hợp độc đáo giữa truyền thống và hiện đại. Mỗi sản phẩm là một tác phẩm nghệ thuật bền vững.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#products"
                className="px-8 py-4 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Xem bộ sưu tập
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white border-2 border-[#52b788] text-[#2d6a4f] font-semibold rounded-lg hover:bg-emerald-50 transform hover:-translate-y-1 transition-all duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-emerald-200">
              <div>
                <p className="text-3xl font-bold text-[#2d6a4f]">500+</p>
                <p className="text-sm text-[#264653]">Khách hàng hài lòng</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#2d6a4f]">100%</p>
                <p className="text-sm text-[#264653]">Tự nhiên, không hóa chất</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#2d6a4f]">50+</p>
                <p className="text-sm text-[#264653]">Sản phẩm độc đáo</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] animate-slide-in-left">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-green-200 rounded-3xl blur-xl opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-3xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative">
                {/* Bamboo illustration placeholder */}
                <div className="text-center">
                  <div className="text-8xl mb-4">🎋</div>
                  <p className="text-2xl font-bold text-[#2d6a4f]">Sản phẩm tre</p>
                  <p className="text-sm text-[#52b788] mt-2">Chế tác tay với tình yêu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
