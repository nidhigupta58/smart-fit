import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">SF</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                Smart Fit
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Find your perfect fit with AI-powered size recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=shirts" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jeans" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Jeans
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jackets" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Jackets
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fit-profile" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Fit Profile
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm transition-smooth">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-smooth">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-smooth">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-smooth">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-smooth">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2024 Smart Fit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
