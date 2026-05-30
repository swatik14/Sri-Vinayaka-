'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Heart, Calendar, TrendingUp, IndianRupee, Users, ArrowUpRight } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { AdminStats } from '@/types';
import { format } from 'date-fns';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center ${color.replace('text-', 'bg-').replace('-600', '-100').replace('-700', '-100')}`}>
          <Icon size={22} className={color} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard()
      .then((r) => setStats(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => <div key={i} className="h-28 bg-white rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-temple-maroon">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Today</p>
          <p className="text-sm font-semibold text-temple-brown">{format(new Date(), 'dd MMM yyyy')}</p>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookOpen}
            label="Total Bookings"
            value={stats.bookings.total}
            sub={`${stats.bookings.confirmed} confirmed`}
            color="text-blue-600"
          />
          <StatCard
            icon={Heart}
            label="Donations Received"
            value={stats.donations.completed}
            sub={`${stats.donations.total} total`}
            color="text-pink-600"
          />
          <StatCard
            icon={IndianRupee}
            label="Total Revenue (₹)"
            value={`₹${(stats.donations.total_amount || 0).toLocaleString('en-IN')}`}
            sub={`₹${(stats.donations.today_amount || 0).toLocaleString('en-IN')} today`}
            color="text-green-600"
          />
          <StatCard
            icon={Calendar}
            label="Upcoming Festivals"
            value={stats.festivals.upcoming}
            sub={`${stats.festivals.total} total`}
            color="text-orange-600"
          />
        </div>
      )}

      {/* Secondary stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending Bookings', value: stats.bookings.payment_pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Cancelled Bookings', value: stats.bookings.cancelled, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Completed Bookings', value: stats.bookings.completed, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Featured Upcoming', value: stats.festivals.featured_upcoming, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 border border-gray-100`}>
              <p className="text-gray-500 text-xs font-medium">{label}</p>
              <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-temple-maroon flex items-center gap-2">
              <BookOpen size={16} /> Recent Bookings
            </h3>
            <a href="/admin/bookings" className="text-temple-saffron text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {stats?.recentBookings.length === 0 ? (
              <p className="p-5 text-center text-gray-400 text-sm">No bookings yet</p>
            ) : (
              stats?.recentBookings.map((b: { booking_id: string; seva_name: string; devotee_name: string; seva_date: string; total_amount: number; status: string }) => (
                <div key={b.booking_id} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-temple-brown truncate">{b.devotee_name}</p>
                    <p className="text-xs text-gray-400 truncate">{b.seva_name} · {b.seva_date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-sm text-temple-maroon">₹{b.total_amount.toLocaleString('en-IN')}</p>
                    <span className={`status-${b.status} text-xs`}>{b.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-temple-maroon flex items-center gap-2">
              <Heart size={16} /> Recent Donations
            </h3>
            <a href="/admin/donations" className="text-temple-saffron text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {stats?.recentDonations.length === 0 ? (
              <p className="p-5 text-center text-gray-400 text-sm">No donations yet</p>
            ) : (
              stats?.recentDonations.map((d: { receipt_number: string; donor_name: string; purpose_en: string; amount: number; payment_status: string }) => (
                <div key={d.receipt_number} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-temple-brown truncate">{d.donor_name}</p>
                    <p className="text-xs text-gray-400 truncate">{d.purpose_en}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-sm text-temple-maroon">₹{d.amount.toLocaleString('en-IN')}</p>
                    <span className={`${d.payment_status === 'completed' ? 'status-completed' : 'status-pending'} text-xs`}>
                      {d.payment_status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
        <h3 className="font-heading font-bold text-temple-maroon mb-4 flex items-center gap-2">
          <TrendingUp size={16} /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/bookings', icon: BookOpen, label: 'View Bookings', color: 'text-blue-600 bg-blue-50' },
            { href: '/admin/donations', icon: Heart, label: 'View Donations', color: 'text-pink-600 bg-pink-50' },
            { href: '/admin/festivals', icon: Calendar, label: 'Add Festival', color: 'text-orange-600 bg-orange-50' },
            { href: '/admin/gallery', icon: Users, label: 'Upload Photos', color: 'text-green-600 bg-green-50' },
          ].map(({ href, icon: Icon, label, color }) => (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-3 p-3 rounded-xl ${color} hover:scale-[1.02] transition-transform`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
