
import React, { useState } from 'react';
import AuthPage from '../components/AuthPage';
import HomePage from '../components/HomePage';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      ) : (
        <HomePage onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
