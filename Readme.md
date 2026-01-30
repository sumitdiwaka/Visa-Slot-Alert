
# Visa Slot Alert Tracker

## 🎯 Overview
A full-stack internal tool for **The Flying Panda** to track visa slot alerts with real-time monitoring, filtering, and management capabilities. Built with Node.js/Express backend and React frontend with a modern, responsive UI.

---

## 🚀 Features

### Backend API
- ✅ **RESTful API** with proper HTTP status codes
- ✅ **CRUD operations** for visa slot alerts (GET, POST, PUT, DELETE)
- ✅ **Custom middleware** (Request Logger & Input Validator)
- ✅ **Query filtering** by country, status, visa type, and city
- ✅ **Centralized error handling** with meaningful error messages
- ✅ **Pagination support** for large datasets
- ✅ **Input validation** at API level
- ✅ **Environment variables** configuration
- ✅ **In-memory storage** with Map data structure (production-ready for small-scale use)

### Frontend Application
- ✅ **Create alerts** with form validation and city-country dependencies
- ✅ **View all alerts** in responsive table/card layout
- ✅ **Update status** inline with dropdown
- ✅ **Delete alerts** with confirmation dialog
- ✅ **Filter alerts** by multiple criteria
- ✅ **Dashboard** with statistics and charts
- ✅ **Analytics page** with performance metrics
- ✅ **Responsive design** for mobile and desktop
- ✅ **Dark/Light theme** toggle
- ✅ **Real-time statistics** dashboard
- ✅ **Professional UI** with Tailwind CSS

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **In-memory storage** - Using JavaScript Map for data persistence

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **Heroicons** - Icon library
- **Axios** - HTTP client

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

---

## ⚡ Quick Start

### 1. Clone and Navigate
git clone <repository-url>
cd visa-slot-tracker

2. Backend Setup
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the backend server
npm run dev

3. Frontend Setup
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the frontend development server
npm run dev

Frontend runs on: http://localhost:5173

4. Access the Application
Open browser to http://localhost:5173
Default sample data is loaded automatically
Use the sidebar to navigate between Dashboard, All Alerts, Create Alert, and Analytics


visa-slot-tracker/

├── backend/

│   ├── src/
│   │   ├── controllers/     # Request handlers (AlertController.js)
│   │   ├── middleware/      # Custom middleware (logger, validator)
│   │   ├── models/         # Data models (Alert class)
│   │   ├── routes/         # API route definitions (alertRoutes.js)
│   │   ├── services/       # Business logic layer (AlertService.js)
│   │   ├── utils/          # Constants and utilities
│   │   └── app.js          # Main Express application
│   ├── .env.example        # Environment variables template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Reusable React components
    │   │   ├── Dashboard.jsx
    │   │   ├── AlertList.jsx
    │   │   ├── AlertForm.jsx
    │   │   ├── Analytics.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── Header.jsx
    │   ├── services/       # API service layer (api.js)
    │   ├── utils/          # Constants and helpers
    │   ├── App.jsx         # Main application component
    │   └── main.jsx        # Application entry point
    ├── .env.example        # Frontend environment variables
    └── package.json


🔌 API Endpoints
Base URL: http://localhost:5000/api

Method	      Endpoint	                Description
GET  	      /alerts	           Get all alerts (supports pagination & filtering)
GET	         /alerts/:id	       Get single alert by ID
POST	    /alerts	               Create new alert
PUT	       /alerts/:id	           Update alert
PATCH	  /alerts/:id/status	   Update alert status only
DELETE	 /alerts/:id	           Delete alert



Endpoints
Method	Endpoint	Description	Parameters
GET	/alerts	Get all alerts	?country, ?status, ?visaType, ?city, ?page, ?limit
GET	/alerts/:id	Get single alert	:id - Alert ID
POST	/alerts	Create new alert	{country, city, visaType, status}
PUT	/alerts/:id	Update alert	:id - Alert ID
PATCH	/alerts/:id/status	Update status	:id - Alert ID, {status}
DELETE	/alerts/:id	Delete alert	:id - Alert ID
GET	/health	Health check	None



Query Parameters for GET /alerts
?country=USA - Filter by country

?status=Active - Filter by status

?visaType=Tourist - Filter by visa type

?city=London - Filter by city

?page=1&limit=10 - Pagination support

🎨 UI/UX Features
Dashboard
Welcome banner with personalized greeting
Statistics cards showing total, active, booked, and expired alerts
Alert trends chart showing 30-day overview
Recent alerts panel with quick actions
Upcoming deadlines for visa applications
Country distribution visualization

All Alerts Page
Responsive design - Table on desktop, cards on mobile
Advanced filtering by country, status, visa type, and city
Inline status updates with dropdown
Batch selection for multiple operations
Pagination for easy navigation
Export functionality (UI ready)

Create/Edit Alert Form
Smart city selection based on chosen country
Form validation with error messages
Tips & guidelines sidebar
Quick stats panel
User-friendly interface

Analytics Page
Performance metrics with trends
Country distribution charts
Visa type breakdown
Success rate visualization
Monthly trend analysis

🧩 Design Decisions
1. In-Memory Storage Choice
Why? Requirements specified "in-memory, file, or database (your choice)"
Decision: Used JavaScript Map for simplicity and speed
Benefit: No database setup required, easier evaluation
Trade-off: Data lost on server restart (acceptable for internal tool)


2. Custom Middleware Implementation
Request Logger: Logs all API requests with method, URL, status, and duration
Input Validator: Validates alert data with specific rules:
Country must be from predefined list
City must be valid for selected country
Visa type must be Tourist/Business/Student
Status must be Active/Booked/Expired


🤖 AI Assistance vs. My Own Thinking
Where AI Helped:
1. Code Structure & Patterns
Suggested layered architecture patterns
Provided middleware implementation templates
Recommended error handling strategies
Suggested React component patterns

2. Technical Implementation
Helped with Tailwind CSS class combinations
Provided code snippets for common patterns
Suggested Axios interceptor implementation
Helped with form validation logic

3. Problem Solving
Debugged specific error scenarios
Suggested alternative approaches for challenges
Provided optimization suggestions
Helped with responsive design strategies

4. Documentation
Assisted with README structure
Helped articulate design decisions
Suggested professional terminology
Provided formatting guidance

Where I Did the Thinking:
1. Business Logic DesignDesigned the complete visa alert tracking workflow
Created the data model with proper relationships
Implemented city-country validation logic
Designed the status update workflow

2. User Experience FlowPlanned the complete user journey from alert creation to management
Designed the dashboard with meaningful metrics
Created the filtering and search functionality
Implemented the responsive design strategy

3. Architecture DecisionsChose in-memory storage based on requirements
Designed the API structure and endpoints
Implemented the component hierarchy
Created the service layer for business logic

4. Real-World ConsiderationsAdded city validation based on selected country
Implemented proper error handling for edge cases
Added pagination for scalability
Included statistics and analytics features

5. Production ReadinessDesigned for extensibility and maintainability
Added comprehensive error handling
Implemented proper logging
Created environment-specific configurations

6. Professional Polish
Added dark/light theme toggle
Implemented professional UI components
Added loading states and error boundaries
Created comprehensive documentation



