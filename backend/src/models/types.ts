export interface TempleInfo {
  id: number;
  key_name: string;
  value_en: string;
  value_kn: string;
  updated_at: Date;
}

export interface TempleTiming {
  id: number;
  day_type: 'weekday' | 'weekend' | 'holiday';
  session_name_en: string;
  session_name_kn: string;
  open_time: string;
  close_time: string;
  display_order: number;
}

export interface DarshanSchedule {
  id: number;
  name_en: string;
  name_kn: string;
  time_label: string;
  description_en: string;
  description_kn: string;
  display_order: number;
  is_active: boolean;
}

export interface Seva {
  id: number;
  name_en: string;
  name_kn: string;
  description_en: string;
  description_kn: string;
  price: number;
  duration_minutes: number;
  max_devotees: number;
  category: 'daily' | 'special' | 'monthly' | 'annual';
  image_url: string | null;
  is_available: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface SevaBooking {
  id: number;
  booking_id: string;
  seva_id: number;
  seva_name_en?: string;
  seva_name_kn?: string;
  devotee_name: string;
  devotee_email: string;
  devotee_phone: string;
  nakshatra: string | null;
  gotra: string | null;
  rashi: string | null;
  booking_date: Date;
  seva_date: Date;
  num_devotees: number;
  total_amount: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string | null;
  transaction_id: string | null;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  special_requests: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Donation {
  id: number;
  receipt_number: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  donor_address: string | null;
  pan_number: string | null;
  amount: number;
  currency: string;
  purpose_en: string;
  purpose_kn: string;
  payment_method: string | null;
  transaction_id: string | null;
  payment_status: 'pending' | 'completed' | 'failed';
  is_anonymous: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Festival {
  id: number;
  name_en: string;
  name_kn: string;
  description_en: string;
  description_kn: string;
  start_date: Date;
  end_date: Date | null;
  start_time: string | null;
  end_time: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GalleryItem {
  id: number;
  title_en: string | null;
  title_kn: string | null;
  description_en: string | null;
  description_kn: string | null;
  file_url: string;
  file_type: 'image' | 'video';
  thumbnail_url: string | null;
  category: 'temple' | 'festivals' | 'sevas' | 'darshan' | 'prasad' | 'events';
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Announcement {
  id: number;
  title_en: string;
  title_kn: string;
  content_en: string | null;
  content_kn: string | null;
  type: 'general' | 'festival' | 'closure' | 'special' | 'urgent';
  start_date: Date | null;
  end_date: Date | null;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalDonations: number;
  totalDonationAmount: number;
  upcomingFestivals: number;
  recentBookings: SevaBooking[];
  recentDonations: Donation[];
}
