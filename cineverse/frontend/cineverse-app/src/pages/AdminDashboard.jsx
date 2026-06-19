import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api";

const MOCK_MOVIES = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", language: "English", rating: 8.6, year: 2014, duration: 169, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 2, title: "The Dark Knight", genre: "Action", language: "English", rating: 9.0, year: 2008, duration: 152, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 3, title: "Inception", genre: "Thriller", language: "English", rating: 8.8, year: 2010, duration: 148, poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id: 4, title: "3 Idiots", genre: "Comedy", language: "Hindi", rating: 8.4, year: 2009, duration: 170, poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg" },
  { id: 5, title: "KGF Chapter 2", genre: "Action", language: "Kannada", rating: 8.2, year: 2022, duration: 168, poster: "https://image.tmdb.org/t/p/w500/4j4dfHBvNcAYqFCMSIie4XMVD0A.jpg" },
  { id: 6, title: "Avengers: Endgame", genre: "Action", language: "English", rating: 8.4, year: 2019, duration: 181, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
];

const EMPTY_FORM = { title: "", genre: "", language: "", rating: "", year: "", duration: "", poster: "", description: "" };

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState("Manage Movies");
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.getMovies().then(setMovies).catch(() => setMovies(MOCK_MOVIES));
  }, []);

  useEffect(() => {
    if (tab === "All Bookings") {
      api.getAllBookings().then(setBookings).catch(() => setBookings([]));
    }
  }, [tab]);

  const handleAdd = async () => {
    if (!form.title || !form.genre) return setMsg("Title and Genre are required.");
    try {
      const added = await api.addMovie({ ...form, rating: parseFloat(form.rating), year: parseInt(form.year), duration: parseInt(form.duration) });
      setMovies(prev => [...prev, added]);
    } catch {
      const newMovie = { ...form, id: Date.now(), rating: parseFloat(form.rating), year: parseInt(form.year), duration: parseInt(form.duration) };
      setMovies(prev => [...prev, newMovie]);
    }
    setForm(EMPTY_FORM);
    setMsg("✅ Movie added successfully!");
    setTimeout(() => setMsg(""), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return;
    try { await api.deleteMovie(id); } catch {}
    setMovies(prev => prev.filter(m => m.id !== id));
    setMsg("🗑 Movie deleted.");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} active={tab} setActive={setTab} tabs={["Manage Movies", "All Bookings"]} />
      <main className="main">

        {tab === "Manage Movies" && (
          <>
            <h2 className="page-title">Manage Movies</h2>
            {msg && <div className="flash-msg">{msg}</div>}

            {/* Add Movie Form */}
            <div className="admin-form-card">
              <h3>➕ Add New Movie</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Movie title" />
                </div>
                <div className="form-group">
                  <label>Genre *</label>
                  <input value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} placeholder="Action, Drama..." />
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <input value={form.language} onChange={e => setForm({...form, language: e.target.value})} placeholder="English, Hindi..." />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} placeholder="8.5" type="number" step="0.1" />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} placeholder="2024" type="number" />
                </div>
                <div className="form-group">
                  <label>Duration (min)</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="120" type="number" />
                </div>
                <div className="form-group full-span">
                  <label>Poster URL</label>
                  <input value={form.poster} onChange={e => setForm({...form, poster: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group full-span">
                  <label>Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Movie description..." rows={2} />
                </div>
              </div>
              <button className="btn-primary" onClick={handleAdd}>Add Movie</button>
            </div>

            {/* Movies Table */}
            <div className="admin-table-card">
              <h3>All Movies ({movies.length})</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Poster</th><th>Title</th><th>Genre</th><th>Language</th><th>Rating</th><th>Year</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map(m => (
                    <tr key={m.id}>
                      <td><img src={m.poster} alt="" className="thumb" onError={e => e.target.style.display='none'} /></td>
                      <td><b>{m.title}</b></td>
                      <td><span className="tag genre">{m.genre}</span></td>
                      <td>{m.language}</td>
                      <td>⭐ {m.rating}</td>
                      <td>{m.year}</td>
                      <td><button className="btn-danger" onClick={() => handleDelete(m.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "All Bookings" && (
          <>
            <h2 className="page-title">All Bookings</h2>
            {bookings.length === 0 ? (
              <div className="empty-state">
                <div style={{fontSize:"3rem"}}>📋</div>
                <p>No bookings found yet.</p>
              </div>
            ) : (
              <div className="admin-table-card">
                <table className="admin-table">
                  <thead>
                    <tr><th>#</th><th>User</th><th>Show ID</th><th>Seats</th><th>Amount</th><th>Status</th><th>Booked At</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.userName}</td>
                        <td>{b.showId}</td>
                        <td>{b.seats?.join(", ")}</td>
                        <td>₹{b.totalAmount}</td>
                        <td><span className={`status-badge ${b.status?.toLowerCase()}`}>{b.status}</span></td>
                        <td>{b.bookedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
