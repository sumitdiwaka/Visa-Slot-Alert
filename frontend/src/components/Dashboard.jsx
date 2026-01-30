import React from 'react';
import { 
  ArrowTrendingUpIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { 
  ChartBarIcon,
  BellAlertIcon
} from '@heroicons/react/24/solid';
import AlertChart from './AlertChart';

const Dashboard = ({ alerts, onViewAlert }) => {
  // Calculate statistics
  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'Active').length,
    booked: alerts.filter(a => a.status === 'Booked').length,
    expired: alerts.filter(a => a.status === 'Expired').length,
    recent: alerts.filter(a => {
      const date = new Date(a.createdAt);
      const now = new Date();
      return (now - date) < 24 * 60 * 60 * 1000; // Last 24 hours
    }).length,
  };

  // Recent alerts
  const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Upcoming deadlines (mock data)
  const upcomingDeadlines = [
    { id: 1, country: 'USA', type: 'Tourist', deadline: '2024-01-15', daysLeft: 3 },
    { id: 2, country: 'UK', type: 'Business', deadline: '2024-01-20', daysLeft: 8 },
    { id: 3, country: 'Canada', type: 'Student', deadline: '2024-01-25', daysLeft: 13 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="gradient-primary rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Sumit! 👋</h1>
            <p className="text-primary-100">
              You have {stats.active} active alerts. {stats.recent > 0 && `${stats.recent} new updates today.`}
            </p>
          </div>
          <div className="hidden md:block">
            <BellAlertIcon className="h-16 w-16 text-white/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
              <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Alerts</div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              Active
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
              {stats.recent} new
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.booked}</div>
          <div className="text-sm text-gray-600">Booked Slots</div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              Urgent
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.expired}</div>
          <div className="text-sm text-gray-600">Expired Alerts</div>
        </div>
      </div>


{/* Charts and Recent Alerts */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Chart - Takes 2/3 width */}
{/* In your Dashboard component, update the chart section */}
<div className="lg:col-span-2 card h-full">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Alert Trends</h3>
      <p className="text-sm text-gray-600">Last 30 days overview</p>
    </div>
    <div className="flex space-x-2">
      <button className="text-sm px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 font-medium">
        30 Days
      </button>
      <button className="text-sm px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100">
        90 Days
      </button>
    </div>
  </div>
  <div className="h-64">
    <AlertChart alerts={alerts} />
  </div>
</div>

  {/* Recent Alerts - Takes 1/3 width */}
  <div className="card">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        <p className="text-sm text-gray-600">Latest alert activities</p>
      </div>
      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
        View All →
      </button>
    </div>
    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
      {recentAlerts.map((alert) => (
        <div 
          key={alert.id}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
          onClick={() => onViewAlert(alert)}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className={`p-2 rounded-lg flex-shrink-0 ${
              alert.status === 'Active' ? 'bg-green-50' :
              alert.status === 'Booked' ? 'bg-blue-50' : 'bg-red-50'
            }`}>
              <MapPinIcon className={`h-4 w-4 ${
                alert.status === 'Active' ? 'text-green-600' :
                alert.status === 'Booked' ? 'text-blue-600' : 'text-red-600'
              }`} />
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 truncate">{alert.country} - {alert.city}</div>
              <div className="text-xs text-gray-500 truncate">{alert.visaType} Visa</div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className={`badge text-xs ${
              alert.status === 'Active' ? 'badge-active' :
              alert.status === 'Booked' ? 'badge-booked' : 'badge-expired'
            }`}>
              {alert.status}
            </div>
            <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
              {new Date(alert.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Bottom Grid - Upcoming & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
              <p className="text-sm text-gray-600">Visa application deadlines</p>
            </div>
            <CalendarDaysIcon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary-50">
                    <GlobeAltIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{deadline.country}</div>
                    <div className="text-sm text-gray-500">{deadline.type} Visa</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    deadline.daysLeft <= 7 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {deadline.daysLeft} days left
                  </div>
                  <div className="text-xs text-gray-500">
                    Due {new Date(deadline.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Country Distribution</h3>
              <p className="text-sm text-gray-600">Alerts by destination</p>
            </div>
            <UserGroupIcon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="space-y-3">
            {['USA', 'UK', 'Canada', 'Australia', 'Germany'].map((country) => {
              const count = alerts.filter(a => a.country === country).length;
              const percentage = alerts.length > 0 ? (count / alerts.length) * 100 : 0;
              return (
                <div key={country} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{country}</span>
                    <span className="text-gray-600">{count} alerts ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;