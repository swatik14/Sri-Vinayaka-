export type Language = 'en' | 'kn';

export interface TempleInfo {
  [key: string]: { en: string; kn: string };
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

export interface DarshanItem {
  id: number;
  name_en: string;
  name_kn: string;
  time_label: string;
  description_en: string;
  description_kn: string;
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
}

export interface SevaBookingForm {
  seva_id: number;
  devotee_name: string;
  devotee_email: string;
  devotee_phone: string;
  nakshatra?: string;
  gotra?: string;
  rashi?: string;
  seva_date: string;
  num_devotees: number;
  special_requests?: string;
}

export interface SevaBookingResult {
  booking_id: string;
  seva_name_en: string;
  seva_name_kn: string;
  devotee_name: string;
  devotee_email: string;
  seva_date: string;
  num_devotees: number;
  total_amount: number;
  status: string;
}

export interface DonationForm {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  donor_address?: string;
  pan_number?: string;
  amount: number;
  purpose_en: string;
  purpose_kn: string;
  is_anonymous: boolean;
  notes?: string;
}

export interface DonationResult {
  receipt_number: string;
  donor_name: string;
  amount: number;
  purpose_en: string;
  payment_status: string;
}

export interface DonationPurpose {
  id: number;
  name_en: string;
  name_kn: string;
  description_en: string;
  description_kn: string;
  suggested_amount: number;
}

export interface Festival {
  id: number;
  name_en: string;
  name_kn: string;
  description_en: string;
  description_kn: string;
  start_date: string;
  end_date: string | null;
  start_time: string | null;
  image_url: string | null;
  is_featured: boolean;
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
  category: string;
  is_featured: boolean;
}

export interface Announcement {
  id: number;
  title_en: string;
  title_kn: string;
  content_en: string | null;
  content_kn: string | null;
  type: 'general' | 'festival' | 'closure' | 'special' | 'urgent';
  end_date: string | null;
}

export interface LiveDarshan {
  youtube_channel_id: string;
  youtube_video_id: string;
  is_live: boolean;
  schedule_en: string;
  schedule_kn: string;
}

export interface AdminStats {
  bookings: {
    total: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    payment_pending: number;
  };
  donations: {
    total: number;
    completed: number;
    total_amount: number;
    today_amount: number;
  };
  festivals: {
    total: number;
    upcoming: number;
    featured_upcoming: number;
  };
  recentBookings: AdminBooking[];
  recentDonations: AdminDonation[];
  charts: {
    monthlyBookings: { month: string; count: number; revenue: number }[];
    monthlyDonations: { month: string; count: number; amount: number }[];
  };
}

export interface AdminBooking {
  id: number;
  booking_id: string;
  seva_name: string;
  devotee_name: string;
  devotee_email: string;
  devotee_phone: string;
  seva_date: string;
  num_devotees: number;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
}

export interface AdminDonation {
  id: number;
  receipt_number: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  purpose_en: string;
  payment_status: string;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'editor';
}
