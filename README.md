# Task Manager -  

An app to create, edit, view, and delete tasks with login & signup functionality built using frontend - Expo go, UI - React Native Paper, backend - Nodejs, Database - MongoDB, Frontend Build tool server - EAS, Backend Server Deployment - Vercel.

## Backend

This is the backend for the Task Manager application, built with Node.js and Express. It provides authentication, task management, and database interactions.

## Features
- User authentication (signup, login, JWT-based authentication)
- CRUD operations for tasks
- MongoDB as the database
- Secured API endpoints

## Prerequisites
Ensure you have the following installed:
- Node.js (>=16)
- MongoDB (local or cloud instance)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager/task-manager-backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Server
```sh
npm start
```
The server should now be running at `http://localhost:5000`.

### 5. API Endpoints
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user and return JWT token
- `GET /api/tasks` - Fetch all tasks (protected route)
- `POST /api/tasks` - Create a task (protected route)
- `PUT /api/tasks/:id` - Update a task (protected route)
- `DELETE /api/tasks/:id` - Delete a task (protected route)

Use Postman or a similar tool to test the API.

---

## Frontend

This is the frontend for the Task Manager application, built with React Native and Expo.

## Features
- User authentication (signup, login)
- Task listing, creation, updating, and deletion
- Smooth UI with React Native Paper

## Prerequisites
Ensure you have the following installed:
- Node.js (>=16)
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS Emulator or Expo Go app

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager/task-manager-frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
EXPO_PUBLIC_API_BASE_URL=http://your-backend-url
```

### 4. Run the App
```sh
npm start
```
This will start Expo. Scan the QR code using the Expo Go app or run on an emulator.

## Build and Deployment
To create a local Android build:
```sh
eas build --local --platform android
```
For an iOS build, use macOS and run:
```sh
eas build --platform ios
```

 This app is built for quick assessment.