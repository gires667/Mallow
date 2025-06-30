
import React, { useState } from 'react';
import { Eye, EyeOff, Facebook, Mail, Phone } from 'lucide-react';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    gender: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de l'authentification réussie
    onAuthSuccess();
  };

  const handleSocialLogin = (provider) => {
    console.log(`Connexion via ${provider}`);
    // Simulation de l'authentification sociale réussie
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">💅</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Retrouvez vos rendez-vous beauté' : 'Rejoignez notre communauté beauté'}
            </p>
          </div>

          {/* Boutons réseaux sociaux */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">Continuer avec Google</span>
            </button>
            
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Continuer avec Facebook</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Sélectionner le genre</option>
                    <option value="femme">Femme</option>
                    <option value="homme">Homme</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <input
                    type="date"
                    name="birthDate"
                    placeholder="Date de naissance"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Code postal"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={stayConnected}
                    onChange={(e) => setStayConnected(e.target.checked)}
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-600">Rester connecté</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-pink-500 hover:text-pink-600"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          {/* Lien pour changer de mode */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-500 hover:text-pink-600 font-semibold ml-1"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
