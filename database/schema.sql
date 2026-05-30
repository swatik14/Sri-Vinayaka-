-- ============================================================
-- Sri Vinayaka Ganapathi Temple - Database Schema
-- MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS vinayaka_temple CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vinayaka_temple;

-- ------------------------------------------------------------
-- Temple Information (key-value store for site content)
-- ------------------------------------------------------------
CREATE TABLE temple_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  key_name VARCHAR(100) UNIQUE NOT NULL,
  value_en TEXT NOT NULL,
  value_kn TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Temple Timings
-- ------------------------------------------------------------
CREATE TABLE temple_timings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_type ENUM('weekday', 'weekend', 'holiday') NOT NULL,
  session_name_en VARCHAR(100) NOT NULL,
  session_name_kn VARCHAR(100) NOT NULL,
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  display_order INT DEFAULT 0
);

-- ------------------------------------------------------------
-- Daily Darshan Schedule
-- ------------------------------------------------------------
CREATE TABLE darshan_schedule (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(150) NOT NULL,
  name_kn VARCHAR(150) NOT NULL,
  time_label VARCHAR(50) NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- ------------------------------------------------------------
-- Sevas (Puja services)
-- ------------------------------------------------------------
CREATE TABLE sevas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(200) NOT NULL,
  name_kn VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INT DEFAULT 30,
  max_devotees INT DEFAULT 10,
  category ENUM('daily', 'special', 'monthly', 'annual') DEFAULT 'daily',
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Seva Bookings
-- ------------------------------------------------------------
CREATE TABLE seva_bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id VARCHAR(25) UNIQUE NOT NULL,
  seva_id INT NOT NULL,
  devotee_name VARCHAR(200) NOT NULL,
  devotee_email VARCHAR(200) NOT NULL,
  devotee_phone VARCHAR(20) NOT NULL,
  nakshatra VARCHAR(100),
  gotra VARCHAR(100),
  rashi VARCHAR(100),
  booking_date DATE NOT NULL,
  seva_date DATE NOT NULL,
  num_devotees INT DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(200),
  status ENUM('confirmed', 'cancelled', 'completed', 'pending') DEFAULT 'confirmed',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seva_id) REFERENCES sevas(id)
);

-- ------------------------------------------------------------
-- Donations
-- ------------------------------------------------------------
CREATE TABLE donations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  receipt_number VARCHAR(25) UNIQUE NOT NULL,
  donor_name VARCHAR(200) NOT NULL,
  donor_email VARCHAR(200) NOT NULL,
  donor_phone VARCHAR(20) NOT NULL,
  donor_address TEXT,
  pan_number VARCHAR(20),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  purpose_en VARCHAR(200) DEFAULT 'General Donation',
  purpose_kn VARCHAR(200) DEFAULT 'ಸಾಮಾನ್ಯ ದೇಣಿಗೆ',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(200),
  payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  is_anonymous BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Donation Purposes
-- ------------------------------------------------------------
CREATE TABLE donation_purposes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(200) NOT NULL,
  name_kn VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  suggested_amount DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- ------------------------------------------------------------
-- Festivals & Events
-- ------------------------------------------------------------
CREATE TABLE festivals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(200) NOT NULL,
  name_kn VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Gallery
-- ------------------------------------------------------------
CREATE TABLE gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title_en VARCHAR(200),
  title_kn VARCHAR(200),
  description_en TEXT,
  description_kn TEXT,
  file_url VARCHAR(500) NOT NULL,
  file_type ENUM('image', 'video') DEFAULT 'image',
  thumbnail_url VARCHAR(500),
  category ENUM('temple', 'festivals', 'sevas', 'darshan', 'prasad', 'events') DEFAULT 'temple',
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Announcements
-- ------------------------------------------------------------
CREATE TABLE announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title_en VARCHAR(300) NOT NULL,
  title_kn VARCHAR(300) NOT NULL,
  content_en TEXT,
  content_kn TEXT,
  type ENUM('general', 'festival', 'closure', 'special', 'urgent') DEFAULT 'general',
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Admin Users
-- ------------------------------------------------------------
CREATE TABLE admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(200),
  role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  refresh_token VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Live Darshan Config
-- ------------------------------------------------------------
CREATE TABLE live_darshan_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  youtube_channel_id VARCHAR(100),
  youtube_video_id VARCHAR(100),
  is_live BOOLEAN DEFAULT FALSE,
  schedule_en TEXT,
  schedule_kn TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Indexes for performance
-- ------------------------------------------------------------
CREATE INDEX idx_seva_bookings_date ON seva_bookings(seva_date);
CREATE INDEX idx_seva_bookings_status ON seva_bookings(status);
CREATE INDEX idx_seva_bookings_payment ON seva_bookings(payment_status);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_date ON donations(created_at);
CREATE INDEX idx_festivals_date ON festivals(start_date);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_announcements_active ON announcements(is_active, end_date);
