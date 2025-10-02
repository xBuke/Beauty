# BeautyHub - Salon Management SaaS Demo

A comprehensive salon management system built with Next.js, featuring customer communication, booking management, and CRM functionality.

## 🌟 Features

### ✅ Implemented Features

- **📊 Dashboard** - Overview of salon metrics, recent bookings, and client activity
- **👥 CRM System** - Complete client management with contact info, visit history, and preferences
- **💬 Chat Widget** - Interactive booking assistant for customers with service inquiries
- **📥 Unified Inbox** - Centralized messaging from WhatsApp, Facebook, Instagram, and SMS
- **📅 Booking System** - Calendar view and list management for appointments
- **🔔 Notifications** - Real-time alerts for new bookings and messages
- **⚙️ Settings** - Profile, security, and integration configuration

### 🚀 Coming Soon (Roadmap)

- **📈 Marketing Campaigns** - Email, SMS, and social media automation
- **💎 Loyalty Program** - Points, tiers, rewards, and retention tracking
- **📊 Advanced Analytics** - Revenue tracking, customer insights, and ROI metrics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **Date Handling**: date-fns
- **TypeScript**: Full type safety

## 🔗 n8n Integration Ready

The application includes placeholder comments and webhook endpoints for n8n integration:

- **Incoming Messages**: `/api/messages` - Webhook endpoint for WhatsApp, Facebook, Instagram, SMS
- **Booking Sync**: `/api/bookings` - Automated booking confirmations and reminders
- **Notifications**: Email, SMS, and push notification workflows
- **Marketing**: Campaign automation and customer segmentation

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
beautyhub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes for data management
│   │   ├── bookings/          # Booking management page
│   │   ├── clients/           # CRM client management
│   │   ├── messages/          # Unified inbox
│   │   ├── notifications/     # Notification center
│   │   ├── marketing/         # Marketing campaigns (preview)
│   │   ├── loyalty/           # Loyalty program (preview)
│   │   └── settings/          # Application settings
│   ├── components/            # Reusable React components
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Header.tsx         # Top navigation bar
│   │   └── ChatWidget.tsx     # Customer chat widget
│   ├── data/                  # Mock data for demo
│   │   └── mockData.ts        # Sample clients, bookings, messages
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Shared interfaces
```

## 🎯 API Endpoints

- `GET /api/clients` - Fetch all clients
- `POST /api/clients` - Create new client
- `GET /api/bookings` - Fetch all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings` - Update booking
- `GET /api/messages` - Fetch all messages
- `POST /api/messages` - Create new message (n8n webhook)
- `PATCH /api/messages` - Mark message as read
- `GET /api/services` - Fetch available services
- `GET /api/notifications` - Fetch notifications
- `PATCH /api/notifications` - Update notification status

## 🔧 n8n Webhook Configuration

### Incoming Messages Webhook
```
POST /api/messages
Content-Type: application/json

{
  "clientName": "Customer Name",
  "clientContact": "phone/email/@username",
  "platform": "whatsapp|facebook|instagram|sms",
  "message": "Message content",
  "type": "inquiry|booking|complaint|general"
}
```

### Booking Confirmation Webhook
```
POST /api/bookings
Content-Type: application/json

{
  "clientId": "client_id",
  "clientName": "Client Name",
  "serviceId": "service_id",
  "serviceName": "Service Name",
  "date": "2024-10-03",
  "time": "14:00",
  "duration": 60,
  "price": 85
}
```

## 🎨 Features Showcase

### Chat Widget
- Interactive booking flow
- Service price inquiries
- Contact information collection
- Appointment scheduling
- Business hours and contact info

### Unified Inbox
- Multi-platform message management
- WhatsApp, Facebook, Instagram, SMS integration
- Message categorization (booking, inquiry, complaint)
- Reply functionality with platform routing
- Read/unread status tracking

### CRM Dashboard
- Client contact management
- Visit history and preferences
- Service tracking
- VIP client identification
- Search and filtering

### Booking System
- Calendar and list views
- Time slot availability
- Booking status management
- Service and pricing integration
- Client assignment

## 🔮 Future Enhancements

### Marketing Automation
- Email campaign management
- SMS marketing campaigns
- Social media post scheduling
- Customer segmentation
- ROI tracking and analytics

### Loyalty Program
- Points-based reward system
- Tier-based benefits (Bronze, Silver, Gold, Platinum)
- Automated reward notifications
- Retention campaign triggers
- Customer lifetime value tracking

### Advanced Analytics
- Revenue and profit tracking
- Customer acquisition metrics
- Service performance analysis
- Staff productivity insights
- Predictive analytics for booking trends

## 📝 License

This is a demo application for showcasing salon management system capabilities.

## 🤝 Contributing

This is a demo project. For production use, consider:
- Database integration (PostgreSQL, MongoDB)
- Authentication system (NextAuth.js, Auth0)
- Real-time updates (WebSockets, Server-Sent Events)
- File upload handling (images, documents)
- Payment processing integration
- Advanced security measures
- Performance optimizations
- Testing suite (Jest, Cypress)

---

**BeautyHub** - Transforming salon management with modern technology 💅✨

