
import React, { useState } from 'react';
import { ArrowLeft, Settings, Star, ChevronRight } from 'lucide-react';
import SettingsModal from './SettingsModal';

const ProfileView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showSettings, setShowSettings] = useState(false);

  const profileData = {
    name: 'Léa Dupont',
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c78e8e7b?w=150&h=150&fit=crop&crop=face'
  };

  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop', likes: 125 },
    { id: 2, image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&h=200&fit=crop', likes: 98 },
    { id: 3, image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop', likes: 87 },
    { id: 4, image: 'https://images.unsplash.com/photo-1604654894058-0a8b1b6b6d10?w=200&h=200&fit=crop', likes: 112 },
    { id: 5, image: 'https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=200&h=200&fit=crop', likes: 156 },
    { id: 6, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop', likes: 203 }
  ];

  const subscriptions = [
    {
      id: 1,
      name: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      rating: 4.2,
      logo: '💅'
    },
    {
      id: 2,
      name: 'Sabrinails',
      address: '15 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,9 km',
      rating: 4.5,
      logo: '💅'
    },
    {
      id: 3,
      name: 'Beauty Salon',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '2,1 km',
      rating: 4.8,
      logo: '💄'
    },
    {
      id: 4,
      name: 'French Institut',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '2,4 km',
      rating: 4.3,
      logo: '💅'
    },
    {
      id: 5,
      name: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      rating: 4.6,
      logo: '💅'
    }
  ];

  const reviews = [
    {
      id: 1,
      institute: 'Nails lab',
      rating: 5,
      date: '13 mars 2022',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae rutbus erat mauris mauris mauris lorem mauris tincibus urna quis....',
      readMore: true
    },
    {
      id: 2,
      institute: 'Nails lab',
      rating: 5,
      date: '8 mars 2022',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae rutbus erat mauris mauris mauris lorem mauris tincibus urna quis....',
      readMore: true
    }
  ];

  if (showSettings) {
    return <SettingsModal onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack}>
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <button onClick={() => setShowSettings(true)}>
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-6 py-6 text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
          <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h1>
        <div className="flex items-center justify-center space-x-1">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="text-gray-600">{profileData.rating}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 px-6 text-center text-sm font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500'
            }`}
          >
            ENREGISTREMENTS
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex-1 py-3 px-6 text-center text-sm font-medium transition-colors ${
              activeTab === 'subscriptions'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500'
            }`}
          >
            ABONNEMENTS
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 px-6 text-center text-sm font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500'
            }`}
          >
            AVIS
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {posts.map((post) => (
                <div key={post.id} className="relative">
                  <img
                    src={post.image}
                    alt="Nail art"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    ❤️ {post.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="p-4 space-y-3">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
                  <span className="text-pink-500">{sub.logo}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                  <p className="text-sm text-gray-500">{sub.address}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{sub.distance}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{sub.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div>
            {/* Rating Summary */}
            <div className="bg-white p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">4,6<span className="text-xl text-gray-400">/5</span></div>
                  <div className="text-gray-500 text-sm">19 avis</div>
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
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">{rating} étoiles</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: rating === 5 ? '80%' : rating === 4 ? '15%' : '5%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="p-4 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
                        <span className="text-pink-500">💅</span>
                      </div>
                      <span className="font-medium text-gray-900">{review.institute}</span>
                    </div>
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
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                    {review.readMore && (
                      <button className="text-pink-500 ml-1 font-medium">Lire plus</button>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
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

export default ProfileView;
