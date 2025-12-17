'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { ProductGrid } from '@/components/shop/product-grid';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { ProductImage } from '@/components/ui/product-image';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
  children?: Category[];
  parentId?: string | null;
}

// Minimalist Hero Carousel
function HeroCarousel({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length, nextSlide]);

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];
  const primaryImage = currentProduct.images?.find((img) => img.isPrimary) || currentProduct.images?.[0];

  return (
    <div
      className="relative overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
        {/* Product Info */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 order-2 lg:order-1 bg-white">
          <div className="max-w-lg text-center lg:text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
              New Collection
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 leading-tight tracking-tight">
              {currentProduct.name}
            </h1>

            <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed">
              {currentProduct.description}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <span className="text-2xl md:text-3xl font-light text-black">
                {Number(currentProduct.price).toLocaleString()} FCFA
              </span>
              {currentProduct.comparePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {Number(currentProduct.comparePrice).toLocaleString()} FCFA
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/products/${currentProduct.slug}`}>
                <Button size="lg" className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white rounded-none px-10 h-14 text-[10px] uppercase tracking-[0.2em]">
                  Shop Now
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/?featured=true">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-none border-black text-black hover:bg-black hover:text-white px-10 h-14 text-[10px] uppercase tracking-[0.2em]">
                  View All
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative w-full lg:w-1/2 h-[350px] md:h-[400px] lg:h-auto order-1 lg:order-2 bg-gray-100">
          {primaryImage && (
            <ProductImage
              src={primaryImage.url}
              alt={currentProduct.name}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Sale badge */}
          {currentProduct.comparePrice && (
            <div className="absolute top-6 right-6 bg-black text-white px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.15em]">
                Sale
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {products.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white hover:bg-black hover:text-white text-black transition-all border border-gray-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white hover:bg-black hover:text-white text-black transition-all border border-gray-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {products.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-[2px] transition-all",
                idx === currentIndex
                  ? 'bg-black w-8'
                  : 'bg-gray-300 w-4'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Minimalist Categories Banner
function CategoriesBanner() {
  const categories = [
    { name: 'Dresses', href: '/?category=dresses' },
    { name: 'Accessories', href: '/?category=accessories' },
    { name: 'Shoes', href: '/?category=shoes' },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-px bg-gray-200">
      {categories.map((category, idx) => (
        <Link
          key={idx}
          href={category.href}
          className="group relative h-[300px] overflow-hidden bg-gray-100"
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <h3 className="text-black text-2xl font-light tracking-wide mb-2">{category.name}</h3>
              <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Promotional Banner
function PromotionalBanner() {
  return (
    <div className="bg-black text-white py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4">
            Limited Time
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            Seasonal Sale
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-light">
            Up to 50% off on selected items
          </p>
          <Link href="/?featured=true">
            <Button className="rounded-none bg-white text-black hover:bg-gray-200 px-10 h-14 text-[10px] uppercase tracking-[0.2em]">
              Shop Now
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Category Sidebar
function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  isMobileOpen,
  onClose,
}: {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}) {
  const parentCategories = categories.filter((c) => !c.parentId);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 p-6 transform transition-transform lg:transform-none",
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h3 className="text-[10px] uppercase tracking-[0.2em]">Categories</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <h3 className="text-[10px] uppercase tracking-[0.2em] mb-6 hidden lg:block text-gray-400">
          Categories
        </h3>

        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('')}
            className={cn(
              "w-full text-left px-4 py-3 text-sm transition-all",
              !selectedCategory
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 text-gray-600'
            )}
          >
            All Products
          </button>

          {parentCategories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => onSelectCategory(category.slug)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between",
                  selectedCategory === category.slug
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                <span>{category.name}</span>
                {category._count?.products !== undefined && (
                  <span className="text-xs opacity-50">
                    ({category._count.products})
                  </span>
                )}
              </button>

              {category.children && category.children.length > 0 && (
                <div className="ml-4 space-y-1 mt-1">
                  {category.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onSelectCategory(child.slug)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition-all",
                        selectedCategory === child.slug
                          ? 'text-black font-medium'
                          : 'text-gray-400 hover:text-black'
                      )}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

// Section Header
function SectionHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
          {subtitle}
        </p>
        <h2 className="text-2xl md:text-3xl font-light text-black tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') === 'true';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['products', { search, category, featured }],
    queryFn: () =>
      api.getProducts({
        search: search || undefined,
        category: category || undefined,
        featured: featured || undefined,
        limit: 20,
      }),
  });

  const { data: featuredData } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => api.getFeaturedProducts(),
    enabled: !search && !category && !featured,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  const products: Product[] = (data as { data?: Product[] })?.data || [];
  const featuredProducts: Product[] = (featuredData as { data?: Product[] })?.data || [];
  const categories: Category[] = (categoriesData as { data?: Category[] })?.data || [];

  const showHeroAndBanners = !search && !category && !featured;

  const handleCategorySelect = (slug: string) => {
    setMobileSidebarOpen(false);
    if (slug) {
      router.push(`/?category=${slug}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {showHeroAndBanners && featuredProducts.length > 0 && (
        <section>
          <HeroCarousel products={featuredProducts.slice(0, 5)} />
        </section>
      )}

      {/* Category Banners */}
      {showHeroAndBanners && (
        <section className="container py-16">
          <CategoriesBanner />
        </section>
      )}

      {/* Search Results Header */}
      {search && (
        <div className="container py-8">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
              Search Results
            </p>
            <h2 className="text-2xl font-light text-black">
              &quot;{search}&quot;
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      )}

      {/* Mobile Filter Button */}
      <div className="container lg:hidden py-4">
        <Button
          variant="outline"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 rounded-none border-gray-300 text-[10px] uppercase tracking-[0.15em]"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container pb-16">
        <div className="flex gap-8">
          {/* Category Sidebar */}
          <CategorySidebar
            categories={categories}
            selectedCategory={category}
            onSelectCategory={handleCategorySelect}
            isMobileOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          />

          {/* Products Section */}
          <main className="flex-1">
            <SectionHeader
              title={
                featured
                  ? 'New Arrivals'
                  : category
                  ? categories.find((c) => c.slug === category)?.name || category
                  : 'Our Collection'
              }
              subtitle={
                featured
                  ? 'Fresh Styles'
                  : category
                  ? 'Curated Selection'
                  : 'Discover'
              }
              action={
                category && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCategorySelect('')}
                    className="text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-black"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filter
                  </Button>
                )
              }
            />

            <ProductGrid products={products} isLoading={isLoading} />

            {/* Load More */}
            {products.length > 0 && products.length >= 20 && (
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="rounded-none border-black px-12 h-12 text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white">
                  Load More
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                  No Results
                </p>
                <h3 className="text-xl font-light mb-4">No products found</h3>
                <p className="text-gray-400 mb-6">
                  {category ? `No products in this category` : 'Try adjusting your search'}
                </p>
                {category && (
                  <Button
                    onClick={() => handleCategorySelect('')}
                    className="rounded-none bg-black hover:bg-gray-800 text-[10px] uppercase tracking-[0.15em]"
                  >
                    View all products
                  </Button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Promotional Banner */}
      {showHeroAndBanners && (
        <PromotionalBanner />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="container py-6">
          <div className="h-[500px] bg-gray-100 animate-pulse mb-6" />
          <ProductGrid products={[]} isLoading />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
