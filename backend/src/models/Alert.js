class Alert {
  constructor(id, country, city, visaType, status, createdAt) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.visaType = visaType;
    this.status = status;
    this.createdAt = createdAt;
  }

  static create(data) {
    const timestamp = new Date().toISOString();
    return new Alert(
      data.id || Date.now().toString(),
      data.country,
      data.city,
      data.visaType,
      data.status || 'Active',
      data.createdAt || timestamp
    );
  }

  update(data) {
    if (data.country !== undefined) this.country = data.country;
    if (data.city !== undefined) this.city = data.city;
    if (data.visaType !== undefined) this.visaType = data.visaType;
    if (data.status !== undefined) this.status = data.status;
    return this;
  }
}

module.exports = Alert;