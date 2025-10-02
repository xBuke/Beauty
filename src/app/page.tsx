'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Star,
  Phone,
  Plus,
  UserPlus,
  Send,
  CalendarPlus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Client, Booking, Message } from '@/types';
import { 
  mockDashboardStats, 
  mockTodayBookings, 
  mockRecentMessages, 
  mockClients,
  mockBookingsGrowthData 
} from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface DashboardStats {
  totalClients: number;
  todayBookings: number;
  unreadMessages: number;
  monthlyRevenue: number;
  weeklyGrowth: number;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);
  const [recentBookings, setRecentBookings] = useState<Booking[]>(mockTodayBookings);
  const [recentMessages, setRecentMessages] = useState<Message[]>(mockRecentMessages);
  const [topClients, setTopClients] = useState<Client[]>(mockClients.slice(0, 6));
  const [showQuickActionModal, setShowQuickActionModal] = useState<string | null>(null);

  useEffect(() => {
    // Use mock data instead of API calls for demo
    setStats(mockDashboardStats);
    setRecentBookings(mockTodayBookings);
    setRecentMessages(mockRecentMessages);
    setTopClients(mockClients.sort((a, b) => b.totalVisits - a.totalVisits).slice(0, 6));
  }, []);

  const statCards = [
    {
      title: t('dashboard.totalClients'),
      value: stats.totalClients,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: t('dashboard.todayBookings'),
      value: stats.todayBookings,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: t('dashboard.unreadMessages'),
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      change: '-2%'
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+18%'
    }
  ];

  const QuickActionModal = ({ action, onClose }: { action: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{action}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="space-y-4">
          {action === t('quickActions.addClient') && (
            <>
              <input type="text" placeholder={t('common.name')} className="w-full p-2 border rounded" />
              <input type="email" placeholder={t('common.email')} className="w-full p-2 border rounded" />
              <input type="tel" placeholder={t('common.phone')} className="w-full p-2 border rounded" />
            </>
          )}
          {action === t('quickActions.addBooking') && (
            <>
              <select className="w-full p-2 border rounded">
                <option>Select Client</option>
                <option>Ana Marić</option>
                <option>Marko Petrović</option>
              </select>
              <select className="w-full p-2 border rounded">
                <option>Select Service</option>
                <option>Haircut & Style</option>
                <option>Manicure</option>
              </select>
              <input type="date" className="w-full p-2 border rounded" />
              <input type="time" className="w-full p-2 border rounded" />
            </>
          )}
          {action === t('quickActions.sendMessage') && (
            <>
              <select className="w-full p-2 border rounded">
                <option>Select Client</option>
                <option>Ana Marić</option>
                <option>Marko Petrović</option>
              </select>
              <textarea placeholder="Message..." className="w-full p-2 border rounded h-24"></textarea>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            {t('common.cancel')}
          </button>
          <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600">{t('dashboard.welcome')}</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('quickActions.title')}</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowQuickActionModal(t('quickActions.addClient'))}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('quickActions.addClient')}</span>
          </button>
          <button
            onClick={() => setShowQuickActionModal(t('quickActions.addBooking'))}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>{t('quickActions.addBooking')}</span>
          </button>
          <button
            onClick={() => setShowQuickActionModal(t('quickActions.sendMessage'))}
            className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>{t('quickActions.sendMessage')}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-2">
                  {card.change.startsWith('-') ? (
                    <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  )}
                  <span className={`text-sm ${
                    card.change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>{card.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Growth Chart */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.bookingsGrowth')}</h2>
        </div>
        <div className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBookingsGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#ec4899" 
                  strokeWidth={2}
                  dot={{ fill: '#ec4899' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.recentBookings')}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {booking.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{booking.clientName}</p>
                      <p className="text-sm text-gray-600">{booking.serviceName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                    <p className="text-sm text-gray-600">${booking.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.recentMessages')}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {message.platform === 'whatsapp' && <Phone className="w-5 h-5 text-green-500" />}
                    {message.platform === 'facebook' && <MessageSquare className="w-5 h-5 text-blue-500" />}
                    {message.platform === 'instagram' && <MessageSquare className="w-5 h-5 text-pink-500" />}
                    {message.platform === 'sms' && <MessageSquare className="w-5 h-5 text-gray-500" />}
                    {message.platform === 'chat' && <MessageSquare className="w-5 h-5 text-purple-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{message.clientName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                  </div>
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.topClients')}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topClients.map((client) => (
              <div key={client.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{client.totalVisits} {t('dashboard.visits')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Teaser */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-sm border text-white">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{t('pricing.teaser')}</h3>
          <Link href="/pricing">
            <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              {t('pricing.viewPricing')}
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Action Modal */}
      {showQuickActionModal && (
        <QuickActionModal 
          action={showQuickActionModal} 
          onClose={() => setShowQuickActionModal(null)} 
        />
      )}
    </div>
  );
}

