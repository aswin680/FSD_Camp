# 🎬 CineVerse Movie Listing App

A simple fullstack Movie Listing web app built with **React** (frontend) and **Spring Boot** (backend).

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React + Vite |
| Backend | Spring Boot (Java 17) |
| Styling | Plain CSS |
| Data | Hardcoded in-memory (no DB) |

## Features
- 🎥 Movie cards with poster, genre, language, year, rating
- 🔍 Live search / filter by title or genre
- ⭐ Star rating display
- 📡 Fetches from Spring Boot REST API
- 🔌 Falls back to mock data if backend is offline

## Project Structure
```
movie-listing-app/
├── backend/
│   └── movieapi/          # Spring Boot REST API
│       └── src/main/java/com/cineverse/movieapi/
│           ├── MovieapiApplication.java
│           ├── controller/MovieController.java
│           └── model/Movie.java
└── frontend/
    └── movieapp/          # React Vite app
        └── src/
            ├── App.jsx
            └── App.css
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/{id}` | Get movie by ID |
| GET | `/api/movies/search?title=` | Search by title |

## How to Run

### Backend (Spring Boot)
```bash
cd backend/movieapi
mvn spring-boot:run
```
Runs at `http://localhost:8080`

### Frontend (React)
```bash
cd frontend/movieapp
npm install
npm run dev
```
Runs at `http://localhost:5173`

## Author
**Aswin Patel** · 23BIS70025 · B.E. CSE (Information Security), Chandigarh University
