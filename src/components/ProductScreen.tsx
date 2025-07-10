
import React, { useState } from 'react';
import { FiArrowLeft, FiHeart, FiShare2, FiMinus, FiPlus, FiShoppingCart, FiMessageCircle } from 'react-icons/fi';

interface ProductScreenProps {
  product: any;
  onAddToCart: (product: any, quantity: number) => void;
  onBack: () => void;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ product, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) return null;

  const images = [product.image, product.image, product.image]; // Mock multiple images
  const totalPrice = product.price * quantity;
  const savings = (product.originalPrice - product.price) * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= product.moq) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    // Show toast or feedback
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiArrowLeft className="text-xl text-gray-700" />
          </button>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiShare2 className="text-xl text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiHeart className="text-xl text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-bold">
            {product.discount}% OFF
          </span>
        </div>
        
        {/* Image Thumbnails */}
        <div className="flex space-x-2 px-4 py-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-3">by {product.supplier}</p>
          </div>
          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg">
            <span className="text-green-600 text-sm">⭐</span>
            <span className="text-green-600 text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-2xl font-bold text-blue-900">₹{product.price}</span>
            <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
            <span className="text-green-600 font-semibold">({product.discount}% off)</span>
          </div>
          <p className="text-sm text-gray-600">Per piece • Minimum Order: {product.moq} pieces</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Quantity</h3>
            <span className="text-sm text-gray-500">MOQ: {product.moq}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-xl">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= product.moq}
                className="p-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiMinus className="text-lg" />
              </button>
              <span className="px-4 py-2 text-lg font-semibold text-gray-800 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-3 text-gray-600 hover:text-gray-800"
              >
                <FiPlus className="text-lg" />
              </button>
            </div>
            
            <div className="flex-1 text-right">
              <p className="text-lg font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
              <p className="text-sm text-green-600">Save ₹{savings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Features/Benefits */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Key Features</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">Premium Quality Material</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">Bulk Order Discounts Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">Fast Delivery in 3-5 Days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">7-Day Return Policy</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
          <div className="text-sm text-gray-700 leading-relaxed">
            <p className={showFullDescription ? '' : 'line-clamp-3'}>
              Premium quality {product.name.toLowerCase()} perfect for bulk orders. Made with high-grade materials and designed for durability. Ideal for retailers looking to stock quality products at competitive prices. Each piece undergoes strict quality control to ensure customer satisfaction.
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 font-medium mt-2 text-sm"
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex space-x-3 max-w-md mx-auto">
          <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <FiMessageCircle className="text-xl text-gray-600" />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white rounded-xl py-3 px-6 font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <FiShoppingCart className="text-lg" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
