import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import type { Category, Gender } from '@/types';

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products available
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6"> 
             {/* Price Range Filter */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange.min} - ₹{priceRange.max}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex flex-wrap gap-2">
              {['all', 'men', 'women', 'unisex'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender as Gender | 'all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    selectedGender === gender
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {['all', 'shirts', 't-shirts', 'jeans', 'pants', 'jackets', 'hoodies', 'dresses', 'activewear', 'sweaters', 'shoes', 'accessories', 'skirts'].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as Category | 'all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
