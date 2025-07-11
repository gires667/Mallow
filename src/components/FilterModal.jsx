
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, onApplyFilters, context = 'search' }) => {
  // Context peut être 'search', 'booking', 'prestation_add', 'publication_add'
  
  const [filters, setFilters] = useState({
    technique: [],
    type: [],
    taille: [],
    couleur: [],
    forme: [],
    finitionCouleur: [],
    supplement: [],
    styleTheme: []
  });

  // Définition des options pour chaque catégorie
  const filterOptions = {
    technique: [
      'Ongle naturelle', 'Gainage (sur ongle naturel)', 'Semi permanent (sur ongle naturel)',
      'Capsule', 'Chalon', 'Gel acrylique', 'Polygel', 'Porcelaine', 'Gel UV/Led',
      'Résine poudre', 'Fibre de soie', 'Gel, X', 'Acrygel', 'Press on'
    ],
    type: ['Manucure', 'Pédicure'],
    taille: [
      { label: 'S (0-5 mm)', value: 'S' },
      { label: 'M (5-10 mm)', value: 'M' },
      { label: 'L (10-15 mm)', value: 'L' },
      { label: 'XL (15-20 mm)', value: 'XL' },
      { label: 'XXL (>20 mm)', value: 'XXL' }
    ],
    couleur: [
      'Blanc', 'Rouge', 'Orange', 'Gris', 'Noir', 'Jaune',
      'Marron', 'Beige', 'Bleu', 'Vert', 'Rose', 'Violet'
    ],
    forme: {
      'Classique': ['Carré', 'Carré arrondie', 'Rond', 'Ovale'],
      'Allongé': ['Amande', 'Ballerine', 'Stiletto', 'Edge'],
      'Créative': ['Lipstick', 'Pipe', 'Flare', 'Arrowhead', 'Bridge'],
      'Artistique': ['Russian almond', 'Mountain Peak', 'Squareletto']
    },
    finitionCouleur: {
      'Classique': ['Brillant', 'Matte', 'Satiné', 'Pastel', 'Nude'],
      'Texturé': ['Sucre', 'Velours', 'Sable', 'Gomme'],
      'Métallique/Nacrée': ['Doré', 'Argenté', 'Métallisé', 'Chrome', 'Nacré', 'Irisé'],
      'Paillette/Brillant': ['Paillettes fine', 'Paillettes épaisse', 'Holographique', 'Flakes', 'Effet diamant'],
      'Finition spéciale': ['Caméléon', 'Thermotte chronique', 'Phosphorescent', 'Néon UV Effect', 'Effect opale'],
      'Finition artistique': ['Marbre', 'Ombre', 'Écailler', 'Effet', 'Effet aquatique', 'Effet plume', 'Effet givré', 'Effet Jean']
    },
    supplement: {
      'Artistique': ['Imprimés', 'Lettre et chiffres', 'Dessin main', 'Graffiti'],
      'Cat eyes': ['Cat eyes'],
      'Effet 3D': ['Relief, 3D, gel ou acrylique', 'Strasse / cristaux', 'Perles', 'Studs / piercing', 'Charms / bijoux', 'Effet bulle'],
      'Encapsulation': ['Encapsulation / incrustation']
    },
    styleTheme: [
      'Classique', 'French manucure', 'Élégant & chic', 'Fantaisie créatif',
      'L\'amour', 'Saisonnier nature', 'Mode haute couture', 'Pop culture',
      'Dark romantique', 'Kawaii Art'
    ]
  };

  // Règles selon le contexte
  const getFilterRules = (filterType) => {
    const rules = {
      search: { // Tous facultatifs et multiples
        technique: { required: false, multiple: true },
        type: { required: false, multiple: true },
        taille: { required: false, multiple: true },
        couleur: { required: false, multiple: true },
        forme: { required: false, multiple: true },
        finitionCouleur: { required: false, multiple: true },
        supplement: { required: false, multiple: true },
        styleTheme: { required: false, multiple: true }
      },
      booking: { // Technique obligatoire unique au premier lieu
        technique: { required: true, multiple: false },
        type: { required: false, multiple: true },
        taille: { required: false, multiple: true },
        couleur: { required: false, multiple: true },
        forme: { required: false, multiple: true },
        finitionCouleur: { required: false, multiple: true },
        supplement: { required: false, multiple: true },
        styleTheme: { required: false, multiple: true }
      }
    };
    
    return rules[context] || rules.search;
  };

  const handleFilterChange = (category, value) => {
    const rules = getFilterRules();
    const isMultiple = rules[category]?.multiple;

    setFilters(prev => {
      if (isMultiple) {
        const currentValues = prev[category] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [category]: newValues };
      } else {
        return { ...prev, [category]: [value] };
      }
    });
  };

  const isSelected = (category, value) => {
    return filters[category]?.includes(value) || false;
  };

  const clearFilters = () => {
    setFilters({
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
    onClose();
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
        className={`flex items-center space-x-2 p-2 rounded-lg border transition-all ${
          isSelected('couleur', color)
            ? 'bg-pink-50 border-pink-500'
            : 'hover:bg-gray-50 border-gray-200'
        }`}
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: colorMap[color] }}
        ></div>
        <span className="text-sm">{color}</span>
        {isSelected('couleur', color) && (
          <Check size={16} className="text-pink-500" />
        )}
      </button>
    );
  };

  const renderFilterSection = (title, category, options) => {
    const rules = getFilterRules();
    const isRequired = rules[category]?.required;
    const isMultiple = rules[category]?.multiple;

    return (
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {isRequired && <span className="text-red-500 text-xs">*</span>}
          <span className="text-xs text-gray-500">
            ({isMultiple ? 'choix multiples' : 'choix unique'})
          </span>
        </div>
        
        {category === 'couleur' ? (
          <div className="grid grid-cols-2 gap-2">
            {options.map(renderColorOption)}
          </div>
        ) : typeof options === 'object' && !Array.isArray(options) ? (
          <div className="space-y-4">
            {Object.entries(options).map(([subCategory, subOptions]) => (
              <div key={subCategory}>
                <h4 className="text-sm font-medium text-gray-600 mb-2">{subCategory}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {subOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange(category, option)}
                      className={`p-2 text-sm rounded-lg border text-left transition-all ${
                        isSelected(category, option)
                          ? 'bg-pink-50 border-pink-500 text-pink-700'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      {option}
                      {isSelected(category, option) && (
                        <Check size={14} className="float-right text-pink-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {options.map(option => {
              const value = typeof option === 'object' ? option.value : option;
              const label = typeof option === 'object' ? option.label : option;
              
              return (
                <button
                  key={value}
                  onClick={() => handleFilterChange(category, value)}
                  className={`p-2 text-sm rounded-lg border text-left transition-all ${
                    isSelected(category, value)
                      ? 'bg-pink-50 border-pink-500 text-pink-700'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {label}
                  {isSelected(category, value) && (
                    <Check size={14} className="float-right text-pink-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {context === 'booking' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Étape 1 :</strong> Sélectionnez d'abord votre technique (obligatoire)
              </p>
            </div>
          )}

          {renderFilterSection('Technique', 'technique', filterOptions.technique)}
          {renderFilterSection('Type', 'type', filterOptions.type)}
          {renderFilterSection('Taille', 'taille', filterOptions.taille)}
          {renderFilterSection('Couleur', 'couleur', filterOptions.couleur)}
          {renderFilterSection('Forme', 'forme', filterOptions.forme)}
          {renderFilterSection('Finition couleur', 'finitionCouleur', filterOptions.finitionCouleur)}
          {renderFilterSection('Supplément', 'supplement', filterOptions.supplement)}
          {renderFilterSection('Style & Thème', 'styleTheme', filterOptions.styleTheme)}
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-gray-100">
          <button
            onClick={clearFilters}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
          >
            Effacer tout
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 py-3 bg-pink-500 text-white rounded-2xl font-medium hover:bg-pink-600 transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
