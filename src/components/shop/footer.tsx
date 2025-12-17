'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, CreditCard, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Newsletter</p>
              <p className="text-2xl md:text-3xl font-light tracking-wide">Stay Updated</p>
              <p className="text-gray-400 mt-2 text-sm">Subscribe for exclusive offers and new arrivals</p>
            </div>
            <div className="flex w-full md:w-auto gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-white/20 text-white placeholder:text-gray-500 rounded-none min-w-[280px] h-12 focus:border-white"
              />
              <Button className="rounded-none h-12 px-8 bg-white text-black hover:bg-gray-200 text-[10px] uppercase tracking-[0.2em]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl tracking-[0.3em] font-light">ÉLÉGANCE</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Discover curated fashion pieces that define elegance. We bring the world&apos;s finest fashion to Cameroon.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-200"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-200"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-200"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Shop</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                All Collections
              </Link>
              <Link
                href="/?featured=true"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                New Arrivals
              </Link>
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Shopping Bag
              </Link>
              <Link
                href="/track"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Track Order
              </Link>
            </nav>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Customer Care</h4>
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Shipping Information
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Returns & Exchanges
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Size Guide
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-gray-400" />
                <p className="text-sm text-gray-300">Douala, Cameroon</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-gray-400" />
                <p className="text-sm text-gray-300">+237 6XX XXX XXX</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-gray-400" />
                <p className="text-sm text-gray-300">hello@elegance.cm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over 50K</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">24/7 Support</p>
                <p className="text-xs text-gray-500">Dedicated help</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Easy Payment</p>
                <p className="text-xs text-gray-500">Multiple options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Élégance. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
