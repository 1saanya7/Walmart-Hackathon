import React from 'react';
import { Sparkles, Users, TrendingUp, Clock } from 'lucide-react';

interface HeroProps {
  onStartGroupShopping: () => void;
  onTryAI: () => void;
}

export default function Hero({ onStartGroupShopping, onTryAI }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Shopping
            <span className="text-yellow-400"> Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Experience the future of retail with AI-powered group shopping, collaborative carts, and intelligent recommendations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onStartGroupShopping}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Start Group Shopping</span>
            </button>
            
            <button
              onClick={onTryAI}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Try AI Assistant</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Shopping</h3>
              <p className="text-blue-100">Shop together with friends and family. Share carts, split costs, and get bulk discounts.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-green-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-blue-100">Get personalized suggestions based on your preferences, budget, and shopping history.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-purple-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Savings</h3>
              <p className="text-blue-100">Location-aware bulk pricing and scheduled deliveries for maximum savings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}