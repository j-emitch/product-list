# Product List

A full-stack e-commerce application built with Express, MongoDB, React, and Redux.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Getting Started

### 1. Database Setup

```bash
# Start (sign in) your local MongoDB service
mongod --dbpath=/Users/user/data/db

# Verify MongoDB is running
mongosh
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend will be running at http://localhost:8000

### 3. Generate Test Data

```bash
# In a new terminal, run:
curl http://localhost:8000/generate-fake-data
```

### 4. Frontend Setup

```bash
# In a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at http://localhost:3000

## Features

- Product listing with pagination
- Category filtering
- Price sorting
- Search functionality

## Development

- Backend API runs on port 8000
- Frontend development server runs on port 3000
- MongoDB runs on default port 27017
