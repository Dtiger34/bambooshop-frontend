'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#f1f8f4] to-[#dcedc8] py-12 px-4 sm:px-6 lg:px-8 pt-24 relative overflow-hidden">
      {/* Decorative bamboo pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-8xl">🎋</div>
        <div className="absolute bottom-20 right-10 text-8xl">🎋</div>
        <div className="absolute top-1/3 right-1/4 text-6xl">🎋</div>
        <div className="absolute bottom-1/3 left-1/4 text-6xl">🎋</div>
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2d6a4f] to-[#52b788] rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🎋</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent">
            Đăng nhập
          </h2>
          <p className="text-sm text-[#40916c]">
            Chào mừng bạn trở lại với BambooShop
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#95d5b2]/30 p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1b4332] mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#52b788]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-[#95d5b2] rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all bg-white/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1b4332] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#52b788]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-[#95d5b2] rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all bg-white/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#2d6a4f] focus:ring-[#52b788] border-[#95d5b2] rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[#40916c] font-medium">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div>
                <a href="#" className="font-semibold text-[#2d6a4f] hover:text-[#52b788] transition-colors">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#95d5b2]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-[#40916c] font-medium">hoặc</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-[#40916c]">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="font-semibold text-[#2d6a4f] hover:text-[#52b788] transition-colors">
                  Đăng ký ngay →
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm text-[#2d6a4f] hover:text-[#1b4332] font-semibold transition-colors group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
