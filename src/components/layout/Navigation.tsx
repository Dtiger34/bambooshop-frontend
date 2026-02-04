'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-200">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-3xl">🎋</span>
          <span className="text-xl font-bold text-[#2d6a4f] group-hover:text-emerald-600 transition-colors">
            BambooShop
          </span>
        </Link>

        {/* Navigation links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/#features"
            className="text-[#264653] hover:text-[#2d6a4f] font-medium transition-colors"
          >
            Tại sao chọn
          </Link>
          <Link
            href="/#products"
            className="text-[#264653] hover:text-[#2d6a4f] font-medium transition-colors"
          >
            Sản phẩm
          </Link>
          <Link
            href="/#contact"
            className="text-[#264653] hover:text-[#2d6a4f] font-medium transition-colors"
          >
            Liên hệ
          </Link>
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoginPage ? (
            <Link
              href="/register"
              className="px-4 py-2 text-[#2d6a4f] font-semibold hover:bg-emerald-50 rounded-lg transition-colors"
            >
              Đăng ký
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-[#2d6a4f] font-semibold hover:bg-emerald-50 rounded-lg transition-colors"
            >
              Đăng nhập
            </Link>
          )}
          <Link
            href="/cart"
            className="px-4 py-2 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            🛒 Giỏ hàng
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 group"
        >
          <span className={`w-6 h-0.5 bg-[#2d6a4f] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#2d6a4f] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#2d6a4f] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-200 px-6 py-4 space-y-4">
          <Link href="/#features" className="block text-[#264653] hover:text-[#2d6a4f] font-medium">
            Tại sao chọn
          </Link>
          <Link href="/#products" className="block text-[#264653] hover:text-[#2d6a4f] font-medium">
            Sản phẩm
          </Link>
          <Link href="/#contact" className="block text-[#264653] hover:text-[#2d6a4f] font-medium">
            Liên hệ
          </Link>
          <div className="pt-4 space-y-2">
            {isLoginPage ? (
              <Link
                href="/register"
                className="block w-full px-4 py-2 text-[#2d6a4f] font-semibold hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-300 text-center"
              >
                Đăng ký
              </Link>
            ) : (
              <Link
                href="/login"
                className="block w-full px-4 py-2 text-[#2d6a4f] font-semibold hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-300 text-center"
              >
                Đăng nhập
              </Link>
            )}
            <Link
              href="/cart"
              className="block w-full px-4 py-2 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center"
            >
              🛒 Giỏ hàng
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
