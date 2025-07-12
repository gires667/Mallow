
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Heart, Bookmark, MapPin, Star } from 'lucide-react';

const SearchFeed = ({ onBack, onPostClick }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);

  const trendingColors = [
    { name: 'Rouge', color: '#DC2626' },
    { name: 'Rose', color: '#EC4899' },
    { name: 'Bleu', color: '#2563EB' },
    { name: 'Violet', color: '#7C3AED' },
    { name: 'Vert', color: '#16A34A' },
    { name: 'Orange', color: '#EA580C' },
    { name: 'Jaune', color: '#EAB308' },
    { name: 'Noir', color: '#1F2937' },
    { name: 'Blanc', color: '#F9FAFB' },
    { name: 'Marron', color: '#92400E' },
    { name: 'Beige', color: '#F5F5DC' },
    { name: 'Gris', color: '#6B7280' },
    { name: 'Corail', color: '#FF7F7F' },
    { name: 'Turquoise', color: '#40E0D0' },
    { name: 'Lavande', color: '#E6E6FA' }
  ];

  const popularPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
      likes: 124,
      instituteName: 'Nail Studio Paris',
      description: 'French manicure élégante',
      tags: ['french', 'elegant', 'manicure']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
      likes: 89,
      instituteName: 'Beauty Center',
      description: 'Nail art coloré',
      tags: ['colorful', 'art', 'creative']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=400&fit=crop',
      likes: 156,
      instituteName: 'French Nails',
      description: 'Manucure professionnelle',
      tags: ['professional', 'clean', 'french']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596188683551-6230e38b28de?w=400&h=400&fit=crop',
      likes: 203,
      instituteName: 'Elegance Spa',
      description: 'Design moderne et chic',
      tags: ['modern', 'chic', 'design']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
      likes: 97,
      instituteName: 'Nail Art Studio',
      description: 'Créations artistiques',
      tags: ['artistic', 'creative', 'unique']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
      likes: 145,
      instituteName: 'Beauty Zone',
      description: 'Tendance et style',
      tags: ['trendy', 'style', 'fashion']
    }
  ];

  const institutes = [
    {
      id: 1,
      name: 'French Institut',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop',
      rating: 4.2,
      distance: '1,8 km',
      address: '123 Rue de la Paix',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
      id: 2,
      name: 'Nail Studio Paris',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      rating: 4.5,
      distance: '2,1 km',
      address: '456 Avenue des Champs',
      coordinates: { lat: 48.8738, lng: 2.2950 }
    },
    {
      id: 3,
      name: 'Beauty Center',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      rating: 4.0,
      distance: '0,9 km',
      address: '789 Boulevard Saint-Germain',
      coordinates: { lat: 48.8534, lng: 2.3488 }
    },
    {
      id: 4,
      name: 'Elegance Spa',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
      rating: 4.7,
      distance: '3,2 km',
      address: '321 Rue du Faubourg',
      coordinates: { lat: 48.8606, lng: 2.3376 }
    }
  ];

  // Search functionality
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts([]);
      setFilteredInstitutes([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter posts
    const matchingPosts = popularPosts.filter(post => 
      post.instituteName.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    // Filter institutes
    const matchingInstitutes = institutes.filter(institute =>
      institute.name.toLowerCase().includes(query) ||
      institute.address.toLowerCase().includes(query)
    );

    setFilteredPosts(matchingPosts);
    setFilteredInstitutes(matchingInstitutes);
  }, [searchQuery]);

  const handleLike = (postId, e) => {
    e.stopPropagation();
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId, e) => {
    e.stopPropagation();
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleInstituteClick = (institute) => {
    // Show map functionality can be added here
    console.log('Show map for institute:', institute);
  };

  const tabs = ['Posts', 'Instituts', 'Map'];
  const displayPosts = searchQuery.trim() ? filteredPosts : popularPosts;
  const displayInstitutes = searchQuery.trim() ? filteredInstitutes : institutes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === tab
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'Posts' && (
          <div className="space-y-6">
            {/* Couleurs tendances */}
            {!searchQuery && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Couleurs tendances</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {trendingColors.map((colorItem, index) => (
                    <div key={index} className="flex-shrink-0 flex flex-col items-center space-y-2 min-w-[70px]">
                      <div 
                        className="w-14 h-14 rounded-full border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: colorItem.color }}
                      />
                      <span className="text-xs text-gray-600 text-center font-medium">{colorItem.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts populaires */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {searchQuery ? `Résultats pour "${searchQuery}"` : 'Posts populaires'}
              </h3>
              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {displayPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => onPostClick && onPostClick(post)}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt="Nail art"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button
                            onClick={(e) => handleLike(post.id, e)}
                            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Heart
                              size={16}
                              className={likedPosts.has(post.id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                            />
                          </button>
                          <button
                            onClick={(e) => handleSave(post.id, e)}
                            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Bookmark
                              size={16}
                              className={savedPosts.has(post.id) ? 'text-pink-500 fill-current' : 'text-gray-600'}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{post.instituteName}</span>
                          <div className="flex items-center space-x-1">
                            <Heart size={14} className="text-red-500" />
                            <span className="text-xs text-gray-500">{post.likes}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{post.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-gray-500">
                  Aucun résultat trouvé pour "{searchQuery}"
                </div>
              ) : null}
            </div>
          </div>
        )}

        {activeTab === 'Instituts' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {searchQuery ? `Instituts pour "${searchQuery}"` : 'Instituts à proximité'}
            </h3>
            {displayInstitutes.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {displayInstitutes.map((institute) => (
                  <div
                    key={institute.id}
                    onClick={() => handleInstituteClick(institute)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <img
                      src={institute.image}
                      alt={institute.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{institute.name}</h3>
                      <div className="flex items-center space-x-1 mb-1">
                        <MapPin size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{institute.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{institute.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{institute.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8 text-gray-500">
                Aucun institut trouvé pour "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'Map' && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carte interactive</h3>
            <p className="text-gray-500">Fonctionnalité en cours de développement</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFeed;
