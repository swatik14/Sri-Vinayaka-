'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/admin/Sidebar';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { admin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !admin && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [admin, isLoading, pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-temple-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-4 animate-float">ॐ</div>
          <p className="text-temple-gold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 lg:ml-60 min-h-screen overflow-auto">
        <div className="p-4 lg:p-6 pt-16 lg:pt-6">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
