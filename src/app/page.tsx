'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Phone
} from 'lucide-react';
import { Client, Booking, Message } from '@/types';

interface DashboardStats {
  totalClients: number;
  todayBookings: number;
  unreadMessages: number;
  monthlyRevenue: number;
  weeklyGrowth: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    todayBookings: 0,
    unreadMessages: 0,
    monthlyRevenue: 0,
    weeklyGrowth: 0
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [topClients, setTopClients] = useState<Client[]>([]);

  useEffect(() => {
    // Fetch dashboard data
    Promise.all([
      fetch('/api/clients').then(res => res.json()),
      fetch('/api/bookings').then(res => res.json()),
      fetch('/api/messages').then(res => res.json())
    ]).then(([clients, bookings, messages]) => {
      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const todayBookings = bookings.filter((b: Booking) => b.date === today);
      const unreadMessages = messages.filter((m: Message) => !m.isRead);
      const monthlyRevenue = bookings
        .filter((b: Booking) => b.status === 'completed')
        .reduce((sum: number, b: Booking) => sum + b.price, 0);

      setStats({
        totalClients: clients.length,
        todayBookings: todayBookings.length,
        unreadMessages: unreadMessages.length,
        monthlyRevenue,
        weeklyGrowth: 12.5 // Mock growth percentage
      });

      // Set recent data
      setRecentBookings(bookings.slice(0, 5));
      setRecentMessages(messages.slice(0, 5));
      setTopClients(clients.sort((a: Client, b: Client) => b.totalVisits - a.totalVisits).slice(0, 5));
    }).catch(console.error);
  }, []);

  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Today\'s Bookings',
      value: stats.todayBookings,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      change: '-2%'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+18%'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your salon.</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{card.change}</span>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
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
            <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
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
          <h2 className="text-lg font-semibold text-gray-900">Top Clients</h2>
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
                    <span className="text-sm text-gray-600">{client.totalVisits} visits</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

