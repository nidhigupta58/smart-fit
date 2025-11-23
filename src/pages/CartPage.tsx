import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto" />
          <h2 className="font-display font-semibold text-2xl text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600">Add some products to get started!</p>
          <Link to="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="font-display font-bold text-4xl text-gray-900 mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.product.id}-${item.size}`}>
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-semibold text-lg text-gray-900 hover:text-primary-600 transition-smooth line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" size="sm">
                          Size: {item.size}
                        </Badge>
                        {item.recommendedSize && item.size === item.recommendedSize && (
                          <Badge variant="success" size="sm">
                            ⭐ AI Recommended
                          </Badge>
                        )}
                      </div>

                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(item.product.price)}
                      </p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-smooth"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
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
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-smooth"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-smooth"
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
            <Card className="sticky top-24">
              <div className="p-6 space-y-6">
                <h2 className="font-display font-semibold text-xl text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg text-gray-900">Total</span>
                      <span className="font-bold text-2xl gradient-text">
                        {formatCurrency(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="w-full"
                  onClick={() => alert('Checkout feature coming soon!')}
                >
                  Proceed to Checkout
                </Button>

                <Link to="/shop" className="block">
                  <Button variant="secondary" size="md" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
