
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Camera, Check, Plus, Filter } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import FilterModal from './FilterModal';
import BookingConfirmation from './BookingConfirmation';

const BookingFlow = ({ post, prestationDetails, onBack, onConfirm, onViewAppointments }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [comment, setComment] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showTechniqueSelection, setShowTechniqueSelection] = useState(false);

  const specialists = [
    { id: 1, name: 'Lily', image: 'https://images.unsplash.com/photo-1494790108755-2616c78e8e7b?w=80&h=80&fit=crop&crop=face' },
    { id: 2, name: 'Yves', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { id: 3, name: 'Coco', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
    { id: 4, name: 'Samia', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    { id: 5, name: 'Marie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
    { id: 6, name: 'Alex', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    { id: 7, name: 'Sophie', image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face' },
    { id: 8, name: 'Lucas', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' }
  ];

  const dates = [
    { date: '16', day: 'Dim', available: true },
    { date: '17', day: 'Lun', available: true },
    { date: '18', day: 'Mar', available: true },
    { date: '19', day: 'Mer', available: true },
    { date: '20', day: 'Jeu', available: true },
    { date: '21', day: 'Ven', available: true },
    { date: '22', day: 'Sam', available: true },
    { date: '23', day: 'Dim', available: true },
    { date: '24', day: 'Lun', available: true },
    { date: '25', day: 'Mar', available: true }
  ];

  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
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

  const handleFilterApply = (filters) => {
    setSelectedFilters(filters);
    setShowFilterModal(false);
    if (filters.technique && filters.technique.length > 0) {
      setShowTechniqueSelection(true);
    }
  };

  const handleViewFeed = () => {
    onConfirm();
  };

  if (showConfirmation) {
    return (
      <BookingConfirmation 
        onViewFeed={handleViewFeed}
        onViewAppointments={onViewAppointments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
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
          
          {!showTechniqueSelection ? (
            <div>
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
              
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center space-x-2 text-pink-600 text-sm mt-3 hover:text-pink-700 transition-colors"
              >
                <Filter size={16} />
                <span>Choisir la technique et les détails</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="text-gray-600 text-sm">Technique sélectionnée</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedFilters.technique && selectedFilters.technique[0]}
                </h3>
                
                <div className="space-y-2 text-sm">
                  {selectedFilters.type && selectedFilters.type.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-800">{selectedFilters.type.join(', ')}</span>
                    </div>
                  )}
                  {selectedFilters.couleur && selectedFilters.couleur.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Couleurs:</span>
                      <div className="flex space-x-1">
                        {selectedFilters.couleur.slice(0, 3).map(color => (
                          <span key={color} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {color}
                          </span>
                        ))}
                        {selectedFilters.couleur.length > 3 && (
                          <span className="text-gray-500 text-xs">+{selectedFilters.couleur.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-500 text-sm">À partir de</span>
                  <span className="text-xl font-bold text-gray-900">25 €</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowFilterModal(true)}
                className="text-pink-600 text-sm hover:text-pink-700 transition-colors"
              >
                Modifier les détails
              </button>
            </div>
          )}
        </div>

        {/* Sections suivantes uniquement si technique sélectionnée */}
        {showTechniqueSelection && (
          <>
            {/* 2. Sélectionner votre spécialiste */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Sélectionnez votre spécialiste</h2>
              <div className="grid grid-cols-2 gap-3">
                {specialists.map((specialist) => (
                  <button
                    key={specialist.id}
                    onClick={() => setSelectedSpecialist(specialist.name)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-200 ${
                      selectedSpecialist === specialist.name
                        ? 'bg-pink-50 border-2 border-pink-500 shadow-md'
                        : 'hover:bg-gray-50 border-2 border-transparent bg-white hover:shadow-sm'
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Sélectionner une date</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {dates.map((dateOption, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(dateOption.date)}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-2xl transition-all duration-200 min-w-[60px] ${
                      selectedDate === dateOption.date
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-sm'
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
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-2xl transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-sm font-medium">{time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Ajouter un commentaire */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">5. Ajouter un commentaire</h2>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Écrivez votre commentaire ici..."
                className="w-full h-24 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* 6. Illustrer avec une photo */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">6. Illustrer avec une photo</h2>
              <div className="flex space-x-4">
                <label className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <Camera size={24} className="text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                
                {selectedPhoto && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative">
                    <img
                      src={selectedPhoto}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute top-1 right-1 w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✕</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Récapitulatif et confirmation */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Date :</span>
                <span className="font-semibold text-gray-900">{selectedDate} février</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Horaire :</span>
                <span className="font-semibold text-gray-900">{selectedTime}</span>
              </div>
              {selectedSpecialist && (
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Spécialiste :</span>
                  <span className="font-semibold text-gray-900">{selectedSpecialist}</span>
                </div>
              )}
              
              <button
                onClick={handleConfirm}
                disabled={!selectedSpecialist}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold hover:bg-slate-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                CONFIRMER
              </button>
            </div>
          </>
        )}
      </div>

      {/* Filter Modal - Positionné en overlay complet */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50">
          <FilterModal
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            onApplyFilters={handleFilterApply}
            context="booking"
          />
        </div>
      )}
    </div>
  );
};

export default BookingFlow;
