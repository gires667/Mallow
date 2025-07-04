
import React from 'react';
import { ArrowLeft, ChevronRight, User, Shield, HelpCircle, Info, LogOut } from 'lucide-react';

const SettingsModal = ({ onBack }) => {
  const settingsOptions = [
    {
      icon: <User size={20} />,
      label: 'Profil',
      hasArrow: true
    },
    {
      icon: <Shield size={20} />,
      label: 'Sécurité',
      hasArrow: true
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'FAQ',
      hasArrow: true
    },
    {
      icon: <Info size={20} />,
      label: 'À propos de Mallow',
      hasArrow: true
    },
    {
      icon: <LogOut size={20} />,
      label: 'Déconnexion',
      hasArrow: true,
      isLogout: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Paramètres</h1>
        </div>
      </div>

      {/* Settings Options */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== settingsOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-600">
                  {option.icon}
                </div>
                <span className={`text-gray-900 ${option.isLogout ? 'text-red-600' : ''}`}>
                  {option.label}
                </span>
              </div>
              {option.hasArrow && (
                <ChevronRight size={20} className="text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <button className="flex flex-col items-center space-y-1 py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">🏠</div>
            <span className="text-xs">Feed</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">🔍</div>
            <span className="text-xs">Rechercher</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">📅</div>
            <span className="text-xs">MES RDV</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 text-pink-500">
            <div className="w-6 h-6 flex items-center justify-center">👤</div>
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SettingsModal;
