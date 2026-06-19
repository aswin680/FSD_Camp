const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = {
  getMovies: () => fetch(`${BASE}/api/movies`).then(r => r.json()),
  getMovie: (id) => fetch(`${BASE}/api/movies/${id}`).then(r => r.json()),
  addMovie: (movie) => fetch(`${BASE}/api/movies`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(movie)
  }).then(r => r.json()),
  deleteMovie: (id) => fetch(`${BASE}/api/movies/${id}`, { method: "DELETE" }),

  getShows: () => fetch(`${BASE}/api/shows`).then(r => r.json()),
  getShowsByMovie: (movieId) => fetch(`${BASE}/api/shows/movie/${movieId}`).then(r => r.json()),

  getAllBookings: () => fetch(`${BASE}/api/bookings`).then(r => r.json()),
  getUserBookings: (userName) => fetch(`${BASE}/api/bookings/user/${userName}`).then(r => r.json()),
  createBooking: (data) => fetch(`${BASE}/api/bookings`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(r => r.json()),
  cancelBooking: (id) => fetch(`${BASE}/api/bookings/${id}/cancel`, { method: "PUT" }),
};
