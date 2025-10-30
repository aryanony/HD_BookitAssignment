
# BookIt - Experiences & Slots

Simple fullstack booking app (React + TypeScript + Tailwind / Node + Express + MongoDB)

## Run locally

### Backend
1. cd backend
2. npm install
3. copy .env.example -> .env and set MONGO_URI
4. npm run seed   # seed sample experiences & promos
5. npm run dev

### Frontend
1. cd frontend
2. npm install
3. copy .env.example -> .env and set VITE_API_URL to backend URL (http://localhost:4000)
4. npm run dev

## Promo codes
- SAVE10 (10% off)
- FLAT100 (Rs.100 off)

## Flow
Home → Details → Checkout → Result

## Deployment
- Backend: Railway/Render (set MONGO_URI)
- Frontend: Vercel (set VITE_API_URL)

# HD_BookitAssignment
A complete end-to-end web application where users can explore travel experiences, select available slots, and complete bookings, both frontend and backend skills, focusing on real-world fullstack workflows, API integration, and clean UI design.


# 🧳 BookIt: Experiences & Slots  
**Fullstack Intern Assignment**

Live Project → [Frontend (Vercel)](https://hd-bookit-assignment.vercel.app)  
Backend API → [Render](https://hd-bookitassignment.onrender.com)  
Repository → [GitHub](https://github.com/aryanony/HD_BookitAssignment)

---

## 📖 Overview
BookIt is a full-stack booking web app where users explore travel experiences,  
select slots, and confirm bookings with promo code validation.

---

## ⚙️ Tech Stack
**Frontend:** React + TypeScript + TailwindCSS  
**Backend:** Node.js + Express + MongoDB (Mongoose)  
**Hosting:**  
- Backend → Render  
- Frontend → Vercel  
- Database → MongoDB Atlas  

---

## 🌐 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/experiences` | Get list of experiences |
| GET | `/experiences/:id` | Get experience details + slots |
| POST | `/bookings` | Save new booking |
| POST | `/promo/validate` | Validate promo codes |

---

## 🧪 Run Locally

### Backend
```bash
cd backend
npm install
echo "MONGO_URI=<your-mongo-uri>" > .env
npm run dev
