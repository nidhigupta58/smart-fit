import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-primary-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 text-lg">Add some products to get started!</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-sm">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-4xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card 
                key={`${item.product.id}-${item.size}`}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover rounded-xl shadow-md"
                      />
                      {item.recommendedSize && item.size === item.recommendedSize && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                          <span className="text-xs">⭐</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-semibold text-lg text-gray-900 hover:text-primary-600 transition-colors line-clamp-1 block"
                      >
                        {item.product.name}
                      </Link>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" size="sm" className="font-medium">
                          Size: {item.size}
                        </Badge>
                        {item.recommendedSize && item.size === item.recommendedSize && (
                          <Badge variant="success" size="sm">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Recommended
                          </Badge>
                        )}
                      </div>

                      <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {formatCurrency(item.product.price)}
                      </p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center gap-4 pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-red-500 hover:text-red-600 flex items-center gap-1.5 text-sm font-medium transition-colors hover:bg-red-50 px-3 py-1.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="overflow-hidden border-2 border-primary-100 shadow-lg">
                {/* Gradient header */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4">
                  <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatCurrency(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Free
                      </span>
                    </div>
                    <div className="border-t-2 border-dashed border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-gray-900">Total</span>
                        <span className="font-bold text-3xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                          {formatCurrency(getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Confidence Badge */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="font-medium text-gray-700">
                        All sizes verified by AI for perfect fit
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="w-full shadow-glow"
                    onClick={() => alert('Checkout feature coming soon!')}
                  >
                    Proceed to Checkout
                  </Button>

                  <Link to="/shop" className="block">
                    <Button variant="ghost" size="md" className="w-full">
                      ← Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
