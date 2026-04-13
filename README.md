# Project Management System

A full-stack project management system with role-based access control.

## Features

- Authentication (JWT)
- Role-based access (Admin, Manager, Developer)
- Admin Dashboard (user management, stats)
- Manager Dashboard (projects + task assignment)
- Developer Dashboard (task tracking)
- Activity logs
- Forgot/Reset password (email via Mailtrap)

## Tech Stack

- Frontend: React + Axios + Plain CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Setup

### Backend

cd backend  
npm install  
nodemon server.js / node server.js  

### Frontend

cd frontend  
npm install  
npm run dev  

## Environment Variables

Create `.env` in backend:
MONGO_URI=mongodb://utukurisaicharan123_db_user:saivarsha@ac-gy8ol9g-shard-00-00.uileskb.mongodb.net:27017,ac-gy8ol9g-shard-00-01.uileskb.mongodb.net:27017,ac-gy8ol9g-shard-00-02.uileskb.mongodb.net:27017/?ssl=true&replicaSet=atlas-134cho-shard-0&authSource=admin&appName=Cluster1
JWT_SECRET=your_secret
MAIL_USER=0d8c67a9e4d81b
MAIL_PASS=026942cacc3456

## Screenshots

<img width="1885" height="919" alt="Screenshot 2026-04-13 001044" src="https://github.com/user-attachments/assets/bdad842d-9381-4250-92a8-1cd31b2ec67b" />


## Author

Sai Charan
