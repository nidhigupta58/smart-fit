import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import type { Category, Gender } from '@/types';

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>('all');

  const filteredProducts = mockProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === 'all' || product.category === selectedCategory;
    const genderMatch =
      selectedGender === 'all' || product.gender === selectedGender || product.gender === 'unisex';
    return categoryMatch && genderMatch;
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
        <div className="mb-8 space-y-4">
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
              {['all', 'shirts', 't-shirts', 'jeans', 'pants', 'jackets', 'hoodies', 'dresses', 'activewear'].map(
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
