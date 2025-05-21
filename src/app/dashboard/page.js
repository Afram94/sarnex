// app/dashboard/page.js
export default function DashboardHome() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard 👋</h2>
      <p className="text-gray-600">Use the sidebar to explore your features.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-lg">Posts</h3>
          <p className="text-sm text-blue-800">Manage blog posts and articles.</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-lg">Settings</h3>
          <p className="text-sm text-green-800">Customize your dashboard preferences.</p>
        </div>
      </div>
    </div>
  );
}
