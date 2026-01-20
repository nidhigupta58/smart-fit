import { Link } from 'react-router-dom';
import { Heart, Star, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFitProfileStore } from '@/store/useFitProfileStore';

interface ProductCardProps {
  product: Product;
  recommendedSize?: string;
}

export function ProductCard({ product, recommendedSize }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const profile = useFitProfileStore((state) => state.profile);
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card hover className="group overflow-hidden card-shine gradient-border">
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new && (
              <Badge variant="success" size="sm" className="shadow-lg backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
            {recommendedSize && profile && (
              <Badge variant="primary" size="sm" className="shadow-lg backdrop-blur-sm">
                {recommendedSize} - Recommended ⭐
              </Badge>
            )}
            {profile?.gender && 
             product.gender !== 'unisex' && 
             profile.gender !== product.gender && (
              <Badge variant="warning" size="sm" className="shadow-lg backdrop-blur-sm">
                {product.gender === 'women' ? "Women's" : "Men's"} sizing
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
              ${inWishlist 
                ? 'bg-gradient-to-r from-pink-500 to-red-500 scale-100' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 hover:scale-110'
              }`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                inWishlist ? 'fill-white text-white scale-110' : 'text-gray-700 group-hover:text-pink-500'
              }`}
            />
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-end justify-center pb-3">
            <span className="text-sm font-medium text-primary-600 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-white to-gray-50/50">
          {/* Category */}
          <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-700">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {formatCurrency(product.price)}
            </p>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12">
              <span className="text-white text-sm">→</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
