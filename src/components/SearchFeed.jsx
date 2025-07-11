
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Star, Heart, Bookmark, User, Map } from 'lucide-react';
import FilterModal from './FilterModal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const SearchFeed = ({ onBack, posts, onPostClick, onInstituteClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const trendingColors = [
    { name: 'Rose', color: '#F7B2BD', count: '2.4k' },
    { name: 'Vert', color: '#90EE90', count: '1.8k' },
    { name: 'Violet', color: '#DA70D6', count: '3.2k' },
    { name: 'Bleu', color: '#87CEEB', count: '1.5k' },
    { name: 'Rouge', color: '#FF6B6B', count: '2.1k' }
  ];

  // Generate more posts for scrollable content
  const extendedPosts = [
    ...posts,
    {
      id: 5,
      instituteName: "Nail Studio Pro",
      location: "Lyon 1er",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400",
      description: "French manucure élégante ✨",
      likes: 167,
      time: "1h",
      rating: 4.8,
      price: "40€",
      services: ["French", "Classique", "Élégant"]
    },
    {
      id: 6,
      instituteName: "Beauty Corner",
      location: "Villeurbanne",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
      description: "Couleurs d'automne 🍂",
      likes: 143,
      time: "3h",
      rating: 4.7,
      price: "55€",
      services: ["Couleur", "Saisonnier", "Créatif"]
    },
    {
      id: 7,
      instituteName: "Glam Nails",
      location: "Lyon 6ème",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400",
      description: "Paillettes et glamour ✨",
      likes: 189,
      time: "2h",
      rating: 4.9,
      price: "65€",
      services: ["Paillettes", "Glamour", "Soirée"]
    },
    {
      id: 8,
      instituteName: "Natural Beauty",
      location: "Lyon 3ème",
      image: "https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=400",
      description: "Look naturel et soigné 🌿",
      likes: 98,
      time: "4h",
      rating: 4.6,
      price: "30€",
      services: ["Naturel", "Soin", "Classique"]
    }
  ];

  const institutes = [
    ...extendedPosts.slice(0, 6),
    {
      id: 9,
      instituteName: "Elite Nails",
      location: "Lyon 2ème",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400",
      rating: 4.9,
      services: ["Premium", "Luxe"]
    },
    {
      id: 10,
      instituteName: "Artistic Touch",
      location: "Lyon 7ème",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
      rating: 4.8,
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

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    console.log('Filtres appliqués:', filters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filterArray) => {
      return count + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  const filteredPosts = extendedPosts.filter(post => 
    searchQuery === '' || 
    post.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Recherche</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-md mx-auto flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Post, institut, type d'ongles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="relative p-3 bg-slate-800 text-white rounded-2xl hover:bg-slate-900 transition-colors"
          >
            <Filter size={18} />
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>

        {/* Search Tabs */}
        {searchQuery !== '' && (
          <div className="max-w-md mx-auto mt-3">
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'posts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('institutes')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'institutes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Instituts
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'map' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Map size={16} className="inline mr-1" />
                Map
              </button>
            </div>
          </div>
        )}

        {/* Filtres actifs */}
        {getActiveFilterCount() > 0 && (
          <div className="max-w-md mx-auto mt-3">
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([category, values]) => 
                Array.isArray(values) && values.length > 0 ? (
                  values.map(value => (
                    <span
                      key={`${category}-${value}`}
                      className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => {
                          const newFilters = { ...activeFilters };
                          newFilters[category] = newFilters[category].filter(v => v !== value);
                          setActiveFilters(newFilters);
                        }}
                        className="ml-1 hover:text-pink-600"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <main className="max-w-md mx-auto pb-24">
        {searchQuery === '' ? (
          <div className="space-y-6 p-4">
            {/* Couleurs en tendance */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Couleurs en tendance</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  {trendingColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 min-w-[120px] flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-gray-200" 
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Posts populaires avec carrousel horizontal */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Posts populaires</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  {extendedPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 w-48 flex-shrink-0">
                      <div className="relative" onClick={() => onPostClick(post)}>
                        <img
                          src={post.image}
                          alt="Nail art"
                          className="w-full h-32 object-cover rounded-t-2xl cursor-pointer"
                        />
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-pink-600">
                          {post.price}
                        </div>
                      </div>
                      <div className="p-3">
                        <button 
                          className="flex items-center space-x-2 mb-2 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors w-full"
                          onClick={() => onInstituteClick(post)}
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">💅</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800 truncate">{post.instituteName}</span>
                        </button>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className="text-gray-600 hover:text-pink-500 transition-colors"
                            >
                              <Heart
                                size={16}
                                className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                              />
                            </button>
                            <span className="text-xs text-gray-600">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </div>
                          <button
                            onClick={() => toggleSave(post.id)}
                            className="text-gray-600 hover:text-pink-500 transition-colors"
                          >
                            <Bookmark
                              size={16}
                              className={savedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Instituts à suivre avec carrousel horizontal */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instituts à suivre</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  {institutes.map((institute) => (
                    <button
                      key={institute.id}
                      onClick={() => onInstituteClick(institute)}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-w-[140px] flex-shrink-0"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-sm">💅</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1 text-sm truncate">{institute.instituteName}</h3>
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mb-2">
                          <MapPin size={10} />
                          <span className="truncate">{institute.location}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{institute.rating}</span>
                        </div>
                        <button className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs hover:bg-pink-600 transition-colors">
                          Suivre
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="p-4">
            {activeTab === 'posts' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Posts pour "{searchQuery}"</h2>
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                      {/* Header du post */}
                      <div className="flex items-center justify-between p-4 pb-3">
                        <button 
                          className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
                          onClick={() => onInstituteClick(post)}
                        >
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
                        </button>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-600">{post.rating}</span>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative" onClick={() => onPostClick(post)}>
                        <img
                          src={post.image}
                          alt="Nail art"
                          className="w-full h-48 object-cover cursor-pointer"
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
                              size={20}
                              className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                            />
                            <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </button>
                        </div>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          <Bookmark
                            size={20}
                            className={savedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                          />
                        </button>
                      </div>

                      {/* Description */}
                      <div className="px-4 pb-4">
                        <p className="text-gray-800 mb-2">{post.description}</p>
                        <div className="flex flex-wrap gap-2">
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'institutes' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Instituts pour "{searchQuery}"</h2>
                <div className="space-y-3">
                  {institutes.map((institute) => (
                    <button
                      key={institute.id}
                      onClick={() => onInstituteClick(institute)}
                      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={institute.image}
                          alt="Institut"
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-gray-800">{institute.instituteName}</h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                            <MapPin size={12} />
                            <span>{institute.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{institute.rating}</span>
                            </div>
                            <span className="text-pink-600 font-semibold">{institute.price || "À partir de 30€"}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Carte des instituts</h2>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Carte interactive</h3>
                  <p className="text-gray-600 text-sm">
                    Visualisez tous les instituts près de vous sur une carte interactive
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        context="search"
      />
    </div>
  );
};

export default SearchFeed;
