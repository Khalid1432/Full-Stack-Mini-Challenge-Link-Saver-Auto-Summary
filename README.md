# 🔖 Link Saver + Auto-Summary (Take-Home Assignment)

A full-stack MERN app that allows users to save URLs with automatically generated summaries (via Jina AI), 
manage bookmarks with tags, and interact with a polished UI featuring dark mode, drag-and-drop reordering, and filtering.

---

## 🧩 Tech Stack

### 🔐 Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### 🎨 Frontend
- React (Vite)
- Tailwind CSS
- React Router

### 🔍 External API
- [Jina AI Summarization](https://r.jina.ai) – for extractive summaries of web pages

---

## 🚀 Features

✅ Email/password signup and login  
✅ Passwords hashed with bcrypt  
✅ JWT-based authentication  
✅ Save any URL  
✅ Auto-fetch title and favicon  
✅ Fetch plain-text summary (Jina AI, no key needed)  
✅ Tag support  
✅ Responsive bookmark grid  
✅ Delete bookmarks  
✅ Drag-and-drop reordering  
✅ Tag filter  

---

## 📷 Screenshots

> Include 2–5 screenshots here, for example:
- 🔐 Login/Register
- [Login image](https://github.com/user-attachments/assets/a6a3f44a-f1f9-4dea-bdee-1292f5c477a8)
- [register image](https://github.com/user-attachments/assets/679d7699-66cb-4404-9b37-c8b034191f45)
- 🌐 Saved bookmarks with summaries
- ![image](https://github.com/user-attachments/assets/6c5f1542-95fd-4471-a247-b50c935b9c91)
- 🏷️ Tag filtering
- ![image](https://github.com/user-attachments/assets/5be6a4d8-8b56-45f9-bc20-a2ab7bec0abd)
- 🔃 Drag-and-drop reorder
![image](https://github.com/user-attachments/assets/9882cd52-31f7-4dfa-bf99-6cdd6956c22b)
---

## 🧪 Tests

- ✅ Basic component test (e.g., `BookmarkCard`)
- ✅ Unit test for auth helper (e.g., JWT validation)

> You can use Jest + React Testing Library or even Postman test collection.

---

## 📦 Installation & Setup

### 🔧 Backend

```bash
cd backend
npm install
npm run dev

### 🖥️ Frontend

```bash
cd client
npm install
npm run dev

🔗 Live Demo

🧠 What I'd Do Next
Add bookmark editing
Search by title or summary
Use OpenAI or local model for abstractive summaries
Improve drag performance with external libraries
Add pagination or infinite scroll

⏱️ Time Spent
Example: 6–7 hours total
2h frontend structure & auth
2h backend routes & MongoDB
1.5h UI polish (drag-drop, dark mode)

