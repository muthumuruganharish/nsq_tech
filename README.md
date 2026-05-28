# NSQ Secure Portal

A modern full-stack secure portal application built using **React.js, Node.js, Express.js, and MongoDB Atlas** with a futuristic glassmorphism UI design.

---

# Features

## Authentication System

* User Signup
* User Login
* Role-Based Access
* Password Encryption using bcrypt
* MongoDB User Storage

---

## User Roles

* General User
* Admin

---

## Dashboard

* Modern Responsive Dashboard UI
* User Information Display
* Role Display
* Records Table
* Async Data Loading
* API Delay Simulation
* Loading Spinner

---

## Admin Features

* Admin Role Support
* User Management Structure
* Protected Role-Based Flow

---

## Technical Features

* MVC Architecture
* REST API
* Axios Service Layer
* MongoDB Atlas Integration
* Async API Handling
* React Hooks
* Express Routing
* Environment Variables Support

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* bcrypt
* dotenv
* cors

---

# Folder Structure

```text
FULL STACK
│
├── app
│   ├── src
│   │   ├── Pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AdminPanel.jsx
│   │   │
│   │   ├── Service
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── Controller
│   │   ├── LoginController.js
│   │   ├── SignupController.js
│   │   └── DashboardController.js
│   │
│   ├── Model
│   │   └── User.js
│   │
│   ├── Router
│   │   ├── Login_route.js
│   │   ├── Signup_route.js
│   │   └── Dashboard_route.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
```

---

# Installation

## Clone Repository

```bash
git clone <your-github-repo>
```

---

# Frontend Setup

```bash
cd app

npm install

npm run dev
```

---

# Backend Setup

```bash
cd backend

npm install

node server.js
```

---

# Environment Variables

Create a `.env` file inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000
```

---

# MongoDB Atlas Setup

1. Create MongoDB Atlas Cluster
2. Create Database User
3. Add IP Address in Network Access
4. Copy MongoDB Connection String
5. Paste into `.env`

---

# API Endpoints

## Authentication

### Signup

```http
POST /api/signup
```

### Login

```http
POST /api/login
```

---

## Dashboard

### Get Records

```http
GET /api/records
```

---

# Async API Simulation

The dashboard records API uses:

```javascript
setTimeout()
```

to simulate backend delay and demonstrate asynchronous processing.

---

# Security

* Passwords are encrypted using bcrypt
* Environment variables protected using dotenv
* MongoDB Atlas cloud database used

---

# UI Highlights

* Glassmorphism Design
* Purple Gradient Theme
* Responsive Layout
* Animated Loading Spinner
* Modern Dashboard Cards
* Clean Professional UI

---

# Evaluation Requirements Covered

✅ Login with Role
✅ MongoDB Storage
✅ SPA Architecture
✅ Dashboard with User Records
✅ Async Processing
✅ User Service Modularization
✅ MVC Backend Architecture
✅ Modern UI/UX
✅ Clean Code Structure

---

# Author

Developed by Harish
