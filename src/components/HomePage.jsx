import React, { useState } from 'react';
import { Heart, Share2, Bookmark, MapPin, Clock, Star, Search, Filter, User, Calendar, Home, Compass } from 'lucide-react';
import PostDetail from './PostDetail';
import BookingFlow from './BookingFlow';
import AppointmentsList from './AppointmentsList';
import ProfileView from './ProfileView';

const HomePage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'postDetail', 'booking', 'appointments', 'profile'
  const [selectedPost, setSelectedPost] = useState(null);
  const [prestationDetails, setPrestationDetails] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const posts = [
    {
      id: 1,
      instituteName: "Indigonails",
      location: "Villeurbanne",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
      description: "Et si on refraîchissait cette manucure ?",
      likes: 124,
      time: "2h",
      rating: 4.8,
      price: "35€",
      services: ["Manucure", "Nail Art", "Semi-permanent"],
      user: {
        name: "Lea",
        greeting: "Salut, Lea"
      }
    },
    {
      id: 2,
      instituteName: "GelX/Pose",
      location: "Lyon 3ème",
      image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400",
      description: "Nouvelle collection automne 🍂",
      likes: 89,
      time: "4h",
      rating: 4.9,
      price: "45€",
      services: ["Nail Art", "Extension", "Pédicure"]
    }
  ];

  const toggleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleSave = (postId) => {
    const newSavedPosts = new Set(savedPosts);
    if (newSavedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('postDetail');
  };

  const handleBookAppointment = (post, prestation) => {
    setSelectedPost(post);
    setPrestationDetails(prestation);
    setCurrentView('booking');
  };

  const handleBookingConfirm = () => {
    setCurrentView('home');
    setActiveTab('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveTab('home');
    setSelectedPost(null);
    setPrestationDetails(null);
  };

  const handleViewAppointments = () => {
    setActiveTab('appointments');
    setCurrentView('appointments');
  };

  const handleViewProfile = () => {
    setActiveTab('profile');
    setCurrentView('profile');
  };

  // Render different views
  if (currentView === 'postDetail') {
    return (
      <PostDetail 
        post={selectedPost}
        onBack={handleBackToHome}
        onBookAppointment={handleBookAppointment}
      />
    );
  }

  if (currentView === 'booking') {
    return (
      <BookingFlow 
        post={selectedPost}
        prestationDetails={prestationDetails}
        onBack={() => setCurrentView('postDetail')}
        onConfirm={handleBookingConfirm}
        onViewAppointments={handleViewAppointments}
      />
    );
  }

  if (currentView === 'appointments') {
    return <AppointmentsList onBack={handleBackToHome} onLogout={onLogout} />;
  }

  if (currentView === 'profile') {
    return <ProfileView onBack={handleBackToHome} onLogout={onLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">💅</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">NailSocial</h1>
              {posts[0]?.user && (
                <p className="text-sm text-gray-600">{posts[0].user.greeting}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <div className="w-2 h-2 bg-pink-500 rounded-full absolute -top-0 -right-0"></div>
              <span className="text-lg">🔔</span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      {activeTab === 'explore' && (
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-md mx-auto flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher institut, service..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-md mx-auto pb-24">
        {activeTab === 'home' && (
          <div className="space-y-1">
            {posts.map((post) => (
              <div key={post.id} className="bg-white">
                {/* Header du post */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">💅</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{post.instituteName}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin size={12} />
                        <span>{post.location}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-600">{post.rating}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative" onClick={() => handlePostClick(post)}>
                  <img
                    src={post.image}
                    alt="Nail art"
                    className="w-full h-80 object-cover cursor-pointer"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-pink-600">
                    {post.price}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <Heart
                        size={24}
                        className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                      />
                      <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </button>
                    <button className="text-gray-600 hover:text-pink-500 transition-colors">
                      <Share2 size={24} />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className="text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <Bookmark
                      size={24}
                      className={savedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                    />
                  </button>
                </div>

                {/* Description */}
                <div className="px-4 pb-3">
                  <p className="text-gray-800 mb-2">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bouton réservation rapide */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handlePostClick(post)}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-[1.02]"
                  >
                    Réserver en 2 clics
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instituts près de chez vous</h2>
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex space-x-3">
                      <img
                        src={post.image}
                        alt="Institut"
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{post.instituteName}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                          <MapPin size={12} />
                          <span>{post.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{post.rating}</span>
                          </div>
                          <span className="text-pink-600 font-semibold">{post.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Mes rendez-vous</h2>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Aucun rendez-vous prévu</h3>
                <p className="text-gray-600 text-sm mb-4">Découvrez nos instituts partenaires et réservez votre première prestation</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
                >
                  Explorer
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Mon Profil</h2>
                <p className="text-gray-600">Gérez vos informations personnelles</p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Informations personnelles</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Publications enregistrées</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Mes avis</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Moyens de paiement</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Paramètres de confidentialité</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-gray-800">Aide et support</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left p-3 hover:bg-red-50 rounded-xl transition-colors text-red-600"
                >
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentView('home');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'home' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Home size={20} />
            <span className="text-xs font-medium">Feed</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('explore');
              setCurrentView('home');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'explore' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Search size={20} />
            <span className="text-xs font-medium">Rechercher</span>
          </button>
          <button
            onClick={handleViewAppointments}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'appointments' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Calendar size={20} />
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button
            onClick={handleViewProfile}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'profile' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <User size={20} />
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
