import { useState, useEffect } from "react";
import "./App.css";

function StarRating({ rating }) {
  return (
    <span className="stars">
      {"★".repeat(Math.floor(rating / 2))}{"☆".repeat(5 - Math.floor(rating / 2))}
      <span className="rating-num">{rating}</span>
    </span>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} onError={(e) => e.target.src = "https://via.placeholder.com/220x330?text=No+Image"} />
      <div className="card-body">
        <h3>{movie.title}</h3>
        <div className="tags">
          <span className="tag genre">{movie.genre}</span>
          <span className="tag lang">{movie.language}</span>
          <span className="tag year">{movie.year}</span>
        </div>
        <StarRating rating={movie.rating} />
        <p className="desc">{movie.description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => { setMovies(data); setLoading(false); })
      .catch(() => { setError("Could not connect to backend. Showing mock data."); setLoading(false); setMovies(MOCK); });
  }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <div className="logo">🎬 CineVerse</div>
        <input
          className="search"
          placeholder="Search movies or genres..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <main>
        <h2 className="section-title">Now Showing <span>{filtered.length} movies</span></h2>
        {error && <div className="error-banner">{error}</div>}
        {loading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <div className="grid">
            {filtered.length === 0 ? (
              <div className="empty">No movies found for "{search}"</div>
            ) : (
              filtered.map((m) => <MovieCard key={m.id} movie={m} />)
            )}
          </div>
        )}
      </main>

      <footer>Built with React + Spring Boot · CineVerse FSD Camp</footer>
    </div>
  );
}

const MOCK = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", language: "English", rating: 8.6, year: 2014, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 2, title: "The Dark Knight", genre: "Action", language: "English", rating: 9.0, year: 2008, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest tests." },
  { id: 3, title: "Inception", genre: "Thriller", language: "English", rating: 8.8, year: 2010, poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea." },
  { id: 4, title: "3 Idiots", genre: "Comedy", language: "Hindi", rating: 8.4, year: 2009, poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg", description: "Two friends search for their long lost companion while reminiscing about their adventures at an engineering college." },
  { id: 5, title: "KGF Chapter 2", genre: "Action", language: "Kannada", rating: 8.2, year: 2022, poster: "https://image.tmdb.org/t/p/w500/4j4dfHBvNcAYqFCMSIie4XMVD0A.jpg", description: "Rocky's authority increases manifold and he becomes the undisputed ruler of Narachi." },
  { id: 6, title: "Avengers: Endgame", genre: "Action", language: "English", rating: 8.4, year: 2019, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions." },
];
