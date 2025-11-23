import { Link } from 'react-router-dom';
import { Sparkles, User, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/mockProducts';
import { useFitProfileStore } from '@/store/useFitProfileStore';

export function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const profile = useFitProfileStore((state) => state.profile);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">
                AI-Powered Fit Recommendations
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Find Your{' '}
              <span className="gradient-text">Perfect Fit</span>
              <br />
              with AI
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              30-40% of clothing returns happen due to wrong size.{' '}
              <span className="font-semibold text-gray-900">Not anymore.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {profile ? (
                <Link to="/shop">
                  <Button size="lg" icon={<TrendingUp className="w-5 h-5" />}>
                    Start Shopping
                  </Button>
                </Link>
              ) : (
                <Link to="/fit-profile">
                  <Button size="lg" icon={<User className="w-5 h-5" />}>
                    Create Your Fit Profile
                  </Button>
                </Link>
              )}
              <Link to="/shop">
                <Button variant="secondary" size="lg">
                  Browse Collections
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold gradient-text">95%</p>
                <p className="text-sm text-gray-600 mt-1">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">24/7</p>
                <p className="text-sm text-gray-600 mt-1">AI Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 -z-10" />
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to find your perfect fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center shadow-glow">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900">
                Create Fit Profile
              </h3>
              <p className="text-gray-600">
                Enter your height, weight, body type, and fit preference
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center shadow-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900">
                Get AI Recommendations
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your profile to recommend the perfect size
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center shadow-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900">
                Shop with Confidence
              </h3>
              <p className="text-gray-600">
                Buy knowing your size will fit perfectly every time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="secondary">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!profile && (
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-display font-bold text-4xl text-white">
                Ready to Find Your Perfect Fit?
              </h2>
              <p className="text-xl text-white/90">
                Create your fit profile now and never worry about wrong sizes again
              </p>
              <Link to="/fit-profile">
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<User className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-white/90"
                >
                  Create Fit Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
