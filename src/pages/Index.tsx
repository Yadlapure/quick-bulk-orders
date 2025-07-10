
import React, { useState, useEffect } from 'react';
import LoginScreen from '../components/LoginScreen';
import MainApp from '../components/MainApp';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (loginStatus === 'true' && loginTime) {
      // Check if login is still valid (24 hours)
      const now = new Date().getTime();
      const loginTimeStamp = parseInt(loginTime);
      const hoursDiff = (now - loginTimeStamp) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('userPhone');
      }
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (phoneNumber: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTime', new Date().getTime().toString());
    localStorage.setItem('userPhone', phoneNumber);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('userPhone');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <MainApp onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
