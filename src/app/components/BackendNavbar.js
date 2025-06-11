// components/BackendNavbar.jsx
'use client';

export default function BackendNavbar({ user, theme, setTheme }) {
  return (
    <header className="bg-white dark:bg-gray-800 transition-colors duration-500 shadow-sm px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">👋 {user.name}</span>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="text-sm px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
