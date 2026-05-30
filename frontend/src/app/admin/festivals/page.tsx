'use client';

import { useEffect, useState } from 'react';
import { Calendar, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { festivalApi } from '@/lib/api';
import { Festival } from '@/types';
import { format, parseISO } from 'date-fns';

interface FestivalForm {
  name_en: string; name_kn: string;
  description_en: string; description_kn: string;
  start_date: string; end_date: string;
  image_url: string; is_featured: boolean; is_active: boolean;
}

const empty: FestivalForm = { name_en: '', name_kn: '', description_en: '', description_kn: '', start_date: '', end_date: '', image_url: '', is_featured: false, is_active: true };

export default function AdminFestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Festival | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FestivalForm>(empty);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await festivalApi.adminGetAll();
      setFestivals(res.data.data || []);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setModal({ open: true, editing: null }); };
  const openEdit = (f: Festival) => {
    setForm({ name_en: f.name_en, name_kn: f.name_kn, description_en: f.description_en, description_kn: f.description_kn, start_date: f.start_date.slice(0, 10), end_date: f.end_date?.slice(0, 10) || '', image_url: f.image_url || '', is_featured: f.is_featured, is_active: true });
    setModal({ open: true, editing: f });
  };

  const handleSave = async () => {
    if (!form.name_en || !form.start_date) return toast.error('Name and start date required');
    setSaving(true);
    try {
      if (modal.editing) {
        await festivalApi.adminUpdate(modal.editing.id, form);
        toast.success('Festival updated');
      } else {
        await festivalApi.adminCreate(form);
        toast.success('Festival created');
      }
      setModal({ open: false, editing: null });
      fetch();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deactivate this festival?')) return;
    try { await festivalApi.adminDelete(id); toast.success('Festival deactivated'); fetch(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
          <Calendar size={22} /> Festivals & Events
        </h1>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus size={15} /> Add Festival
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {festivals.map((f) => (
              <div key={f.id} className="px-5 py-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-temple-maroon text-white flex flex-col items-center justify-center flex-shrink-0 text-center">
                  <p className="text-lg font-bold text-temple-gold">{format(parseISO(f.start_date), 'd')}</p>
                  <p className="text-[10px] text-white/70">{format(parseISO(f.start_date), 'MMM')}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-temple-brown truncate">{f.name_en}</h3>
                    {f.is_featured && <span className="badge-special">Featured</span>}
                  </div>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{f.description_en?.slice(0, 80)}...</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(f)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(f.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {festivals.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" /> No festivals yet
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-temple-maroon text-white px-5 py-4 rounded-t-2xl flex justify-between">
              <h3 className="font-heading font-bold">{modal.editing ? 'Edit Festival' : 'Add Festival'}</h3>
              <button onClick={() => setModal({ open: false, editing: null })}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Name (English) *</label>
                  <input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="input-field" placeholder="Festival name" />
                </div>
                <div>
                  <label className="input-label">Name (Kannada) *</label>
                  <input value={form.name_kn} onChange={(e) => setForm({ ...form, name_kn: e.target.value })} className="input-field" placeholder="ಹಬ್ಬದ ಹೆಸರು" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Description (English)</label>
                  <textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} className="input-field resize-none" />
                </div>
                <div>
                  <label className="input-label">Description (Kannada)</label>
                  <textarea value={form.description_kn} onChange={(e) => setForm({ ...form, description_kn: e.target.value })} rows={3} className="input-field resize-none" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Start Date *</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="input-label">End Date</label>
                  <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="input-field" placeholder="https://..." />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium text-temple-brown">Featured festival</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                  <Check size={16} /> {saving ? 'Saving...' : 'Save Festival'}
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
