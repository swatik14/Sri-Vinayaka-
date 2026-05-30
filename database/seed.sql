-- ============================================================
-- Sri Vinayaka Ganapathi Temple - Seed Data
-- ============================================================
USE vinayaka_temple;

-- ------------------------------------------------------------
-- Temple Info
-- ------------------------------------------------------------
INSERT INTO temple_info (key_name, value_en, value_kn) VALUES
('temple_name', 'Sri Vinayaka Ganapathi Temple', 'ಶ್ರೀ ವಿನಾಯಕ ಗಣಪತಿ ದೇವಾಲಯ'),
('temple_tagline', 'Seek Blessings of the Elephant God', 'ಗಣೇಶನ ಆಶೀರ್ವಾದ ಪಡೆಯಿರಿ'),
('address_line1', 'Temple Road, Basavanagudi', 'ದೇವಾಲಯ ರಸ್ತೆ, ಬಸವನಗುಡಿ'),
('address_line2', 'Bangalore, Karnataka 560004', 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560004'),
('phone1', '+91 80 2661 0000', '+91 80 2661 0000'),
('phone2', '+91 98765 43210', '+91 98765 43210'),
('email', 'info@srivinayakatemple.org', 'info@srivinayakatemple.org'),
('about_short', 'Sri Vinayaka Ganapathi Temple is one of the most revered temples in Bangalore, dedicated to Lord Ganapathi — the remover of obstacles and the god of new beginnings. Built in the traditional Dravidian architectural style, the temple has been a spiritual beacon for devotees for over 200 years.', 'ಶ್ರೀ ವಿನಾಯಕ ಗಣಪತಿ ದೇವಾಲಯ ಬೆಂಗಳೂರಿನ ಅತ್ಯಂತ ಪ್ರತಿಷ್ಠಿತ ದೇವಾಲಯಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ದ್ರಾವಿಡ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ದೇವಾಲಯ 200 ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲದಿಂದ ಭಕ್ತರಿಗೆ ಆಧ್ಯಾತ್ಮಿಕ ಆಶ್ರಯವಾಗಿದೆ.'),
('founded_year', '1820', '1820'),
('youtube_channel', 'UCxxxxxxxxxxxxxx', 'UCxxxxxxxxxxxxxx');

-- ------------------------------------------------------------
-- Temple Timings
-- ------------------------------------------------------------
INSERT INTO temple_timings (day_type, session_name_en, session_name_kn, open_time, close_time, display_order) VALUES
('weekday', 'Morning Darshan', 'ಬೆಳಗಿನ ದರ್ಶನ', '06:00:00', '12:00:00', 1),
('weekday', 'Evening Darshan', 'ಸಂಜೆಯ ದರ್ಶನ', '17:00:00', '21:00:00', 2),
('weekend', 'Morning Darshan', 'ಬೆಳಗಿನ ದರ್ಶನ', '05:30:00', '13:00:00', 1),
('weekend', 'Evening Darshan', 'ಸಂಜೆಯ ದರ್ಶನ', '16:00:00', '21:30:00', 2),
('holiday', 'All Day Darshan', 'ಸಂಪೂರ್ಣ ದಿನ ದರ್ಶನ', '05:00:00', '22:00:00', 1);

-- ------------------------------------------------------------
-- Darshan Schedule
-- ------------------------------------------------------------
INSERT INTO darshan_schedule (name_en, name_kn, time_label, description_en, description_kn, display_order) VALUES
('Pratah Puja', 'ಪ್ರಾತಃ ಪೂಜೆ', '6:00 AM', 'Morning opening puja with Abhisheka', 'ಅಭಿಷೇಕದೊಂದಿಗೆ ಬೆಳಗಿನ ಪ್ರಾರಂಭ ಪೂಜೆ', 1),
('Uchha Puja', 'ಉಚ್ಚ ಪೂಜೆ', '12:00 PM', 'Noon puja with Naivedya offering', 'ನೈವೇದ್ಯ ಅರ್ಪಣೆಯೊಂದಿಗೆ ಮಧ್ಯಾಹ್ನ ಪೂಜೆ', 2),
('Sandhya Puja', 'ಸಂಧ್ಯಾ ಪೂಜೆ', '6:00 PM', 'Evening puja with Deepa Aradhane', 'ದೀಪ ಆರಾಧನೆಯೊಂದಿಗೆ ಸಂಜೆ ಪೂಜೆ', 3),
('Ratri Puja', 'ರಾತ್ರಿ ಪೂಜೆ', '8:30 PM', 'Night puja before temple closure', 'ದೇವಾಲಯ ಮುಚ್ಚುವ ಮೊದಲು ರಾತ್ರಿ ಪೂಜೆ', 4),
('Mangala Arati', 'ಮಂಗಳ ಆರತಿ', '5:30 AM', 'Auspicious morning Arati (weekends)', 'ಶುಭ ಬೆಳಗಿನ ಆರತಿ (ವಾರಾಂತ್ಯ)', 5);

-- ------------------------------------------------------------
-- Sevas
-- ------------------------------------------------------------
INSERT INTO sevas (name_en, name_kn, description_en, description_kn, price, duration_minutes, max_devotees, category, display_order) VALUES
('Ganapathi Abhisheka', 'ಗಣಪತಿ ಅಭಿಷೇಕ', 'Sacred bathing of the deity with panchamruta (milk, honey, ghee, curd, sugar) with Vedic chanting', 'ವೇದ ಮಂತ್ರಗಳೊಂದಿಗೆ ಪಂಚಾಮೃತ (ಹಾಲು, ಜೇನುತುಪ್ಪ, ತುಪ್ಪ, ಮೊಸರು, ಸಕ್ಕರೆ) ದೊಂದಿಗೆ ದೇವರ ಅಭಿಷೇಕ', 500.00, 45, 10, 'daily', 1),
('Sahasra Modaka Puja', 'ಸಹಸ್ರ ಮೋದಕ ಪೂಜೆ', 'Offering of 1000 modakas (Ganapathi''s favourite sweet) with full puja rituals', '1000 ಮೋದಕಗಳ ಅರ್ಪಣೆ (ಗಣಪತಿಯ ನೆಚ್ಚಿನ ಸಿಹಿ) ಮತ್ತು ಪೂರ್ಣ ಪೂಜಾ ವಿಧಿಗಳು', 1100.00, 60, 5, 'special', 2),
('Ganapathi Homam', 'ಗಣಪತಿ ಹೋಮ', 'Sacred fire ritual performed by Vedic priests for prosperity and obstacle removal', 'ಸಮೃದ್ಧಿ ಮತ್ತು ಅಡೆತಡೆ ನಿವಾರಣೆಗಾಗಿ ವೈದಿಕ ಪುರೋಹಿತರಿಂದ ಪ್ರದರ್ಶಿಸಲಾದ ಪವಿತ್ರ ಅಗ್ನಿ ಆಚರಣೆ', 2100.00, 90, 20, 'special', 3),
('Archana (108 Names)', 'ಅರ್ಚನೆ (108 ನಾಮ)', 'Recitation of 108 names of Lord Ganapathi with flower offerings', 'ಹೂವಿನ ಅರ್ಪಣೆಯೊಂದಿಗೆ ಲಾರ್ಡ್ ಗಣಪತಿಯ 108 ನಾಮಗಳ ಪಠಣ', 101.00, 20, 20, 'daily', 4),
('Maha Ganapathi Puja', 'ಮಹಾ ಗಣಪತಿ ಪೂಜೆ', 'Grand special puja performed on Sankatahara Chaturthi and major occasions', 'ಸಂಕಷ್ಟಹರ ಚತುರ್ಥಿ ಮತ್ತು ಪ್ರಮುಖ ಸಂದರ್ಭಗಳಲ್ಲಿ ನಡೆಸಲಾಗುವ ಭವ್ಯ ವಿಶೇಷ ಪೂಜೆ', 5100.00, 120, 50, 'monthly', 5),
('Pushpa Archana', 'ಪುಷ್ಪ ಅರ್ಚನೆ', 'Decoration and offering of fresh flowers to the deity', 'ದೇವರಿಗೆ ತಾಜಾ ಹೂವುಗಳ ಅಲಂಕಾರ ಮತ್ತು ಅರ್ಪಣೆ', 251.00, 30, 15, 'daily', 6),
('Vahana Puja', 'ವಾಹನ ಪೂಜೆ', 'Special puja for your vehicle with blessings for safe travel', 'ಸುರಕ್ಷಿತ ಪ್ರಯಾಣಕ್ಕಾಗಿ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ನಿಮ್ಮ ವಾಹನಕ್ಕೆ ವಿಶೇಷ ಪೂಜೆ', 301.00, 20, 1, 'special', 7),
('Navagraha Shanti Puja', 'ನವಗ್ರಹ ಶಾಂತಿ ಪೂಜೆ', 'Puja to appease the nine planets for peace and prosperity', 'ಶಾಂತಿ ಮತ್ತು ಸಮೃದ್ಧಿಗಾಗಿ ನವಗ್ರಹಗಳನ್ನು ಸಮಾಧಾನಪಡಿಸಲು ಪೂಜೆ', 1501.00, 75, 10, 'special', 8);

-- ------------------------------------------------------------
-- Donation Purposes
-- ------------------------------------------------------------
INSERT INTO donation_purposes (name_en, name_kn, description_en, description_kn, suggested_amount, display_order) VALUES
('General Donation', 'ಸಾಮಾನ್ಯ ದೇಣಿಗೆ', 'Support the daily operations and maintenance of the temple', 'ದೇವಾಲಯದ ದೈನಂದಿನ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ನಿರ್ವಹಣೆಗೆ ಬೆಂಬಲ', 1000.00, 1),
('Annadana (Free Food Service)', 'ಅನ್ನದಾನ (ಉಚಿತ ಆಹಾರ ಸೇವೆ)', 'Sponsor free meals for devotees and the needy', 'ಭಕ್ತರಿಗೆ ಮತ್ತು ಅಗತ್ಯದಲ್ಲಿರುವವರಿಗೆ ಉಚಿತ ಊಟವನ್ನು ಪ್ರಾಯೋಜಿಸಿ', 2000.00, 2),
('Temple Renovation', 'ದೇವಾಲಯ ನವೀಕರಣ', 'Contribute to the ongoing renovation and beautification of the temple', 'ದೇವಾಲಯದ ನಿರಂತರ ನವೀಕರಣ ಮತ್ತು ಸೌಂದರ್ಯೀಕರಣಕ್ಕೆ ಕೊಡುಗೆ', 5000.00, 3),
('Festival Contribution', 'ಹಬ್ಬದ ಕೊಡುಗೆ', 'Support the grand celebrations of temple festivals', 'ದೇವಾಲಯ ಹಬ್ಬಗಳ ಭವ್ಯ ಆಚರಣೆಗಳಿಗೆ ಬೆಂಬಲ', 1100.00, 4),
('Vedic Education', 'ವೈದಿಕ ಶಿಕ್ಷಣ', 'Fund scholarships for young students of Vedic studies', 'ವೈದಿಕ ಅಧ್ಯಯನದ ಯುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿ ವೇತನ ನಿಧಿ', 3000.00, 5),
('Deepotsava (Lamp Lighting)', 'ದೀಪೋತ್ಸವ (ದೀಪ ಹಚ್ಚುವಿಕೆ)', 'Sponsor the lighting of lamps for one day in the temple', 'ದೇವಾಲಯದಲ್ಲಿ ಒಂದು ದಿನ ದೀಪ ಹಚ್ಚಲು ಪ್ರಾಯೋಜಿಸಿ', 501.00, 6);

-- ------------------------------------------------------------
-- Festivals
-- ------------------------------------------------------------
INSERT INTO festivals (name_en, name_kn, description_en, description_kn, start_date, end_date, is_featured) VALUES
('Ganesh Chaturthi', 'ಗಣೇಶ ಚತುರ್ಥಿ', 'The grand 10-day festival celebrating Lord Ganapathi''s birthday. Grand processions, cultural programs, and elaborate pujas are performed throughout the festival.', '10 ದಿನಗಳ ಗ್ರ್ಯಾಂಡ್ ಉತ್ಸವ ಲಾರ್ಡ್ ಗಣಪತಿಯ ಜನ್ಮದಿನವನ್ನು ಆಚರಿಸುತ್ತದೆ. ಉತ್ಸವದುದ್ದಕ್ಕೂ ಭವ್ಯ ಮೆರವಣಿಗೆಗಳು, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ವಿಸ್ತಾರವಾದ ಪೂಜೆಗಳನ್ನು ನಡೆಸಲಾಗುತ್ತದೆ.', '2025-08-27', '2025-09-05', TRUE),
('Sankatahara Chaturthi', 'ಸಂಕಷ್ಟಹರ ಚತುರ್ಥಿ', 'Monthly puja on the 4th day after full moon, dedicated to removing obstacles and granting blessings', 'ಅಡೆತಡೆ ನಿವಾರಣೆ ಮತ್ತು ಆಶೀರ್ವಾದ ನೀಡಲು ಹುಣ್ಣಿಮೆ ನಂತರ 4ನೇ ದಿನದ ಮಾಸಿಕ ಪೂಜೆ', '2025-06-08', NULL, FALSE),
('Vinayaka Panchami', 'ವಿನಾಯಕ ಪಂಚಮಿ', 'Special celebration on the 5th day of the bright fortnight of Bhadrapada month', 'ಭಾದ್ರಪದ ಮಾಸದ ಶುಕ್ಲ ಪಕ್ಷದ 5ನೇ ದಿನ ವಿಶೇಷ ಆಚರಣೆ', '2025-08-28', NULL, TRUE),
('Karthika Deepotsava', 'ಕಾರ್ತಿಕ ದೀಪೋತ್ಸವ', 'Festival of Lights during Karthika month — thousands of lamps illuminate the temple', 'ಕಾರ್ತಿಕ ಮಾಸದಲ್ಲಿ ಬೆಳಕಿನ ಹಬ್ಬ — ಸಾವಿರಾರು ದೀಪಗಳು ದೇವಾಲಯವನ್ನು ಬೆಳಗಿಸುತ್ತವೆ', '2025-11-12', '2025-11-13', TRUE),
('Rathotsava (Temple Chariot Festival)', 'ರಥೋತ್ಸವ (ದೇವಾಲಯ ರಥ ಉತ್ಸವ)', 'The grand chariot procession where devotees pull the decorated temple chariot through the streets', 'ಭವ್ಯ ರಥ ಮೆರವಣಿಗೆ ಅಲ್ಲಿ ಭಕ್ತರು ಅಲಂಕೃತ ದೇವಾಲಯ ರಥವನ್ನು ಬೀದಿಗಳ ಮೂಲಕ ಎಳೆಯುತ್ತಾರೆ', '2025-12-15', NULL, TRUE),
('Brahmotsava', 'ಬ್ರಹ್ಮೋತ್ಸವ', 'The sacred 7-day annual festival with special sevas, cultural programs, and discourses', '7 ದಿನಗಳ ಪವಿತ್ರ ವಾರ್ಷಿಕ ಉತ್ಸವ ವಿಶೇಷ ಸೇವೆ, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಪ್ರವಚನಗಳೊಂದಿಗೆ', '2026-01-10', '2026-01-16', FALSE);

-- ------------------------------------------------------------
-- Announcements
-- ------------------------------------------------------------
INSERT INTO announcements (title_en, title_kn, content_en, content_kn, type, start_date, end_date, is_active, display_order) VALUES
('Special Abhisheka on Sankatahara Chaturthi', 'ಸಂಕಷ್ಟಹರ ಚತುರ್ಥಿಯಂದು ವಿಶೇಷ ಅಭಿಷೇಕ', 'Special Panchamruta Abhisheka will be performed on June 8, 2025. Devotees are requested to book in advance.', 'ಜೂನ್ 8, 2025 ರಂದು ವಿಶೇಷ ಪಂಚಾಮೃತ ಅಭಿಷೇಕ ನಡೆಯಲಿದೆ. ಭಕ್ತರು ಮುಂಚಿತವಾಗಿ ಬುಕ್ ಮಾಡಲು ಕೋರಲಾಗಿದೆ.', 'festival', '2025-06-01', '2025-06-08', TRUE, 1),
('Temple Will Be Closed for Annual Maintenance', 'ವಾರ್ಷಿಕ ನಿರ್ವಹಣೆಗಾಗಿ ದೇವಾಲಯ ಮುಚ್ಚಲಾಗುತ್ತದೆ', 'The temple will be closed from July 1-3, 2025 for annual maintenance. We apologize for the inconvenience.', 'ವಾರ್ಷಿಕ ನಿರ್ವಹಣೆಗಾಗಿ ಜುಲೈ 1-3, 2025 ರಿಂದ ದೇವಾಲಯ ಮುಚ್ಚಲಾಗುತ್ತದೆ. ಅನಾನುಕೂಲಕ್ಕಾಗಿ ನಾವು ಕ್ಷಮೆ ಕೇಳುತ್ತೇವೆ.', 'closure', '2025-06-25', '2025-07-03', TRUE, 2),
('Online Seva Booking Now Available', 'ಆನ್‌ಲೈನ್ ಸೇವಾ ಬುಕಿಂಗ್ ಈಗ ಲಭ್ಯವಿದೆ', 'Book your sevas online and receive instant confirmation. Visit the Sevas section to book now.', 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ದೃಢೀಕರಣ ಪಡೆಯಿರಿ. ಈಗ ಬುಕ್ ಮಾಡಲು ಸೇವಾ ವಿಭಾಗವನ್ನು ಭೇಟಿ ಮಾಡಿ.', 'general', '2025-06-01', '2025-12-31', TRUE, 3);

-- ------------------------------------------------------------
-- Live Darshan Config
-- ------------------------------------------------------------
INSERT INTO live_darshan_config (youtube_channel_id, youtube_video_id, is_live, schedule_en, schedule_kn) VALUES
('UCxxxxxxxxxxxxxx', 'dQw4w9WgXcQ', FALSE,
'Live Darshan is streamed during morning puja (6:00 AM - 8:00 AM) and evening puja (6:00 PM - 8:00 PM) daily. Special streams during festivals.',
'ಪ್ರತಿದಿನ ಬೆಳಗಿನ ಪೂಜೆ (ಬೆಳ್ಳಿಗ್ಗೆ 6:00 - 8:00) ಮತ್ತು ಸಂಜೆ ಪೂಜೆ (ಸಂಜೆ 6:00 - 8:00) ಸಮಯದಲ್ಲಿ ನೇರ ದರ್ಶನ ಪ್ರಸಾರ ಮಾಡಲಾಗುತ್ತದೆ. ಹಬ್ಬಗಳ ಸಮಯದಲ್ಲಿ ವಿಶೇಷ ಪ್ರಸಾರ.');

-- ------------------------------------------------------------
-- Admin Users (password: Admin@123 - bcrypt hash)
-- Generate fresh hash with: node -e "const bcrypt=require('bcrypt');bcrypt.hash('Admin@123',12).then(console.log)"
-- ------------------------------------------------------------
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@srivinayakatemple.org', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhsVed8uVjhV4M/YQhwqN2', 'Temple Administrator', 'super_admin');
-- Note: Regenerate password hash before production deployment
