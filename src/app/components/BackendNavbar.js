'use client';

import { useTheme } from './ThemeProvider';
import { Moon, Sun, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

const titleMap = {
  '/dashboard': 'Dashboard',
  '/dashboard/problems': 'Problems',
  '/dashboard/features': 'Features',
  '/dashboard/ai-suggestions': 'AI Writing Assistant',
};

export default function BackendNavbar({ user }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const title = titleMap[pathname] || 'Dashboard';

  return (
    <header className="backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 transition-colors duration-500 shadow-sm px-6 py-4 flex items-center justify-between rounded-b-xl border-b dark:border-gray-700">
      <h1 className="text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <span
            className={`absolute top-0.5 left-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white text-yellow-500 dark:text-indigo-300 shadow-md transform transition-transform duration-300 ${
              theme === 'dark' ? 'translate-x-6' : ''
            }`}
          >
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
          </span>
        </button>

        {/* User */}
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
          👋 {user.name}
        </span>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
