
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
      <div className="w-24 h-24 mb-8">
        <img 
          src="/lovable-uploads/5abf4b99-537f-4d86-aa6f-04c64519565f.png" 
          alt="Mallow Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
