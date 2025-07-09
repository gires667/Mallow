
import React, { useState } from 'react';
import { ArrowLeft, Share2, Bookmark, Heart, MapPin, Star, Clock, User } from 'lucide-react';

const PostDetail = ({ post, onBack, onBookAppointment, onInstituteClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const prestationDetails = {
    nom: "Pose vernis semi permanent",
    couleurs: "Blanc, Violet",
    longueur: "1,4 cm",
    duree: "1h00",
    prix: "20 €"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Image principale */}
      <div className="relative">
        <img
          src={post.image}
          alt="Nail art"
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Informations institut - NOW CLICKABLE */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <button 
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            onClick={() => onInstituteClick(post)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">💅</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{post.instituteName}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin size={12} />
                <span>French Institut, 1,8 km</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current ml-2" />
                <span>4.2</span>
              </div>
            </div>
          </button>
          <span className="text-pink-600 font-semibold">J'aime</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Heart
                size={24}
                className={isLiked ? 'text-pink-500 fill-current' : ''}
              />
            </button>
            <button className="text-gray-600 hover:text-pink-500 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <Bookmark
              size={24}
              className={isSaved ? 'text-pink-500 fill-current' : ''}
            />
          </button>
        </div>
      </div>

      {/* Détails de la prestation */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Nom</span>
          <span className="font-semibold text-gray-800">{prestationDetails.nom}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Couleurs</span>
          <span className="font-semibold text-gray-800">{prestationDetails.couleurs}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Longueur</span>
          <span className="font-semibold text-gray-800">{prestationDetails.longueur}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Lorem</span>
          <span className="font-semibold text-gray-800">Ipsum dolor</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Lorem</span>
          <span className="font-semibold text-gray-800">Ipsum</span>
        </div>

        {/* Informations booking */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Durée</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Équipe</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Prix</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">{prestationDetails.duree}</span>
          <span className="font-semibold text-pink-600">🧑‍💼 Julie</span>
          <span className="font-semibold text-pink-600">{prestationDetails.prix}</span>
        </div>
      </div>

      {/* Bouton de réservation */}
      <div className="p-4 mt-6">
        <button
          onClick={() => onBookAppointment(post, prestationDetails)}
          className="w-full bg-slate-800 text-white py-4 rounded-2xl font-semibold hover:bg-slate-900 transition-all"
        >
          PRENDRE RDV
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
