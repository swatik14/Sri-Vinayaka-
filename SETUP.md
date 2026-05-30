# Sri Vinayaka Ganapathi Temple Website — Setup Guide

## Project Structure

```
Vinayaka Temple Website/
├── frontend/          ← Next.js 14 + TypeScript + Tailwind CSS
├── backend/           ← Node.js + Express + TypeScript
├── database/          ← MySQL schema + seed data
├── .env.example       ← Environment variable template
├── docker-compose.yml ← Docker setup (optional)
└── SETUP.md           ← This file
```

---

## Prerequisites

- Node.js 18+
- MySQL 8.0+ (local or Docker)
- npm or yarn

---

## Step 1: Database Setup

### Option A — MySQL locally

```sql
-- In MySQL client:
CREATE DATABASE vinayaka_temple CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Run schema and seed:
mysql -u root -p vinayaka_temple < database/schema.sql
mysql -u root -p vinayaka_temple < database/seed.sql
```

### Option B — Docker

```bash
docker-compose up mysql -d
# Wait ~30 seconds for MySQL to initialize with schema + seed
```

---

## Step 2: Backend Setup

```bash
cd backend
npm install

# Configure environment
cp ../.env.example .env
# Edit .env — set your DB_PASSWORD, DB_USER etc.

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

### Regenerate Admin Password Hash

The default admin password is `Admin@123`. To change it:

```bash
cd backend
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('YourNewPassword',12).then(h=>console.log(h))"
# Copy the output hash
```

Then update in MySQL:
```sql
UPDATE admin_users SET password_hash = '<new_hash>' WHERE username = 'admin';
```

---

## Step 3: Frontend Setup

```bash
cd frontend
npm install

# .env.local is already created
# Edit if your backend runs on a different port

npm run dev
# App runs on http://localhost:3000
```

---

## Access Points

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Main temple website |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:5000/health | Backend health check |
| http://localhost:5000/api/sevas | Sevas API |

### Admin Login
- **Username:** `admin`
- **Password:** `Admin@123`
- ⚠️ Change this immediately in production!

---

## Pages Overview

### Public Website
| Page | Route |
|------|-------|
| Home | `/` |
| About Temple | `/about` |
| Lord Ganapathi | `/lord-ganapathi` |
| Sevas & Booking | `/sevas` |
| Festivals | `/festivals` |
| Gallery | `/gallery` |
| Donations | `/donations` |
| Live Darshan | `/live-darshan` |
| Contact | `/contact` |

### Admin Dashboard
| Page | Route |
|------|-------|
| Login | `/admin/login` |
| Dashboard | `/admin` |
| Seva Bookings | `/admin/bookings` |
| Donations | `/admin/donations` |
| Festivals | `/admin/festivals` |
| Gallery | `/admin/gallery` |
| Announcements | `/admin/announcements` |
| Settings | `/admin/settings` |

---

## API Endpoints

### Public
```
GET  /api/temple/info
GET  /api/temple/timings
GET  /api/temple/darshan
GET  /api/temple/announcements
GET  /api/temple/live-darshan
GET  /api/sevas
POST /api/sevas/book
GET  /api/sevas/booking/:bookingId
GET  /api/donations/purposes
POST /api/donations
GET  /api/donations/receipt/:receiptNumber
GET  /api/festivals
GET  /api/gallery
```

### Admin (requires JWT token)
```
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/change-password
GET  /api/admin/dashboard
GET  /api/admin/announcements
POST /api/admin/announcements
PUT  /api/admin/announcements/:id
DELETE /api/admin/announcements/:id
GET  /api/sevas/admin/bookings
PATCH /api/sevas/admin/bookings/:id
GET  /api/donations/admin
PATCH /api/donations/admin/:id
GET  /api/festivals/admin/all
POST /api/festivals/admin
PUT  /api/festivals/admin/:id
GET  /api/gallery/admin/all
POST /api/gallery/admin
DELETE /api/gallery/admin/:id
PUT  /api/temple/info
PUT  /api/temple/live-darshan
```

---

## Features

### Seva Booking System
- Booking ID format: `SVB-YYYYMMDD-XXXXX`
- Email confirmation (requires email setup)
- Track via booking ID

### Donation System
- Receipt number format: `DON-YYYYMMDD-XXXXX`
- 80G tax benefit tracking
- Anonymous donation support

### Bilingual Support
- English / Kannada toggle
- All content stored in both languages
- Language preference saved in localStorage

### Live Darshan
- YouTube embed integration
- Live/Offline status toggle from admin

---

## Production Deployment (AWS)

### Recommended Stack
- **Frontend**: AWS Amplify or EC2 + Nginx
- **Backend**: EC2 + PM2 or Elastic Beanstalk
- **Database**: Amazon RDS (MySQL 8.0)
- **Assets**: S3 + CloudFront CDN
- **Domain**: Route 53

### Production Checklist
- [ ] Change JWT_SECRET to a strong random value
- [ ] Regenerate admin password hash
- [ ] Set NODE_ENV=production
- [ ] Configure SSL/HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure email (SMTP/SES) for booking confirmations
- [ ] Integrate payment gateway (Razorpay/PayU)
- [ ] Replace placeholder YouTube channel ID
- [ ] Upload actual temple images to S3
- [ ] Set up database backups

---

## Customization

### Colors (tailwind.config.js)
```js
temple: {
  maroon: '#6B1A1A',     // Primary dark
  saffron: '#FF9A00',    // Accent orange
  gold: '#D4AF37',       // Gold accents
  cream: '#FFF8F0',      // Background
}
```

### Adding Sevas
Use the admin panel or directly insert into the `sevas` table.

### Adding Gallery Photos
Admin Panel → Gallery → Add Photo/Video → Paste image URL

---

## Support

For issues or questions, contact: info@srivinayakatemple.org

**ॐ गण गणपतये नमः** — May Lord Ganapathi bless this digital service! 🙏
