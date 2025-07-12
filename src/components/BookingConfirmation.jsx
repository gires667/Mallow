
import React from 'react';
import { Check } from 'lucide-react';

const BookingConfirmation = ({ onViewFeed, onViewAppointments }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8">
      {/* Icône de confirmation */}
      <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Votre rendez-vous<br />
        est confirmé !
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center mb-2">
        Vous pouvez consulter les informations
      </p>
      <p className="text-gray-600 text-center mb-12">
        de vos rendez-vous dans
      </p>
      <p className="text-gray-600 text-center mb-12">
        l'onglet « Mes RDV »
      </p>

      {/* Boutons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={onViewFeed}
          className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold hover:bg-slate-900 transition-colors"
        >
          CONSULTER LE FEED
        </button>
        
        <button
          onClick={onViewAppointments}
          className="w-full text-gray-600 py-2 text-center hover:text-gray-800 transition-colors"
        >
          Voir mes rendez-vous
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
