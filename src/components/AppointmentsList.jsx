
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, MessageCircle, Phone, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';
import ProfileView from './ProfileView';

const AppointmentsList = ({ onBack, onLogout, onBookNew, posts }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const upcomingAppointments = [
    {
      id: 1,
      date: '22 mars 2024',
      time: '11h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Pose vernis semi permanent',
      status: 'confirmed',
      logo: '💅'
    },
    {
      id: 2,
      date: '25 mars 2024',
      time: '14h00',
      institute: 'Beauty Salon',
      address: '8 Avenue des Fleurs, 69003 Lyon',
      distance: '2,1 km',
      service: 'Manucure complète + Nail Art',
      status: 'confirmed',
      logo: '💅'
    },
    {
      id: 3,
      date: '28 mars 2024',
      time: '16h30',
      institute: 'French Institut',
      address: '15 Place Bellecour, 69002 Lyon',
      distance: '3,2 km',
      service: 'Extension d\'ongles',
      status: 'pending',
      logo: '💅'
    },
    {
      id: 4,
      date: '30 mars 2024',
      time: '10h00',
      institute: 'Nail Paradise',
      address: '20 Rue Victor Hugo, 69003 Lyon',
      distance: '2,5 km',
      service: 'Nail Art créatif',
      status: 'confirmed',
      logo: '💅'
    },
    {
      id: 5,
      date: '2 avril 2024',
      time: '15h30',
      institute: 'Beauty Studio',
      address: '5 Place des Terreaux, 69001 Lyon',
      distance: '3,1 km',
      service: 'Manucure française',
      status: 'confirmed',
      logo: '💅'
    }
  ];

  const pastAppointments = [
    {
      id: 6,
      date: '16 mars 2024',
      time: '11h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Pose vernis semi permanent',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 7,
      date: '02 mars 2024',
      time: '9h30',
      institute: 'Sabrinails',
      address: '20 Rue de la République, 69001 Lyon',
      distance: '1,9 km',
      service: 'Vernis semi permanent pieds',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 8,
      date: '18 février 2024',
      time: '17h30',
      institute: 'Beauty Salon',
      address: '8 Avenue des Fleurs, 69003 Lyon',
      distance: '2,1 km',
      service: 'Manucure complète',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 9,
      date: '05 février 2024',
      time: '13h00',
      institute: 'French Institut',
      address: '15 Place Bellecour, 69002 Lyon',
      distance: '3,2 km',
      service: 'Nail Art personnalisé',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 10,
      date: '22 janvier 2024',
      time: '14h15',
      institute: 'Nail Paradise',
      address: '20 Rue Victor Hugo, 69003 Lyon',
      distance: '2,5 km',
      service: 'Extension gel',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 11,
      date: '08 janvier 2024',
      time: '16h00',
      institute: 'Beauty Studio',
      address: '5 Place des Terreaux, 69001 Lyon',
      distance: '3,1 km',
      service: 'Pédicure complète',
      status: 'completed',
      logo: '💅'
    }
  ];

  const handleMoreDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleMessage = (appointment) => {
    setSelectedAppointment(appointment);
    setShowMessageModal(true);
  };

  const handleReview = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReviewModal(true);
  };

  const handleRenew = (appointment) => {
    // Trouver un post correspondant ou utiliser le premier
    const matchingPost = posts?.find(post => 
      post.instituteName.toLowerCase().includes(appointment.institute.toLowerCase())
    ) || posts?.[0];
    
    if (matchingPost && onBookNew) {
      onBookNew(matchingPost, { name: appointment.service, price: '35€' });
    }
  };

  if (showProfile) {
    return <ProfileView onBack={() => setShowProfile(false)} onLogout={onLogout} />;
  }

  if (showMessageModal) {
    return (
      <MessageModal
        appointment={selectedAppointment}
        onClose={() => setShowMessageModal(false)}
      />
    );
  }

  if (showReviewModal) {
    return (
      <ReviewModal
        appointment={selectedAppointment}
        onClose={() => setShowReviewModal(false)}
      />
    );
  }

  const renderAppointment = (appointment, isPast = false) => (
    <div key={appointment.id} className="bg-white mx-4 mb-3 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center p-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 bg-pink-light rounded-full flex items-center justify-center">
            <span className="text-pink-600 text-lg">{appointment.logo}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900">{appointment.institute}</h3>
              <button 
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50"
                onClick={() => handleMoreDetails(appointment)}
              >
                <ChevronRight size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <MapPin size={12} className="mr-1" />
              <span>{appointment.distance}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{appointment.service}</p>
            <p className="text-sm text-gray-500">{appointment.address}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{appointment.time}</div>
            <div className="text-sm text-gray-500">{appointment.date}</div>
            {appointment.status === 'pending' && (
              <div className="text-xs text-orange-500 mt-1 font-medium">En attente</div>
            )}
          </div>
        </div>
      </div>

      {isPast && (
        <div className="px-4 pb-4 flex space-x-3">
          <button 
            onClick={() => handleRenew(appointment)}
            className="flex-1 btn-dark-blue py-3 px-4 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            📅 Renouveler
          </button>
          <button 
            onClick={() => handleReview(appointment)}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            💬 Laisser un avis
          </button>
        </div>
      )}

      {!isPast && (
        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleMessage(appointment)}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MessageCircle size={18} className="text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Phone size={18} className="text-gray-600" />
            </button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 bg-pink-light rounded-full hover:bg-pink-200 transition-colors">
            <ChevronRight size={18} className="text-pink-600" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-center p-4 relative">
          <button onClick={onBack} className="absolute left-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Mes RDV</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-6 text-center font-semibold transition-colors ${
              activeTab === 'upcoming'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 px-6 text-center font-semibold transition-colors ${
              activeTab === 'past'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Effectué
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 pb-24 min-h-screen">
        {activeTab === 'upcoming' && (
          <div>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => renderAppointment(appointment, false))
            ) : (
              <div className="text-center py-12 px-4">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun rendez-vous à venir</h3>
                <p className="text-gray-600">Vos prochains rendez-vous apparaîtront ici</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div>
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => renderAppointment(appointment, true))
            ) : (
              <div className="text-center py-12 px-4">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun rendez-vous effectué</h3>
                <p className="text-gray-600">Vos rendez-vous passés apparaîtront ici</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around">
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
            <div className="w-5 h-5 flex items-center justify-center">🏠</div>
            <span className="text-xs font-medium">Feed</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
            <div className="w-5 h-5 flex items-center justify-center">🔍</div>
            <span className="text-xs font-medium">Rechercher</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-pink-500">
            <Calendar size={20} />
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button 
            onClick={() => setShowProfile(true)}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
          >
            <div className="w-5 h-5 flex items-center justify-center">👤</div>
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppointmentsList;
