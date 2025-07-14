import React, { useState } from 'react';
import { Search, ShoppingCart, User, MessageCircle, Users, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onGroupCartClick: () => void;
  onChatClick: () => void;
}

export default function Header({ cartCount, onCartClick, onGroupCartClick, onChatClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold text-blue-900">
                <span className="text-blue-900">Walmart</span>
                <span className="text-yellow-500">+</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search everything at Walmart online and in store"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition-colors">
                <Search className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onChatClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <MessageCircle className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  AI
                </span>
              </button>

              <button
                onClick={onGroupCartClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <Users className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="h-6 w-6 text-gray-700" />
              </button>

              <button
                onClick={onCartClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={onChatClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-gray-700" />
                <span>Ask Walmart AI</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">AI</span>
              </button>
              
              <button
                onClick={onGroupCartClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-5 w-5 text-gray-700" />
                <span>Group Shopping</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              </button>
              
              <button
                onClick={onCartClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <span>My Cart</span>
                {cartCount > 0 && (
                  <span className="bg-yellow-500 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}