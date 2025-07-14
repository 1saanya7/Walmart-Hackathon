import React, { useState } from 'react';
import { Heart, Star, TrendingUp, User, Palette, Sparkles, MessageCircle } from 'lucide-react';

interface StyleRecommendation {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  styleMatch: number;
  trending: boolean;
}

export default function MyStyleSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Fashion', 'Home', 'Beauty', 'Electronics'];
  
  const recommendations: StyleRecommendation[] = [
    {
      id: 1,
      name: 'Sustainable Cotton Dress',
      price: 42.99,
      image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fashion',
      styleMatch: 95,
      trending: true
    },
    {
      id: 2,
      name: 'Minimalist Wall Art Set',
      price: 89.99,
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Home',
      styleMatch: 87,
      trending: false
    },
    {
      id: 3,
      name: 'Organic Skincare Kit',
      price: 34.99,
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beauty',
      styleMatch: 92,
      trending: true
    },
    {
      id: 4,
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      styleMatch: 88,
      trending: true
    }
  ];

  const filteredRecommendations = selectedCategory === 'All' 
    ? recommendations 
    : recommendations.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Palette className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">MyStyle</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized recommendations powered by AI, tailored to your unique style and preferences
          </p>
        </div>

        {/* Style Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Your Style Profile</h3>
                <p className="text-gray-600">Updated based on your shopping history</p>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Update Preferences
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-purple-900 mb-2">Style Personality</h4>
              <p className="text-purple-700">Modern Minimalist</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">Clean Lines</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">Sustainable</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Favorite Categories</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Fashion</span>
                  <span className="text-blue-900 font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Home & Garden</span>
                  <span className="text-blue-900 font-semibold">65%</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-2">AI Insights</h4>
              <p className="text-green-700 text-sm">You prefer eco-friendly products and tend to shop during seasonal sales</p>
              <div className="mt-3 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">92% match accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecommendations.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  <Heart className="h-4 w-4 text-gray-600" />
                </div>
                
                {item.trending && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Trending</span>
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {item.styleMatch}% match
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{item.category}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">${item.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Talk to Walmart Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Talk to Walmart</h3>
            <p className="text-xl text-blue-100 mb-6">
              Get personalized fashion advice, style tips, and product recommendations through our AI-powered chat
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors">
              Start Style Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}