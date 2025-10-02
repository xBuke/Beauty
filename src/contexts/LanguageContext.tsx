'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back! Here\'s what\'s happening at your salon.',
    'dashboard.totalClients': 'Total Clients',
    'dashboard.todayBookings': 'Today\'s Bookings',
    'dashboard.unreadMessages': 'Unread Messages',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.recentBookings': 'Recent Bookings',
    'dashboard.recentMessages': 'Recent Messages',
    'dashboard.topClients': 'Top Clients',
    'dashboard.visits': 'visits',
    'dashboard.bookingsGrowth': 'Bookings Growth (Last 7 Days)',
    
    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.addClient': 'Add Client',
    'quickActions.addBooking': 'Add Booking',
    'quickActions.sendMessage': 'Send Message',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.noNotifications': 'No notifications',
    
    // Pricing
    'pricing.teaser': 'Try full version free for 7 days – Unlock all features',
    'pricing.viewPricing': 'View Pricing',
    
    // Branding
    'branding.title': 'Brand Customization',
    'branding.logo': 'Logo',
    'branding.colors': 'Brand Colors',
    'branding.primary': 'Primary Color',
    'branding.secondary': 'Secondary Color',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.service': 'Service',
    'common.price': 'Price',
    'common.status': 'Status',
    'common.notes': 'Notes',
  },
  hr: {
    // Dashboard
    'dashboard.title': 'Nadzorna ploča',
    'dashboard.welcome': 'Dobrodošli natrag! Evo što se događa u vašem salonu.',
    'dashboard.totalClients': 'Ukupno klijenata',
    'dashboard.todayBookings': 'Današnje rezervacije',
    'dashboard.unreadMessages': 'Nepročitane poruke',
    'dashboard.monthlyRevenue': 'Mjesečni prihod',
    'dashboard.recentBookings': 'Nedavne rezervacije',
    'dashboard.recentMessages': 'Nedavne poruke',
    'dashboard.topClients': 'Najbolji klijenti',
    'dashboard.visits': 'posjeta',
    'dashboard.bookingsGrowth': 'Rast rezervacija (zadnjih 7 dana)',
    
    // Quick Actions
    'quickActions.title': 'Brze akcije',
    'quickActions.addClient': 'Dodaj klijenta',
    'quickActions.addBooking': 'Dodaj rezervaciju',
    'quickActions.sendMessage': 'Pošalji poruku',
    
    // Notifications
    'notifications.title': 'Obavještenja',
    'notifications.noNotifications': 'Nema obavještenja',
    
    // Pricing
    'pricing.teaser': 'Probajte punu verziju besplatno 7 dana – Otključajte sve funkcije',
    'pricing.viewPricing': 'Pogledaj cijene',
    
    // Branding
    'branding.title': 'Prilagodba brenda',
    'branding.logo': 'Logo',
    'branding.colors': 'Boje brenda',
    'branding.primary': 'Glavna boja',
    'branding.secondary': 'Sekundarna boja',
    
    // Common
    'common.close': 'Zatvori',
    'common.save': 'Spremi',
    'common.cancel': 'Odustani',
    'common.confirm': 'Potvrdi',
    'common.name': 'Ime',
    'common.email': 'Email',
    'common.phone': 'Telefon',
    'common.date': 'Datum',
    'common.time': 'Vrijeme',
    'common.service': 'Usluga',
    'common.price': 'Cijena',
    'common.status': 'Status',
    'common.notes': 'Napomene',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
