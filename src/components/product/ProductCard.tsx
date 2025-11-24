import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
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
      <Card hover className="group overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new && (
              <Badge variant="success" size="sm">
                New
              </Badge>
            )}
            {recommendedSize && profile && (
              <Badge variant="primary" size="sm" className="shadow-soft">
                {recommendedSize} - Recommended ⭐
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-smooth shadow-soft opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 ${
                inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-smooth">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
