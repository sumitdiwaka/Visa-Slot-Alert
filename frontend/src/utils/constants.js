// For backward compatibility, also export string arrays
export const COUNTRIES = [
  { value: 'USA', label: 'United States', flag: '🇺🇸' },
  { value: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺' },
  { value: 'Germany', label: 'Germany', flag: '🇩🇪' },
  { value: 'France', label: 'France', flag: '🇫🇷' },
  { value: 'Japan', label: 'Japan', flag: '🇯🇵' },
];

export const COUNTRIES_LIST = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];

export const CITIES = {
  'USA': ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami', 'Seattle'],
  'UK': ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Glasgow'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  'Australia': ['Sydney', 'Melbourne', 'Perth', 'Brisbane', 'Adelaide'],
  'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
  'France': ['Paris', 'Lyon', 'Marseille', 'Nice', 'Toulouse'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya']
};

export const VISA_TYPES = [
  { value: 'Tourist', label: 'Tourist Visa', color: 'purple' },
  { value: 'Business', label: 'Business Visa', color: 'amber' },
  { value: 'Student', label: 'Student Visa', color: 'cyan' },
];

export const VISA_TYPES_LIST = ['Tourist', 'Business', 'Student'];

export const STATUSES = [
  { value: 'Active', label: 'Active', color: 'green' },
  { value: 'Booked', label: 'Booked', color: 'blue' },
  { value: 'Expired', label: 'Expired', color: 'red' },
];

export const STATUSES_LIST = ['Active', 'Booked', 'Expired'];

export const STATUS_COLORS = {
  'Active': 'badge-active',
  'Booked': 'badge-booked',
  'Expired': 'badge-expired'
};

export const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];