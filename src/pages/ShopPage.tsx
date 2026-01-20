import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import type { Category, Gender } from '@/types';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  );
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(
    (searchParams.get('gender') as Gender) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedGender !== 'all') params.set('gender', selectedGender);
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedGender, setSearchParams]);

  const filteredProducts = mockProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === 'all' || product.category === selectedCategory;
    const genderMatch =
      selectedGender === 'all' || product.gender === selectedGender || product.gender === 'unisex';
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return categoryMatch && genderMatch && searchMatch && priceMatch;
  });

  const categories = ['all', 'shirts', 't-shirts', 'jeans', 'pants', 'jackets', 'hoodies', 'dresses', 'activewear', 'sweaters', 'shoes', 'accessories', 'skirts'];
  const genders = ['all', 'men', 'women', 'unisex'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-primary-50 via-white to-accent-50 -z-10" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
              {filteredProducts.length} Products
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover your perfect style with AI-powered size recommendations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-6 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Price Range Filter */}
            <div className="lg:w-1/3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <SlidersHorizontal className="w-4 h-4" />
                Price Range: <span className="text-primary-600">₹{priceRange.min} - ₹{priceRange.max}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full h-2 bg-gradient-to-r from-primary-200 to-accent-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gender
            </label>
            <div className="flex flex-wrap gap-2">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender as Gender | 'all')}
                  className={`filter-btn ${
                    selectedGender === gender
                      ? 'filter-btn-active'
                      : 'filter-btn-inactive'
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as Category | 'all')}
                  className={`filter-btn ${
                    selectedCategory === category
                      ? 'filter-btn-active'
                      : 'filter-btn-inactive'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
