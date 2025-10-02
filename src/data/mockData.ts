import { Client, Service, Booking, Message, Notification } from '@/types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    phone: '+1 (555) 123-4567',
    lastVisit: '2024-09-28',
    totalVisits: 12,
    preferredServices: ['Haircut & Style', 'Hair Color'],
    notes: 'Prefers natural colors, allergic to ammonia'
  },
  {
    id: '2',
    name: 'Sofia Rodriguez',
    email: 'sofia.r@email.com',
    phone: '+1 (555) 234-5678',
    lastVisit: '2024-09-30',
    totalVisits: 8,
    preferredServices: ['Gel Manicure', 'Pedicure'],
    notes: 'Regular customer, books monthly'
  },
  {
    id: '3',
    name: 'Olivia Chen',
    email: 'olivia.chen@email.com',
    phone: '+1 (555) 345-6789',
    lastVisit: '2024-09-25',
    totalVisits: 15,
    preferredServices: ['Makeup Application', 'Eyebrow Shaping'],
    notes: 'Wedding makeup specialist requests'
  },
  {
    id: '4',
    name: 'Isabella Williams',
    email: 'bella.w@email.com',
    phone: '+1 (555) 456-7890',
    totalVisits: 3,
    preferredServices: ['Facial Treatment'],
    notes: 'New client, sensitive skin'
  },
  {
    id: '5',
    name: 'Mia Thompson',
    email: 'mia.thompson@email.com',
    phone: '+1 (555) 567-8901',
    lastVisit: '2024-10-01',
    totalVisits: 6,
    preferredServices: ['Balayage', 'Deep Conditioning'],
    notes: 'Prefers afternoon appointments'
  }
];

export const mockServices: Service[] = [
  { id: '1', name: 'Haircut & Style', duration: 60, price: 65, category: 'hair' },
  { id: '2', name: 'Hair Color', duration: 120, price: 120, category: 'hair' },
  { id: '3', name: 'Balayage', duration: 180, price: 180, category: 'hair' },
  { id: '4', name: 'Deep Conditioning', duration: 45, price: 35, category: 'hair' },
  { id: '5', name: 'Gel Manicure', duration: 45, price: 40, category: 'nails' },
  { id: '6', name: 'Pedicure', duration: 60, price: 50, category: 'nails' },
  { id: '7', name: 'Nail Art', duration: 30, price: 25, category: 'nails' },
  { id: '8', name: 'Makeup Application', duration: 60, price: 80, category: 'makeup' },
  { id: '9', name: 'Eyebrow Shaping', duration: 30, price: 30, category: 'makeup' },
  { id: '10', name: 'Facial Treatment', duration: 75, price: 90, category: 'skincare' },
  { id: '11', name: 'Chemical Peel', duration: 90, price: 120, category: 'skincare' }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Emma Johnson',
    serviceId: '1',
    serviceName: 'Haircut & Style',
    date: '2024-10-03',
    time: '10:00',
    duration: 60,
    price: 65,
    status: 'confirmed',
    notes: 'Regular trim, layers'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Sofia Rodriguez',
    serviceId: '5',
    serviceName: 'Gel Manicure',
    date: '2024-10-03',
    time: '14:00',
    duration: 45,
    price: 40,
    status: 'confirmed'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Olivia Chen',
    serviceId: '8',
    serviceName: 'Makeup Application',
    date: '2024-10-04',
    time: '16:00',
    duration: 60,
    price: 80,
    status: 'pending',
    notes: 'Evening event makeup'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Isabella Williams',
    serviceId: '10',
    serviceName: 'Facial Treatment',
    date: '2024-10-05',
    time: '11:00',
    duration: 75,
    price: 90,
    status: 'confirmed'
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Mia Thompson',
    serviceId: '3',
    serviceName: 'Balayage',
    date: '2024-10-06',
    time: '09:00',
    duration: 180,
    price: 180,
    status: 'confirmed'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    clientName: 'Emma Johnson',
    clientContact: '+1 (555) 123-4567',
    platform: 'whatsapp',
    message: 'Hi! I need to reschedule my appointment for tomorrow. Can we move it to Friday?',
    timestamp: '2024-10-02T14:30:00Z',
    isRead: false,
    type: 'booking'
  },
  {
    id: '2',
    clientName: 'New Customer',
    clientContact: 'sarah.m@email.com',
    platform: 'facebook',
    message: 'Hello! Do you offer bridal makeup packages? I\'m getting married next month.',
    timestamp: '2024-10-02T13:15:00Z',
    isRead: false,
    type: 'inquiry'
  },
  {
    id: '3',
    clientName: 'Sofia Rodriguez',
    clientContact: '+1 (555) 234-5678',
    platform: 'sms',
    message: 'Thank you for the amazing manicure yesterday! Already booking my next appointment 💅',
    timestamp: '2024-10-02T10:45:00Z',
    isRead: true,
    type: 'general'
  },
  {
    id: '4',
    clientName: 'Jessica Lee',
    clientContact: '@jessicalee_beauty',
    platform: 'instagram',
    message: 'Saw your latest hair transformation post! What\'s the price for balayage?',
    timestamp: '2024-10-02T09:20:00Z',
    isRead: false,
    type: 'inquiry'
  },
  {
    id: '5',
    clientName: 'Olivia Chen',
    clientContact: '+1 (555) 345-6789',
    platform: 'chat',
    message: 'Hi! Can I add eyebrow shaping to my makeup appointment on Friday?',
    timestamp: '2024-10-02T08:30:00Z',
    isRead: true,
    type: 'booking'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Booking Request',
    message: 'Olivia Chen requested to add eyebrow shaping to Friday appointment',
    type: 'booking',
    timestamp: '2024-10-02T08:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'New Message',
    message: 'Emma Johnson wants to reschedule tomorrow\'s appointment',
    type: 'message',
    timestamp: '2024-10-02T14:30:00Z',
    isRead: false
  },
  {
    id: '3',
    title: 'Appointment Reminder',
    message: 'Sofia Rodriguez has an appointment in 2 hours',
    type: 'reminder',
    timestamp: '2024-10-02T12:00:00Z',
    isRead: true
  }
];

