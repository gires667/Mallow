
import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      {/* Logo Mallow */}
      <div className="w-32 h-32 mb-8 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <span className="text-4xl font-bold text-white">M</span>
        </div>
      </div>
      
      {/* Nom de l'app */}
      <h1 className="text-3xl font-bold text-white mb-8">Mallow</h1>
      
      {/* Spinner de chargement */}
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
