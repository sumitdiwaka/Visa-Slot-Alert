const Alert = require('../models/Alert');

class AlertService {
  constructor() {
    this.alerts = new Map();
    this.initializeSampleData();
  }

  initializeSampleData() {
    const sampleAlerts = [
      {
        id: '1',
        country: 'USA',
        city: 'New York',
        visaType: 'Tourist',
        status: 'Active',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        country: 'UK',
        city: 'London',
        visaType: 'Business',
        status: 'Booked',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        country: 'Canada',
        city: 'Toronto',
        visaType: 'Student',
        status: 'Active',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    sampleAlerts.forEach(alert => {
      this.alerts.set(alert.id, Alert.create(alert));
    });
  }

  getAllAlerts(filters = {}) {
    let alerts = Array.from(this.alerts.values());

    if (filters.country) {
      alerts = alerts.filter(alert => 
        alert.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    if (filters.status) {
      alerts = alerts.filter(alert => 
        alert.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.visaType) {
      alerts = alerts.filter(alert => 
        alert.visaType.toLowerCase() === filters.visaType.toLowerCase()
      );
    }

    if (filters.city) {
      alerts = alerts.filter(alert => 
        alert.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    return alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getAlertById(id) {
    return this.alerts.get(id);
  }

  createAlert(data) {
    const alert = Alert.create(data);
    this.alerts.set(alert.id, alert);
    return alert;
  }

  updateAlert(id, data) {
    const alert = this.alerts.get(id);
    if (!alert) {
      return null;
    }
    return alert.update(data);
  }

  deleteAlert(id) {
    return this.alerts.delete(id);
  }

  getPaginatedAlerts(page = 1, limit = 10, filters = {}) {
    const allAlerts = this.getAllAlerts(filters);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      data: allAlerts.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(allAlerts.length / limit),
        totalItems: allAlerts.length,
        hasNextPage: endIndex < allAlerts.length,
        hasPreviousPage: page > 1
      }
    };
  }
}

module.exports = new AlertService();