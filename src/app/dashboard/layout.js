// app/dashboard/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../../../lib/authService';
import Sidebar from '../components/Sidebar';
import BackendNavbar from '../components/BackendNavbar'; 

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => router.push('/login'));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <BackendNavbar user={user} theme={theme} setTheme={setTheme} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}