'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Instagram, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Calendar,
  Plus,
  BarChart3,
  Target,
  Zap,
  Clock
} from 'lucide-react';

export default function MarketingPage() {
  const [selectedTab, setSelectedTab] = useState('campaigns');

  // Mock data for marketing campaigns
  const campaigns = [
    {
      id: '1',
      name: 'Summer Glow Special',
      type: 'email',
      status: 'active',
      sent: 1250,
      opened: 456,
      clicked: 89,
      conversions: 23,
      revenue: 2340,
      startDate: '2024-09-15',
      endDate: '2024-10-15'
    },
    {
      id: '2',
      name: 'New Client Welcome Series',
      type: 'sms',
      status: 'active',
      sent: 89,
      opened: 78,
      clicked: 34,
      conversions: 12,
      revenue: 980,
      startDate: '2024-09-01',
      endDate: '2024-12-31'
    },
    {
      id: '3',
      name: 'Instagram Beauty Tips',
      type: 'social',
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      revenue: 0,
      startDate: '2024-10-05',
      endDate: '2024-10-20'
    }
  ];

  const socialMetrics = {
    instagram: {
      followers: 2450,
      engagement: 4.2,
      reach: 12500,
      impressions: 18900
    },
    facebook: {
      followers: 1890,
      engagement: 3.8,
      reach: 8900,
      impressions: 13400
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'social': return <Instagram className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-600">Manage campaigns and track customer engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
            Coming Soon
          </span>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Feature Preview Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Marketing Automation Coming Soon!</h2>
            <p className="text-pink-100 mt-1">
              Advanced marketing tools with n8n integration for email campaigns, SMS marketing, and social media automation.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-pink-100">Expected Launch</p>
            <p className="font-semibold">Q1 2025</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'campaigns', name: 'Campaigns', icon: Target },
            { id: 'analytics', name: 'Analytics', icon: BarChart3 },
            { id: 'automation', name: 'Automation', icon: Zap },
            { id: 'social', name: 'Social Media', icon: Instagram }
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
      {selectedTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <MousePointer className="w-8 h-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.clicked, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${campaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Click Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getCampaignIcon(campaign.type)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-sm text-gray-900">{campaign.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.sent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${campaign.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'social' && (
        <div className="space-y-6">
          {/* Social Media Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
                <Instagram className="w-6 h-6 text-pink-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="text-2xl font-bold text-gray-900">{socialMetrics.instagram.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{socialMetrics.instagram.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reach</p>
                  <p className="text-xl font-semibold text-gray-900">{socialMetrics.instagram.reach.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Impressions</p>
                  <p className="text-xl font-semibold text-gray-900">{socialMetrics.instagram.impressions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Facebook</h3>
                <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">f</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="text-2xl font-bold text-gray-900">{socialMetrics.facebook.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{socialMetrics.facebook.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reach</p>
                  <p className="text-xl font-semibold text-gray-900">{socialMetrics.facebook.reach.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Impressions</p>
                  <p className="text-xl font-semibold text-gray-900">{socialMetrics.facebook.impressions.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Social Media Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Automated Posting</h4>
                    <p className="text-sm text-gray-600">Schedule and auto-post content across platforms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Advanced Analytics</h4>
                    <p className="text-sm text-gray-600">Detailed insights and performance tracking</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Audience Insights</h4>
                    <p className="text-sm text-gray-600">Understand your followers and engagement patterns</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">n8n Integration</h4>
                    <p className="text-sm text-gray-600">Automated workflows for social media management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(selectedTab === 'analytics' || selectedTab === 'automation') && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {selectedTab === 'analytics' ? (
              <BarChart3 className="w-8 h-8 text-gray-400" />
            ) : (
              <Zap className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedTab === 'analytics' ? 'Advanced Analytics' : 'Marketing Automation'}
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedTab === 'analytics' 
              ? 'Detailed campaign analytics and ROI tracking coming soon.'
              : 'Automated marketing workflows with n8n integration coming soon.'
            }
          </p>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            In Development
          </span>
        </div>
      )}
    </div>
  );
}

