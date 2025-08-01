
import React, { useState } from 'react';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { CartItem } from './MainApp';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onBack: () => void;
  onOrderPlaced: (orderDetails: any) => void;
  userAddress?: any;
}

const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onOrderPlaced,
  userAddress,
}) => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setShowOrderSummary(true);
    
    // Generate order ID
    const orderId = 'ORD' + Date.now().toString().slice(-8);
    
    // Calculate estimated delivery (3-5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });

    // Simulate order placement
    setTimeout(() => {
      const orderDetails = {
        orderId,
        items: [...items],
        subtotal,
        shipping,
        tax,
        total,
        estimatedDelivery,
        paymentMethod: 'Cash on Delivery',
        deliveryAddress: userAddress || {
          name: 'Default User',
          phone: '+91 98765 43210',
          address: 'Default Address',
          city: 'Your City',
          state: 'Your State',
          pincode: '123456'
        }
      };
      
      setShowOrderSummary(false);
      onOrderPlaced(orderDetails);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center px-4 py-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft className="text-xl text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 ml-3">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <FiShoppingBag className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-center mb-8">
            Add some products to your cart to get started with your bulk order.
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft className="text-xl text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 ml-3">Shopping Cart</h1>
          </div>
          <span className="text-sm text-gray-500">{items.length} items</span>
        </div>
      </div>

      {/* Cart Items - Flex grow to take available space */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-32">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= item.moq}
                        className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      >
                        <FiMinus className="text-sm" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-gray-800 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        <FiPlus className="text-sm" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">₹{item.price} each</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">₹{tax.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-lg text-gray-900">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            {shipping > 0 && (
              <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg">
                💡 Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="max-w-md mx-auto">
          <button
            onClick={handlePlaceOrder}
            disabled={showOrderSummary}
            className="w-full bg-blue-600 text-white rounded-xl py-4 font-semibold text-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {showOrderSummary ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Placing Order...</span>
              </>
            ) : (
              <>
                <span>Place Order</span>
                <span>• ₹{total.toLocaleString()}</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            By placing order, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
