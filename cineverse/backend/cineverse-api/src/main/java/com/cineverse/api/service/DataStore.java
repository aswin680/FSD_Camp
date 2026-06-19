package com.cineverse.api.service;

import com.cineverse.api.model.Booking;
import com.cineverse.api.model.Movie;
import com.cineverse.api.model.Show;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class DataStore {

    private final List<Movie> movies = new ArrayList<>(Arrays.asList(
        new Movie(1, "Interstellar", "Sci-Fi", "English", 8.6,
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 2014, 169),
        new Movie(2, "The Dark Knight", "Action", "English", 9.0,
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests.", 2008, 152),
        new Movie(3, "Inception", "Thriller", "English", 8.8,
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.", 2010, 148),
        new Movie(4, "3 Idiots", "Comedy", "Hindi", 8.4,
            "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
            "Two friends search for their long lost companion while reminiscing about their adventures at an engineering college.", 2009, 170),
        new Movie(5, "KGF Chapter 2", "Action", "Kannada", 8.2,
            "https://image.tmdb.org/t/p/w500/4j4dfHBvNcAYqFCMSIie4XMVD0A.jpg",
            "Rocky's authority increases manifold and he becomes the undisputed ruler of Narachi.", 2022, 168),
        new Movie(6, "Avengers: Endgame", "Action", "English", 8.4,
            "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions.", 2019, 181)
    ));

    private final List<Show> shows = new ArrayList<>(Arrays.asList(
        new Show(1, 1, "CineVerse IMAX, Chennai", "2025-07-10", "10:00 AM", 60, 45, 350),
        new Show(2, 1, "PVR Cinemas, Bangalore", "2025-07-10", "02:00 PM", 60, 30, 280),
        new Show(3, 2, "CineVerse Gold, Mumbai", "2025-07-10", "06:00 PM", 60, 50, 320),
        new Show(4, 2, "Inox Multiplex, Delhi", "2025-07-11", "09:00 AM", 60, 60, 250),
        new Show(5, 3, "CineVerse IMAX, Chennai", "2025-07-11", "03:00 PM", 60, 20, 380),
        new Show(6, 4, "Miraj Cinemas, Pune", "2025-07-12", "12:00 PM", 60, 55, 200),
        new Show(7, 5, "CineVerse Gold, Hyderabad", "2025-07-12", "07:00 PM", 60, 40, 300),
        new Show(8, 6, "PVR Cinemas, Bangalore", "2025-07-13", "04:00 PM", 60, 35, 350)
    ));

    private final List<Booking> bookings = new ArrayList<>();
    private final AtomicInteger bookingIdCounter = new AtomicInteger(1);
    private final AtomicInteger movieIdCounter = new AtomicInteger(7);

    // Movies
    public List<Movie> getAllMovies() { return movies; }

    public Movie getMovieById(int id) {
        return movies.stream().filter(m -> m.getId() == id).findFirst().orElse(null);
    }

    public Movie addMovie(Movie movie) {
        movie.setId(movieIdCounter.getAndIncrement());
        movies.add(movie);
        return movie;
    }

    public boolean deleteMovie(int id) {
        return movies.removeIf(m -> m.getId() == id);
    }

    // Shows
    public List<Show> getAllShows() { return shows; }

    public List<Show> getShowsByMovie(int movieId) {
        return shows.stream().filter(s -> s.getMovieId() == movieId).toList();
    }

    public Show getShowById(int id) {
        return shows.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
    }

    // Bookings
    public List<Booking> getAllBookings() { return bookings; }

    public List<Booking> getBookingsByUser(String userName) {
        return bookings.stream().filter(b -> b.getUserName().equalsIgnoreCase(userName)).toList();
    }

    public Booking createBooking(int showId, String userName, List<String> seats) {
        Show show = getShowById(showId);
        if (show == null || show.getAvailableSeats() < seats.size()) return null;
        show.setAvailableSeats(show.getAvailableSeats() - seats.size());
        double total = show.getPrice() * seats.size();
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        Booking booking = new Booking(bookingIdCounter.getAndIncrement(), showId, userName, seats, total, "CONFIRMED", now);
        bookings.add(booking);
        return booking;
    }

    public boolean cancelBooking(int bookingId) {
        Booking b = bookings.stream().filter(bk -> bk.getId() == bookingId).findFirst().orElse(null);
        if (b == null || b.getStatus().equals("CANCELLED")) return false;
        b.setStatus("CANCELLED");
        Show show = getShowById(b.getShowId());
        if (show != null) show.setAvailableSeats(show.getAvailableSeats() + b.getSeats().size());
        return true;
    }
}
