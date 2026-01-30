const { COUNTRIES, CITIES, VISA_TYPES, STATUSES } = require('../utils/constants');

const validateAlert = (req, res, next) => {
  const { country, city, visaType, status } = req.body;

  const errors = [];

  // Country validation
  if (!country || typeof country !== 'string') {
    errors.push('Country is required and must be a string');
  } else if (!COUNTRIES.includes(country)) {
    errors.push(`Country must be one of: ${COUNTRIES.join(', ')}`);
  }

  // City validation
  if (!city || typeof city !== 'string') {
    errors.push('City is required and must be a string');
  } else if (country && CITIES[country] && !CITIES[country].includes(city)) {
    errors.push(`City for ${country} must be one of: ${CITIES[country].join(', ')}`);
  }

  // Visa type validation
  if (!visaType || typeof visaType !== 'string') {
    errors.push('Visa type is required and must be a string');
  } else if (!VISA_TYPES.includes(visaType)) {
    errors.push(`Visa type must be one of: ${VISA_TYPES.join(', ')}`);
  }

  // Status validation (optional on create)
  if (status && !STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

module.exports = { validateAlert };