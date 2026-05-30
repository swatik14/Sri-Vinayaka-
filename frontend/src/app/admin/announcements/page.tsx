'use client';

import { useEffect, useState } from 'react';
import { Bell, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/api';
import { Announcement } from '@/types';

interface AnnForm {
  title_en: string; title_kn: string; content_en: string; content_kn: string;
  type: string; start_date: string; end_date: string; is_active: boolean; display_order: number;
}
const empty: AnnForm = { title_en: '', title_kn: '', content_en: '', content_kn: '', type: 'general', start_date: '', end_date: '', is_active: true, display_order: 0 };

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Announcement | null }>({ open: false, editing: null });
  const [form, setForm] = useState<AnnForm>(empty);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try { const res = await adminApi.getAnnouncements(); setItems(res.data.data || []); }
    catch { toast.error('Failed'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const openEdit = (a: Announcement) => {
    setForm({ title_en: a.title_en, title_kn: a.title_kn, content_en: a.content_en || '', content_kn: a.content_kn || '', type: a.type, start_date: '', end_date: a.end_date?.slice(0, 10) || '', is_active: a.is_active, display_order: 0 });
    setModal({ open: true, editing: a });
  };

  const handleSave = async () => {
    if (!form.title_en) return toast.error('Title required');
    setSaving(true);
    try {
      if (modal.editing) { await adminApi.updateAnnouncement(modal.editing.id, form); toast.success('Updated'); }
      else { await adminApi.createAnnouncement(form); toast.success('Created'); }
      setModal({ open: false, editing: null });
      fetch();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this announcement?')) return;
    try { await adminApi.deleteAnnouncement(id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  const typeBadge: Record<string, string> = { general: 'badge-daily', festival: 'badge-special', closure: 'badge-annual', special: 'badge-monthly', urgent: 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full' };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
          <Bell size={22} /> Announcements
        </h1>
        <button onClick={() => { setForm(empty); setModal({ open: true, editing: null }); }} className="btn-primary text-sm">
          <Plus size={15} /> Add Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 divide-y divide-gray-50">
        {loading ? <div className="p-8 text-center text-gray-400">Loading...</div> : items.length === 0 ? (
          <div className="p-8 text-center text-gray-400"><Bell size={40} className="mx-auto mb-3 opacity-30" /> No announcements</div>
        ) : items.map((a) => (
          <div key={a.id} className="px-5 py-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-temple-brown">{a.title_en}</h3>
                <span className={typeBadge[a.type] || typeBadge.general}>{a.type}</span>
                {!a.is_active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
              </div>
              <p className="text-gray-400 text-xs">{a.title_kn}</p>
              {a.content_en && <p className="text-gray-500 text-sm mt-1 line-clamp-1">{a.content_en}</p>}
              {a.end_date && <p className="text-gray-400 text-xs mt-1">Until: {a.end_date.slice(0, 10)}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-temple-maroon text-white px-5 py-4 rounded-t-2xl flex justify-between">
              <h3 className="font-heading font-bold">{modal.editing ? 'Edit' : 'Add'} Announcement</h3>
              <button onClick={() => setModal({ open: false, editing: null })}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Title (English) *</label><input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="input-field" /></div>
                <div><label className="input-label">Title (Kannada) *</label><input value={form.title_kn} onChange={(e) => setForm({ ...form, title_kn: e.target.value })} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Content (English)</label><textarea value={form.content_en} onChange={(e) => setForm({ ...form, content_en: e.target.value })} rows={3} className="input-field resize-none" /></div>
                <div><label className="input-label">Content (Kannada)</label><textarea value={form.content_kn} onChange={(e) => setForm({ ...form, content_kn: e.target.value })} rows={3} className="input-field resize-none" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="input-label">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                    {['general', 'festival', 'closure', 'special', 'urgent'].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="input-label">Start Date</label><input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="input-field" /></div>
                <div><label className="input-label">End Date</label><input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" /></div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium">Active (visible on website)</span>
              </label>
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                  <Check size={16} /> {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setModal({ open: false, editing: null })} className="btn-outline flex-1 justify-center">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
