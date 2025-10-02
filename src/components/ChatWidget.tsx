'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Calendar, 
  Clock, 
  DollarSign,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { Service } from '@/types';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  bookingData?: {
    service: string;
    date: string;
    time: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [currentStep, setCurrentStep] = useState<'greeting' | 'service' | 'date' | 'time' | 'contact' | 'confirm'>('greeting');
  const [bookingData, setBookingData] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch services for booking
    fetch('/api/services')
      .then(res => res.json())
      .then(setServices)
      .catch(console.error);

    // Initial greeting
    if (messages.length === 0) {
      addBotMessage(
        "Hi! 👋 Welcome to BeautyHub! I'm here to help you with:\n\n• Service information & pricing\n• Booking appointments\n• General inquiries\n\nHow can I assist you today?",
        ['Book Appointment', 'Service Prices', 'Business Hours', 'Contact Info']
      );
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    handleUserInput(option);
  };

  const handleUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (currentStep === 'greeting') {
      if (lowerInput.includes('book') || lowerInput.includes('appointment')) {
        setCurrentStep('service');
        const serviceOptions = services.map(s => `${s.name} - $${s.price}`);
        addBotMessage(
          "Great! I'd love to help you book an appointment. Which service are you interested in?",
          serviceOptions
        );
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        const priceList = services.map(s => `• ${s.name}: $${s.price} (${s.duration} min)`).join('\n');
        addBotMessage(
          `Here are our current service prices:\n\n${priceList}\n\nWould you like to book any of these services?`,
          ['Book Appointment', 'Ask Another Question']
        );
      } else if (lowerInput.includes('hours') || lowerInput.includes('open')) {
        addBotMessage(
          "Our salon hours are:\n\n• Monday - Friday: 9:00 AM - 7:00 PM\n• Saturday: 9:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 5:00 PM\n\nWould you like to book an appointment?",
          ['Book Appointment', 'Ask Another Question']
        );
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('address')) {
        addBotMessage(
          "Here's our contact information:\n\n📞 Phone: (555) 123-BEAUTY\n📧 Email: hello@beautyhub.com\n📍 Address: 123 Beauty Street, Salon City\n\nHow else can I help you?",
          ['Book Appointment', 'Service Prices', 'Ask Another Question']
        );
      } else {
        addBotMessage(
          "I'd be happy to help! Here are some things I can assist you with:",
          ['Book Appointment', 'Service Prices', 'Business Hours', 'Contact Info']
        );
      }
    } else if (currentStep === 'service') {
      const selectedService = services.find(s => input.includes(s.name));
      if (selectedService) {
        setBookingData({ ...bookingData, service: selectedService });
        setCurrentStep('date');
        addBotMessage(
          `Perfect! You've selected ${selectedService.name} ($${selectedService.price}, ${selectedService.duration} minutes).\n\nWhat date would you prefer? Please enter in MM/DD/YYYY format or choose from the options below:`,
          ['Today', 'Tomorrow', 'This Weekend']
        );
      } else {
        addBotMessage(
          "I didn't catch which service you'd like. Please select from our available services:",
          services.map(s => `${s.name} - $${s.price}`)
        );
      }
    } else if (currentStep === 'date') {
      let selectedDate = '';
      if (lowerInput === 'today') {
        selectedDate = new Date().toLocaleDateString();
      } else if (lowerInput === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        selectedDate = tomorrow.toLocaleDateString();
      } else if (lowerInput.includes('weekend')) {
        const saturday = new Date();
        saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
        selectedDate = saturday.toLocaleDateString();
      } else {
        selectedDate = input;
      }
      
      setBookingData({ ...bookingData, date: selectedDate });
      setCurrentStep('time');
      addBotMessage(
        `Great! You've selected ${selectedDate}. What time works best for you?`,
        ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']
      );
    } else if (currentStep === 'time') {
      setBookingData({ ...bookingData, time: input });
      setCurrentStep('contact');
      addBotMessage(
        "Perfect! Now I need your contact information to confirm the booking.\n\nPlease provide your name:",
      );
    } else if (currentStep === 'contact') {
      if (!bookingData.clientName) {
        setBookingData({ ...bookingData, clientName: input });
        addBotMessage("Great! Now please provide your phone number:");
      } else if (!bookingData.clientPhone) {
        setBookingData({ ...bookingData, clientPhone: input });
        addBotMessage("And finally, your email address:");
      } else {
        setBookingData({ ...bookingData, clientEmail: input });
        setCurrentStep('confirm');
        addBotMessage(
          `Perfect! Here's your booking summary:\n\n👤 Name: ${bookingData.clientName}\n💇 Service: ${bookingData.service.name}\n📅 Date: ${bookingData.date}\n⏰ Time: ${bookingData.time}\n💰 Price: $${bookingData.service.price}\n📞 Phone: ${bookingData.clientPhone}\n📧 Email: ${input}\n\nShall I confirm this booking?`,
          ['Confirm Booking', 'Start Over']
        );
      }
    } else if (currentStep === 'confirm') {
      if (lowerInput.includes('confirm')) {
        // TODO: Send booking data to API
        addBotMessage(
          "🎉 Booking confirmed! You'll receive a confirmation SMS and email shortly.\n\nWe're looking forward to seeing you at BeautyHub!\n\nIs there anything else I can help you with?",
          ['Book Another Appointment', 'Ask a Question', 'Close Chat']
        );
        setCurrentStep('greeting');
        setBookingData({});
      } else if (lowerInput.includes('start over')) {
        setCurrentStep('greeting');
        setBookingData({});
        addBotMessage(
          "No problem! Let's start fresh. How can I help you today?",
          ['Book Appointment', 'Service Prices', 'Business Hours', 'Contact Info']
        );
      }
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addUserMessage(inputText);
      handleUserInput(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">BeautyHub Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

