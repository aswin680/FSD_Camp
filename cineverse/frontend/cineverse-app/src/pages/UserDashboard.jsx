import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api";

const MOCK_MOVIES = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", language: "English", rating: 8.6, year: 2014, duration: 169, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", description: "A team of explorers travel through a wormhole in space." },
  { id: 2, title: "The Dark Knight", genre: "Action", language: "English", rating: 9.0, year: 2008, duration: 152, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", description: "Batman must accept one of the greatest psychological tests of his ability to fight injustice." },
  { id: 3, title: "Inception", genre: "Thriller", language: "English", rating: 8.8, year: 2010, duration: 148, poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", description: "A thief who steals corporate secrets through dream-sharing technology." },
  { id: 4, title: "3 Idiots", genre: "Comedy", language: "Hindi", rating: 8.4, year: 2009, duration: 170, poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg", description: "Two friends search for their long lost companion." },
  { id: 5, title: "KGF Chapter 2", genre: "Action", language: "Kannada", rating: 8.2, year: 2022, duration: 168, poster: "https://image.tmdb.org/t/p/w500/4j4dfHBvNcAYqFCMSIie4XMVD0A.jpg", description: "Rocky becomes the undisputed ruler of Narachi." },
  { id: 6, title: "Avengers: Endgame", genre: "Action", language: "English", rating: 8.4, year: 2019, duration: 181, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", description: "The Avengers assemble once more to reverse Thanos's actions." },
];

const MOCK_SHOWS = [
  { id: 1, movieId: 1, theatre: "CineVerse IMAX, Chennai", date: "2025-07-10", time: "10:00 AM", availableSeats: 45, price: 350 },
  { id: 2, movieId: 1, theatre: "PVR Cinemas, Bangalore", date: "2025-07-10", time: "02:00 PM", availableSeats: 30, price: 280 },
  { id: 3, movieId: 2, theatre: "CineVerse Gold, Mumbai", date: "2025-07-10", time: "06:00 PM", availableSeats: 50, price: 320 },
  { id: 4, movieId: 2, theatre: "Inox Multiplex, Delhi", date: "2025-07-11", time: "09:00 AM", availableSeats: 60, price: 250 },
  { id: 5, movieId: 3, theatre: "CineVerse IMAX, Chennai", date: "2025-07-11", time: "03:00 PM", availableSeats: 20, price: 380 },
  { id: 6, movieId: 4, theatre: "Miraj Cinemas, Pune", date: "2025-07-12", time: "12:00 PM", availableSeats: 55, price: 200 },
  { id: 7, movieId: 5, theatre: "CineVerse Gold, Hyderabad", date: "2025-07-12", time: "07:00 PM", availableSeats: 40, price: 300 },
  { id: 8, movieId: 6, theatre: "PVR Cinemas, Bangalore", date: "2025-07-13", time: "04:00 PM", availableSeats: 35, price: 350 },
];

function MovieCard({ movie, onBook }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} onError={e => e.target.src = "https://via.placeholder.com/220x330?text=No+Poster"} />
      <div className="card-body">
        <h3>{movie.title}</h3>
        <div className="tags">
          <span className="tag genre">{movie.genre}</span>
          <span className="tag lang">{movie.language}</span>
          <span className="tag year">{movie.year}</span>
        </div>
        <div className="rating">⭐ {movie.rating} · {movie.duration} min</div>
        <p className="desc">{movie.description}</p>
        <button className="btn-primary" onClick={() => onBook(movie)}>Book Tickets</button>
      </div>
    </div>
  );
}

function BookingModal({ movie, shows, user, onClose, onBooked }) {
  const movieShows = shows.filter(s => s.movieId === movie.id);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState(null);

  const ROWS = ["A", "B", "C", "D", "E"];
  const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const confirmBooking = async () => {
    if (!selectedShow || selectedSeats.length === 0) return;
    try {
      const result = await api.createBooking({ showId: selectedShow.id, userName: user.name, seats: selectedSeats });
      setBooking(result);
      setBooked(true);
      onBooked();
    } catch {
      // fallback mock booking
      setBooking({ id: Math.floor(Math.random() * 1000), seats: selectedSeats, totalAmount: selectedShow.price * selectedSeats.length, status: "CONFIRMED" });
      setBooked(true);
      onBooked();
    }
  };

  if (booked && booking) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="booking-success">
          <div className="success-icon">🎉</div>
          <h2>Booking Confirmed!</h2>
          <div className="ticket">
            <p><b>Movie:</b> {movie.title}</p>
            {selectedShow && <p><b>Theatre:</b> {selectedShow.theatre}</p>}
            {selectedShow && <p><b>Show:</b> {selectedShow.date} · {selectedShow.time}</p>}
            <p><b>Seats:</b> {booking.seats?.join(", ")}</p>
            <p><b>Total:</b> ₹{booking.totalAmount}</p>
            <p><b>Status:</b> <span className="confirmed">✅ {booking.status}</span></p>
          </div>
          <button className="btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Book Tickets — {movie.title}</h2>

        <div className="section-label">Select Show</div>
        <div className="show-list">
          {movieShows.length === 0 && <p className="muted">No shows available</p>}
          {movieShows.map(s => (
            <div key={s.id} className={`show-item ${selectedShow?.id === s.id ? "selected" : ""}`}
              onClick={() => { setSelectedShow(s); setSelectedSeats([]); }}>
              <div><b>{s.theatre}</b></div>
              <div className="show-meta">{s.date} · {s.time}</div>
              <div className="show-meta">💺 {s.availableSeats} seats · ₹{s.price}/seat</div>
            </div>
          ))}
        </div>

        {selectedShow && (
          <>
            <div className="section-label">Select Seats</div>
            <div className="screen-label">🖥 SCREEN</div>
            <div className="seat-grid">
              {ROWS.map(row => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  {COLS.map(col => {
                    const seat = `${row}${col}`;
                    const sel = selectedSeats.includes(seat);
                    return <button key={seat} className={`seat ${sel ? "selected" : ""}`} onClick={() => toggleSeat(seat)}>{col}</button>;
                  })}
                </div>
              ))}
            </div>
            <div className="seat-legend">
              <span className="seat small"></span> Available &nbsp;
              <span className="seat small selected"></span> Selected
            </div>
            {selectedSeats.length > 0 && (
              <div className="booking-summary">
                <span>{selectedSeats.length} seat(s): {selectedSeats.join(", ")}</span>
                <span><b>₹{selectedShow.price * selectedSeats.length}</b></span>
                <button className="btn-primary" onClick={confirmBooking}>Confirm & Pay</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function UserDashboard({ user, onLogout }) {
  const [tab, setTab] = useState("Movies");
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [shows] = useState(MOCK_SHOWS);
  const [search, setSearch] = useState("");
  const [bookingMovie, setBookingMovie] = useState(null);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    api.getMovies().then(setMovies).catch(() => setMovies(MOCK_MOVIES));
  }, []);

  const loadMyBookings = () => {
    api.getUserBookings(user.name).then(setMyBookings).catch(() => {});
  };

  useEffect(() => { if (tab === "My Bookings") loadMyBookings(); }, [tab]);

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} active={tab} setActive={setTab} tabs={["Movies", "My Bookings"]} />
      <main className="main">
        {tab === "Movies" && (
          <>
            <div className="page-header">
              <h2>Now Showing <span className="count">{filtered.length} movies</span></h2>
              <input className="search" placeholder="Search by title or genre..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="grid">
              {filtered.map(m => <MovieCard key={m.id} movie={m} onBook={setBookingMovie} />)}
              {filtered.length === 0 && <div className="empty">No movies found for "{search}"</div>}
            </div>
          </>
        )}

        {tab === "My Bookings" && (
          <>
            <h2 className="page-title">My Bookings</h2>
            {myBookings.length === 0 ? (
              <div className="empty-state">
                <div style={{fontSize:"3rem"}}>🎟</div>
                <p>No bookings yet. Book a movie!</p>
                <button className="btn-primary" onClick={() => setTab("Movies")}>Browse Movies</button>
              </div>
            ) : (
              <div className="booking-list">
                {myBookings.map(b => (
                  <div key={b.id} className="booking-card">
                    <div className="booking-info">
                      <div><b>Booking #{b.id}</b></div>
                      <div className="muted">Seats: {b.seats?.join(", ")}</div>
                      <div className="muted">Total: ₹{b.totalAmount}</div>
                    </div>
                    <span className={`status-badge ${b.status?.toLowerCase()}`}>{b.status}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {bookingMovie && (
        <BookingModal
          movie={bookingMovie}
          shows={shows}
          user={user}
          onClose={() => setBookingMovie(null)}
          onBooked={() => {}}
        />
      )}
    </div>
  );
}
