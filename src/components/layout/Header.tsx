import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFitProfileStore } from '@/store/useFitProfileStore';

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const profile = useFitProfileStore((state) => state.profile);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <span className="font-display font-bold text-2xl gradient-text">
              Smart Fit
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/shop"
              className="text-gray-700 hover:text-primary-600 font-medium transition-smooth"
            >
              Shop
            </Link>
            <Link
              to="/fit-profile"
              className="text-gray-700 hover:text-primary-600 font-medium transition-smooth"
            >
              Fit Profile
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Fit Profile Button */}
            {profile ? (
              <Link to="/fit-profile">
                <Button variant="secondary" size="sm" icon={<User className="w-4 h-4" />}>
                  My Fit Profile
                </Button>
              </Link>
            ) : (
              <Link to="/fit-profile">
                <Button variant="primary" size="sm" icon={<User className="w-4 h-4" />}>
                  Create Fit Profile
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-smooth">
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-smooth">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
