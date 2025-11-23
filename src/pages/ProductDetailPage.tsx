import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { FitIndicator } from '@/components/fit/FitIndicator';
import { getProductById } from '@/data/mockProducts';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFitProfileStore } from '@/store/useFitProfileStore';
import { getSizeRecommendation } from '@/services/aiService';
import type { Size, SizeRecommendation } from '@/types';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Product not found</p>
          <Link to="/shop" className="text-primary-600 hover:underline mt-2 inline-block">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-smooth"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Get AI Recommendation Button */}
            {profile && (
              <Button
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-5 h-5" />}
                onClick={handleGetRecommendation}
                className="w-full"
              >
                Get AI Fit Recommendation
              </Button>
            )}

            {!profile && (
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
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition-smooth ${
                      selectedSize === size
                        ? 'bg-primary-500 text-white shadow-glow-sm'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                    } ${
                      recommendation?.recommendedSize === size
                        ? 'ring-2 ring-green-400 ring-offset-2'
                        : ''
                    }`}
                  >
                    {size}
                    {recommendation?.recommendedSize === size && (
                      <span className="ml-1">⭐</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                icon={<ShoppingCart className="w-5 h-5" />}
                onClick={handleAddToCart}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={toggleWishlist}
                className="aspect-square !px-0"
              >
                <Heart
                  className={`w-5 h-5 ${
                    inWishlist ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="text-gray-900 font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Care:</span>
                    <span className="text-gray-900 font-medium">{product.careInstructions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
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
          <div className="py-12 text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Analyzing your measurements...</p>
          </div>
        ) : recommendation ? (
          <div className="space-y-6">
            {/* Recommended Size */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Recommended Size</p>
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
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
              >
                {recommendation.confidence} confidence ({recommendation.fitScore}% match)
              </Badge>
            </div>

            {/* Fit Indicator */}
            <FitIndicator fitResult={recommendation.fitResult} />

            {/* AI Advice */}
            <Card className="bg-primary-50 border-primary-200">
              <div className="p-4">
                <p className="text-sm text-gray-700">{recommendation.advice}</p>
              </div>
            </Card>

            {/* Alternative Sizes */}
            {recommendation.alternativeSizes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Alternative sizes you might consider:
                </p>
                <div className="flex gap-2">
                  {recommendation.alternativeSizes.map((size) => (
                    <Badge key={size} variant="secondary">
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
              className="w-full"
            >
              Select {recommendation.recommendedSize} & Continue
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
