// In-memory data storage with file persistence simulation
const fs = require('fs').promises;
const path = require('path');

class InMemoryDB {
  constructor() {
    this.alerts = [];
    this.filePath = path.join(__dirname, '../../data/alerts.json');
    this.init();
  }

  async init() {
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      const data = await fs.readFile(this.filePath, 'utf8');
      this.alerts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      this.alerts = [];
      await this.persist();
    }
  }

  async persist() {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.alerts, null, 2));
    } catch (error) {
      console.error('Error persisting data:', error);
    }
  }

  async findAll(query = {}) {
    let filtered = [...this.alerts];
    
    if (query.country) {
      filtered = filtered.filter(alert => 
        alert.country.toLowerCase().includes(query.country.toLowerCase())
      );
    }
    
    if (query.status) {
      filtered = filtered.filter(alert => 
        alert.status.toLowerCase() === query.status.toLowerCase()
      );
    }
    
    if (query.city) {
      filtered = filtered.filter(alert => 
        alert.city.toLowerCase().includes(query.city.toLowerCase())
      );
    }
    
    if (query.visaType) {
      filtered = filtered.filter(alert => 
        alert.visaType.toLowerCase() === query.visaType.toLowerCase()
      );
    }

    return filtered;
  }

  async findById(id) {
    return this.alerts.find(alert => alert.id === id);
  }

  async create(data) {
    const alert = {
      id: data.id || `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.alerts.push(alert);
    await this.persist();
    return alert;
  }

  async update(id, data) {
    const index = this.alerts.findIndex(alert => alert.id === id);
    
    if (index === -1) return null;
    
    this.alerts[index] = {
      ...this.alerts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await this.persist();
    return this.alerts[index];
  }

  async delete(id) {
    const index = this.alerts.findIndex(alert => alert.id === id);
    
    if (index === -1) return false;
    
    this.alerts.splice(index, 1);
    await this.persist();
    return true;
  }
}

module.exports = new InMemoryDB();