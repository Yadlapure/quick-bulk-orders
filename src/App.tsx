
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import AddressSetupScreen from './components/AddressSetupScreen';
import LocationPermissionScreen from './components/LocationPermissionScreen';
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
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userAddress, setUserAddress] = useState<AddressData | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number; address?: string} | null>(null);

  useEffect(() => {
    // Check if location permission was already asked
    const locationPermissionAsked = localStorage.getItem('locationPermissionAsked');
    const savedLocation = localStorage.getItem('userLocation');
    
    if (locationPermissionAsked || savedLocation) {
      setHasLocationPermission(true);
      if (savedLocation) {
        setUserLocation(JSON.parse(savedLocation));
      }
    }
  }, []);

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

  const handleLocationAccess = (location: {lat: number; lng: number; address?: string}) => {
    setUserLocation(location);
    setHasLocationPermission(true);
  };

  const handleSkipLocation = () => {
    setHasLocationPermission(true);
  };

  const handleSkipAddress = () => {
    setHasAddress(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHasAddress(false);
    setHasLocationPermission(false);
    setUserAddress(null);
    setUserLocation(null);
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('locationPermissionAsked');
  };

  return (
    <div className="App">
      {!hasLocationPermission ? (
        <LocationPermissionScreen 
          onLocationAccess={handleLocationAccess}
          onSkip={handleSkipLocation}
        />
      ) : !isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : !hasAddress ? (
        <AddressSetupScreen 
          onAddressSubmit={handleAddressSubmit} 
          onSkip={handleSkipAddress}
        />
      ) : (
        <MainApp onLogout={handleLogout} userAddress={userAddress} userLocation={userLocation} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
