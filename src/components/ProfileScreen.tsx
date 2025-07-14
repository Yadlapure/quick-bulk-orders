
import React from 'react';
import { FiUser, FiPhone, FiMapPin, FiSettings, FiHelpCircle, FiLogOut, FiChevronRight, FiStar, FiPackage, FiCreditCard } from 'react-icons/fi';

interface ProfileScreenProps {
  onLogout: () => void;
  onManageAddresses: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onManageAddresses }) => {
  const userPhone = localStorage.getItem('userPhone') || '';

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const menuItems = [
    {
      icon: FiUser,
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      action: () => console.log('Edit Profile')
    },
    {
      icon: FiMapPin,
      title: 'Manage Addresses',
      subtitle: 'Add or edit delivery addresses',
      action: onManageAddresses
    },
    {
      icon: FiCreditCard,
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      action: () => console.log('Payment Methods')
    },
    {
      icon: FiStar,
      title: 'Reviews & Ratings',
      subtitle: 'Your reviews and ratings',
      action: () => console.log('Reviews')
    },
    {
      icon: FiSettings,
      title: 'App Settings',
      subtitle: 'Notifications and preferences',
      action: () => console.log('Settings')
    },
    {
      icon: FiHelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => console.log('Help')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-8">
        <div className="flex items-center space-x-4">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
            <FiUser className="text-2xl text-blue-600" />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-bold">Welcome Back!</h1>
            <p className="text-blue-100 flex items-center space-x-2">
              <FiPhone className="text-sm" />
              <span>+91 {userPhone}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiPackage className="text-blue-600 text-lg" />
              </div>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiStar className="text-green-600 text-lg" />
              </div>
              <p className="text-2xl font-bold text-gray-800">4.8</p>
              <p className="text-xs text-gray-500">Avg Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiCreditCard className="text-orange-600 text-lg" />
              </div>
              <p className="text-2xl font-bold text-gray-800">₹45K</p>
              <p className="text-xs text-gray-500">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full bg-white rounded-xl p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
          >
            <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
              <item.icon className="text-gray-600 text-lg" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Business Info */}
      <div className="px-4 mt-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📈 Upgrade to Business Premium</h3>
          <p className="text-blue-700 text-sm mb-3">
            Get exclusive bulk discounts, priority support, and advanced analytics.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>App Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>Last Updated</span>
            <span>Jan 2024</span>
          </div>
          
          <div className="flex space-x-3 text-xs">
            <button className="text-blue-600 hover:text-blue-700">Privacy Policy</button>
            <span className="text-gray-300">•</span>
            <button className="text-blue-600 hover:text-blue-700">Terms of Service</button>
            <span className="text-gray-300">•</span>
            <button className="text-blue-600 hover:text-blue-700">Contact Us</button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6 mb-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-red-100 transition-colors"
        >
          <FiLogOut className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
