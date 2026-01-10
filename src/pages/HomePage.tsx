import { Link } from 'react-router-dom';
import { Sparkles, User, TrendingUp, Shield, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/mockProducts';
import { useFitProfileStore } from '@/store/useFitProfileStore';

export function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const profile = useFitProfileStore((state) => state.profile);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob blob-1 absolute -top-40 -right-40 w-96 h-96 bg-primary-300/40" />
        <div className="blob blob-2 absolute top-1/2 -left-40 w-80 h-80 bg-accent-300/30" />
        <div className="blob blob-3 absolute -bottom-40 right-1/4 w-72 h-72 bg-primary-200/40" />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/50 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                AI-Powered Fit Recommendations
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-gray-900 animate-slide-up leading-tight">
              Find Your{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                  Perfect Fit
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#0ea5e9"/>
                      <stop offset="100%" stopColor="#d946ef"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              <span className="text-gray-700">with AI</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-1">
              30-40% of clothing returns happen due to wrong size.{' '}
              <span className="font-bold text-gray-900 underline decoration-primary-500 decoration-2 underline-offset-4">Not anymore.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
              {profile ? (
                <Link to="/shop">
                  <Button size="lg" icon={<TrendingUp className="w-5 h-5" />} className="shadow-glow">
                    Start Shopping
                  </Button>
                </Link>
              ) : (
                <Link to="/fit-profile">
                  <Button size="lg" icon={<Zap className="w-5 h-5" />} className="shadow-glow">
                    Create Your Fit Profile
                  </Button>
                </Link>
              )}
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="group">
                  Browse Collections
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto animate-slide-up stagger-3">
              <div className="stat-card group hover:shadow-lg">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">95%</p>
                <p className="text-sm text-gray-600 mt-2 font-medium">Fit Accuracy</p>
              </div>
              <div className="stat-card group hover:shadow-lg">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">50K+</p>
                <p className="text-sm text-gray-600 mt-2 font-medium">Happy Customers</p>
              </div>
              <div className="stat-card group hover:shadow-lg">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">24/7</p>
                <p className="text-sm text-gray-600 mt-2 font-medium">AI Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/60 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your perfect fit in just a few minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative text-center space-y-5 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                1
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mx-auto flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform duration-300">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                Create Fit Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your height, weight, body type, and fit preference for personalized sizing
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center space-y-5 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                2
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 mx-auto flex items-center justify-center shadow-glow-accent group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                Get AI Recommendations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your profile to recommend the perfect size for each item
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center space-y-5 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                3
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mx-auto flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                Shop with Confidence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Buy knowing your size will fit perfectly every time, every purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-gray-50/80 to-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-3">
                <Star className="w-3 h-3 inline mr-1" />
                Featured
              </span>
              <h2 className="font-display font-bold text-4xl text-gray-900 mb-2">
                Trending Now
              </h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="secondary" className="group">
                View All Products
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!profile && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_auto] animate-gradient-x" />
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center animate-float">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
                Ready to Find Your Perfect Fit?
              </h2>
              <p className="text-xl text-white/90 max-w-xl mx-auto">
                Create your fit profile now and never worry about wrong sizes again
              </p>
              <Link to="/fit-profile">
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<Zap className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Create Fit Profile — It's Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
