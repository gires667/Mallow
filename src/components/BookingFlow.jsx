
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Calendar, Clock, Camera, X } from 'lucide-react';

const BookingFlow = ({ post, prestationDetails, onBack, onConfirm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    prestation: prestationDetails,
    specialist: null,
    date: null,
    time: null,
    comment: '',
    photo: null
  });

  const specialists = [
    { id: 1, name: 'Lily', avatar: '👩‍💼' },
    { id: 2, name: 'Yves', avatar: '👨‍💼' },
    { id: 3, name: 'Coco', avatar: '👩‍💼' },
    { id: 4, name: 'Samia', avatar: '👩‍💼' }
  ];

  const dates = [
    { day: 'Dim', date: 16, available: false },
    { day: 'Lun', date: 17, available: true },
    { day: 'Mar', date: 18, available: true },
    { day: 'Mer', date: 19, available: true, selected: true },
    { day: 'Jeu', date: 20, available: true },
    { day: 'Ven', date: 21, available: true },
    { day: 'Sam', date: 22, available: true }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSpecialistSelect = (specialist) => {
    setBookingData({...bookingData, specialist});
  };

  const handleDateSelect = (date) => {
    setBookingData({...bookingData, date});
  };

  const handleTimeSelect = (time) => {
    setBookingData({...bookingData, time});
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookingData({...bookingData, photo: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Étape 1: Prestation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">1. Prestation sélectionnée</h3>
              <div className="bg-pink-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">Pose + pose de vernis semi permanent mains</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>1h00</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">À partir de</span>
                    <div className="text-lg font-semibold text-pink-600">20 €</div>
                  </div>
                </div>
              </div>
              <button className="text-pink-600 text-sm mt-2">Ajouter une prestation</button>
            </div>

            {/* Étape 2: Spécialiste */}
            <div>
              <h3 className="text-lg font-semibold mb-4">2. Sélectionnez votre spécialiste</h3>
              <div className="grid grid-cols-4 gap-4">
                {specialists.map((specialist) => (
                  <button
                    key={specialist.id}
                    onClick={() => handleSpecialistSelect(specialist)}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                      bookingData.specialist?.id === specialist.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">{specialist.avatar}</span>
                    </div>
                    <span className="text-sm font-medium">{specialist.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Étape 3: Date */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">3. Sélectionner une date</h3>
                <button className="flex items-center text-gray-600">
                  <span className="mr-1">Février</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {dates.map((dateItem, index) => (
                  <button
                    key={index}
                    onClick={() => dateItem.available && handleDateSelect(dateItem)}
                    disabled={!dateItem.available}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      dateItem.selected
                        ? 'bg-gray-800 text-white'
                        : dateItem.available
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs">{dateItem.day}</span>
                    <span className="text-lg font-semibold">{dateItem.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Étape 4: Horaire */}
            <div>
              <h3 className="text-lg font-semibold mb-4">4. Sélectionner un horaire</h3>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full">
                  <span className="text-2xl font-bold text-pink-600">11:00</span>
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-2xl p-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">Date : </span>
                  <span className="font-semibold">19 février</span>
                </div>
                <div>
                  <span className="text-gray-600">Horaire : </span>
                  <span className="font-semibold">11h00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-all"
            >
              CONFIRMER
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Sélection horaire détaillée */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Février</span>
                <ChevronDown size={16} className="text-gray-600" />
              </div>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {dates.map((dateItem, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-lg text-sm ${
                      dateItem.date === 19
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    <span className="text-xs">{dateItem.day}</span>
                    <span className="font-semibold">{dateItem.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">4. Sélectionner un horaire</h3>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gray-800">11:00</span>
                <div className="w-full h-2 bg-pink-100 rounded-full mt-4 relative">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">5. Ajouter un commentaire</h3>
              <textarea
                value={bookingData.comment}
                onChange={(e) => setBookingData({...bookingData, comment: e.target.value})}
                placeholder="Écrivez votre commentaire ici..."
                className="w-full h-24 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">6. Illustrer avec une photo</h3>
              <p className="text-gray-600 text-sm mb-4">Ajouter une photo depuis ma galerie</p>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors">
                  <Camera size={24} className="text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                
                {bookingData.photo && (
                  <div className="relative">
                    <img
                      src={bookingData.photo}
                      alt="Photo sélectionnée"
                      className="w-16 h-16 object-cover rounded-2xl"
                    />
                    <button
                      onClick={() => setBookingData({...bookingData, photo: null})}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mt-4">Ajouter un post enregistré</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600">Date : </span>
                  <span className="font-semibold">19 février</span>
                </div>
                <div>
                  <span className="text-gray-600">Horaire : </span>
                  <span className="font-semibold">11h00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-all"
            >
              CONFIRMER
            </button>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Votre rendez-vous<br />est confirmé !
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-xs">
              Vous pouvez consulter les informations de vos rendez-vous dans l'onglet « Mes RDV ».
            </p>
            
            <button
              onClick={() => onConfirm()}
              className="w-full max-w-xs bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-all mb-4"
            >
              CONSULTER LE FEED
            </button>
            
            <button className="text-gray-600 text-sm">
              Voir mes rendez-vous
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Prendre RDV</h1>
        <div className="w-10"></div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BookingFlow;
