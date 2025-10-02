'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  Search, 
  Filter,
  MoreVertical,
  CheckCheck,
  Clock,
  Star,
  Archive
} from 'lucide-react';
import { Message } from '@/types';

const platformIcons = {
  whatsapp: '📱',
  facebook: '📘',
  instagram: '📸',
  sms: '💬',
  chat: '💻'
};

const platformColors = {
  whatsapp: 'bg-green-100 text-green-800',
  facebook: 'bg-blue-100 text-blue-800',
  instagram: 'bg-pink-100 text-pink-800',
  sms: 'bg-gray-100 text-gray-800',
  chat: 'bg-purple-100 text-purple-800'
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'unread') return matchesSearch && !message.isRead;
    if (filterBy === 'booking') return matchesSearch && message.type === 'booking';
    if (filterBy === 'inquiry') return matchesSearch && message.type === 'inquiry';
    
    return matchesSearch;
  });

  const markAsRead = async (messageId: string) => {
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId, isRead: true })
      });
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    try {
      // TODO: Send reply via n8n webhook to appropriate platform
      // This would integrate with WhatsApp Business API, Facebook Messenger, etc.
      
      console.log('Sending reply:', {
        platform: selectedMessage.platform,
        recipient: selectedMessage.clientContact,
        message: replyText
      });

      setReplyText('');
      // Show success message
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Unified inbox for all customer communications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {unreadCount} unread messages
          </div>
        </div>
      </div>

      {/* Platform Integration Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(platformIcons).map(([platform, icon]) => (
            <div key={platform} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-medium text-gray-900 capitalize">{platform}</p>
                <p className="text-xs text-green-600">Connected</p>
                <p className="text-xs text-gray-500">
                  {/* TODO: Replace with actual n8n webhook status */}
                  via n8n webhook
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="booking">Booking Requests</option>
              <option value="inquiry">Inquiries</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">
              Conversations ({filteredMessages.length})
            </h3>
          </div>
          <div className="overflow-y-auto h-full">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) {
                    markAsRead(message.id);
                  }
                }}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-pink-50 border-pink-200' : ''
                } ${!message.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{platformIcons[message.platform]}</span>
                      <p className="font-medium text-gray-900 truncate">{message.clientName}</p>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${platformColors[message.platform]}`}>
                        {message.platform}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        message.type === 'booking' ? 'bg-green-100 text-green-800' :
                        message.type === 'inquiry' ? 'bg-blue-100 text-blue-800' :
                        message.type === 'complaint' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {message.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {selectedMessage.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedMessage.clientName}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{platformIcons[selectedMessage.platform]}</span>
                        <span className="text-sm text-gray-600">{selectedMessage.clientContact}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-800">{selectedMessage.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* TODO: Load conversation history from database */}
                  <div className="text-center text-sm text-gray-500 py-4">
                    Conversation history will appear here
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply via ${selectedMessage.platform}...`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Reply will be sent via n8n webhook to {selectedMessage.platform}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>Select a message to view the conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

