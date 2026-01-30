import React from 'react';
import { 
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const Analytics = ({ alerts }) => {
  // Calculate analytics data
  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.status === 'Active').length;
  const bookedAlerts = alerts.filter(a => a.status === 'Booked').length;
  const expiredAlerts = alerts.filter(a => a.status === 'Expired').length;

  // Country distribution
  const countryDistribution = alerts.reduce((acc, alert) => {
    acc[alert.country] = (acc[alert.country] || 0) + 1;
    return acc;
  }, {});

  // Visa type distribution
  const visaDistribution = alerts.reduce((acc, alert) => {
    acc[alert.visaType] = (acc[alert.visaType] || 0) + 1;
    return acc;
  }, {});

  // Monthly trend (mock data)
  const monthlyTrend = [
    { month: 'Jan', active: 12, booked: 8, expired: 2 },
    { month: 'Feb', active: 15, booked: 10, expired: 3 },
    { month: 'Mar', active: 18, booked: 12, expired: 4 },
    { month: 'Apr', active: 14, booked: 9, expired: 3 },
    { month: 'May', active: 20, booked: 15, expired: 5 },
    { month: 'Jun', active: 22, booked: 18, expired: 6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="input-field">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
          <button className="btn-primary">Export Report</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary-50">
              <ChartBarIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="flex items-center text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalAlerts}</div>
          <div className="text-sm text-gray-600">Total Alerts</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+8%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{activeAlerts}</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+15%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{bookedAlerts}</div>
          <div className="text-sm text-gray-600">Successful Bookings</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-50">
              <GlobeAltIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex items-center text-red-600">
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">-3%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{expiredAlerts}</div>
          <div className="text-sm text-gray-600">Expired Alerts</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Alert Trend</h3>
          <div className="space-y-4">
            {monthlyTrend.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{month.month}</span>
                  <span className="text-gray-600">
                    {month.active + month.booked + month.expired} total alerts
                  </span>
                </div>
                <div className="flex h-6 rounded-lg overflow-hidden">
                  <div 
                    className="bg-primary-500"
                    style={{ width: `${(month.active / 30) * 100}%` }}
                    title={`Active: ${month.active}`}
                  />
                  <div 
                    className="bg-blue-500"
                    style={{ width: `${(month.booked / 30) * 100}%` }}
                    title={`Booked: ${month.booked}`}
                  />
                  <div 
                    className="bg-red-500"
                    style={{ width: `${(month.expired / 30) * 100}%` }}
                    title={`Expired: ${month.expired}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Distribution by Country</h3>
          <div className="space-y-4">
            {Object.entries(countryDistribution).map(([country, count]) => (
              <div key={country} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{country}</span>
                  <span className="text-gray-600">{count} alerts</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    style={{ width: `${(count / totalAlerts) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Visa Type Distribution</h3>
          <div className="space-y-3">
            {Object.entries(visaDistribution).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-600">{type}</span>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{count}</span>
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        type === 'Tourist' ? 'bg-purple-500' :
                        type === 'Business' ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${(count / totalAlerts) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
          <div className="flex flex-col items-center justify-center h-48">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeDasharray={`${(bookedAlerts / totalAlerts) * 251.2} 251.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalAlerts > 0 ? Math.round((bookedAlerts / totalAlerts) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Response Time</span>
              <span className="font-medium text-gray-900">2.4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Alert Accuracy</span>
              <span className="font-medium text-green-600">94.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">User Satisfaction</span>
              <span className="font-medium text-green-600">4.8/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">System Uptime</span>
              <span className="font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;