import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { 
  BellAlertIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

const Header = ({ onSearch, toggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const notifications = [
    { id: 1, text: 'New slot available for USA Tourist visa', time: '5 min ago', read: false },
    { id: 2, text: 'Your alert for UK Business visa was triggered', time: '1 hour ago', read: true },
    { id: 3, text: 'Weekly report is ready', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
 // Change the header container classes:
<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts, countries, or visa types..."
                value={searchQuery}
                onChange={handleSearch}
                className="input-field pl-12 pr-4 w-full"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <BellIcon className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification dropdown would go here */}
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <ChartBarIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">85%</div>
                  <div className="text-gray-500">Success Rate</div>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">SU</span>
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-gray-900">Sumit Kumar</div>
                <div className="text-sm text-gray-500">Admin</div>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;