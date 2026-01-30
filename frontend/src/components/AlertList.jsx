// import React, { useState } from 'react';
// import {
//     ChevronLeftIcon,
//     ChevronRightIcon,
//     FunnelIcon,
//     AdjustmentsHorizontalIcon,
//     ArrowsUpDownIcon,
//     EyeIcon,
//     PencilIcon,
//     TrashIcon,
//     CheckCircleIcon,
//     XCircleIcon,
//     ClockIcon
// } from '@heroicons/react/24/outline';
// import { STATUS_COLORS } from '../utils/constants';

// const AlertList = ({ alerts, onUpdateStatus, onDelete, onEdit, onView, pagination, onPageChange }) => {
//     const [selectedAlerts, setSelectedAlerts] = useState([]);
//     const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//     const handleStatusUpdate = (id, newStatus) => {
//         onUpdateStatus(id, newStatus);
//     };

//     const handleSelectAlert = (id) => {
//         setSelectedAlerts(prev =>
//             prev.includes(id)
//                 ? prev.filter(alertId => alertId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectedAlerts.length === alerts.length) {
//             setSelectedAlerts([]);
//         } else {
//             setSelectedAlerts(alerts.map(alert => alert.id));
//         }
//     };

//     const handleSort = (key) => {
//         setSortConfig(prev => ({
//             key,
//             direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//         }));
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const now = new Date();
//         const diffTime = Math.abs(now - date);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         if (diffDays === 1) return 'Yesterday';
//         if (diffDays < 7) return `${diffDays} days ago`;
//         return date.toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             year: 'numeric'
//         });
//     };

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case 'Active':
//                 return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
//             case 'Booked':
//                 return <ClockIcon className="h-4 w-4 text-blue-500" />;
//             case 'Expired':
//                 return <XCircleIcon className="h-4 w-4 text-red-500" />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="space-y-6">
//             {/* Toolbar */}
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                     <div className="relative">
//                         <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Filter alerts..."
//                             className="input-field pl-10"
//                         />
//                     </div>
//                     <button className="btn-outline flex items-center">
//                         <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
//                         Advanced Filters
//                     </button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                     {selectedAlerts.length > 0 && (
//                         <div className="text-sm text-gray-600">
//                             {selectedAlerts.length} selected
//                         </div>
//                     )}
//                     <button className="btn-primary">
//                         Export Data
//                     </button>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="card overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="w-12 px-6 py-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedAlerts.length === alerts.length && alerts.length > 0}
//                                         onChange={handleSelectAll}
//                                         className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
//                                     />
//                                 </th>
//                                 <th
//                                     className="table-header cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSort('country')}
//                                 >
//                                     <div className="flex items-center">
//                                         Country
//                                         <ArrowsUpDownIcon className="h-3 w-3 ml-1" />
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="table-header cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSort('city')}
//                                 >
//                                     <div className="flex items-center">
//                                         City
//                                         <ArrowsUpDownIcon className="h-3 w-3 ml-1" />
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="table-header cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSort('visaType')}
//                                 >
//                                     <div className="flex items-center">
//                                         Visa Type
//                                         <ArrowsUpDownIcon className="h-3 w-3 ml-1" />
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="table-header cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSort('status')}
//                                 >
//                                     <div className="flex items-center">
//                                         Status
//                                         <ArrowsUpDownIcon className="h-3 w-3 ml-1" />
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="table-header cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSort('createdAt')}
//                                 >
//                                     <div className="flex items-center">
//                                         Created
//                                         <ArrowsUpDownIcon className="h-3 w-3 ml-1" />
//                                     </div>
//                                 </th>
//                                 <th className="table-header">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {alerts.map((alert) => (
//                                 <tr
//                                     key={alert.id}
//                                     className={`hover:bg-gray-50 transition-colors ${selectedAlerts.includes(alert.id) ? 'bg-primary-50' : ''
//                                         }`}
//                                 >
//                                     <td className="px-6 py-4">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedAlerts.includes(alert.id)}
//                                             onChange={() => handleSelectAlert(alert.id)}
//                                             className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
//                                         />
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className="flex items-center">
//                                             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-3">
//                                                 <span className="text-white text-xs font-bold">
//                                                     {alert.country.substring(0, 2)}
//                                                 </span>
//                                             </div>
//                                             <div>
//                                                 <div className="font-medium text-gray-900">{alert.country}</div>
//                                                 <div className="text-xs text-gray-500">Code: {alert.country.substring(0, 3).toUpperCase()}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className="flex items-center">
//                                             <div className="p-2 rounded-lg bg-gray-50 mr-3">
//                                                 <span className="text-gray-600">📍</span>
//                                             </div>
//                                             <span className="font-medium text-gray-900">{alert.city}</span>
//                                         </div>
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className={`px-3 py-1 rounded-full text-sm font-medium ${alert.visaType === 'Tourist' ? 'bg-purple-100 text-purple-800' :
//                                                 alert.visaType === 'Business' ? 'bg-amber-100 text-amber-800' :
//                                                     'bg-cyan-100 text-cyan-800'
//                                             }`}>
//                                             {alert.visaType}
//                                         </div>
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className="flex items-center space-x-3">
//                                             <div className={`badge ${STATUS_COLORS[alert.status]} flex items-center space-x-1`}>
//                                                 {getStatusIcon(alert.status)}
//                                                 <span>{alert.status}</span>
//                                             </div>
//                                             <select
//                                                 value={alert.status}
//                                                 onChange={(e) => handleStatusUpdate(alert.id, e.target.value)}
//                                                 className="text-sm border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
//                                             >
//                                                 <option value="Active">Active</option>
//                                                 <option value="Booked">Booked</option>
//                                                 <option value="Expired">Expired</option>
//                                             </select>
//                                         </div>
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className="text-sm text-gray-900">{formatDate(alert.createdAt)}</div>
//                                         <div className="text-xs text-gray-500">
//                                             {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </div>
//                                     </td>
//                                     <td className="table-cell">
//                                         <div className="flex items-center space-x-2">
//                                             <button
//                                                 onClick={() => onView(alert)}
//                                                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                                                 title="View Details"
//                                             >
//                                                 <EyeIcon className="h-4 w-4 text-gray-600" />
//                                             </button>
//                                             <button
//                                                 onClick={() => onEdit(alert)}
//                                                 className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
//                                                 title="Edit"
//                                             >
//                                                 <PencilIcon className="h-4 w-4 text-blue-600" />
//                                             </button>
//                                             <button
//                                                 onClick={() => onDelete(alert.id)}
//                                                 className="p-2 rounded-lg hover:bg-red-50 transition-colors"
//                                                 title="Delete"
//                                             >
//                                                 <TrashIcon className="h-4 w-4 text-red-600" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {pagination && (
//                     <div className="px-6 py-4 border-t border-gray-200">
//                         <div className="flex items-center justify-between">
//                             <div className="text-sm text-gray-700">
//                                 Showing <span className="font-semibold">{pagination.totalItems > 0 ? (pagination.currentPage - 1) * 10 + 1 : 0}</span> to{' '}
//                                 <span className="font-semibold">
//                                     {Math.min(pagination.currentPage * 10, pagination.totalItems)}
//                                 </span>{' '}
//                                 of <span className="font-semibold">{pagination.totalItems}</span> alerts
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <button
//                                     onClick={() => onPageChange(pagination.currentPage - 1)}
//                                     disabled={!pagination.hasPreviousPage}
//                                     className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     <ChevronLeftIcon className="h-4 w-4 mr-1" />
//                                     Previous
//                                 </button>
//                                 <div className="flex items-center space-x-1">
//                                     {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
//                                         const pageNum = i + 1;
//                                         return (
//                                             <button
//                                                 key={pageNum}
//                                                 onClick={() => onPageChange(pageNum)}
//                                                 className={`w-8 h-8 rounded-lg text-sm font-medium ${pagination.currentPage === pageNum
//                                                         ? 'bg-primary-600 text-white'
//                                                         : 'text-gray-600 hover:bg-gray-100'
//                                                     }`}
//                                             >
//                                                 {pageNum}
//                                             </button>
//                                         );
//                                     })}
//                                     {pagination.totalPages > 5 && (
//                                         <>
//                                             <span className="text-gray-400">...</span>
//                                             <button
//                                                 onClick={() => onPageChange(pagination.totalPages)}
//                                                 className={`w-8 h-8 rounded-lg text-sm font-medium ${pagination.currentPage === pagination.totalPages
//                                                         ? 'bg-primary-600 text-white'
//                                                         : 'text-gray-600 hover:bg-gray-100'
//                                                     }`}
//                                             >
//                                                 {pagination.totalPages}
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                                 <button
//                                     onClick={() => onPageChange(pagination.currentPage + 1)}
//                                     disabled={!pagination.hasNextPage}
//                                     className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     Next
//                                     <ChevronRightIcon className="h-4 w-4 ml-1" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AlertList;


import React, { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { STATUS_COLORS } from '../utils/constants';

const AlertList = ({ alerts, onUpdateStatus, onDelete, onEdit, onView, pagination, onPageChange }) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [statusUpdateId, setStatusUpdateId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleStatusUpdate = (id, currentStatus) => {
    setStatusUpdateId(id);
    setNewStatus(currentStatus);
  };

  const confirmStatusUpdate = () => {
    if (statusUpdateId && newStatus) {
      onUpdateStatus(statusUpdateId, newStatus);
      setStatusUpdateId(null);
      setNewStatus('');
    }
  };

  const handleSelectAlert = (id) => {
    setSelectedAlerts(prev =>
      prev.includes(id)
        ? prev.filter(alertId => alertId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts.length === alerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(alerts.map(alert => alert.id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'Booked':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case 'Expired':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Mobile Card View for smaller screens
  const renderMobileCard = (alert) => (
    <div key={alert.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {alert.country.substring(0, 2)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{alert.country}</div>
              <div className="text-xs text-gray-500">Code: {alert.country.substring(0, 3).toUpperCase()}</div>
            </div>
          </div>
          <div className="ml-10">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">📍</span>
              <span className="text-sm text-gray-700">{alert.city}</span>
            </div>
          </div>
        </div>
        <div className={`badge ${STATUS_COLORS[alert.status]} flex items-center space-x-1`}>
          {getStatusIcon(alert.status)}
          <span className="text-xs">{alert.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Visa Type</div>
          <div className={`px-2 py-1 rounded text-xs font-medium inline-block ${
            alert.visaType === 'Tourist' ? 'bg-purple-100 text-purple-800' :
            alert.visaType === 'Business' ? 'bg-amber-100 text-amber-800' :
            'bg-cyan-100 text-cyan-800'
          }`}>
            {alert.visaType}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Created</div>
          <div className="text-sm text-gray-900">{formatDate(alert.createdAt)}</div>
          <div className="text-xs text-gray-500">
            {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex space-x-3">
          <button
            onClick={() => onView(alert)}
            className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
          >
            <EyeIcon className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={() => onEdit(alert)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => onDelete(alert.id)}
            className="text-red-600 hover:text-red-800 text-sm flex items-center"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
        <div>
          <select
            value={alert.status}
            onChange={(e) => onUpdateStatus(alert.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
          >
            <option value="Active">Active</option>
            <option value="Booked">Booked</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Toolbar - Fixed for all screen sizes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative max-w-lg">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="input-field pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {selectedAlerts.length > 0 && (
            <div className="text-sm text-gray-600 hidden sm:block">
              {selectedAlerts.length} selected
            </div>
          )}
          <button className="btn-outline flex items-center text-sm">
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="btn-primary text-sm">
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">📤</span>
          </button>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.length === alerts.length && alerts.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Visa Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr 
                  key={alert.id} 
                  className={`hover:bg-gray-50 ${selectedAlerts.includes(alert.id) ? 'bg-primary-50' : ''}`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => handleSelectAlert(alert.id)}
                      className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">
                          {alert.country.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{alert.country}</div>
                        <div className="text-xs text-gray-500">Code: {alert.country.substring(0, 3).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-gray-50 mr-3">
                        <span className="text-gray-600">📍</span>
                      </div>
                      <span className="font-medium text-gray-900">{alert.city}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      alert.visaType === 'Tourist' ? 'bg-purple-100 text-purple-800' :
                      alert.visaType === 'Business' ? 'bg-amber-100 text-amber-800' :
                      'bg-cyan-100 text-cyan-800'
                    }`}>
                      {alert.visaType}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`badge ${STATUS_COLORS[alert.status]} flex items-center space-x-1`}>
                        {getStatusIcon(alert.status)}
                        <span className="text-xs">{alert.status}</span>
                      </div>
                      <select
                        value={alert.status}
                        onChange={(e) => onUpdateStatus(alert.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Booked">Booked</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{formatDate(alert.createdAt)}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(alert)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => onEdit(alert)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => onDelete(alert.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Show on mobile */}
      <div className="lg:hidden">
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">Create your first alert to get started</p>
          </div>
        ) : (
          <div>
            {alerts.map(renderMobileCard)}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && alerts.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-200 bg-white rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-semibold">{pagination.totalItems > 0 ? (pagination.currentPage - 1) * 10 + 1 : 0}</span> to{' '}
              <span className="font-semibold">
                {Math.min(pagination.currentPage * 10, pagination.totalItems)}
              </span>{' '}
              of <span className="font-semibold">{pagination.totalItems}</span> alerts
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className="btn-secondary flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(3, pagination.totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded text-sm font-medium ${
                        pagination.currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {pagination.totalPages > 3 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      onClick={() => onPageChange(pagination.totalPages)}
                      className={`w-8 h-8 rounded text-sm font-medium ${
                        pagination.currentPage === pagination.totalPages
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pagination.totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="btn-secondary flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertList;