import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fafaf8] to-[#f0f7f2]">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#2d5016] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#2d5016] text-white rounded-lg hover:bg-[#3d6b1f] transition-colors"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}