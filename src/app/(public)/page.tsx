import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import ProductShowcase from '@/components/landing/ProductShowcase';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafaf8] to-[#f0f7f2]">
      {/* Hero Section with top padding for fixed header */}
      <div className="pt-16 sm:pt-20">
        <Hero />
      </div>

      {/* Features Section */}
      <Features />

      {/* Products Section */}
      <ProductShowcase />

      {/* Footer */}
      <Footer />
    </main>
  );
}
