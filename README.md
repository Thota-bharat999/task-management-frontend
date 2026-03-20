# 🚀 Task Management System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-cyan)

A **Full Stack Role-Based Task Management Application** that allows teams to create, assign, track, and manage tasks efficiently with dashboard insights.

---

## 🌐 Live Demo

- 🔗 Frontend:https://bharattaskmanagement.netlify.app/
- 🔗 Backend API: https://task-management-backend-e22p.onrender.com

---

## 📌 Key Features

- 🔐 Secure JWT Authentication
- 👥 Role-Based Authorization (Admin / Manager / User)
- 📝 Task CRUD Operations
- 🔄 Task Status Update (Optimistic UI)
- 📊 Dashboard Task Statistics
- 🔎 Search & Filter Tasks
- 📄 Pagination Support
- 🎨 Modern Responsive UI
- ⚠️ Centralized Error Handling
- 🛡️ Input Validation & Middleware Security

---

## 🧠 Problem Statement

Teams often struggle with scattered task tracking across spreadsheets or chats, leading to missed deadlines and unclear responsibilities.  
This system provides a centralized platform to manage tasks with proper ownership, tracking, and reporting.

---

## 🎯 Use Case

- Admin / Manager assigns tasks  
- Users update task progress  
- Dashboard shows real-time task analytics  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Express Validator

---

## 📸 Screenshots

### 🔐 Login Page
assets/login.png


### 📊 Dashboard

assets/dashboard.png


### 📋 Task List
assets/taskList.png

### 📝 Create Task
assets/createTask.png

---

## 📁 Project Structure
task-management/
│
├── backend/
│ ├── controllers/
│ ├── services/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── utils/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── api/
│ └── routes/

## ⚙️ Environment Variables

### Backend (.env)


PORT=5000
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_secret
NODE_ENV=development

## ⚙️ Environment Variables

### Backend (.env)


PORT=5000
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_secret
NODE_ENV=development


### Frontend (.env)


VITE_API_URL=http://localhost:5000/api


---

## ▶️ Run Locally

### Backend


cd backend
npm install
npm run dev


### Frontend


cd frontend
npm install
npm run dev


---

## 🚀 Future Improvements

- Activity Logs
- Task Comments
- File Upload Feature
- Real-time Updates (Socket.io)
- Charts & Analytics
- Notification System
- Soft Delete

---

## 👨‍💻 Author

**Bharat Mani Kumar Thota**


