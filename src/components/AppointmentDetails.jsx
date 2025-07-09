
import React from 'react';
import { X, MapPin, Calendar, Clock, User } from 'lucide-react';

const AppointmentDetails = ({ appointment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Détails du rendez-vous</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 text-lg">{appointment.logo}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{appointment.institute}</h3>
              <p className="text-sm text-gray-500">{appointment.service}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar size={18} className="text-gray-400" />
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900 ml-auto">{appointment.date}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock size={18} className="text-gray-400" />
              <span className="text-gray-600">Heure</span>
              <span className="font-medium text-gray-900 ml-auto">{appointment.time}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-gray-400" />
              <span className="text-gray-600">Adresse</span>
              <span className="font-medium text-gray-900 ml-auto text-right flex-1">{appointment.address}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <User size={18} className="text-gray-400" />
              <span className="text-gray-600">Spécialiste</span>
              <span className="font-medium text-gray-900 ml-auto">Julie</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              Voir le détail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
