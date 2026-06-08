'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);
    try {
      await login(username, password);
      toast.success('Welcome back! 🙏');
      router.push('/admin');
    } catch {
      toast.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-temple-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <span className="absolute text-[400px] font-bold text-white opacity-[0.03] -top-32 -left-32 pointer-events-none select-none">ॐ</span>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-temple-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
            <span className="text-4xl text-temple-maroon font-bold">ॐ</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Karyasiddhi Vinayaka Temple</h1>
          <p className="text-temple-gold text-sm mt-1">Admin Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="font-heading font-bold text-xl text-temple-maroon mb-6 text-center">
            Sign in to Dashboard
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="input-label">Username or Email</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="btn-secondary w-full justify-center py-3 text-base"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
            <strong>Demo credentials:</strong> admin / Admin@123
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-5">
          © {new Date().getFullYear()} Sri Sri Sri Karyasiddhi Vinayaka Temple, Nagdevanahalli
        </p>
      </div>
    </div>
  );
}
