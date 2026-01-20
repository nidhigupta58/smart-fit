import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';

export function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-red-100 mx-auto flex items-center justify-center">
            <Heart className="w-16 h-16 text-pink-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 text-lg">Start adding products you love!</p>
          </div>
          <Link to="/shop">
            <Button size="lg" icon={<Sparkles className="w-5 h-5" />} className="shadow-glow">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (productId: string) => {
    const wishlistItem = items.find(item => item.product.id === productId);
    if (wishlistItem) {
      // Add with default size (first available size)
      const defaultSize = wishlistItem.product.availableSizes[0] || wishlistItem.product.sizes[0];
      if (defaultSize) {
        addToCart(wishlistItem.product, defaultSize);
        alert('Added to cart!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-glow-sm">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-4xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Card
              key={item.product.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-[3/4]">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </Link>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.product.new && (
                    <Badge variant="success" size="sm" className="shadow-lg backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <Link
                  to={`/product/${item.product.id}`}
                  className="block"
                >
                  <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-1">
                    {item.product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 leading-snug mb-2">
                    {item.product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                    <span className="text-xs">⭐</span>
                    <span className="text-sm font-bold text-amber-700">{item.product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({item.product.reviewCount})</span>
                </div>

                {/* Price */}
                <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formatCurrency(item.product.price)}
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link to={`/product/${item.product.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full text-xs">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ShoppingCart className="w-3 h-3" />}
                    onClick={() => handleAddToCart(item.product.id)}
                    className="text-xs"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        {items.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/shop">
              <Button
                variant="ghost"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

