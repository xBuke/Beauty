'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { mockTodayBookings } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingCalendar() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayBookings = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockTodayBookings.filter(booking => booking.date === dateStr);
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = getDayBookings(day);
      const todayClass = isToday(day) ? 'bg-pink-50 border-pink-200' : '';
      
      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${todayClass}`}>
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday(day) ? 'text-pink-600' : 'text-gray-900'}`}>
              {day}
            </span>
            {dayBookings.length > 0 && (
              <span className="text-xs bg-pink-100 text-pink-600 px-1 rounded">
                {dayBookings.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayBookings.slice(0, 2).map((booking, index) => (
              <div key={index} className="text-xs bg-pink-500 text-white px-1 py-0.5 rounded truncate">
                {booking.time} {booking.clientName}
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div className="text-xs text-gray-500">+{dayBookings.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Booking Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {renderCalendarDays()}
        </div>
        
        {/* Today's Schedule */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Today's Schedule
          </h3>
          <div className="space-y-2">
            {mockTodayBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.clientName}</p>
                    <p className="text-xs text-gray-600">{booking.serviceName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                  <p className="text-xs text-gray-600">${booking.price}</p>
                </div>
              </div>
            ))}
            {mockTodayBookings.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No bookings for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
