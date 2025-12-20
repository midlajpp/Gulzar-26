# Gulzar Fest Web Application

Gulzar Fest Web Application is a full-stack web system developed to manage
fest activities, participants, and results with a dedicated Admin Panel
and a dynamic Public Result Page.

This project is designed to ensure that only **admin-published results**
are visible to the public, making the system secure, reliable, and easy
to manage during fest events.

---

## 🚀 Features

### 👨‍💼 Admin Panel

- Secure admin dashboard
- Add / Edit / Delete participants
- Assign participants to teams
- Manage results category-wise and program-wise
- Upload result posters (image / PDF)
- Edit and delete results from the same page
- Only admin-saved results are considered as published

### 🌐 Public Result Page

- Category-based result viewing
- Program list shown **only if result is published**
- Clean result cards with team-based colors
- Downloadable e-poster (if uploaded)
- No unpublished or empty results shown

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router
- CSS (custom admin & public styles)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- Cloudinary (media storage)

---

## 📂 Project Structure

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder and add:

> ⚠️ Never commit `.env` to GitHub.

---

## ▶️ How to Run the Project

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev

```
