import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'XAF'): string {
  const formattedAmount = Math.round(amount).toLocaleString('fr-FR');

  // Map currency codes to symbols
  const currencySymbols: Record<string, string> = {
    XAF: 'FCFA',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const symbol = currencySymbols[currency] || currency;

  // For FCFA, put symbol after the amount
  if (currency === 'XAF') {
    return `${formattedAmount} ${symbol}`;
  }

  // For other currencies, put symbol before the amount
  return `${symbol}${formattedAmount}`;
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  const currency = process.env.NEXT_PUBLIC_CURRENCY || 'XAF';
  return formatCurrency(numPrice, currency);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getImageUrl(product: { images?: { url: string; isPrimary: boolean }[] }): string {
  const primaryImage = product.images?.find((img) => img.isPrimary);
  return primaryImage?.url || product.images?.[0]?.url || '/placeholder-product.png';
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function getDeliveryStatusColor(status: string): string {
  switch (status) {
    case 'DELIVERED':
      return 'bg-green-100 text-green-800';
    case 'IN_TRANSIT':
      return 'bg-blue-100 text-blue-800';
    case 'PICKED_UP':
      return 'bg-yellow-100 text-yellow-800';
    case 'PENDING':
      return 'bg-gray-100 text-gray-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'PAID':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'FAILED':
      return 'bg-red-100 text-red-800';
    case 'REFUNDED':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getDeliveryStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Order Placed',
    PICKED_UP: 'Picked Up',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  };
  return labels[status] || status;
}
