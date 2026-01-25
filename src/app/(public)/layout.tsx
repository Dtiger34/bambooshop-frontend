import type { Metadata } from "next";
import Navigation from '@/components/layout/Navigation';

export const metadata: Metadata = {
  title: "BambooShop - Sản phẩm tre tự nhiên & bền vững",
  description: "Khám phá bộ sưu tập sản phẩm làm từ tre cao cấp, thân thiện với môi trường",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-[#fafaf8] to-[#f0f7f2] min-h-screen">
      <Navigation />
      {children}
    </div>
  );
}
