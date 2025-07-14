// GroupShoppingPanel.tsx (Real-Time Chat + Invite Link + Group Cart Support)

import React, { useState, useEffect } from 'react';
import { Users, Share2, X } from 'lucide-react';
import socket from '../socket';
import CartPanel from './CartPanel';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  joinedAt: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isAI: boolean;
}

interface GroupShoppingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GroupShoppingPanel({ isOpen, onClose }: GroupShoppingPanelProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'chat' | 'savings' | 'cart'>('members');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [inviteLink, setInviteLink] = useState<string>('');

  useEffect(() => {
    socket.emit('get_members');
    socket.emit('get_messages');

    socket.on('update_members', (members: GroupMember[]) => {
      setGroupMembers(members);
    });

    socket.on('load_messages', (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    socket.on('receive_message', (newMessage: ChatMessage) => {
      setChatMessages((prev) => [...prev, newMessage]);
    });

    socket.on('invite_link', (link: string) => {
    console.log('Received invite link:', link); // ✅ Added log
    setInviteLink(link);
  });

    return () => {
      socket.off('update_members');
      socket.off('load_messages');
      socket.off('receive_message');
      socket.off('invite_link');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('send_message', {
      sender: 'You',
      message,
      isAI: false,
    });
    setMessage('');
  };

  const handleShareInvite = () => {
    socket.emit('generate_invite');
  };

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
              <p className="text-sm text-gray-600">{groupMembers.length} members • $247 potential savings</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('members')} className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Members ({groupMembers.length})</button>
          <button onClick={() => setActiveTab('chat')} className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Group Chat</button>
          <button onClick={() => setActiveTab('cart')} className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'cart' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Group Cart</button>
          <button onClick={() => setActiveTab('savings')} className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'savings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Savings Dashboard</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'members' && (
            <div className="p-6 h-full overflow-y-auto space-y-4">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">{member.avatar}</div>
                      {member.isOnline && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">Joined {member.joinedAt}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{member.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              ))}
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Invite More Friends</h3>
                <p className="text-sm text-yellow-700 mb-3">Add 2 more members to unlock 25% group discount on electronics!</p>
                <button onClick={handleShareInvite} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share Invitation</span>
                </button>
                {inviteLink && <div className="mt-2 text-sm text-blue-600 break-words">Invite Link: {inviteLink}</div>}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isAI ? 'justify-start' : msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isAI ? 'bg-green-100 text-green-900' : msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <div className="text-xs font-medium mb-1">{msg.sender}</div>
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs opacity-75 mt-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">Send</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="p-6 h-full overflow-y-auto">
              <CartPanel groupId="demo-group-id" />
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="p-6 h-full overflow-y-auto">
              <p className="text-sm text-gray-500">Savings dashboard coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
