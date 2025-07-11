
import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 flex flex-col items-center justify-center">
      <div className="w-32 h-32 mb-8 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
        <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text">
          M
        </span>
      </div>
      
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
