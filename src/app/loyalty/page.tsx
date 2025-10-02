'use client';

import { useState } from 'react';
import { 
  Heart, 
  Star, 
  Gift, 
  Trophy, 
  Users, 
  TrendingUp, 
  Calendar,
  Plus,
  Crown,
  Award,
  Zap,
  Target,
  Percent
} from 'lucide-react';

export default function LoyaltyPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock loyalty program data
  const loyaltyStats = {
    totalMembers: 156,
    activeMembers: 89,
    pointsIssued: 12450,
    rewardsRedeemed: 34,
    averageSpend: 85,
    retentionRate: 78
  };

  const loyaltyTiers = [
    {
      name: 'Bronze',
      minSpend: 0,
      pointsMultiplier: 1,
      benefits: ['1 point per $1 spent', 'Birthday discount'],
      members: 89,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Silver',
      minSpend: 500,
      pointsMultiplier: 1.5,
      benefits: ['1.5 points per $1 spent', 'Priority booking', '10% service discount'],
      members: 45,
      color: 'bg-gray-100 text-gray-800'
    },
    {
      name: 'Gold',
      minSpend: 1000,
      pointsMultiplier: 2,
      benefits: ['2 points per $1 spent', 'Free consultation', '15% service discount', 'Exclusive events'],
      members: 18,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Platinum',
      minSpend: 2000,
      pointsMultiplier: 3,
      benefits: ['3 points per $1 spent', 'Complimentary services', '20% discount', 'Personal stylist'],
      members: 4,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const recentRewards = [
    {
      id: '1',
      clientName: 'Emma Johnson',
      reward: 'Free Manicure',
      pointsUsed: 500,
      date: '2024-10-01',
      tier: 'Gold'
    },
    {
      id: '2',
      clientName: 'Sofia Rodriguez',
      reward: '15% Service Discount',
      pointsUsed: 300,
      date: '2024-09-28',
      tier: 'Silver'
    },
    {
      id: '3',
      clientName: 'Olivia Chen',
      reward: 'Complimentary Facial',
      pointsUsed: 800,
      date: '2024-09-25',
      tier: 'Platinum'
    }
  ];

  const availableRewards = [
    {
      name: 'Free Manicure',
      points: 500,
      category: 'Service',
      description: 'Complimentary gel manicure service'
    },
    {
      name: '10% Discount',
      points: 200,
      category: 'Discount',
      description: '10% off any service'
    },
    {
      name: 'Free Product Sample',
      points: 100,
      category: 'Product',
      description: 'Take-home beauty product sample'
    },
    {
      name: 'Priority Booking',
      points: 300,
      category: 'Perk',
      description: '30-day priority booking access'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
          <p className="text-gray-600">Reward your best customers and increase retention</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
            Coming Soon
          </span>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Reward</span>
          </button>
        </div>
      </div>

      {/* Feature Preview Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Customer Loyalty System Coming Soon!</h2>
            <p className="text-purple-100 mt-1">
              Advanced loyalty program with points, tiers, rewards, and automated retention campaigns.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Expected Launch</p>
            <p className="font-semibold">Q1 2025</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: Trophy },
            { id: 'tiers', name: 'Loyalty Tiers', icon: Crown },
            { id: 'rewards', name: 'Rewards', icon: Gift },
            { id: 'campaigns', name: 'Campaigns', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Loyalty Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyStats.totalMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyStats.activeMembers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Points Issued</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyStats.pointsIssued.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Gift className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rewards Redeemed</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyStats.rewardsRedeemed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Spend</p>
                  <p className="text-2xl font-bold text-gray-900">${loyaltyStats.averageSpend}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Percent className="w-8 h-8 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyStats.retentionRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reward Redemptions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentRewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{reward.clientName}</p>
                          <p className="text-sm text-gray-600">{reward.reward}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{reward.pointsUsed} pts</p>
                        <p className="text-xs text-gray-500">{new Date(reward.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Tier Distribution</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {loyaltyTiers.map((tier) => (
                    <div key={tier.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Crown className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tier.color}`}>
                            {tier.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{tier.members} members</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-pink-600 h-2 rounded-full" 
                            style={{ width: `${(tier.members / loyaltyStats.totalMembers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'tiers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loyaltyTiers.map((tier) => (
              <div key={tier.name} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <Crown className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Minimum Spend</p>
                    <p className="font-semibold">${tier.minSpend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Points Multiplier</p>
                    <p className="font-semibold">{tier.pointsMultiplier}x</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Members</p>
                    <p className="font-semibold">{tier.members}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Benefits</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Available Rewards</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {availableRewards.map((reward, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <Gift className="w-6 h-6 text-pink-500" />
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
                        {reward.points} pts
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {reward.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'campaigns' && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loyalty Campaigns</h3>
          <p className="text-gray-600 mb-4">
            Automated loyalty campaigns and retention workflows coming soon.
          </p>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p>• Automated point awarding</p>
            <p>• Tier upgrade notifications</p>
            <p>• Reward expiry reminders</p>
            <p>• Win-back campaigns</p>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            In Development
          </span>
        </div>
      )}
    </div>
  );
}

