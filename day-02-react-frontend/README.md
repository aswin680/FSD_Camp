# Day 02 – React Frontend Development (Static UI)

## Objective
Build a fully navigable frontend for the CineVerse movie booking platform using React with static/mock data. No backend integration at this stage.

## Tech Stack
- React (Vite)
- React Router DOM
- CSS / Tailwind CSS

## Screens Implemented

### Authentication
- Login Page
- Signup / Register Page

### User (Customer) Module
- User Dashboard
- Movie Catalog / Home Page
- Movie Details Page
- Location Selection Page
- Theatre Selection Page
- Screen (Audi) Selection Page
- Showtime Selection Page
- Seat Selection Page (grid-based layout)
- Booking Summary Page
- Booking Confirmation Page
- User Profile Page
- User Settings Page
- Booking History Page

### Theatre Owner Module
- Theatre Owner Dashboard
- Add / Edit Movie Page
- Manage Shows Page
- View Bookings Page
- Screen Management Page
- Seat Layout Configuration Page

### Admin Module
- Admin Dashboard
- Manage Users Page
- Manage Theatres Page
- Approve / Reject Theatre Requests
- System Overview / Reports Page

### Reusable Components
- Navbar / Header
- Sidebar (for dashboards)
- Movie Card Component
- Seat Component
- Seat Layout Grid
- Modal / Popup
- Buttons, Inputs, Forms

## Project Structure
```
src/
├── components/       # Reusable UI components
├── pages/
│   ├── auth/         # Login, Signup
│   ├── user/         # User module screens
│   ├── owner/        # Theatre owner screens
│   └── admin/        # Admin screens
├── data/             # Mock/static JSON data
├── routes/           # React Router config
└── App.jsx
```

## How to Run
```bash
npm install
npm run dev
```
App runs at `http://localhost:5173`

## Notes
- All data is hardcoded / mocked using static JSON arrays
- React Router handles all navigation between screens
- No API calls are made in this phase
