'use client';

import Link from 'next/link';
import { Search, Menu, Phone, Truck, ShieldCheck, ChevronDown, User, MapPin, Heart, LogOut, Package, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartSheet } from './cart-sheet';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCustomerStore } from '@/stores/customer';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { customer, isAuthenticated, logout, loadAuth } = useCustomerStore();

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const initials = customer?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs">
        <div className="container flex items-center justify-center h-10 gap-4">
          <span className="tracking-[0.2em] uppercase">Free Shipping on Orders Over 50,000 FCFA</span>
        </div>
      </div>

      {/* Top Bar - Desktop only */}
      <div className="hidden md:block border-b border-gray-200 text-xs">
        <div className="container flex items-center justify-between h-10">
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" />
              <span className="tracking-wide">Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="tracking-wide">Authentic Products</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="tracking-wide">+237 6XX XXX XXX</span>
            </div>
            <Link href="/track" className="flex items-center gap-2 hover:text-black transition-colors">
              <MapPin className="h-3.5 w-3.5" />
              <span className="tracking-wide">Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="container">
          {/* Main Navigation Row */}
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] border-r-0">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-xl tracking-[0.3em] font-light">
                      ÉLÉGANCE
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-10 flex flex-col">
                  <Link
                    href="/"
                    className="py-4 text-sm tracking-[0.15em] uppercase border-b border-gray-100 hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/?featured=true"
                    className="py-4 text-sm tracking-[0.15em] uppercase border-b border-gray-100 hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    href="/"
                    className="py-4 text-sm tracking-[0.15em] uppercase border-b border-gray-100 hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Collections
                  </Link>
                  <Link
                    href="/cart"
                    className="py-4 text-sm tracking-[0.15em] uppercase border-b border-gray-100 hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shopping Bag
                  </Link>
                  <Link
                    href="/track"
                    className="py-4 text-sm tracking-[0.15em] uppercase border-b border-gray-100 hover:text-gray-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Track Order
                  </Link>
                </nav>

                {/* Account Section */}
                <div className="mt-8 pt-6 border-t space-y-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-4">Account</p>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={customer?.profileImage} alt={customer?.name} />
                          <AvatarFallback className="bg-black text-white text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{customer?.name}</p>
                          <p className="text-xs text-gray-500">{customer?.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Package className="h-4 w-4" />
                        Orders
                      </Link>
                      <Link
                        href="/account/addresses"
                        className="flex items-center gap-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <MapPin className="h-4 w-4" />
                        Addresses
                      </Link>
                      <button
                        className="flex items-center gap-2 py-3 text-sm text-red-600 hover:text-red-700 transition-colors w-full"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block py-3 text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block py-3 text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile contact info */}
                <div className="mt-8 pt-6 border-t space-y-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Contact</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>+237 6XX XXX XXX</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-xl md:text-2xl tracking-[0.3em] font-light text-black">
                ÉLÉGANCE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              <Link
                href="/"
                className="text-[11px] tracking-[0.2em] uppercase text-gray-700 hover:text-black transition-colors"
              >
                Home
              </Link>
              <Link
                href="/?featured=true"
                className="text-[11px] tracking-[0.2em] uppercase text-gray-700 hover:text-black transition-colors"
              >
                New Arrivals
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-[11px] tracking-[0.2em] uppercase text-gray-700 hover:text-black transition-colors flex items-center gap-1">
                    Collections
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 rounded-none border-gray-200">
                  <DropdownMenuItem asChild className="text-xs tracking-[0.1em] uppercase cursor-pointer">
                    <Link href="/">All Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-xs tracking-[0.1em] uppercase cursor-pointer">
                    <Link href="/?featured=true">Featured</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/track"
                className="text-[11px] tracking-[0.2em] uppercase text-gray-700 hover:text-black transition-colors"
              >
                Track Order
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist Button */}
              <Button variant="ghost" size="icon" className="hidden sm:flex shrink-0">
                <Heart className="h-5 w-5" />
              </Button>

              {/* Account Button */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden sm:flex shrink-0">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={customer?.profileImage} alt={customer?.name} />
                        <AvatarFallback className="bg-black text-white text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{customer?.name}</p>
                      <p className="text-xs text-muted-foreground">{customer?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/addresses">
                        <MapPin className="mr-2 h-4 w-4" />
                        Addresses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="hidden sm:flex shrink-0" asChild>
                  <Link href="/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              {/* Cart */}
              <CartSheet />
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {mobileSearchOpen && (
            <div className="pb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-11 pr-4 h-12 rounded-none border-gray-200 focus:border-black bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
