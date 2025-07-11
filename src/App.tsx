
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MainApp onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
