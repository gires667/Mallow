
import React, { useState } from 'react';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      onComplete();
    }
  };

  const handleSkipLocation = () => {
    onComplete();
  };

  const handleShareLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Position partagée:', position.coords);
          onComplete();
        },
        (error) => {
          console.log('Erreur géolocalisation:', error);
          onComplete();
        }
      );
    } else {
      onComplete();
    }
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200 flex flex-col">
        {/* Image principale */}
        <div className="flex-1 flex items-center justify-center px-8 pt-16">
          <div className="w-full max-w-sm">
            <div className="w-full h-80 bg-gradient-to-br from-pink-300 to-rose-400 rounded-3xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💅</span>
                </div>
                <p className="text-white font-semibold text-lg">Manucure professionnelle</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu texte */}
        <div className="px-8 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Bienvenue sur
            </h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mallow
            </h2>
            <p className="text-gray-600 text-lg">
              Votre manucure à portée d'ongles !
            </p>
          </div>

          {/* Bouton continuer */}
          <button
            onClick={handleNext}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-slate-900 transition-colors"
          >
            CONTINUER
          </button>
          
          <p className="text-center text-gray-600 text-sm mt-4">
            Continuer en tant que professionnel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Image principale */}
      <div className="flex-1 flex items-center justify-center px-8 pt-16">
        <div className="w-full max-w-sm">
          <div className="w-full h-80 bg-gradient-to-br from-blue-300 to-purple-400 rounded-3xl shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <p className="text-white font-semibold">Trouvez près de chez vous</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu texte */}
      <div className="px-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
            Trouver la meilleure<br />
            adresse <span className="font-black">près de chez<br />
            vous !</span>
          </h1>
        </div>

        {/* Boutons */}
        <div className="space-y-4">
          <button
            onClick={handleShareLocation}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-slate-900 transition-colors"
          >
            PARTAGER MA POSITION
          </button>
          
          <button
            onClick={handleSkipLocation}
            className="w-full text-gray-600 py-2 text-center hover:text-gray-800 transition-colors"
          >
            Continuer sans partager ma position
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
