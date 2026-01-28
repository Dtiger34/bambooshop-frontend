"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useProducts } from '@/contexts';
import { Product } from '@/types/product';
import { productPageStyles } from '@/app/(public)/products/productPageStyles';

export default function ProductsPage() {
  const { products, isLoading, error, fetchProducts } = useProducts();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [category, setCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search input to reduce re-renders
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) if (p.category) set.add(p.category);
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      // search
      if (debouncedQuery && !(`${p.name} ${p.description || ''}`.toLowerCase().includes(debouncedQuery.toLowerCase()))) return false;
      // category
      if (category && p.category !== category) return false;
      // price
      if (minPrice !== '' && p.price < Number(minPrice)) return false;
      if (maxPrice !== '' && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [products, debouncedQuery, category, minPrice, maxPrice]);

  return (
    <main className={productPageStyles.main}>
      {/* Decorative green blur elements */}
      <div className={productPageStyles.decorativeBlurlg}></div>
      <div className={productPageStyles.decorativeBlurMd}></div>
      <div className={productPageStyles.decorativeBlurSm}></div>
      
      <div className={productPageStyles.container}>
        <div className={productPageStyles.headerContainer}>
          <div className={productPageStyles.titleBlock}>
            <h1 className={productPageStyles.title}>Tất cả sản phẩm</h1>
            <p className={productPageStyles.subtitle}>Tổng cộng {filtered.length} sản phẩm</p>
          </div>
          <div>
            <Link href="/" className={productPageStyles.backButton}>
              <span>←</span>
              <span>Quay lại</span>
            </Link>
          </div>
        </div>

        <div className={productPageStyles.gridContainer}>
          {/* Sidebar (compact) */}
          <aside className={productPageStyles.sidebar}>
            <div className={productPageStyles.formGroup}>
              <label className={productPageStyles.label}>Tìm kiếm</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập tên hoặc mô tả"
                className={productPageStyles.input}
              />
            </div>

            <div className={productPageStyles.formGroup}>
              <label className={productPageStyles.label}>Danh mục</label>
              <select value={category ?? ''} onChange={(e) => setCategory(e.target.value || null)} className={productPageStyles.select}>
                <option className={productPageStyles.option} value="">Tất cả</option>
                {categories.map((c, idx) => (
                  <option key={`${c}-${idx}`} className={productPageStyles.option} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={productPageStyles.formGroup}>
              <label className={productPageStyles.label}>Giá (VNĐ)</label>
              <div className={productPageStyles.priceInputs}>
                <input type="number" placeholder="Từ" value={minPrice} onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} className={productPageStyles.priceInput} />
                <input type="number" placeholder="Đến" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} className={productPageStyles.priceInput} />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setQuery(''); setCategory(null); setMinPrice(''); setMaxPrice(''); }} className={productPageStyles.resetButton}>Đặt lại</button>
            </div>
          </aside>

          {/* Product grid */}
          <section className={productPageStyles.productSection}>
            {isLoading ? (
              <div className={productPageStyles.loadingContainer}>
                <div className={productPageStyles.loadingText}>Đang tải...</div>
              </div>
            ) : error ? (
              <div className={productPageStyles.errorText}>{error}</div>
            ) : (
              <div className={productPageStyles.productGrid}>
                {filtered.map((p: Product, idx) => (
                  <div key={`${p.id}-${idx}`} className={productPageStyles.productCard}>
                    <div className={productPageStyles.productImage}>
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt={p.name} className={productPageStyles.productImageElement} />
                      ) : (
                        <div className={productPageStyles.productPlaceholder}>📦</div>
                      )}
                    </div>

                    <div className={productPageStyles.productContent}>
                      <h3 className={productPageStyles.productName}>{p.name}</h3>
                      <p className={productPageStyles.productDescription}>{p.description}</p>
                      <div className={productPageStyles.productFooter}>
                        <span className={productPageStyles.productPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price || 0)}</span>
                        <Link href={`/products/${p.id}`} className={productPageStyles.productLink}>Xem</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
