import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertList from './components/AlertList';
import AlertForm from './components/AlertForm';
import Analytics from './components/Analytics';
import { alertService } from './services/api';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAlert, setEditingAlert] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAlerts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 10,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      };

      const response = await alertService.getAll(params);
      
      if (response.pagination) {
        setAlerts(response.data);
        setPagination(response.pagination);
      } else {
        setAlerts(response.data || []);
        setPagination(null);
      }
      
      setCurrentPage(page);
    } catch (err) {
      setError(err.error || 'Failed to fetch alerts');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const handleCreateAlert = async (data) => {
    try {
      await alertService.create(data);
      fetchAlerts();
      setActivePage('alerts');
    } catch (err) {
      setError(err.error || 'Failed to create alert');
    }
  };

  const handleUpdateAlert = async (id, data) => {
    try {
      await alertService.update(id, data);
      fetchAlerts();
      setEditingAlert(null);
      setActivePage('alerts');
    } catch (err) {
      setError(err.error || 'Failed to update alert');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await alertService.updateStatus(id, status);
      fetchAlerts();
    } catch (err) {
      setError(err.error || 'Failed to update status');
    }
  };

  const handleDeleteAlert = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await alertService.delete(id);
        fetchAlerts();
      } catch (err) {
        setError(err.error || 'Failed to delete alert');
      }
    }
  };

  const handleEditAlert = (alert) => {
    setEditingAlert(alert);
    setActivePage('create');
  };

  const handleViewAlert = (alert) => {
    // Could implement a modal or detail view
    console.log('Viewing alert:', alert);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handlePageChange = (page) => {
    if (page >= 1 && (!pagination || page <= pagination.totalPages)) {
      fetchAlerts(page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            alerts={alerts} 
            onViewAlert={handleViewAlert}
          />
        );
      
      case 'alerts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Alerts</h1>
                <p className="text-gray-600">Manage and monitor all visa slot alerts</p>
              </div>
              <button
                onClick={() => setActivePage('create')}
                className="btn-primary flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Alert
              </button>
            </div>
            
            {error && (
              <div className="alert-error">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-600">Error:</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      onClick={() => setError(null)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            <AlertList
              alerts={alerts}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteAlert}
              onEdit={handleEditAlert}
              onView={handleViewAlert}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        );
      
      case 'create':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {editingAlert ? 'Edit Alert' : 'Create New Alert'}
                </h1>
                <p className="text-gray-600">
                  {editingAlert ? 'Update the alert details' : 'Set up a new visa slot alert'}
                </p>
              </div>
              <button
                onClick={() => setActivePage('alerts')}
                className="btn-secondary"
              >
                ← Back to Alerts
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="card">
                  <AlertForm
                    onSubmit={editingAlert ? 
                      (data) => handleUpdateAlert(editingAlert.id, data) : 
                      handleCreateAlert
                    }
                    initialData={editingAlert}
                    isEditing={!!editingAlert}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips & Guidelines</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 mt-0.5">
                        ✓
                      </div>
                      Select the correct visa type for accurate tracking
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 mt-0.5">
                        ✓
                      </div>
                      Choose cities within selected country for valid options
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 mt-0.5">
                        ✓
                      </div>
                      Update status promptly when slots are booked
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 mt-0.5">
                        ✓
                      </div>
                      Set high priority for urgent visa requirements
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Alerts</span>
                      <span className="font-medium text-gray-900">
                        {alerts.filter(a => a.status === 'Active').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avg. Time to Book</span>
                      <span className="font-medium text-gray-900">3.2 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return <Analytics alerts={alerts} />;
      
      case 'notifications':
        return (
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No new notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          </div>
        );
      
      default:
        return <Dashboard alerts={alerts} onViewAlert={handleViewAlert} />;
    }
  };


  // In App.jsx, update the main return statement:

return (
  <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
    <div className="flex">
      {/* Sidebar - Fixed positioning */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
      </div>
      
      {/* Main Content - With sidebar offset */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header 
          onSearch={handleSearch}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {loading && activePage !== 'dashboard' ? (
            <div className="flex items-center justify-center h-64">
              <div className="spinner"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  </div>
);
  // return (
  //   <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
  //     <div className="flex">
  //       {/* Sidebar */}
  //       <Sidebar activePage={activePage} onNavigate={setActivePage} />
        
  //       {/* Main Content */}
  //       <div className="flex-1 ml-64">
  //         <Header 
  //           onSearch={handleSearch}
  //           toggleTheme={toggleTheme}
  //           isDarkMode={isDarkMode}
  //         />
          
  //         <main className="p-8">
  //           {loading && activePage !== 'dashboard' ? (
  //             <div className="flex items-center justify-center h-64">
  //               <div className="spinner"></div>
  //             </div>
  //           ) : (
  //             renderContent()
  //           )}
  //         </main>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;