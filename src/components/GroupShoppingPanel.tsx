import React, { useState } from 'react';
import { Users, MessageCircle, DollarSign, Clock, MapPin, Share2, X } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  joinedAt: string;
}

interface GroupShoppingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GroupShoppingPanel({ isOpen, onClose }: GroupShoppingPanelProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'chat' | 'savings'>('members');
  const [message, setMessage] = useState('');

  const groupMembers: GroupMember[] = [
    { id: '1', name: 'You', avatar: '👤', isOnline: true, joinedAt: '2 hours ago' },
    { id: '2', name: 'Sarah Johnson', avatar: '👩‍💼', isOnline: true, joinedAt: '1 hour ago' },
    { id: '3', name: 'Mike Chen', avatar: '👨‍💻', isOnline: false, joinedAt: '45 minutes ago' },
  ];

  const chatMessages = [
    { id: '1', sender: 'Sarah Johnson', message: 'Hey! I found some great deals on baby formula', time: '2:30 PM', isAI: false },
    { id: '2', sender: 'AI Assistant', message: 'I can help you find bulk discounts! With 3+ members, you can save 15% on baby essentials. Should I add some recommendations?', time: '2:32 PM', isAI: true },
    { id: '3', sender: 'Mike Chen', message: 'That sounds great! What about diapers?', time: '2:35 PM', isAI: false },
    { id: '4', sender: 'AI Assistant', message: 'Perfect timing! Huggies diapers are 20% off for group orders of $75+. I can add a variety pack to your shared cart.', time: '2:36 PM', isAI: true },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Group Shopping Session</h2>
              <p className="text-sm text-gray-600">3 members • $247 potential savings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'members'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Members ({groupMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'chat'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Group Chat
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'savings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Savings Dashboard
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'members' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-4">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                          {member.avatar}
                        </div>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">Joined {member.joinedAt}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {member.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Invite More Friends</h3>
                <p className="text-sm text-yellow-700 mb-3">Add 2 more members to unlock 25% group discount on electronics!</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share Invitation</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.isAI
                        ? 'bg-green-100 text-green-900'
                        : msg.sender === 'You'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-xs font-medium mb-1">{msg.sender}</div>
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs opacity-75 mt-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Total Savings</h3>
                      <p className="text-sm text-green-700">Current group order</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-2">$247.50</div>
                  <div className="text-sm text-green-700">23% off regular prices</div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">Location Bonus</h3>
                      <p className="text-sm text-blue-700">Neighborhood discount</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-2">+5%</div>
                  <div className="text-sm text-blue-700">4 neighbors shopping together</div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-purple-900">Delivery Savings</h3>
                      <p className="text-sm text-purple-700">Shared delivery window</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-2">$15.99</div>
                  <div className="text-sm text-purple-700">Split 3 ways = $5.33 each</div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-8 w-8 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-900">Bulk Discount</h3>
                      <p className="text-sm text-yellow-700">Group quantity pricing</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-900 mb-2">18%</div>
                  <div className="text-sm text-yellow-700">Average across all items</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">AI Optimization Suggestions</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Add 2 more items to unlock free shipping upgrade</li>
                  <li>• Switch to store brand for additional 12% savings</li>
                  <li>• Schedule delivery for Tuesday to save extra $5</li>
                  <li>• Invite 1 more member to reach 30% bulk discount tier</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}