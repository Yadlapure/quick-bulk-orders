
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import AddressSetupScreen from './components/AddressSetupScreen';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [userAddress, setUserAddress] = useState<AddressData | null>(null);

  const handleLogin = (phoneNumber: string) => {
    localStorage.setItem('userPhone', phoneNumber);
    setIsLoggedIn(true);
    
    // Check if user has saved address
    const savedAddress = localStorage.getItem('userAddress');
    if (savedAddress) {
      setUserAddress(JSON.parse(savedAddress));
      setHasAddress(true);
    }
  };

  const handleAddressSubmit = (address: AddressData) => {
    localStorage.setItem('userAddress', JSON.stringify(address));
    setUserAddress(address);
    setHasAddress(true);
  };

  const handleSkipAddress = () => {
    setHasAddress(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHasAddress(false);
    setUserAddress(null);
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAddress');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : !hasAddress ? (
        <AddressSetupScreen 
          onAddressSubmit={handleAddressSubmit} 
          onSkip={handleSkipAddress}
        />
      ) : (
        <MainApp onLogout={handleLogout} userAddress={userAddress} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
