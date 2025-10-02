'use client';

import { useState } from 'react';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingPage() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small salons just getting started',
      price: { monthly: 29, yearly: 290 },
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Up to 50 clients',
        'Basic booking management',
        'SMS notifications',
        'Basic reporting',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for growing salons with advanced needs',
      price: { monthly: 59, yearly: 590 },
      icon: Star,
      color: 'from-pink-500 to-purple-600',
      popular: true,
      features: [
        'Up to 200 clients',
        'Advanced booking system',
        'Multi-platform messaging',
        'Advanced analytics',
        'Marketing tools',
        'Priority support',
        'Custom branding'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large salons and salon chains',
      price: { monthly: 99, yearly: 990 },
      icon: Crown,
      color: 'from-purple-500 to-indigo-600',
      features: [
        'Unlimited clients',
        'Multi-location support',
        'Advanced automation',
        'Custom integrations',
        'White-label solution',
        'Dedicated account manager',
        'Custom training'
      ]
    }
  ];

  const addOns = [
    {
      name: 'WhatsApp Business API',
      price: 15,
      description: 'Official WhatsApp Business integration'
    },
    {
      name: 'Advanced Analytics',
      price: 25,
      description: 'Detailed insights and custom reports'
    },
    {
      name: 'Loyalty Program',
      price: 20,
      description: 'Customer loyalty and rewards system'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Start your 7-day free trial. No credit card required.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Save 17%
            </span>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg border-2 ${
              plan.popular ? 'border-pink-500' : 'border-gray-200'
            } overflow-hidden`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-ons</h2>
          <p className="text-gray-600">Enhance your salon management with these optional features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                <span className="text-2xl font-bold text-gray-900">${addon.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{addon.description}</p>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Add to Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
            <p className="text-gray-600">No setup fees. Start your free trial and begin using BeautyHub immediately.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time. No long-term contracts required.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Salon?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of salon owners who trust BeautyHub to grow their business
        </p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors">
          Start Your Free Trial
        </button>
        <p className="text-sm mt-4 opacity-75">No credit card required • 7-day free trial</p>
      </div>
    </div>
  );
}
