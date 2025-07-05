import React, { useState } from 'react';
import { MessageCircle, Send, X, Sparkles, ShoppingCart, TrendingUp } from 'lucide-react';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
  suggestions?: string[];
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hi! I'm your Walmart AI assistant. I can help you find products, compare prices, suggest group purchases, and optimize your shopping experience. What can I help you with today?",
      isUser: false,
      timestamp: '2:30 PM',
      suggestions: [
        "Find deals on baby essentials",
        "Start a group shopping session",
        "Compare similar products",
        "Check my MyStyle recommendations"
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getAIResponse(message),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: getAISuggestions(message)
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('deal') || lowerMessage.includes('discount')) {
      return "I found some great deals for you! Currently, there's a 25% group discount on electronics when you shop with 3+ friends. Baby essentials are 20% off for bulk orders, and I can help you start a group shopping session to maximize your savings.";
    } else if (lowerMessage.includes('group') || lowerMessage.includes('friends')) {
      return "Perfect! Group shopping is one of our best features. I can help you create a shared cart, invite friends, and find items with the best group discounts. Would you like me to start a group session with location-aware pricing for your neighborhood?";
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return "Based on your shopping history and preferences, I recommend checking out our electronics section - there are some great deals on smart home devices. Also, your MyStyle profile suggests you might like the new sustainable fashion collection. Shall I add some items to your cart?";
    } else {
      return "I understand you're looking for help with your shopping. I can assist with finding products, creating group orders, comparing prices, and suggesting the best deals. What specific item or category are you interested in?";
    }
  };

  const getAISuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('deal') || lowerMessage.includes('discount')) {
      return ["Show me group discounts", "Find electronics deals", "Start bulk ordering"];
    } else if (lowerMessage.includes('group')) {
      return ["Create group cart", "Invite friends", "Check location savings"];
    } else {
      return ["Find best deals", "Check my wishlist", "Compare prices", "Start group shopping"];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Ask Walmart AI</h3>
            <p className="text-xs text-blue-100">Smart shopping assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-2`}>
              <div className="text-sm">{msg.message}</div>
              <div className={`text-xs mt-1 ${msg.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Quick Suggestions */}
        {messages.length > 0 && messages[messages.length - 1].suggestions && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 font-medium">Quick actions:</div>
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}