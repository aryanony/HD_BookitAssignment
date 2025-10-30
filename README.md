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
