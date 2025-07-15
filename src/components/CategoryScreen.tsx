
import React, { useState, useMemo } from 'react';
import { FiArrowLeft, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CategoryScreenProps {
  category: string;
  onNavigateToProduct: (product: any) => void;
  onBack: () => void;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ category, onNavigateToProduct, onBack }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock products filtered by category
  const allCategoryProducts = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirts',
      price: 299,
      originalPrice: 399,
      moq: 50,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.2,
      supplier: 'Fashion Hub Ltd.',
      discount: 25,
      isNew: false
    },
    {
      id: '7',
      name: 'Formal Business Shirts',
      price: 599,
      originalPrice: 799,
      moq: 30,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.3,
      supplier: 'Corporate Wear Co.',
      discount: 25,
      isNew: true
    },
    {
      id: '8',
      name: 'Casual Polo T-Shirts',
      price: 399,
      originalPrice: 549,
      moq: 40,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.1,
      supplier: 'Fashion Hub Ltd.',
      discount: 27,
      isNew: false
    },
    {
      id: '9',
      name: 'Designer Hoodies',
      price: 899,
      originalPrice: 1299,
      moq: 25,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.4,
      supplier: 'Urban Style',
      discount: 31,
      isNew: true
    },
    // Electronics
    {
      id: '10',
      name: 'Wireless Bluetooth Headphones',
      price: 1999,
      originalPrice: 2999,
      moq: 10,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.5,
      supplier: 'Tech Solutions',
      discount: 33,
      isNew: true
    },
    {
      id: '11',
      name: 'Smart Phone Charger',
      price: 499,
      originalPrice: 799,
      moq: 20,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.0,
      supplier: 'Tech Solutions',
      discount: 38,
      isNew: false
    },
    // Groceries
    {
      id: '12',
      name: 'Organic Basmati Rice',
      price: 150,
      originalPrice: 200,
      moq: 100,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Groceries',
      rating: 4.6,
      supplier: 'Fresh Farms',
      discount: 25,
      isNew: false
    }
  ].filter(product => product.category === category);

  // Apply filters using useMemo for performance
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allCategoryProducts];

    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (priceFilter) {
          case 'under-500':
            return product.price < 500;
          case '500-1000':
            return product.price >= 500 && product.price <= 1000;
          case '1000-2000':
            return product.price >= 1000 && product.price <= 2000;
          case 'above-2000':
            return product.price > 2000;
          default:
            return true;
        }
      });
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (ratingFilter) {
          case '4+':
            return product.rating >= 4.0;
          case '3.5+':
            return product.rating >= 3.5;
          case '3+':
            return product.rating >= 3.0;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return filtered.sort((a, b) => b.discount - a.discount);
      default:
        return filtered;
    }
  }, [allCategoryProducts, priceFilter, ratingFilter, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [priceFilter, ratingFilter, sortBy]);

  const clearFilters = () => {
    setPriceFilter('all');
    setRatingFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 mr-2"
              >
                <FiArrowLeft className="text-xl text-gray-700" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{category}</h1>
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <FiGrid className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <FiList className="text-lg" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>

            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiFilter className="text-lg" />
              <span className="font-medium">Filter</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Filters</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                  <select 
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1000</option>
                    <option value="1000-2000">₹1000 - ₹2000</option>
                    <option value="above-2000">Above ₹2000</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                  <select 
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Ratings</option>
                    <option value="4+">4.0+ Stars</option>
                    <option value="3.5+">3.5+ Stars</option>
                    <option value="3+">3.0+ Stars</option>
                  </select>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button 
                    onClick={clearFilters}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowFilter(false)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-6 pb-32">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigateToProduct(product)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {product.discount}% OFF
                  </span>
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>MOQ: {product.moq}</span>
                    <span className="flex items-center">
                      ⭐ {product.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{product.supplier}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigateToProduct(product)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 flex space-x-4"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {product.discount}%
                  </span>
                  {product.isNew && (
                    <span className="absolute -top-1 -left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{product.supplier}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>MOQ: {product.moq} pieces</span>
                    <span className="flex items-center">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryScreen;
