export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit?: string;
  totalVisits: number;
  preferredServices: string[];
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category: 'hair' | 'nails' | 'makeup' | 'skincare';
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  clientName: string;
  clientContact: string;
  platform: 'whatsapp' | 'facebook' | 'instagram' | 'sms' | 'chat';
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'inquiry' | 'booking' | 'complaint' | 'general';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'message' | 'reminder';
  timestamp: string;
  isRead: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}

