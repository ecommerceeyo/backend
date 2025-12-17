'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Clock,
  Truck,
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  RotateCcw,
  Star,
  Package,
  CreditCard,
  Headphones
} from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductImage } from '@/components/ui/product-image';
import { formatPrice, getImageUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const response = await api.getProduct(params.slug);
      return response as { success: boolean; data: Product };
    },
  });

  const product: Product | null = data?.data || null;

  const handleAddToCart = async () => {
    if (!product || isAdding) return;

    setIsAdding(true);
    try {
      await addItem(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const nextImage = () => {
    if (product) {
      const images = product.images.length > 0 ? product.images : [{ url: '/placeholder-product.png', isPrimary: true, id: '0', publicId: '', sortOrder: 0 }];
      setSelectedImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      const images = product.images.length > 0 ? product.images : [{ url: '/placeholder-product.png', isPrimary: true, id: '0', publicId: '', sortOrder: 0 }];
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground max-w-md">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button asChild className="mt-4 rounded-full">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [{ url: '/placeholder-product.png', isPrimary: true, id: '0', publicId: '', sortOrder: 0 }];
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(product.price) / Number(product.comparePrice)) * 100)
    : 0;

  // Group specifications by group
  const specGroups = product.specifications.reduce(
    (acc, spec) => {
      const group = spec.group || 'General';
      if (!acc[group]) acc[group] = [];
      acc[group].push(spec);
      return acc;
    },
    {} as Record<string, typeof product.specifications>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          {product.categories.length > 0 && (
            <>
              <span>{product.categories[0]?.category?.name || 'Products'}</span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted border shadow-lg">
              <ProductImage
                src={images[selectedImage]?.url || '/placeholder-product.png'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500"
                priority
              />

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white border-0 px-3 py-1 text-sm font-bold shadow-lg">
                    -{discountPercent}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1 shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Featured
                  </Badge>
                )}
                {product.isPreorder && (
                  <Badge className="bg-orange-500 text-white border-0 px-3 py-1 shadow-lg">
                    <Clock className="h-3 w-3 mr-1" />
                    Pre-order
                  </Badge>
                )}
              </div>

              {/* Image Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Badge variant="destructive" className="text-lg px-6 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110",
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white/90 backdrop-blur-sm hover:bg-white"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-white")} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-transparent hover:border-muted-foreground/30'
                    )}
                  >
                    <ProductImage
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Categories */}
            {product.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <Badge key={cat.id} variant="secondary" className="rounded-full px-3">
                    {cat.category?.name || 'Category'}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{product.name}</h1>

            {/* Rating Placeholder */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn(
                    "h-5 w-5",
                    i < 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
                  )} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.0) • 12 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.comparePrice!)}
                </span>
              )}
              {hasDiscount && (
                <Badge className="bg-red-100 text-red-600 border-0">
                  Save {formatPrice(Number(product.comparePrice) - Number(product.price))}
                </Badge>
              )}
            </div>

            {/* Pre-order Note */}
            {product.isPreorder && product.preorderNote && (
              <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-4 border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200">Pre-order Item</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">{product.preorderNote}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            )}

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  <Package className="h-4 w-4 inline mr-1" />
                  {product.stock} in stock
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isAdding}
                >
                  {added ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-6 rounded-xl"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500 text-red-500")} />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Multiple Payment</p>
                  <p className="text-xs text-muted-foreground">Various options</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">24/7 Support</p>
                  <p className="text-xs text-muted-foreground">Dedicated help</p>
                </div>
              </div>
            </div>

            {/* Delivery Zones */}
            {product.deliveryZones && product.deliveryZones.length > 0 && (
              <div className="space-y-3 rounded-xl border bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Information
                </h3>
                <div className="space-y-2">
                  {product.deliveryZones.map((zone, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{zone.zoneName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {zone.minDays === zone.maxDays
                            ? `${zone.minDays} day${zone.minDays > 1 ? 's' : ''}`
                            : `${zone.minDays}-${zone.maxDays} days`}
                        </span>
                        {zone.deliveryFee !== undefined && zone.deliveryFee !== null && zone.deliveryFee > 0 ? (
                          <Badge variant="secondary" className="rounded-full">
                            +{formatPrice(zone.deliveryFee)}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-0 rounded-full">
                            Free
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Section */}
        {Object.keys(specGroups).length > 0 && (
          <div className="mt-12 lg:mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Product Specifications</h2>
              <p className="text-muted-foreground mt-2">Detailed information about this product</p>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-background to-muted/20 p-6 lg:p-8 shadow-sm">
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(specGroups).map(([group, specs]) => (
                  <div key={group} className="space-y-3">
                    {Object.keys(specGroups).length > 1 && (
                      <h3 className="font-semibold text-lg border-b pb-2 mb-3">{group}</h3>
                    )}
                    <div className="space-y-2">
                      {specs.map((spec) => (
                        <div
                          key={spec.id}
                          className="flex justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-muted-foreground">{spec.key}</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container py-6 lg:py-10">
        <Skeleton className="mb-6 h-5 w-48" />
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="flex gap-3">
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
