'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { sevaApi } from '@/lib/api';
import { AdminBooking } from '@/types';
import { format, parseISO } from 'date-fns';

const statusOptions = ['all', 'confirmed', 'completed', 'cancelled', 'pending'];
const paymentOptions = ['all', 'pending', 'completed', 'failed'];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = { page, limit: 20 };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await sevaApi.adminGetBookings(params);
      setBookings(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [page, statusFilter]); // eslint-disable-line

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchBookings(); };

  const updateStatus = async (id: number, status: string) => {
    try {
      await sevaApi.adminUpdateBooking(id, { status });
      toast.success('Booking updated');
      fetchBookings();
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
            <BookOpen size={22} /> Seva Bookings
          </h1>
          <p className="text-gray-500 text-sm">{total} total bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex flex-wrap gap-4 items-end">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, email..."
              className="input-field pl-9 text-sm py-2"
            />
          </div>
          <button type="submit" className="btn-secondary text-sm py-2 px-4">Search</button>
        </form>

        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="input-field text-sm py-2 w-auto"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <div className="animate-spin text-3xl mb-2">⏳</div> Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Booking ID</th>
                  <th className="px-4 py-3 text-left">Devotee</th>
                  <th className="px-4 py-3 text-left">Seva</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Payment</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-temple-maroon font-bold">{b.booking_id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{b.devotee_name}</p>
                      <p className="text-gray-400 text-xs">{b.devotee_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.seva_name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.seva_date ? format(parseISO(b.seva_date), 'dd MMM yyyy') : '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-temple-maroon">
                      ₹{b.total_amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`status-${b.status}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`${b.payment_status === 'completed' ? 'status-completed' : b.payment_status === 'failed' ? 'status-cancelled' : 'status-pending'}`}>
                        {b.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-temple-saffron"
                      >
                        {['confirmed', 'completed', 'cancelled', 'pending'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total}
            </p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn-outline text-xs py-1.5 px-3 disabled:opacity-40">Prev</button>
              <button disabled={page * 20 >= total} onClick={() => setPage(page + 1)} className="btn-outline text-xs py-1.5 px-3 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
