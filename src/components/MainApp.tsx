import React, { useState } from 'react';
import { FiHome, FiShoppingBag, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useToast } from "@/hooks/use-toast";
import HomeScreen from './HomeScreen';
import OrdersScreen from './OrdersScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';
import ProductScreen from './ProductScreen';
import CategoryScreen from './CategoryScreen';
import AddressManagementScreen from './AddressManagementScreen';
import OrderConfirmationScreen from './OrderConfirmationScreen';
import HelpSupportScreen from './HelpSupportScreen';

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

interface MainAppProps {
  onLogout: () => void;
  userAddress?: AddressData | null;
}

export type Screen = 'home' | 'orders' | 'profile' | 'cart' | 'product' | 'category' | 'address-management' | 'order-confirmation' | 'help-support';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  moq: number;
  image: string;
  category: string;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout, userAddress }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { toast } = useToast();

  const addToCart = (product: any, quantity: number) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      toast({
        title: "Item Updated",
        description: `${product.name} quantity updated in cart`,
      });
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        moq: product.moq,
        image: product.image,
        category: product.category
      }]);
      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.name} added to your cart`,
      });
    }
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const navigateToProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen('category');
  };

  const navigateToAddressManagement = () => {
    setCurrentScreen('address-management');
  };

  const navigateToHelpSupport = () => {
    setCurrentScreen('help-support');
  };

  const handleOrderPlaced = (details: any) => {
    setOrderDetails(details);
    setCartItems([]); // Clear cart
    setCurrentScreen('order-confirmation');
  };

  const handleContinueShopping = () => {
    setCurrentScreen('home');
  };

  const handleTrackOrder = () => {
    setCurrentScreen('orders');
  };

  const handleAddressUpdate = (addresses: any[]) => {
    // Update parent component if needed
    console.log('Addresses updated:', addresses);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigateToProduct={navigateToProduct}
            onNavigateToCategory={navigateToCategory}
            userAddress={userAddress}
          />
        );
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen onLogout={onLogout} onManageAddresses={navigateToAddressManagement} onHelpSupport={navigateToHelpSupport} />;
      case 'cart':
        return (
          <CartScreen
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBack={() => setCurrentScreen('home')}
            onOrderPlaced={handleOrderPlaced}
            userAddress={userAddress}
          />
        );
      case 'order-confirmation':
        return (
          <OrderConfirmationScreen
            orderDetails={orderDetails}
            onContinueShopping={handleContinueShopping}
            onTrackOrder={handleTrackOrder}
          />
        );
      case 'product':
        return (
          <ProductScreen
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'category':
        return (
          <CategoryScreen
            category={selectedCategory}
            onNavigateToProduct={navigateToProduct}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'address-management':
        return (
          <AddressManagementScreen
            onBack={() => setCurrentScreen('profile')}
            onAddressUpdate={handleAddressUpdate}
          />
        );
      case 'help-support':
        return (
          <HelpSupportScreen
            onBack={() => setCurrentScreen('profile')}
          />
        );
      default:
        return <HomeScreen onNavigateToProduct={navigateToProduct} onNavigateToCategory={navigateToCategory} userAddress={userAddress} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <div className="min-h-screen">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === 'home'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiHome className="text-xl mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setCurrentScreen('orders')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === 'orders'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiShoppingBag className="text-xl mb-1" />
            <span className="text-xs font-medium">Orders</span>
          </button>

          <button
            onClick={() => setCurrentScreen('cart')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative ${
              currentScreen === 'cart'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiShoppingCart className="text-xl mb-1" />
            <span className="text-xs font-medium">Cart</span>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalCartItems > 9 ? '9+' : totalCartItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === 'profile'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiUser className="text-xl mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
