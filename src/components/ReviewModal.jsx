
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const ReviewModal = ({ appointment, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleSubmit = () => {
    // Logique pour soumettre l'avis
    console.log('Avis soumis:', { rating, comment, isAnonymous });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={onClose}>
            <X size={24} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Écrire un avis</h2>
          <div className="w-6"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Décrivez votre expérience</h3>
          <p className="text-gray-600 text-sm mb-6">
            Partagez votre expérience, afin que la prochaine fois nous puissions encore mieux vous servir
          </p>

          {/* Rating Stars */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <button
                key={starIndex}
                onClick={() => handleStarClick(starIndex)}
                onMouseEnter={() => handleStarHover(starIndex)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  size={36}
                  className={`${
                    starIndex <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Comment Textarea */}
          <div className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Écrire votre commentaire ici..."
              className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Anonymous Checkbox */}
          <div className="flex items-center space-x-3 mb-8">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Poster mon avis anonymement
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            PUBLIER MON AVIS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
