
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
    { id: 1, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=150&h=150&fit=crop", likes: 245 },
    { id: 2, image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=150&h=150&fit=crop", likes: 189 },
    { id: 3, image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=150&h=150&fit=crop", likes: 156 },
    { id: 4, image: "https://images.unsplash.com/photo-1583792208416-cb7a0707b2fa?w=150&h=150&fit=crop", likes: 142 },
    { id: 5, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&h=150&fit=crop", likes: 128 },
    { id: 6, image: "https://images.unsplash.com/photo-1599948985230-6d0c0d78a1b4?w=150&h=150&fit=crop", likes: 115 },
    { id: 7, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop", likes: 98 },
    { id: 8, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop", likes: 87 }
  ];

  const institutes = [
    { id: 1, name: "Indigonails", location: "Villeurbanne", rating: 4.8, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop" },
    { id: 2, name: "GelX/Pose", location: "Lyon 3ème", rating: 4.9, image: "https://images.unsplash.com/photo-1572633567997-73a2a2634c50?w=100&h=100&fit=crop" },
    { id: 3, name: "Beauty Studio", location: "Lyon 2ème", rating: 4.7, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=100&h=100&fit=crop" },
    { id: 4, name: "Nails Paradise", location: "Villeurbanne", rating: 4.9, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
    { id: 5, name: "French Nails", location: "Lyon 6ème", rating: 4.6, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop" },
    { id: 6, name: "Color Studio", location: "Lyon 1er", rating: 4.8, image: "https://images.unsplash.com/photo-1599948985230-6d0c0d78a1b4?w=100&h=100&fit=crop" }
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
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white sticky top-16 z-30">
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
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Couleurs</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {trendingColors.map((color, index) => (
                  <div key={index} className="flex-shrink-0 text-center">
                    <div className={`w-12 h-12 ${color.color} rounded-full mb-1 shadow-md`}></div>
                    <span className="text-xs text-gray-600 block">{color.name}</span>
                    <span className="text-xs text-gray-400">{color.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts populaires */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Posts populaires</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {popularPosts.map((post) => (
                  <div key={post.id} className="flex-shrink-0 relative">
                    <img
                      src={post.image}
                      alt="Post populaire"
                      className="w-32 h-32 object-cover rounded-2xl cursor-pointer"
                      onClick={() => onPostClick(post)}
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                      <Heart size={12} className="fill-current" />
                      <span className="text-xs">{post.likes}</span>
                    </div>
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
                    >
                      <Heart
                        size={14}
                        className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : 'text-gray-400'}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instituts à suivre */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instituts à suivre</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {institutes.map((institute) => (
                  <div key={institute.id} className="flex-shrink-0 w-28 text-center">
                    <img
                      src={institute.image}
                      alt={institute.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto mb-2 cursor-pointer"
                      onClick={() => onInstituteClick(institute)}
                    />
                    <h3 className="font-medium text-gray-800 text-sm truncate">{institute.name}</h3>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <MapPin size={10} />
                      <span className="truncate">{institute.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{institute.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && searchQuery && (
          <div className="p-4">
            <div className="space-y-1">
              {posts.filter(post => 
                post.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((post) => (
                <div key={post.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 pb-3">
                    <button 
                      className="flex items-center space-x-3"
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
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="relative" onClick={() => onPostClick(post)}>
                    <img
                      src={post.image}
                      alt="Nail art"
                      className="w-full h-80 object-cover cursor-pointer"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-pink-600">
                      {post.price}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center space-x-1"
                      >
                        <Heart
                          size={24}
                          className={likedPosts.has(post.id) ? 'text-pink-500 fill-current' : 'text-gray-600'}
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

                  <div className="px-4 pb-3">
                    <p className="text-gray-800 mb-2">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'institutes' && (
          <div className="p-4 space-y-3">
            {institutes.filter(institute =>
              institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              institute.location.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((institute) => (
              <button
                key={institute.id}
                onClick={() => onInstituteClick(institute)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex space-x-3">
                  <img
                    src={institute.image}
                    alt="Institut"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800">{institute.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <MapPin size={12} />
                      <span>{institute.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{institute.rating}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
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
        <FilterModal onClose={() => setShowFilter(false)} />
      )}
    </div>
  );
};

export default SearchFeed;
