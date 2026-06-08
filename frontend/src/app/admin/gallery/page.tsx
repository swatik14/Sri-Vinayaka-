'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Trash2, X, Check, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { galleryApi } from '@/lib/api';
import { GalleryItem } from '@/types';

interface GalleryForm {
  title_en: string; title_kn: string; file_url: string;
  file_type: 'image' | 'video'; category: string; is_featured: boolean;
}

const empty: GalleryForm = { title_en: '', title_kn: '', file_url: '', file_type: 'image', category: 'temple', is_featured: false };
const categories = ['temple', 'festivals', 'sevas', 'darshan', 'prasad', 'events'];

export default function AdminGalleryPage() {
  const [items, setItems]           = useState<GalleryItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [modal, setModal]           = useState(false);
  const [editId, setEditId]         = useState<number | null>(null);
  const [form, setForm]             = useState<GalleryForm>(empty);
  const [saving, setSaving]         = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const load = async () => {
    setLoading(true);
    try { const res = await galleryApi.adminGetAll(); setItems(res.data.data || []); }
    catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setModal(true); };

  const openEdit = (item: GalleryItem) => {
    setForm({
      title_en: item.title_en || '', title_kn: item.title_kn || '',
      file_url: item.file_url, file_type: (item.file_type as 'image' | 'video') || 'image',
      category: item.category || 'temple', is_featured: !!item.is_featured,
    });
    setEditId(item.id);
    setModal(true);
  };

  const handleSave = async () => {
    if (!form.file_url) return toast.error('File URL is required');
    setSaving(true);
    try {
      if (editId) {
        await galleryApi.adminUpdate(editId, { ...form, thumbnail_url: form.file_url, is_active: true, display_order: 0 });
        toast.success('Photo updated');
      } else {
        await galleryApi.adminCreate(form);
        toast.success('Photo added');
      }
      setModal(false); setForm(empty); setEditId(null); load();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try { await galleryApi.adminDelete(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed'); }
  };

  const canShowImage = (url: string) => url.startsWith('http') || url.startsWith('/');

  const filtered = activeCategory === 'all' ? items : items.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
          <ImageIcon size={22} /> Gallery Management
        </h1>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus size={15} /> Add Photo/Video
        </button>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700">
        <strong>Tip:</strong> To use local images, save the file to{' '}
        <code className="bg-blue-100 px-1 rounded">frontend/public/images/</code> and enter the URL as{' '}
        <code className="bg-blue-100 px-1 rounded">/images/filename.jpg</code>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-temple-maroon text-white' : 'bg-white text-temple-brown border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400 shadow-card">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-30" /> No gallery items
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:border-temple-gold transition-colors">
              {canShowImage(item.file_url) ? (
                <Image src={item.thumbnail_url || item.file_url} alt={item.title_en || ''} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <ImageIcon size={32} className="text-gray-300" />
                  <p className="text-xs text-gray-400 text-center px-2 break-all">{item.file_url.slice(0, 40)}...</p>
                </div>
              )}
              {item.is_featured && (
                <div className="absolute top-2 left-2 bg-temple-gold text-temple-brown text-[10px] font-bold px-2 py-0.5 rounded-full">★</div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3">
                <p className="text-white text-xs font-medium text-center truncate w-full">{item.title_en || 'Untitled'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-temple-maroon text-white px-5 py-4 rounded-t-2xl flex justify-between items-center">
              <h3 className="font-heading font-bold">{editId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
              <button onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Title (English)</label>
                  <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Title (Kannada)</label>
                  <input value={form.title_kn} onChange={(e) => setForm({ ...form, title_kn: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Image URL *</label>
                <input
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  className="input-field"
                  placeholder="/images/filename.jpg  or  https://..."
                />
                <p className="text-xs text-gray-400 mt-1">Use <code>/images/filename.jpg</code> for local images</p>
              </div>

              {/* Live preview */}
              {form.file_url && canShowImage(form.file_url) && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-100 border">
                  <Image src={form.file_url} alt="preview" fill className="object-cover" unoptimized />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Type</label>
                  <select value={form.file_type} onChange={(e) => setForm({ ...form, file_type: e.target.value as 'image' | 'video' })} className="input-field">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium">Feature on homepage</span>
              </label>
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                  <Check size={16} /> {saving ? 'Saving...' : editId ? 'Update' : 'Add to Gallery'}
                </button>
                <button onClick={() => setModal(false)} className="btn-outline flex-1 justify-center">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
