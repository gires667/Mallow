
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Search } from 'lucide-react';

const InstituteDetail = ({ institute, onBack, onBookService }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop', likes: 175 },
    { id: 2, image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&h=200&fit=crop', likes: 218 },
    { id: 3, image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop', likes: 142 },
    { id: 4, image: 'https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=200&h=200&fit=crop', likes: 189 },
    { id: 5, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop', likes: 203 },
    { id: 6, image: 'https://images.unsplash.com/photo-1604654894058-0a8b1b6b6d10?w=200&h=200&fit=crop', likes: 156 }
  ];

  const services = [
    {
      id: 1,
      name: 'Dépose et pose de vernis semi permanent mains',
      duration: '45 min',
      originalPrice: '45 €',
      price: '40 €',
      time: '1h15'
    },
    {
      id: 2,
      name: 'Dépose vernis semi permanent main',
      duration: '20 min',
      price: '5 €',
      time: '1h15'
    },
    {
      id: 3,
      name: 'Remplissage sur ongles naturels 3/4 semaines',
      duration: '1h30',
      price: '30 €',
      time: '1h30'
    },
    {
      id: 4,
      name: 'Dépose + pose de vernis semi permanent pieds',
      duration: '1h30',
      price: '25 €',
      time: '1h30'
    },
    {
      id: 5,
      name: 'Réparation ongle cassé (au doigt)',
      duration: '30 min',
      price: '2 €',
      time: '30 min'
    },
    {
      id: 6,
      name: 'Dépose + pose de vernis semi permanent mains',
      duration: '1h15',
      price: '25 €',
      time: '1h15'
    }
  ];

  const reviews = [
    {
      id: 1,
      user: 'Marie L.',
      rating: 5,
      date: '15 mars 2024',
      comment: 'Excellent service ! Julie est très professionnelle et le résultat est parfait. Je recommande vivement.'
    },
    {
      id: 2,
      user: 'Sophie M.',
      rating: 5,
      date: '12 mars 2024',
      comment: 'Toujours un plaisir de venir ici. L\'accueil est chaleureux et le travail impeccable.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
          alt="Institute"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <button onClick={onBack} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isSubscribed 
                ? 'bg-gray-800 text-white' 
                : 'bg-white/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            {isSubscribed ? 'Abonné' : 'S\'abonner'}
          </button>
        </div>
        
        {/* Institute Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">💅</span>
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">4.2</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">{institute?.instituteName || 'Nails Lab'}</h1>
            <p className="text-gray-600 text-sm">1,8 km</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex">
          {[
            { key: 'posts', label: 'POST' },
            { key: 'booking', label: 'PRENDRE RDV' },
            { key: 'reviews', label: 'AVIS' },
            { key: 'presentation', label: 'PRÉSENTATION' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 px-4 text-center text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {posts.map((post) => (
                <div key={post.id} className="relative">
                  <img
                    src={post.image}
                    alt="Nail art"
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                    ❤️ {post.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Tab */}
        {activeTab === 'booking' && (
          <div className="p-4 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Prestations suggérées */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Prestations suggérées</h2>
                <button className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-500 text-lg">+</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 flex-1 pr-4">{service.name}</h3>
                      <div className="text-right">
                        {service.originalPrice && (
                          <span className="text-gray-400 line-through text-sm block">{service.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-gray-900">{service.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{service.duration}</span>
                      </div>
                      <span className="text-sm text-gray-500">À partir de</span>
                    </div>
                    <button 
                      onClick={() => onBookService(institute, { name: service.name, price: service.price })}
                      className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mt-2 ml-auto"
                    >
                      <span className="text-pink-500 text-lg">+</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">4,2<span className="text-xl text-gray-400">/5</span></div>
                  <div className="text-gray-500 text-sm">15 avis</div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{review.user}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Presentation Tab */}
        {activeTab === 'presentation' && (
          <div className="p-4 space-y-6">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="text-gray-900">9h00 - 19h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="text-gray-900">9h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="text-gray-900">Fermé</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Localisation</h3>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900">12 Rue Alexandre Boutin</p>
                  <p className="text-gray-600">69100 Villeurbanne</p>
                </div>
              </div>
              <div className="mt-4 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Carte</span>
              </div>
            </div>
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
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
            <div className="w-5 h-5 flex items-center justify-center">📅</div>
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
            <div className="w-5 h-5 flex items-center justify-center">👤</div>
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default InstituteDetail;
