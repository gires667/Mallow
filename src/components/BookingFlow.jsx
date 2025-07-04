
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CreditCard, Check } from 'lucide-react';

const BookingFlow = ({ post, prestationDetails, onBack, onConfirm, onViewAppointments }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const dates = [
    { date: '2024-03-22', day: 'Aujourd\'hui', available: true },
    { date: '2024-03-23', day: 'Demain', available: true },
    { date: '2024-03-24', day: 'Lun 24', available: false },
    { date: '2024-03-25', day: 'Mar 25', available: true },
    { date: '2024-03-26', day: 'Mer 26', available: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Réservation</h1>
            <p className="text-sm text-gray-500">Étape {currentStep} sur 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full ${
                  step <= currentStep ? 'bg-pink-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choisir une date</h2>
            <div className="space-y-3">
              {dates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                  disabled={!dateOption.available}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    selectedDate === dateOption.date
                      ? 'border-pink-500 bg-pink-50'
                      : dateOption.available
                      ? 'border-gray-200 hover:border-pink-300'
                      : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      selectedDate === dateOption.date ? 'text-pink-600' : 'text-gray-900'
                    }`}>
                      {dateOption.day}
                    </span>
                    {!dateOption.available && (
                      <span className="text-sm text-gray-400">Complet</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selectedDate}
              className="w-full mt-8 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choisir l'heure</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border-2 text-center transition-colors ${
                    selectedTime === time
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selectedTime}
              className="w-full mt-8 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mode de paiement</h2>
            <div className="space-y-3">
              {['Apple Pay', 'PayPal', 'Carte bancaire'].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    selectedPayment === method
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard size={20} className={selectedPayment === method ? 'text-pink-600' : 'text-gray-400'} />
                    <span className={`font-medium ${
                      selectedPayment === method ? 'text-pink-600' : 'text-gray-900'
                    }`}>
                      {method}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selectedPayment}
              className="w-full mt-8 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer la réservation
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Réservation confirmée !</h2>
            <p className="text-gray-600 mb-2">Votre rendez-vous est confirmé pour le</p>
            <p className="text-lg font-semibold text-gray-900 mb-6">
              {dates.find(d => d.date === selectedDate)?.day} à {selectedTime}
            </p>
            
            <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600">💅</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{post?.instituteName}</h3>
                  <p className="text-sm text-gray-500">{post?.location}</p>
                  <p className="text-sm text-pink-600 font-medium">{post?.price}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
              >
                Consulter le feed
              </button>
              <button
                onClick={onViewAppointments}
                className="w-full border border-pink-500 text-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
              >
                Voir mes rendez-vous
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
