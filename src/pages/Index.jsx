
import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import OnboardingFlow from '../components/OnboardingFlow';
import AuthPage from '../components/AuthPage';
import HomePage from '../components/HomePage';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('auth');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'auth') {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return <HomePage onLogout={handleLogout} />;
};

export default Index;
