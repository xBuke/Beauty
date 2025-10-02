'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Check, 
  X,
  Filter,
  Search,
  Settings,
  Volume2,
  VolumeX,
  Smartphone,
  Mail
} from 'lucide-react';
import { Notification } from '@/types';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    bookingReminders: true,
    messageAlerts: true,
    marketingUpdates: false
  });

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(setNotifications)
      .catch(console.error);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'unread') return matchesSearch && !notification.isRead;
    return matchesSearch && notification.type === filterBy;
  });

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: notificationId, isRead: true })
      });
      
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Implement bulk mark as read API endpoint
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      for (const notification of unreadNotifications) {
        await markAsRead(notification.id);
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-5 h-5 text-green-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking': return 'border-l-green-500';
      case 'message': return 'border-l-blue-500';
      case 'reminder': return 'border-l-yellow-500';
      default: return 'border-l-gray-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your salon activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {unreadCount} unread
          </span>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-pink-600 hover:text-pink-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Delivery Methods */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Delivery Methods</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Mail className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Smartphone className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">SMS Notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Bell className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Push Notifications</span>
              </label>
            </div>
          </div>

          {/* Sound Settings */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Sound & Alerts</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.soundEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    soundEnabled: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                {notificationSettings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                ) : (
                  <VolumeX className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                )}
                <span className="text-sm text-gray-700">Sound Notifications</span>
              </label>
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Notification Types</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.bookingReminders}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    bookingReminders: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Calendar className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Booking Reminders</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.messageAlerts}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    messageAlerts: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <MessageSquare className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Message Alerts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketingUpdates}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    marketingUpdates: e.target.checked
                  })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Bell className="w-4 h-4 ml-2 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Marketing Updates</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-gray-500">
            💡 Notifications are managed via n8n workflows for email, SMS, and push notifications
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
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
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="booking">Bookings</option>
              <option value="message">Messages</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Notifications ({filteredNotifications.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getNotificationColor(notification.type)} ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.type === 'booking' ? 'bg-green-100 text-green-800' :
                          notification.type === 'message' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

