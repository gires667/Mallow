import React, { useState } from 'react';
import { Heart, Share2, Bookmark, MapPin, Clock, Star, Search, Filter, User, Calendar, Home, Compass } from 'lucide-react';
import PostDetail from './PostDetail';
import BookingFlow from './BookingFlow';
import BookingConfirmation from './BookingConfirmation';
import AppointmentsList from './AppointmentsList';
import ProfileView from './ProfileView';
import InstituteDetail from './InstituteDetail';
import SearchFeed from './SearchFeed';

const HomePage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [prestationDetails, setPrestationDetails] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  // 8 posts arrangés en grille 2x2x2x2
  const posts = [
    {
      id: 1,
      instituteName: "Indigonails",
      location: "Villeurbanne",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop",
      description: "Et si on refraîchissait cette manucure ?",
      likes: 124,
      time: "2h",
      rating: 4.8,
      price: "35€",
      services: ["Manucure", "Nail Art"],
      user: {
        name: "Lea",
        greeting: "Salut, Lea"
      }
    },
    {
      id: 2,
      instituteName: "GelX/Pose",
      location: "Lyon 3ème",
      image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&h=200&fit=crop",
      description: "Nouvelle collection automne 🍂",
      likes: 89,
      time: "4h",
      rating: 4.9,
      price: "45€",
      services: ["Extension", "Pédicure"]
    },
    {
      id: 3,
      instituteName: "Beauty Studio",
      location: "Lyon 2ème",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop",
      description: "Nail art personnalisé ✨",
      likes: 156,
      time: "1h",
      rating: 4.7,
      price: "50€",
      services: ["Nail Art", "Design"]
    },
    {
      id: 4,
      instituteName: "Nails Paradise",
      location: "Villeurbanne",
      image: "https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=200&h=200&fit=crop",
      description: "Extensions d'ongles premium 💎",
      likes: 203,
      time: "3h",
      rating: 4.9,
      price: "60€",
      services: ["Extension", "Premium"]
    },
    {
      id: 5,
      instituteName: "French Nails",
      location: "Lyon 6ème",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop",
      description: "French manucure classique",
      likes: 95,
      time: "1h",
      rating: 4.6,
      price: "30€",
      services: ["French", "Classique"]
    },
    {
      id: 6,
      instituteName: "Color Studio",
      location: "Lyon 1er",
      image: "https://images.unsplash.com/photo-1599948985230-6d0c0d78a1b4?w=200&h=200&fit=crop",
      description: "Couleurs vives et tendance",
      likes: 142,
      time: "2h",
      rating: 4.8,
      price: "40€",
      services: ["Couleur", "Tendance"]
    },
    {
      id: 7,
      instituteName: "Nail Boutique",
      location: "Lyon 7ème",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      description: "Soins des ongles premium",
      likes: 178,
      time: "1h30",
      rating: 4.9,
      price: "55€",
      services: ["Soins", "Premium"]
    },
    {
      id: 8,
      instituteName: "Art & Nails",
      location: "Lyon 4ème",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      description: "Art des ongles créatif",
      likes: 267,
      time: "2h30",
      rating: 5.0,
      price: "65€",
      services: ["Art", "Créatif"]
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

  const handleInstituteClick = (post) => {
    setSelectedInstitute(post);
    setCurrentView('instituteDetail');
  };

  const handleBookAppointment = (post, prestation) => {
    setSelectedPost(post);
    setPrestationDetails(prestation);
    setCurrentView('booking');
  };

  const handleBookingConfirm = () => {
    setCurrentView('confirmation');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveTab('home');
    setSelectedPost(null);
    setSelectedInstitute(null);
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
        onInstituteClick={handleInstituteClick}
      />
    );
  }

  if (currentView === 'instituteDetail') {
    return (
      <InstituteDetail 
        institute={selectedInstitute}
        onBack={handleBackToHome}
        onBookService={handleBookAppointment}
      />
    );
  }

  if (currentView === 'booking') {
    return (
      <BookingFlow 
        post={selectedPost}
        prestationDetails={prestationDetails}
        onBack={() => setCurrentView(selectedInstitute ? 'instituteDetail' : 'postDetail')}
        onConfirm={handleBookingConfirm}
        onViewAppointments={handleViewAppointments}
      />
    );
  }

  if (currentView === 'confirmation') {
    return (
      <BookingConfirmation 
        onViewFeed={handleBackToHome}
        onViewAppointments={handleViewAppointments}
      />
    );
  }

  if (currentView === 'appointments') {
    return <AppointmentsList onBack={handleBackToHome} onLogout={onLogout} onBookNew={handleBookAppointment} posts={posts} />;
  }

  if (currentView === 'profile') {
    return <ProfileView onBack={handleBackToHome} onLogout={onLogout} />;
  }

  if (currentView === 'search') {
    return <SearchFeed onBack={handleBackToHome} posts={posts} onPostClick={handlePostClick} onInstituteClick={handleInstituteClick} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mallow</h1>
              {posts[0]?.user && (
                <p className="text-sm text-muted-foreground">{posts[0].user.greeting}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <div className="w-2 h-2 bg-primary rounded-full absolute -top-0 -right-0"></div>
              <span className="text-lg">🔔</span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto pb-24">
        {activeTab === 'home' && (
          <div className="p-4">
            {/* Grille 2x2 pour 8 posts */}
            <div className="grid grid-cols-2 gap-3">
              {posts.map((post) => (
                <div key={post.id} className="card-elevated overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Image uniforme */}
                  <div className="relative" onClick={() => handlePostClick(post)}>
                    <img
                      src={post.image}
                      alt="Nail art"
                      className="w-full h-32 object-cover cursor-pointer"
                    />
                    <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-semibold text-primary">
                      {post.price}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-3">
                    <button 
                      className="flex items-center space-x-2 mb-2 w-full text-left"
                      onClick={() => handleInstituteClick(post)}
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs">💅</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">{post.instituteName}</h3>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin size={10} />
                          <span className="truncate">{post.location}</span>
                        </div>
                      </div>
                    </button>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center space-x-1"
                        >
                          <Heart
                            size={16}
                            className={likedPosts.has(post.id) ? 'text-primary fill-current' : 'text-muted-foreground'}
                          />
                          <span className="text-xs text-muted-foreground">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Bookmark
                          size={16}
                          className={savedPosts.has(post.id) ? 'text-primary fill-current' : ''}
                        />
                      </button>
                    </div>

                    {/* Bouton réservation */}
                    <button
                      onClick={() => handlePostClick(post)}
                      className="btn-primary w-full py-2 rounded-xl font-semibold text-sm mt-3"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instituts près de chez vous</h2>
              <div className="space-y-3">
                {posts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleInstituteClick(post)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={post.image}
                        alt="Institut"
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 text-left">
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
                  </button>
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
                  onClick={() => {
                    setActiveTab('search');
                    setCurrentView('search');
                  }}
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

      {/* Bottom Navigation - FIXED FUNCTIONALITY */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentView('home');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'home' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <Home size={20} />
            <span className="text-xs font-medium">Feed</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('search');
              setCurrentView('search');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'search' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <Search size={20} />
            <span className="text-xs font-medium">Rechercher</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('appointments');
              setCurrentView('appointments');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'appointments' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <Calendar size={20} />
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              setCurrentView('profile');
            }}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              activeTab === 'profile' ? 'text-gray-900' : 'text-gray-400'
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
