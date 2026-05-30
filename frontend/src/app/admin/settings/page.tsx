'use client';

import { useEffect, useState } from 'react';
import { Settings, Save, Youtube, Clock, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { templeApi, authApi } from '@/lib/api';

interface TimingRow { id: number; day_type: string; session_name_en: string; session_name_kn: string; open_time: string; close_time: string; }

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'temple' | 'timings' | 'live' | 'password'>('temple');
  const [templeInfo, setTempleInfo] = useState<Record<string, { en: string; kn: string }>>({});
  const [timings, setTimings] = useState<TimingRow[]>([]);
  const [liveConfig, setLiveConfig] = useState({ youtube_video_id: '', youtube_channel_id: '', is_live: false, schedule_en: '', schedule_kn: '' });
  const [pwdForm, setPwdForm] = useState({ current: '', newpwd: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    templeApi.getInfo().then((r) => setTempleInfo(r.data.data || {}));
    templeApi.getTimings().then((r) => setTimings(r.data.data || []));
    templeApi.getLiveDarshan().then((r) => { if (r.data.data) setLiveConfig(r.data.data); });
  }, []);

  const saveTempleInfo = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(templeInfo).map(([key_name, v]) => ({ key_name, value_en: v.en, value_kn: v.kn }));
      await templeApi.updateInfo(updates);
      toast.success('Temple info saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const saveLive = async () => {
    setSaving(true);
    try { await templeApi.updateLiveDarshan(liveConfig); toast.success('Live config saved'); }
    catch { toast.error('Failed'); }
    finally { setSaving(false); }
  };

  const savePassword = async () => {
    if (!pwdForm.current || !pwdForm.newpwd) return toast.error('Fill both passwords');
    if (pwdForm.newpwd !== pwdForm.confirm) return toast.error('Passwords do not match');
    if (pwdForm.newpwd.length < 8) return toast.error('Password must be at least 8 characters');
    setSaving(true);
    try { await authApi.changePassword(pwdForm.current, pwdForm.newpwd); toast.success('Password changed'); setPwdForm({ current: '', newpwd: '', confirm: '' }); }
    catch { toast.error('Failed — wrong current password?'); }
    finally { setSaving(false); }
  };

  const tabs = [
    { id: 'temple', label: 'Temple Info', icon: Info },
    { id: 'timings', label: 'Timings', icon: Clock },
    { id: 'live', label: 'Live Darshan', icon: Youtube },
    { id: 'password', label: 'Password', icon: Settings },
  ];

  return (
    <div className="space-y-5 max-w-4xl">
      <h1 className="text-2xl font-heading font-bold text-temple-maroon flex items-center gap-2">
        <Settings size={22} /> Settings
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl p-1.5 shadow-card border border-gray-100 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === id ? 'bg-temple-maroon text-white shadow-sm' : 'text-gray-500 hover:text-temple-brown hover:bg-gray-50'}`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Temple Info */}
      {activeTab === 'temple' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-4">
          <h3 className="font-heading font-bold text-temple-maroon">Temple Information</h3>
          {['temple_name', 'temple_tagline', 'address_line1', 'address_line2', 'phone1', 'phone2', 'email'].map((key) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label capitalize">{key.replace(/_/g, ' ')} (EN)</label>
                <input
                  value={templeInfo[key]?.en || ''}
                  onChange={(e) => setTempleInfo({ ...templeInfo, [key]: { en: e.target.value, kn: templeInfo[key]?.kn || '' } })}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="input-label capitalize">{key.replace(/_/g, ' ')} (KN)</label>
                <input
                  value={templeInfo[key]?.kn || ''}
                  onChange={(e) => setTempleInfo({ ...templeInfo, [key]: { en: templeInfo[key]?.en || '', kn: e.target.value } })}
                  className="input-field text-sm"
                  style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}
                />
              </div>
            </div>
          ))}
          <button onClick={saveTempleInfo} disabled={saving} className="btn-primary">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Temple Info'}
          </button>
        </div>
      )}

      {/* Timings */}
      {activeTab === 'timings' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-4">
          <h3 className="font-heading font-bold text-temple-maroon">Temple Timings</h3>
          <div className="space-y-3">
            {timings.map((t, i) => (
              <div key={t.id} className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center p-3 bg-gray-50 rounded-xl">
                <div className="md:col-span-1">
                  <p className="text-xs font-semibold text-gray-500 capitalize">{t.day_type}</p>
                </div>
                <div>
                  <input
                    value={t.session_name_en}
                    onChange={(e) => { const updated = [...timings]; updated[i] = { ...t, session_name_en: e.target.value }; setTimings(updated); }}
                    className="input-field text-sm py-2"
                    placeholder="Session name (EN)"
                  />
                </div>
                <div>
                  <input
                    value={t.open_time}
                    onChange={(e) => { const updated = [...timings]; updated[i] = { ...t, open_time: e.target.value }; setTimings(updated); }}
                    type="time"
                    className="input-field text-sm py-2"
                  />
                </div>
                <div>
                  <input
                    value={t.close_time}
                    onChange={(e) => { const updated = [...timings]; updated[i] = { ...t, close_time: e.target.value }; setTimings(updated); }}
                    type="time"
                    className="input-field text-sm py-2"
                  />
                </div>
                <button
                  onClick={async () => {
                    try { await fetch(`/api/admin/timings/${t.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('admin_token')}` }, body: JSON.stringify(t) }); toast.success('Saved'); }
                    catch { toast.error('Failed'); }
                  }}
                  className="btn-secondary text-xs py-2"
                >
                  <Save size={13} /> Save
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Darshan */}
      {activeTab === 'live' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-4">
          <h3 className="font-heading font-bold text-temple-maroon">Live Darshan Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">YouTube Video ID</label>
              <input value={liveConfig.youtube_video_id} onChange={(e) => setLiveConfig({ ...liveConfig, youtube_video_id: e.target.value })} className="input-field" placeholder="e.g. dQw4w9WgXcQ" />
            </div>
            <div>
              <label className="input-label">YouTube Channel ID</label>
              <input value={liveConfig.youtube_channel_id} onChange={(e) => setLiveConfig({ ...liveConfig, youtube_channel_id: e.target.value })} className="input-field" placeholder="UCxxxxxxxxxxxxxx" />
            </div>
          </div>
          <div>
            <label className="input-label">Schedule Description (English)</label>
            <textarea value={liveConfig.schedule_en} onChange={(e) => setLiveConfig({ ...liveConfig, schedule_en: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
          <div>
            <label className="input-label">Schedule Description (Kannada)</label>
            <textarea value={liveConfig.schedule_kn} onChange={(e) => setLiveConfig({ ...liveConfig, schedule_kn: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setLiveConfig({ ...liveConfig, is_live: !liveConfig.is_live })}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${liveConfig.is_live ? 'bg-red-500' : 'bg-gray-300'} relative`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${liveConfig.is_live ? 'left-6' : 'left-0.5'} shadow`} />
            </div>
            <span className={`text-sm font-medium ${liveConfig.is_live ? 'text-red-600' : 'text-gray-500'}`}>
              {liveConfig.is_live ? '🔴 Currently LIVE' : '⚫ Currently Offline'}
            </span>
          </label>
          <button onClick={saveLive} disabled={saving} className="btn-primary">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Live Config'}
          </button>
        </div>
      )}

      {/* Password */}
      {activeTab === 'password' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-4 max-w-md">
          <h3 className="font-heading font-bold text-temple-maroon">Change Password</h3>
          <div>
            <label className="input-label">Current Password</label>
            <input type="password" value={pwdForm.current} onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="input-label">New Password</label>
            <input type="password" value={pwdForm.newpwd} onChange={(e) => setPwdForm({ ...pwdForm, newpwd: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="input-label">Confirm New Password</label>
            <input type="password" value={pwdForm.confirm} onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })} className="input-field" />
          </div>
          <button onClick={savePassword} disabled={saving} className="btn-primary">
            <Save size={16} /> {saving ? 'Saving...' : 'Change Password'}
          </button>
        </div>
      )}
    </div>
  );
}
