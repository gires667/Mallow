
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Heart, Bookmark, MapPin, Star } from 'lucide-react';
import FilterModal from './FilterModal';

const SearchFeed = ({ onBack, posts, onPostClick, onInstituteClick }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const trendingColors = [
    { name: 'Rose', color: 'bg-pink-400', posts: 1250 },
    { name: 'Nude', color: 'bg-amber-200', posts: 980 },
    { name: 'Rouge', color: 'bg-red-500', posts: 750 },
    { name: 'Blanc', color: 'bg-white border border-gray-300', posts: 650 },
    { name: 'Noir', color: 'bg-black', posts: 540 },
    { name: 'Bleu', color: 'bg-blue-500', posts: 420 },
    { name: 'Vert', color: 'bg-green-500', posts: 380 },
    { name: 'Violet', color: 'bg-purple-500', posts: 320 }
  ];

  const popularPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop", likes: 245 },
    { id: 2, image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200&h=200&fit=crop", likes: 189 },
    { id: 3, image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop", likes: 156 },
    { id: 4, image: "https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=200&h=200&fit=crop", likes: 142 },
    { id: 5, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop", likes: 128 },
    { id: 6, image: "https://images.unsplash.com/photo-1599948985230-6d0c0d78a1b4?w=200&h=200&fit=crop", likes: 115 },
    { id: 7, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", likes: 98 },
    { id: 8, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop", likes: 87 },
    { id: 9, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop", likes: 76 },
    { id: 10, image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=200&h=200&fit=crop", likes: 65 }
  ];

  const institutes = [
    { id: 1, name: "Indigonails", location: "Villeurbanne", rating: 4.8, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=120&h=120&fit=crop" },
    { id: 2, name: "GelX/Pose", location: "Lyon 3ème", rating: 4.9, image: "https://images.unsplash.com/photo-1572633567997-73a2a2634c50?w=120&h=120&fit=crop" },
    { id: 3, name: "Beauty Studio", location: "Lyon 2ème", rating: 4.7, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=120&h=120&fit=crop" },
    { id: 4, name: "Nails Paradise", location: "Villeurbanne", rating: 4.9, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop" },
    { id: 5, name: "French Nails", location: "Lyon 6ème", rating: 4.6, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop" },
    { id: 6, name: "Color Studio", location: "Lyon 1er", rating: 4.8, image: "https://images.unsplash.com/photo-1599948985230-6d0c0d78a1b4?w=120&h=120&fit=crop" },
    { id: 7, name: "Glamour Nails", location: "Lyon 7ème", rating: 4.5, image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=120&h=120&fit=crop" },
    { id: 8, name: "Divine Touch", location: "Lyon 8ème", rating: 4.7, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=120&h=120&fit=crop" }
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

  const handleFilterApply = (filters) => {
    setShowFilter(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-40">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Rechercher</h1>
        <button 
          onClick={() => setShowFilter(true)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Filter size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
          />
          {!searchQuery && (
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white sticky top-20 z-30">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'posts'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('institutes')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'institutes'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
        >
          Instituts
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'map'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
        >
          Map
        </button>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === 'posts' && !searchQuery && (
          <div className="space-y-6">
            {/* Couleurs tendance */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Couleurs tendance</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {trendingColors.map((color, index) => (
                  <div key={index} className="flex-shrink-0 text-center">
                    <div className={`w-16 h-16 ${color.color} rounded-full mb-2 shadow-md`}></div>
                    <span className="text-sm text-gray-600 block font-medium">{color.name}</span>
                    <span className="text-xs text-gray-400">{color.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts populaires */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Posts populaires</h2>
              <div className="grid grid-cols-2 gap-3">
                {popularPosts.map((post) => (
                  <div key={post.id} className="relative">
                    <img
                      src={post.image}
                      alt="Post populaire"
                      className="w-full h-48 object-cover rounded-2xl cursor-pointer"
                      onClick={() => onPostClick(post)}
                    />
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1">
                      <Heart size={12} className="fill-current" />
                      <span className="text-xs">{post.likes}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(post.id);
                        }}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
                      >
                        <Heart
                          size={14}
                          className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : 'text-gray-600'}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(post.id);
                        }}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
                      >
                        <Bookmark
                          size={14}
                          className={savedPosts.has(post.id) ? 'text-pink-500 fill-current' : 'text-gray-600'}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && searchQuery && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {posts.filter(post => 
                post.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((post) => (
                <div key={post.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative" onClick={() => onPostClick(post)}>
                    <img
                      src={post.image}
                      alt="Nail art"
                      className="w-full h-48 object-cover cursor-pointer"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-pink-600">
                      {post.price}
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{post.instituteName}</h3>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          <Heart
                            size={16}
                            className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : ''}
                          />
                        </button>
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
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <MapPin size={10} />
                      <span className="ml-1">{post.location}</span>
                    </div>
                    <p className="text-gray-600 text-xs truncate">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'institutes' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {institutes.filter(institute =>
                institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                institute.location.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((institute) => (
                <button
                  key={institute.id}
                  onClick={() => onInstituteClick(institute)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
                >
                  <img
                    src={institute.image}
                    alt="Institut"
                    className="w-full h-24 rounded-xl object-cover mb-3"
                  />
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{institute.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={10} />
                    <span className="ml-1">{institute.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{institute.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="p-4 h-96 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Carte interactive</h3>
              <p className="text-gray-600">Trouvez les instituts près de chez vous</p>
            </div>
          </div>
        )}
      </div>

      {showFilter && (
        <FilterModal 
          isOpen={showFilter}
          onClose={() => setShowFilter(false)} 
          onApplyFilters={handleFilterApply}
        />
      )}
    </div>
  );
};

export default SearchFeed;
