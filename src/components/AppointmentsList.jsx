
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, MessageCircle, Phone } from 'lucide-react';

const AppointmentsList = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingAppointments = [
    {
      id: 1,
      date: '22 mars 2022',
      time: '11h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Pose vernis semi permanent',
      status: 'confirmed'
    }
  ];

  const pastAppointments = [
    {
      id: 2,
      date: '03 avril 2022',
      time: '16h30',
      institute: 'Nails Lab',
      address: 'Vernis semi permanent pied',
      distance: '1,8 km',
      service: 'Vernis semi permanent pied',
      status: 'completed'
    }
  ];

  const renderAppointment = (appointment) => (
    <div key={appointment.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <span className="text-pink-600 font-bold">💅</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{appointment.institute}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={12} className="mr-1" />
              <span>{appointment.distance}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800">{appointment.time}</div>
          <div className="text-sm text-gray-500">{appointment.date}</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        {appointment.address}
      </div>

      <div className="text-sm text-pink-600 mb-4">
        Plus de détails ▼
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <MessageCircle size={18} className="text-gray-600" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Phone size={18} className="text-gray-600" />
          </button>
        </div>
        <button className="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors">
          <span className="text-pink-600">→</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-center">Mes RDV</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'past'
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Effectué
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'upcoming' && (
          <div>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(renderAppointment)
            ) : (
              <div className="text-center py-12">
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
              pastAppointments.map(renderAppointment)
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun rendez-vous effectué</h3>
                <p className="text-gray-600">Vos rendez-vous passés apparaîtront ici</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
