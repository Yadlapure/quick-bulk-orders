import React from 'react';
import { FiCheck, FiPackage, FiTruck, FiMapPin, FiCreditCard, FiHome } from 'react-icons/fi';
import { CartItem } from './MainApp';

interface OrderConfirmationScreenProps {
  orderDetails: {
    orderId: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    estimatedDelivery: string;
    paymentMethod: string;
    deliveryAddress?: {
      name: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
  };
  onContinueShopping: () => void;
  onTrackOrder: () => void;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  orderDetails,
  onContinueShopping,
  onTrackOrder,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-green-600 text-white px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-green-100">Thank you for your order</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Order Info */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-800">Order ID</h2>
              <p className="text-lg font-bold text-blue-600">#{orderDetails.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">₹{orderDetails.total.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 flex items-center space-x-3">
            <FiTruck className="text-blue-600 text-xl" />
            <div>
              <p className="font-medium text-blue-800">Estimated Delivery</p>
              <p className="text-sm text-blue-600">{orderDetails.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Order Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="text-green-600 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Order Confirmed</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <FiPackage className="text-gray-400 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-500">Order Processing</p>
                <p className="text-sm text-gray-400">Within 2-4 hours</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <FiTruck className="text-gray-400 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-500">Out for Delivery</p>
                <p className="text-sm text-gray-400">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Order Items ({orderDetails.items.length})</h3>
          <div className="space-y-3">
            {orderDetails.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900 text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
            
            {orderDetails.items.length > 3 && (
              <p className="text-sm text-blue-600 text-center py-2">
                +{orderDetails.items.length - 3} more items
              </p>
            )}
          </div>
        </div>

        {/* Payment & Delivery */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Payment & Delivery Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiCreditCard className="text-gray-400 text-lg mt-1" />
              <div>
                <p className="font-medium text-gray-800">Payment Method</p>
                <p className="text-sm text-gray-600">{orderDetails.paymentMethod}</p>
              </div>
            </div>
            
            {orderDetails.deliveryAddress && (
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-gray-400 text-lg mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Delivery Address</p>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{orderDetails.deliveryAddress.name}</p>
                    <p>{orderDetails.deliveryAddress.address}</p>
                    <p>{orderDetails.deliveryAddress.city}, {orderDetails.deliveryAddress.state} - {orderDetails.deliveryAddress.pincode}</p>
                    <p>Phone: {orderDetails.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{orderDetails.subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>{orderDetails.shipping === 0 ? 'FREE' : `₹${orderDetails.shipping}`}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST</span>
              <span>₹{orderDetails.tax.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total Paid</span>
                <span className="text-lg">₹{orderDetails.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={onTrackOrder}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-colors"
          >
            Track Your Order
          </button>
          
          <button
            onClick={onContinueShopping}
            className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <FiHome className="text-lg" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800 mb-2">Need help with your order?</p>
          <div className="space-y-1">
            <p className="text-xs text-blue-600">📞 Customer Support: 1800-XXX-XXXX</p>
            <p className="text-xs text-blue-600">📧 Email: support@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;