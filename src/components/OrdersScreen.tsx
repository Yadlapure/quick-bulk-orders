
import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheck, FiClock, FiEye } from 'react-icons/fi';

const OrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'shipped',
      total: 2499,
      items: 3,
      supplier: 'Fashion Hub Ltd.',
      expectedDelivery: '2024-01-18',
      trackingId: 'TRK123456789',
      products: ['Premium Cotton T-Shirts', 'Casual Shirts', 'Polo T-Shirts']
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'delivered',
      total: 1299,
      items: 1,
      supplier: 'Tech Solutions',
      deliveredOn: '2024-01-12',
      products: ['Wireless Bluetooth Earbuds']
    },
    {
      id: 'ORD003',
      date: '2024-01-08',
      status: 'processing',
      total: 899,
      items: 2,
      supplier: 'Home Essentials',
      expectedDelivery: '2024-01-20',
      products: ['Kitchen Storage Containers', 'Water Bottles']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <FiClock className="text-lg" />;
      case 'shipped':
        return <FiTruck className="text-lg" />;
      case 'delivered':
        return <FiCheck className="text-lg" />;
      default:
        return <FiPackage className="text-lg" />;
    }
  };

  const activeOrders = mockOrders.filter(order => order.status !== 'delivered');
  const completedOrders = mockOrders.filter(order => order.status === 'delivered');

  const ordersToShow = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">My Orders</h1>
          
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'active'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Active Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Completed ({completedOrders.length})
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 space-y-4">
        {ordersToShow.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <FiPackage className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No {activeTab} orders
            </h3>
            <p className="text-gray-600 text-center">
              {activeTab === 'active' 
                ? "You don't have any active orders right now."
                : "You haven't completed any orders yet."
              }
            </p>
          </div>
        ) : (
          ordersToShow.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-800">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <FiEye className="text-lg text-gray-600" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="font-medium text-gray-800">{order.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="font-medium text-gray-800">{order.items} products</p>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Products:</p>
                  <p className="text-sm text-gray-800">{order.products.join(', ')}</p>
                </div>

                {/* Status-specific info */}
                {order.status === 'shipped' && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-blue-800 font-medium">Expected Delivery</p>
                        <p className="text-blue-600">{new Date(order.expectedDelivery!).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-800 font-medium">Tracking ID</p>
                        <p className="text-blue-600 font-mono">{order.trackingId}</p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <FiCheck className="text-green-600" />
                      <div>
                        <p className="text-green-800 font-medium text-sm">Delivered Successfully</p>
                        <p className="text-green-600 text-sm">on {new Date(order.deliveredOn!).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === 'processing' && (
                  <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <FiClock className="text-yellow-600" />
                      <div>
                        <p className="text-yellow-800 font-medium text-sm">Order is being processed</p>
                        <p className="text-yellow-600 text-sm">Expected delivery: {new Date(order.expectedDelivery!).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {order.status === 'shipped' && (
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                      <FiTruck className="text-sm" />
                      <span>Track Order</span>
                    </button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-green-200 transition-colors">
                      Reorder
                    </button>
                  )}
                  
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;
