'use client';

import Link from 'next/link';
import { ShoppingBag, Clock, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from '@/components/ui/product-image';
import { formatPrice, getImageUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const imageUrl = getImageUrl(product);
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(product.price) / Number(product.comparePrice)) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isLoading) return;

    setIsLoading(true);
    try {
      await addItem(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (variant === 'horizontal') {
    return (
      <Link href={`/products/${product.slug}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md border-0 bg-white rounded-none">
          <div className="flex">
            <div className="relative w-32 sm:w-40 flex-shrink-0 overflow-hidden bg-gray-100">
              <ProductImage
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="160px"
              />
              {hasDiscount && (
                <Badge className="absolute left-2 top-2 bg-black text-white font-normal rounded-none text-[10px] tracking-wider">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            <CardContent className="flex-1 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                {product.categories?.[0]?.category?.name || 'Fashion'}
              </p>
              <h3 className="line-clamp-2 text-sm text-gray-900 group-hover:text-gray-600 transition-colors">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm font-medium text-black">
                  {formatPrice(product.price)}
                </p>
                {hasDiscount && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(product.comparePrice!)}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                className="mt-3 w-full rounded-none bg-black hover:bg-gray-800 text-[10px] uppercase tracking-[0.15em]"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isLoading}
              >
                <ShoppingBag className="mr-2 h-3.5 w-3.5" />
                {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
              </Button>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className="group overflow-hidden transition-all duration-300 border-0 bg-white rounded-none fashion-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <ProductImage
            src={imageUrl}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "scale-105" : "scale-100"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-black text-white border-0 rounded-none text-[10px] font-normal tracking-[0.15em] uppercase px-2 py-1">
                New
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-white text-black border border-black rounded-none text-[10px] font-normal tracking-wider px-2 py-1">
                -{discountPercent}%
              </Badge>
            )}
            {product.isPreorder && (
              <Badge className="bg-gray-900 text-white border-0 rounded-none text-[10px] font-normal tracking-wider px-2 py-1">
                <Clock className="mr-1 h-3 w-3" />
                Pre-order
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute right-3 top-3 p-2.5 transition-all duration-200",
              isWishlisted
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            )}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
          </button>

          {/* Quick actions on hover */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-4 flex gap-2 transition-all duration-300 bg-gradient-to-t from-black/40 to-transparent",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button
              size="sm"
              className="flex-1 bg-white text-black hover:bg-black hover:text-white rounded-none text-[10px] uppercase tracking-[0.15em] h-10"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
            >
              <ShoppingBag className="mr-2 h-3.5 w-3.5" />
              {isLoading ? 'Adding...' : 'Add to Bag'}
            </Button>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-black hover:text-white rounded-none h-10 w-10 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-normal">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-2 bg-white">
          {/* Category */}
          {product.categories && product.categories.length > 0 && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              {product.categories[0]?.category?.name || 'Fashion'}
            </p>
          )}

          {/* Product name */}
          <h3 className="line-clamp-2 text-gray-900 group-hover:text-gray-600 transition-colors text-sm leading-snug">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <p className="text-sm font-medium text-black">
              {formatPrice(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.comparePrice!)}
              </p>
            )}
          </div>

          {/* Stock indicator */}
          {!isOutOfStock && product.stock <= 5 && (
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Only {product.stock} left
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
