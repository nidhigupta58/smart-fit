import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFitProfileStore } from '@/store/useFitProfileStore';

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const profile = useFitProfileStore((state) => state.profile);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-gradient-x">
                Smart Fit
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase -mt-1">
                AI-Powered Style
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/shop"
              className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50/80 group"
            >
              <span className="relative z-10">Shop</span>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </Link>
            <Link
              to="/fit-profile"
              className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50/80 group"
            >
              <span className="relative z-10">Fit Profile</span>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Fit Profile Button */}
            {profile ? (
              <Link to="/fit-profile">
                <Button variant="secondary" size="sm" icon={<User className="w-4 h-4" />} className="hidden sm:inline-flex">
                  My Fit Profile
                </Button>
              </Link>
            ) : (
              <Link to="/fit-profile">
                <Button variant="primary" size="sm" icon={<Sparkles className="w-4 h-4" />} className="hidden sm:inline-flex">
                  Create Profile
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2.5 hover:bg-gradient-to-br hover:from-pink-50 hover:to-red-50 rounded-xl transition-all duration-300 group"
            >
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-pink-500 transition-colors duration-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg animate-bounce-gentle">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2.5 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primary-500 transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-glow-sm animate-bounce-gentle">
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
