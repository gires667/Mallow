
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Camera, Check, Plus } from 'lucide-react';

const BookingFlow = ({ post, prestationDetails, onBack, onConfirm, onViewAppointments }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [comment, setComment] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const specialists = [
    { id: 1, name: 'Lily', image: 'https://images.unsplash.com/photo-1494790108755-2616c78e8e7b?w=80&h=80&fit=crop&crop=face' },
    { id: 2, name: 'Yves', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { id: 3, name: 'Coco', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
    { id: 4, name: 'Samia', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' }
  ];

  const dates = [
    { date: '16', day: 'Dim', available: true },
    { date: '17', day: 'Lun', available: true },
    { date: '18', day: 'Mar', available: true },
    { date: '19', day: 'Mer', available: true, selected: true },
    { date: '20', day: 'Jeu', available: true },
    { date: '21', day: 'Ven', available: true },
    { date: '22', day: 'Sam', available: true }
  ];

  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleConsultFeed = () => {
    onConfirm();
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="flex items-center p-4">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <Check size={40} className="text-pink-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Votre rendez-vous<br />est confirmé !
          </h2>
          
          <p className="text-gray-600 text-center mb-2">
            Vous pouvez consulter les informations
          </p>
          <p className="text-gray-600 text-center mb-8">
            de vos rendez-vous dans
          </p>
          <p className="text-gray-600 text-center mb-12">
            l'onglet « Mes RDV »
          </p>

          <div className="w-full max-w-sm space-y-4">
            <button
              onClick={handleConsultFeed}
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Prendre RDV</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-8">
        {/* 1. Prestation sélectionnée */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Prestation sélectionnée</h2>
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 relative">
            <div className="absolute top-3 right-3 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span className="text-gray-600 text-sm">1h00</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Pose + pose de vernis semi<br />permanent mains
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">À partir de</span>
              <span className="text-xl font-bold text-gray-900">20 €</span>
            </div>
          </div>
          <button className="text-gray-500 text-sm mt-2">Ajouter une prestation</button>
        </div>

        {/* 2. Sélectionner votre spécialiste */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Sélectionnez votre spécialiste</h2>
          <div className="grid grid-cols-4 gap-4">
            {specialists.map((specialist) => (
              <button
                key={specialist.id}
                onClick={() => setSelectedSpecialist(specialist.name)}
                className={`flex flex-col items-center space-y-2 p-2 rounded-xl transition-colors ${
                  selectedSpecialist === specialist.name
                    ? 'bg-pink-50 border border-pink-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{specialist.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Sélectionner une date */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">3. Sélectionner une date</h2>
            <button className="text-gray-500 text-sm">Février ▼</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((dateOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(dateOption.date)}
                className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
                  selectedDate === dateOption.date || dateOption.selected
                    ? 'bg-slate-800 text-white'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-xs mb-1">{dateOption.day}</span>
                <span className="text-lg font-semibold">{dateOption.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Sélectionner un horaire */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">4. Sélectionner un horaire</h2>
          <div className="text-center mb-4">
            <span className="text-2xl font-bold text-gray-900">11:00</span>
          </div>
          <div className="bg-gray-100 rounded-full h-2 mb-6">
            <div className="bg-pink-500 h-2 rounded-full w-1/3"></div>
          </div>
        </div>

        {/* 5. Ajouter un commentaire */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">5. Ajouter un commentaire</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            className="w-full h-24 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* 6. Illustrer avec une photo */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">6. Illustrer avec une photo</h2>
          <p className="text-gray-600 text-sm mb-4">Ajouter une photo depuis ma galerie</p>
          
          <div className="flex space-x-4">
            <label className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <Camera size={24} className="text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            
            {selectedPhoto && (
              <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                <img
                  src={selectedPhoto}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✕</span>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mt-4">Ajouter un post enregistré</p>
        </div>

        {/* Date et heure récap + Confirmer */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Date :</span>
            <span className="font-semibold text-gray-900">19 février</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Horaire :</span>
            <span className="font-semibold text-gray-900">11h00</span>
          </div>
          
          <button
            onClick={handleConfirm}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold hover:bg-slate-900 transition-colors"
          >
            CONFIRMER
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
