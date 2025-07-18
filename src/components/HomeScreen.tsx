import React, { useState } from 'react';
import { FiSearch, FiFilter, FiGrid, FiList, FiBell, FiMapPin } from 'react-icons/fi';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AddressData {
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  street: string;
  landmark?: string;
  addressType: 'home' | 'office' | 'other';
}

interface HomeScreenProps {
  onNavigateToProduct: (product: any) => void;
  onNavigateToCategory: (category: string) => void;
  userAddress?: AddressData | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToProduct, onNavigateToCategory, userAddress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [
    { name: 'All', icon: '📦', color: 'bg-blue-100' },
    { name: 'Electronics', icon: '📱', color: 'bg-purple-100' },
    { name: 'Fashion', icon: '👕', color: 'bg-pink-100' },
    { name: 'Home & Kitchen', icon: '🏠', color: 'bg-green-100' },
    { name: 'Groceries', icon: '🥕', color: 'bg-orange-100' },
    { name: 'Beauty', icon: '💄', color: 'bg-red-100' },
    { name: 'Sports', icon: '⚽', color: 'bg-yellow-100' },
  ];

  const mockProducts = [
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
      discount: 25
    },
    {
      id: '2',
      name: 'Wireless Bluetooth Earbuds',
      price: 1299,
      originalPrice: 1999,
      moq: 25,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.5,
      supplier: 'Tech Solutions',
      discount: 35
    },
    {
      id: '3',
      name: 'Kitchen Storage Containers Set',
      price: 599,
      originalPrice: 799,
      moq: 30,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Home & Kitchen',
      rating: 4.1,
      supplier: 'Home Essentials',
      discount: 25
    },
    {
      id: '4',
      name: 'Sports Water Bottles',
      price: 199,
      originalPrice: 299,
      moq: 100,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Sports',
      rating: 4.3,
      supplier: 'Sports World',
      discount: 33
    },
    {
      id: '5',
      name: 'LED Desk Lamps',
      price: 899,
      originalPrice: 1299,
      moq: 20,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.4,
      supplier: 'Lighting Co.',
      discount: 31
    },
    {
      id: '6',
      name: 'Face Care Beauty Kit',
      price: 799,
      originalPrice: 1199,
      moq: 40,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Beauty',
      rating: 4.0,
      supplier: 'Beauty Plus',
      discount: 33
    },
    {
      id: 'grocery-1',
      name: 'Basmati Rice Premium',
      supplier: 'Rice Mills Co.',
      price: 120,
      originalPrice: 150,
      discount: 20,
      moq: 5,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      category: 'Groceries'
    },
    {
      id: 'grocery-2',
      name: 'Organic Wheat Flour',
      supplier: 'Organic Foods Ltd.',
      price: 45,
      originalPrice: 55,
      discount: 18,
      moq: 10,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300',
      category: 'Groceries'
    },
    {
      id: 'grocery-3',
      name: 'Fresh Onions',
      supplier: 'Farm Fresh Vegetables',
      price: 25,
      originalPrice: 30,
      discount: 17,
      moq: 20,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300',
      category: 'Groceries'
    },
    {
      id: 'grocery-4',
      name: 'Cooking Oil - Sunflower',
      supplier: 'Oil Industries',
      price: 180,
      originalPrice: 220,
      discount: 18,
      moq: 6,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300',
      category: 'Groceries'
    },
    {
      id: '7',
      name: 'Smart Phone Cases',
      price: 199,
      originalPrice: 299,
      moq: 50,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.1,
      supplier: 'Tech Accessories',
      discount: 33
    },
    {
      id: '8',
      name: 'Designer Sunglasses',
      price: 899,
      originalPrice: 1299,
      moq: 15,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.3,
      supplier: 'Style Co.',
      discount: 31
    },
    {
      id: '9',
      name: 'Ceramic Dinner Set',
      price: 1299,
      originalPrice: 1799,
      moq: 10,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Home & Kitchen',
      rating: 4.6,
      supplier: 'Home Decor Plus',
      discount: 28
    },
    {
      id: '10',
      name: 'Protein Powder',
      price: 1999,
      originalPrice: 2499,
      moq: 5,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Sports',
      rating: 4.4,
      supplier: 'Fitness World',
      discount: 20
    },
    {
      id: '11',
      name: 'Moisturizing Cream',
      price: 599,
      originalPrice: 799,
      moq: 25,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Beauty',
      rating: 4.2,
      supplier: 'Skin Care Co.',
      discount: 25
    },
    {
      id: '12',
      name: 'Gaming Mouse',
      price: 1499,
      originalPrice: 1999,
      moq: 20,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.7,
      supplier: 'Gaming Tech',
      discount: 25
    },
    {
      id: '13',
      name: 'Casual Jeans',
      price: 799,
      originalPrice: 1199,
      moq: 30,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.0,
      supplier: 'Denim World',
      discount: 33
    },
    {
      id: '14',
      name: 'Air Fryer',
      price: 3999,
      originalPrice: 5999,
      moq: 5,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Home & Kitchen',
      rating: 4.5,
      supplier: 'Kitchen Appliances',
      discount: 33
    },
    {
      id: '15',
      name: 'Yoga Mat',
      price: 999,
      originalPrice: 1499,
      moq: 25,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Sports',
      rating: 4.3,
      supplier: 'Fitness Equipment',
      discount: 33
    },
    {
      id: '16',
      name: 'Hair Serum',
      price: 399,
      originalPrice: 599,
      moq: 50,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Beauty',
      rating: 4.1,
      supplier: 'Hair Care Plus',
      discount: 33
    },
    {
      id: '17',
      name: 'Bluetooth Speaker',
      price: 2499,
      originalPrice: 3499,
      moq: 10,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
      rating: 4.6,
      supplier: 'Audio Tech',
      discount: 29
    },
    {
      id: '18',
      name: 'Running Shoes',
      price: 2999,
      originalPrice: 4499,
      moq: 15,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
      rating: 4.4,
      supplier: 'Footwear Co.',
      discount: 33
    },
    {
      id: 'grocery-5',
      name: 'Green Tea Bags',
      supplier: 'Tea Garden',
      price: 299,
      originalPrice: 399,
      discount: 25,
      moq: 20,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1594631661960-e2c1dc7a3b18?w=300',
      category: 'Groceries'
    },
    {
      id: 'grocery-6',
      name: 'Almonds Premium',
      supplier: 'Dry Fruits Co.',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      moq: 10,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1508062138369-9e6c2b46b7b4?w=300',
      category: 'Groceries'
    },
    {
      id: '19',
      name: 'Coffee Maker',
      price: 4999,
      originalPrice: 6999,
      moq: 5,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Home & Kitchen',
      rating: 4.2,
      supplier: 'Coffee Solutions',
      discount: 29
    },
    {
      id: '20',
      name: 'Basketball',
      price: 899,
      originalPrice: 1299,
      moq: 20,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Sports',
      rating: 4.1,
      supplier: 'Sports Equipment',
      discount: 31
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const userPhone = localStorage.getItem('userPhone') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">TradeHub</h1>
              <p className="text-sm text-gray-600">Welcome, +91 {userPhone}</p>
              
              {/* Address Display */}
              {userAddress ? (
                <div className="flex items-center space-x-1 mt-1">
                  <FiMapPin className="text-sm text-gray-500" />
                  <span className="text-xs text-gray-600 truncate">
                    Deliver to {userAddress.name} - {userAddress.city}, {userAddress.pincode}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 mt-1">
                  <FiMapPin className="text-sm text-orange-500" />
                  <span className="text-xs text-orange-600">
                    Add delivery address
                  </span>
                </div>
              )}
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiBell className="text-xl text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Toggle and Filter */}
          <div className="flex items-center justify-between">
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
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <FiFilter className="text-lg" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-6 pb-32">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          <span className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} items
          </span>
        </div>

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
      </div>
    </div>
  );
};

export default HomeScreen;
