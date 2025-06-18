'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { RotateCcw } from 'lucide-react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function formatDate(rawDate) {
  const year = rawDate.slice(0, 4);
  const month = rawDate.slice(4, 6);
  const day = rawDate.slice(6, 8);
  return `${year}-${month}-${day}`;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState('light');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [summaryRes, trendRes, pagesRes, realtimeRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/summary`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/trend`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/top-pages`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/realtime`),
      ]);

      setSummary(summaryRes.data.summary);
      setTrend(trendRes.data.trend);
      setTopPages(pagesRes.data.topPages);
      setCountries(realtimeRes.data.active_users_realtime);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching analytics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 150000);

    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics Overview</h1>
        <div className="flex items-center gap-4 text-sm">
          <p className="text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
          >
            <RotateCcw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {summary && (
          <>
            <SummaryCard label="Sessions" value={summary.sessions} description="User visits. 1 person browsing counts as 1 session." />
            <SummaryCard label="Page Views" value={summary.pageViews} description="Number of page loads including refreshes." />
            <SummaryCard label="Avg. Session Duration" value={summary.avgSessionDuration} description="Avg time spent per session." />
            <SummaryCard label="Event Count" value={summary.eventCount} description="Total number of triggered events." />
            <SummaryCard label="New Users" value={summary.newUsers} description="First-time visitors in the selected period." />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-2">Active Users Trend</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Users visiting per day for the past 7 days.</p>
          {trend.length > 0 && (
            <ApexChart
              type="line"
              height={300}
              series={[{ name: 'Active Users', data: trend.map(t => t.users) }]}
              options={{
                chart: { background: 'transparent' },
                xaxis: {
                  categories: trend.map(t => formatDate(t.date)),
                  labels: {
                    style: {
                      colors: theme === 'dark' ? '#d1d5db' : '#374151',
                    },
                  },
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                },
                yaxis: { labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } } },
                tooltip: { theme },
                stroke: { curve: 'smooth' },
                theme: { mode: theme },
                colors: ['#6366f1']
              }}
            />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-2">Active Users by Country (Realtime)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Realtime active users split by country.</p>
          {countries.length > 0 && (
            <ApexChart
              type="bar"
              height={300}
              series={[{ name: 'Users', data: countries.map(c => c.users) }]}
              options={{
                chart: { background: 'transparent' },
                xaxis: {
                  categories: countries.map(c => c.country),
                  labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } }
                },
                yaxis: { labels: { style: { colors: theme === 'dark' ? '#d1d5db' : '#374151' } } },
                tooltip: { theme },
                theme: { mode: theme },
                colors: ['#10b981']
              }}
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Top Pages</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Most visited pages in the last 30 days.</p>
        <table className="min-w-[600px] w-full text-sm">
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

function SummaryCard({ label, value, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h3 className="text-sm text-gray-500 dark:text-gray-300">{label}</h3>
      <p className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mt-1">{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </div>
  );
}
