
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Shield, HelpCircle, Info, LogOut } from 'lucide-react';

const SettingsModal = ({ onBack, onLogout }) => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'profile', 'security', 'faq', 'about'

  const settingsOptions = [
    {
      icon: <User size={20} />,
      label: 'Profil',
      hasArrow: true,
      action: () => setCurrentView('profile')
    },
    {
      icon: <Shield size={20} />,
      label: 'Sécurité',
      hasArrow: true,
      action: () => setCurrentView('security')
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'FAQ',
      hasArrow: true,
      action: () => setCurrentView('faq')
    },
    {
      icon: <Info size={20} />,
      label: 'À propos de Mallow',
      hasArrow: true,
      action: () => setCurrentView('about')
    },
    {
      icon: <LogOut size={20} />,
      label: 'Déconnexion',
      hasArrow: true,
      isLogout: true,
      action: onLogout
    }
  ];

  const profileOptions = [
    { label: 'Informations personnelles', description: 'Nom, email, téléphone' },
    { label: 'Préférences', description: 'Notifications, langue' },
    { label: 'Adresses', description: 'Adresses de livraison' },
    { label: 'Moyens de paiement', description: 'Cartes et PayPal' }
  ];

  const securityOptions = [
    { label: 'Changer le mot de passe', description: 'Modifiez votre mot de passe' },
    { label: 'Authentification à deux facteurs', description: 'Sécurisez votre compte' },
    { label: 'Sessions actives', description: 'Gérez vos connexions' },
    { label: 'Confidentialité', description: 'Paramètres de confidentialité' }
  ];

  const faqItems = [
    {
      question: 'Comment prendre un rendez-vous ?',
      answer: 'Sélectionnez un institut, choisissez une prestation, puis une date et heure disponible.'
    },
    {
      question: 'Comment annuler un rendez-vous ?',
      answer: 'Rendez-vous dans "Mes RDV", sélectionnez le rendez-vous et cliquez sur "Annuler".'
    },
    {
      question: 'Les paiements sont-ils sécurisés ?',
      answer: 'Oui, nous utilisons des protocoles de sécurité bancaire pour protéger vos données.'
    },
    {
      question: 'Comment contacter le support ?',
      answer: 'Utilisez le chat en ligne ou envoyez un email à support@nailsocial.com'
    }
  ];

  const renderMainView = () => (
    <>
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
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
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
    </>
  );

  const renderProfileView = () => (
    <>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={() => setCurrentView('main')} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profil</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {profileOptions.map((option, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== profileOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <div className="text-gray-900 font-medium text-left">{option.label}</div>
                <div className="text-gray-500 text-sm text-left">{option.description}</div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderSecurityView = () => (
    <>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={() => setCurrentView('main')} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Sécurité</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {securityOptions.map((option, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== securityOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <div className="text-gray-900 font-medium text-left">{option.label}</div>
                <div className="text-gray-500 text-sm text-left">{option.description}</div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderFAQView = () => (
    <>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={() => setCurrentView('main')} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">FAQ</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </>
  );

  const renderAboutView = () => (
    <>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center p-4">
          <button onClick={() => setCurrentView('main')} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">À propos</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">💅</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">NailSocial</h2>
          <p className="text-gray-600 mb-4">Version 1.0.0</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            NailSocial est la première plateforme sociale dédiée à la beauté des ongles. 
            Découvrez, partagez et réservez vos prestations préférées en quelques clics.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>© 2024 NailSocial. Tous droits réservés.</p>
            <p>Conditions d'utilisation • Politique de confidentialité</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'main' && renderMainView()}
      {currentView === 'profile' && renderProfileView()}
      {currentView === 'security' && renderSecurityView()}
      {currentView === 'faq' && renderFAQView()}
      {currentView === 'about' && renderAboutView()}

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
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
            <div className="w-5 h-5 flex items-center justify-center">📅</div>
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-pink-500">
            <div className="w-5 h-5 flex items-center justify-center">👤</div>
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SettingsModal;
