import React from 'react';
import { 
  HomeIcon, 
  BellIcon, 
  PlusCircleIcon, 
  TableCellsIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'alerts', label: 'All Alerts', icon: TableCellsIcon },
    { id: 'create', label: 'Create Alert', icon: PlusCircleIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
  ];

  return (
    // <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col shadow-lg">
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col shadow-lg overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">FP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Flying Panda</h1>
            <p className="text-xs text-gray-500">Visa Slot Tracker</p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Main Menu
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Stats Summary */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Quick Stats
          </h3>
          <div className="space-y-3 px-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active Alerts</span>
              <span className="font-semibold text-primary-600">24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Today's Updates</span>
              <span className="font-semibold text-green-600">5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pending Actions</span>
              <span className="font-semibold text-yellow-600">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="nav-link"
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button className="nav-link text-red-600 hover:text-red-700 hover:bg-red-50">
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;