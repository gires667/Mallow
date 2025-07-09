
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Star, Heart, Bookmark, User } from 'lucide-react';

const SearchFeed = ({ onBack, posts, onPostClick, onInstituteClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const trendingColors = [
    { name: 'Rose Gold', color: '#F7B2BD', count: '2.4k' },
    { name: 'Nude', color: '#F5DEB3', count: '1.8k' },
    { name: 'Rouge', color: '#DC143C', count: '3.2k' },
    { name: 'Noir', color: '#2C2C2C', count: '2.9k' },
    { name: 'Bleu', color: '#4169E1', count: '1.5k' },
    { name: 'Violet', color: '#8A2BE2', count: '2.1k' }
  ];

  const popularPosts = posts.slice(0, 4);
  const institutesToFollow = posts.slice(2, 6);

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

  const filteredPosts = posts.filter(post => 
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
              placeholder="Rechercher institut, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button className="p-2 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-md mx-auto pb-24">
        {searchQuery === '' ? (
          <div className="space-y-6 p-4">
            {/* Couleurs en tendance */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Couleurs en tendance</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {trendingColors.map((color, index) => (
                  <div key={index} className="flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 min-w-[100px]">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-2" 
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <p className="text-xs font-medium text-gray-800 text-center">{color.name}</p>
                    <p className="text-xs text-gray-500 text-center">{color.count} posts</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Posts populaires */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Posts populaires</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {popularPosts.map((post) => (
                  <div key={post.id} className="flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 w-48">
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
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">💅</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{post.instituteName}</span>
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
                          <span className="text-xs text-gray-600">{post.likes}</span>
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
            </section>

            {/* Instituts à suivre */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instituts à suivre</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {institutesToFollow.map((institute) => (
                  <button
                    key={institute.id}
                    onClick={() => onInstituteClick(institute)}
                    className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-w-[160px]"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-lg">💅</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{institute.instituteName}</h3>
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-2">
                        <MapPin size={12} />
                        <span>{institute.location}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{institute.rating}</span>
                      </div>
                      <button className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition-colors">
                        Suivre
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Résultats pour "{searchQuery}"</h2>
            
            {/* Posts filtrés */}
            <div className="space-y-1">
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
                      className="w-full h-64 object-cover cursor-pointer"
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
      </main>
    </div>
  );
};

export default SearchFeed;
