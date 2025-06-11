// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/summary`).then(res => setSummary(res.data.summary));
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/trend`).then(res => setTrend(res.data.trend));
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/top-pages`).then(res => setTopPages(res.data.topPages));
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/realtime`).then(res => setCountries(res.data.active_users_realtime));

    // Watch for theme changes via class on <html>
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summary && (
          <>
            <SummaryCard label="Sessions" value={summary.sessions} />
            <SummaryCard label="Page Views" value={summary.pageViews} />
            <SummaryCard label="Avg. Session Duration" value={summary.avgSessionDuration} />
          </>
        )}
      </div>

      {/* Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Active Users Trend</h2>
        {trend.length > 0 && (
          <ApexChart
            type="line"
            height={300}
            series={[{
              name: 'Active Users',
              data: trend.map(t => t.users),
            }]}
            options={{
              chart: { id: 'trend-line', background: 'transparent' },
              xaxis: { categories: trend.map(t => t.date), labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } } },
              yaxis: { labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } } },
              tooltip: { theme },
              stroke: { curve: 'smooth' },
              theme: { mode: theme },
              colors: ['#6366f1']
            }}
          />
        )}
      </div>

      {/* Top Countries Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Top Countries (Realtime)</h2>
        {countries.length > 0 && (
          <ApexChart
            type="bar"
            height={300}
            series={[{
              name: 'Users',
              data: countries.map(c => c.users),
            }]}
            options={{
              chart: { id: 'top-countries', background: 'transparent' },
              xaxis: {
                categories: countries.map(c => c.country),
                labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } }
              },
              yaxis: {
                labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } }
              },
              tooltip: { theme },
              theme: { mode: theme },
              colors: ['#10b981'],
            }}
          />
        )}
      </div>

      {/* Top Pages Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b">
              <th className="pb-2">Page</th>
              <th className="pb-2">Views</th>
              <th className="pb-2">Conversion</th>
              <th className="pb-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((page, i) => (
              <tr key={i} className="border-b last:border-0 border-gray-200 dark:border-gray-700">
                <td className="py-2 text-indigo-700 dark:text-indigo-300">{page.path}</td>
                <td className="py-2">{page.views.toLocaleString()}</td>
                <td className="py-2">{(Math.random() * 10 + 5).toFixed(1)}%</td>
                <td className="py-2">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                    Organic
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h3 className="text-sm text-gray-500 dark:text-gray-300">{label}</h3>
      <p className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mt-1">{value}</p>
    </div>
  );
}
