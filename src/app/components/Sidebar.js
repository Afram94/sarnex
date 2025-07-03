'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  Sparkles,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/problems', label: 'Problems', icon: Lightbulb },
  { href: '/dashboard/features', label: 'Features', icon: FileText },
  {
    href: '/dashboard/ai-suggestions',
    label: 'AI Writing Assistant',
    icon: Sparkles,
    special: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar */}
      <aside
        className={`
          h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm
          flex flex-col
          transition-[width] duration-500 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Header */}
        <div
          className={`py-6 transition-all duration-500 ${
            collapsed ? 'px-2' : 'px-6'
          }`}
        >
          {!collapsed && (
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 transition-opacity duration-300">
              Sarnex Digital
            </h2>
          )}
        </div>

        {/* Nav */}
        <nav className={`flex-1 space-y-2 transition-all duration-500 ${collapsed ? 'px-1' : 'px-4'}`}>
          {navItems.map(({ href, label, icon: Icon, special }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center transition-all duration-500 ease-in-out
                  ${collapsed ? 'justify-center' : 'gap-3 justify-start px-3'}
                  py-3 rounded-xl text-sm font-medium whitespace-nowrap overflow-hidden group
                  ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                  ${
                    special
                      ? 'border border-indigo-300 dark:border-indigo-700 bg-indigo-50/60 dark:bg-indigo-800/50 shadow-sm backdrop-blur-lg'
                      : ''
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span
                  className={`transition-opacity duration-300 ${
                    collapsed ? 'opacity-0 w-0' : 'opacity-100 ml-1'
                  }`}
                >
                  {label}
                </span>
              </Link>

            );
          })}
        </nav>
      </aside>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`
          absolute top-[40%] -right-4 z-10 transform transition-all duration-300
          bg-indigo-600 text-white p-2 rounded-full shadow-md
          hover:scale-110 hover:bg-indigo-700
          ring-2 ring-indigo-300 dark:ring-indigo-700
        `}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
      </button>
    </div>
  );
}
