
import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail, Globe, MessageCircle } from 'lucide-react';

const InstituteDetail = ({ institute, onBack, onBookService }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const services = [
    {
      id: 1,
      name: "Pose vernis semi-permanent",
      duration: "1h00",
      price: "20€",
      description: "Manucure complète avec pose de vernis semi-permanent"
    },
    {
      id: 2,
      name: "Nail Art créatif",
      duration: "1h30",
      price: "35€",
      description: "Design personnalisé selon vos envies"
    },
    {
      id: 3,
      name: "Extension d'ongles",
      duration: "2h00",
      price: "45€",
      description: "Extension avec gel ou résine"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Marie L.",
      rating: 5,
      comment: "Excellent travail, très professionnel !",
      date: "Il y a 2 jours"
    },
    {
      id: 2,
      user: "Sophie M.",
      rating: 4,
      comment: "Très satisfaite du résultat, je recommande",
      date: "Il y a 1 semaine"
    }
  ];

  const instituteImages = [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop", 
    "https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=200&h=200&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-2xl font-semibold transition-colors ${
              isFollowing 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            {isFollowing ? 'Suivi' : 'S\'abonner'}
          </button>
        </div>
      </div>

      {/* Institute Info */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">💅</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{institute.instituteName}</h1>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
              <MapPin size={12} />
              <span>{institute.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{institute.rating}</span>
              <span className="text-sm text-gray-500">(124 avis)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'booking'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Prendre RDV
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Avis
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'info'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Présentation
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pb-6">
        {activeTab === 'posts' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {instituteImages.map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={image}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-500 text-sm">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Prestations suggérées</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{service.duration}</span>
                          </div>
                          <span className="font-semibold text-pink-600">{service.price}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onBookService(institute, service)}
                      className="w-full bg-pink-500 text-white py-2 rounded-2xl font-medium hover:bg-pink-600 transition-colors mt-3"
                    >
                      Réserver
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800">{institute.rating}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(institute.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Basé sur 124 avis</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{review.user}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Horaires</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="text-gray-800">9h00 - 19h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="text-gray-800">9h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="text-gray-800">Fermé</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">06 12 34 56 78</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">contact@indigonails.fr</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">www.indigonails.fr</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Localisation</h3>
              <div className="h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-500">Carte à venir</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteDetail;
