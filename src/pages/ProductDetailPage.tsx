import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles, ChevronLeft, Check, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { FitIndicator } from '@/components/fit/FitIndicator';
import { getProductById, getEquivalentProductsByGender } from '@/data/mockProducts';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFitProfileStore } from '@/store/useFitProfileStore';
import { getSizeRecommendation } from '@/services/aiService';
import type { Size, SizeRecommendation, Gender } from '@/types';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : null;
  
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { profile, addRecommendation } = useFitProfileStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 text-lg">Product not found</p>
          <Link to="/shop" className="text-primary-600 hover:underline mt-2 inline-flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleGetRecommendation = async () => {
    if (!profile) {
      alert('Please create a fit profile first!');
      return;
    }

    setLoadingRecommendation(true);
    setShowRecommendationModal(true);

    try {
      const rec = await getSizeRecommendation(profile, product);
      setRecommendation(rec);
      setSelectedSize(rec.recommendedSize);
      addRecommendation(product.id, product.name, rec);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, recommendation?.recommendedSize);
    alert('Added to cart!');
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-xl">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                {/* Gradient overlay on bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold uppercase">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                <span className="text-sm text-amber-600">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {formatCurrency(product.price)}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Gender Mismatch Recommendation */}
            {profile?.gender && 
             product.gender !== 'unisex' && 
             profile.gender !== product.gender && (
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <div className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      This item is in {product.gender === 'women' ? "Women's" : "Men's"} sizing.
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      Want the {profile.gender === 'men' ? "Men's" : "Women's"} equivalent?
                    </p>
                    <Link to={`/shop?gender=${profile.gender}&category=${product.category}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                      >
                        Shop {profile.gender === 'men' ? "Men's" : "Women's"} {product.category}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Get AI Recommendation Button */}
            {profile ? (
              <Button
                variant="primary"
                size="lg"
                icon={<Zap className="w-5 h-5" />}
                onClick={handleGetRecommendation}
                className="w-full shadow-glow"
              >
                Get AI Fit Recommendation
              </Button>
            ) : (
              <Link to="/fit-profile" className="block">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Sparkles className="w-5 h-5" />}
                  className="w-full"
                >
                  Create Fit Profile to Get Recommendations
                </Button>
              </Link>
            )}

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-sm'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-400 hover:shadow-md'
                    } ${
                      recommendation?.recommendedSize === size
                        ? 'ring-2 ring-green-400 ring-offset-2'
                        : ''
                    }`}
                  >
                    {size}
                    {recommendation?.recommendedSize === size && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                        <span className="text-xs">⭐</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                icon={<ShoppingCart className="w-5 h-5" />}
                onClick={handleAddToCart}
                className="flex-1 shadow-glow"
              >
                Add to Cart
              </Button>
              <button
                onClick={toggleWishlist}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  inWishlist
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 shadow-lg'
                    : 'bg-white border-2 border-gray-200 hover:border-pink-300 hover:shadow-md'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    inWishlist ? 'fill-white text-white' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            {/* Product Details Card */}
            <Card className="mt-6 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">📋</span>
                  Product Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material</span>
                    <span className="text-gray-900 font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Care</span>
                    <span className="text-gray-900 font-medium">{product.careInstructions}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Gender</span>
                    <span className="text-gray-900 font-medium capitalize">{product.gender}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Recommendation Modal */}
      <Modal
        open={showRecommendationModal}
        onClose={() => setShowRecommendationModal(false)}
        title="AI Fit Recommendation"
        size="md"
      >
        {loadingRecommendation ? (
          <div className="py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 text-lg">Analyzing your measurements...</p>
          </div>
        ) : recommendation ? (
          <div className="space-y-6">
            {/* Recommended Size */}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600 font-medium">Your Perfect Size</p>
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {recommendation.recommendedSize}
                </span>
              </div>
              <Badge
                variant={
                  recommendation.confidence === 'high'
                    ? 'success'
                    : recommendation.confidence === 'medium'
                    ? 'warning'
                    : 'info'
                }
                className="px-4 py-2"
              >
                <Check className="w-4 h-4 mr-1" />
                {recommendation.confidence} confidence ({recommendation.fitScore}% match)
              </Badge>
            </div>

            {/* Fit Indicator */}
            <FitIndicator fitResult={recommendation.fitResult} />

            {/* AI Advice */}
            <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{recommendation.advice}</p>
              </div>
            </Card>

            {/* Alternative Sizes */}
            {recommendation.alternativeSizes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Alternative sizes you might consider:
                </p>
                <div className="flex gap-2">
                  {recommendation.alternativeSizes.map((size) => (
                    <Badge key={size} variant="secondary" className="px-4 py-2">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              size="lg"
              onClick={() => {
                setSelectedSize(recommendation.recommendedSize);
                setShowRecommendationModal(false);
              }}
              className="w-full shadow-glow"
            >
              Select {recommendation.recommendedSize} & Continue Shopping
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
