'use client';

import { useEffect, useState } from 'react';
import { Search, Heart, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import { donationApi } from '@/lib/api';
import { AdminDonation } from '@/types';
import { format, parseISO } from 'date-fns';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<AdminDonation[]>([]);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = { page, limit: 20 };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await donationApi.adminGetAll(params);
      setDonations(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
      setTotalAmount(res.data.summary?.totalAmount || 0);
    } catch {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [page, statusFilter]); // eslint-disable-line

  const updateStatus = async (id: number, payment_status: string) => {
    try {
      await donationApi.adminUpdate(id, { payment_status });
      toast.success('Donation updated');
      fetch();
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
            <Heart size={22} /> Donations
          </h1>
          <p className="text-gray-500 text-sm">{total} total · ₹{totalAmount.toLocaleString('en-IN')} collected</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex items-center gap-2 text-green-700">
          <IndianRupee size={18} />
          <div>
            <p className="text-xs text-green-500">Total Collected</p>
            <p className="font-bold text-lg">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex flex-wrap gap-4 items-end">
        <form onSubmit={(e) => { e.preventDefault(); setPage(1); fetch(); }} className="flex gap-2 flex-1 min-w-[200px]">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, receipt, email..." className="input-field pl-9 text-sm py-2" />
          </div>
          <button type="submit" className="btn-secondary text-sm py-2 px-4">Search</button>
        </form>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="input-field text-sm py-2 w-auto">
          {['all', 'pending', 'completed', 'failed'].map((s) => (
            <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : donations.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Heart size={40} className="mx-auto mb-3 opacity-30" /> No donations found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Receipt #</th>
                  <th className="px-4 py-3 text-left">Donor</th>
                  <th className="px-4 py-3 text-left">Purpose</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-center">Date</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-temple-maroon font-bold">{d.receipt_number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{d.donor_name}</p>
                      <p className="text-gray-400 text-xs">{d.donor_email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate">{d.purpose_en}</td>
                    <td className="px-4 py-3 text-right font-bold text-temple-maroon">₹{d.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-center text-gray-500 text-xs">
                      {d.created_at ? format(parseISO(d.created_at), 'dd MMM yyyy') : '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`${d.payment_status === 'completed' ? 'status-completed' : d.payment_status === 'failed' ? 'status-cancelled' : 'status-pending'}`}>
                        {d.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={d.payment_status}
                        onChange={(e) => updateStatus(d.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-temple-saffron"
                      >
                        {['pending', 'completed', 'failed'].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {total > 20 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total}</p>
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
