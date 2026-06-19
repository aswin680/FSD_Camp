# 🎬 CineVerse – BookMyShow Clone

A fullstack movie booking web app with **User** and **Admin** roles.

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React + Vite |
| Backend | Spring Boot (Java 17) |
| Styling | Plain CSS |
| Data | In-memory (no DB needed) |

## Features

### 👤 User
- Browse movies with posters, ratings, genres
- Search/filter movies
- Select show & theatre
- Pick seats from seat grid
- Confirm booking & see ticket
- View my bookings

### 🔧 Admin
- Add new movies
- Delete movies
- View all bookings across users

## Login Credentials
| Role | Email | Password |
|------|-------|----------|
| User | user@cineverse.com | user123 |
| Admin | admin@cineverse.com | admin123 |

## Project Structure
```
cineverse/
├── backend/cineverse-api/     # Spring Boot REST API
└── frontend/cineverse-app/    # React Vite app
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | All movies |
| POST | `/api/movies` | Add movie (admin) |
| DELETE | `/api/movies/{id}` | Delete movie (admin) |
| GET | `/api/shows/movie/{id}` | Shows for a movie |
| GET | `/api/bookings` | All bookings (admin) |
| GET | `/api/bookings/user/{name}` | User's bookings |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/{id}/cancel` | Cancel booking |

## How to Run Locally

### Backend
```bash
cd backend/cineverse-api
mvn spring-boot:run
# runs at http://localhost:8080
```

### Frontend
```bash
cd frontend/cineverse-app
npm install
npm run dev
# runs at http://localhost:5173
```

## Deployment
- **Frontend** → Vercel
- **Backend** → Render (Docker)

Set env variable in frontend:
```
VITE_API_URL=https://your-render-url.onrender.com
```

## Author
**Aswin Patel** · 23BIS70025 · B.E. CSE (Information Security), Chandigarh University
