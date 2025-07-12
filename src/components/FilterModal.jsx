
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, onApplyFilters, context = 'search' }) => {
  const [filters, setFilters] = useState({
    distance: 15,
    price: [0, 100],
    note: 0,
    technique: [],
    type: [],
    taille: [],
    couleur: [],
    forme: [],
    finitionCouleur: [],
    supplement: [],
    styleTheme: []
  });

  const filterOptions = {
    technique: [
      'Ongle naturelle', 'Gainage (sur ongle naturel)', 'Semi permanent (sur ongle naturel)',
      'Capsule', 'Chalon', 'Gel acrylique', 'Polygel', 'Porcelaine', 'Gel UV/Led',
      'Résine poudre', 'Fibre de soie', 'Gel X', 'Acrygel', 'Press on'
    ],
    type: ['Manucure', 'Pédicure'],
    couleur: [
      'Blanc', 'Rouge', 'Orange', 'Gris', 'Noir', 'Jaune',
      'Marron', 'Beige', 'Bleu', 'Vert', 'Rose', 'Violet'
    ]
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      if (category === 'distance' || category === 'note') {
        return { ...prev, [category]: value };
      }
      
      if (category === 'price') {
        return { ...prev, [category]: value };
      }

      const currentValues = prev[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const isSelected = (category, value) => {
    return filters[category]?.includes && filters[category].includes(value);
  };

  const clearFilters = () => {
    setFilters({
      distance: 15,
      price: [0, 100],
      note: 0,
      technique: [],
      type: [],
      taille: [],
      couleur: [],
      forme: [],
      finitionCouleur: [],
      supplement: [],
      styleTheme: []
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const renderColorOption = (color) => {
    const colorMap = {
      'Blanc': '#FFFFFF',
      'Rouge': '#DC2626',
      'Orange': '#EA580C',
      'Gris': '#6B7280',
      'Noir': '#000000',
      'Jaune': '#EAB308',
      'Marron': '#92400E',
      'Beige': '#F5F5DC',
      'Bleu': '#2563EB',
      'Vert': '#16A34A',
      'Rose': '#EC4899',
      'Violet': '#7C3AED'
    };

    return (
      <button
        key={color}
        onClick={() => handleFilterChange('couleur', color)}
        className={`flex items-center space-x-2 p-3 rounded-xl border transition-all ${
          isSelected('couleur', color)
            ? 'bg-pink-50 border-pink-500'
            : 'hover:bg-gray-50 border-gray-200'
        }`}
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: colorMap[color] }}
        ></div>
        <span className="text-sm font-medium">{color}</span>
        {isSelected('couleur', color) && (
          <Check size={16} className="text-pink-500 ml-auto" />
        )}
      </button>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6 bg-white">
          {/* Distance */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Distance</h3>
              <span className="text-sm text-gray-600">{filters.distance} km</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="50"
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Prix */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Prix</h3>
              <span className="text-sm text-gray-600">{filters.price[0]} € - {filters.price[1]} €</span>
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                value={filters.price[0]}
                onChange={(e) => handleFilterChange('price', [parseInt(e.target.value), filters.price[1]])}
                className="flex-1 p-2 border border-gray-300 rounded-lg bg-white"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.price[1]}
                onChange={(e) => handleFilterChange('price', [filters.price[0], parseInt(e.target.value)])}
                className="flex-1 p-2 border border-gray-300 rounded-lg bg-white"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Note</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleFilterChange('note', star)}
                  className={`text-2xl ${filters.note >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {filterOptions.type.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterChange('type', option)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all ${
                    isSelected('type', option)
                      ? 'bg-pink-50 border-pink-500 text-pink-700'
                      : 'hover:bg-gray-50 border-gray-200 bg-white'
                  }`}
                >
                  {option}
                  {isSelected('type', option) && (
                    <Check size={14} className="float-right text-pink-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Technique */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Technique</h3>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
              {filterOptions.technique.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterChange('technique', option)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all ${
                    isSelected('technique', option)
                      ? 'bg-pink-50 border-pink-500 text-pink-700'
                      : 'hover:bg-gray-50 border-gray-200 bg-white'
                  }`}
                >
                  {option}
                  {isSelected('technique', option) && (
                    <Check size={14} className="float-right text-pink-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Couleur */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Couleur</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.couleur.map(renderColorOption)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-gray-100 bg-white">
          <button
            onClick={clearFilters}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
          >
            Nettoyer
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 py-3 bg-slate-800 text-white rounded-2xl font-medium hover:bg-slate-900 transition-colors"
          >
            APPLIQUER
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
