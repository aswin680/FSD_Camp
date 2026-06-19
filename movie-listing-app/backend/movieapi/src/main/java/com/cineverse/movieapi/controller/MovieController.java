package com.cineverse.movieapi.controller;

import com.cineverse.movieapi.model.Movie;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final List<Movie> movies = Arrays.asList(
        new Movie(1, "Interstellar", "Sci-Fi", "English", 8.6,
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 2014),
        new Movie(2, "The Dark Knight", "Action", "English", 9.0,
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests.", 2008),
        new Movie(3, "Inception", "Thriller", "English", 8.8,
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.", 2010),
        new Movie(4, "3 Idiots", "Comedy", "Hindi", 8.4,
            "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
            "Two friends search for their long lost companion while reminiscing about their adventures at an engineering college.", 2009),
        new Movie(5, "KGF Chapter 2", "Action", "Kannada", 8.2,
            "https://image.tmdb.org/t/p/w500/4j4dfHBvNcAYqFCMSIie4XMVD0A.jpg",
            "Rocky's authority increases manifold and he becomes the undisputed ruler of Narachi while his enemies plan to destroy him.", 2022),
        new Movie(6, "Avengers: Endgame", "Action", "English", 8.4,
            "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions.", 2019)
    );

    @GetMapping
    public List<Movie> getAllMovies() {
        return movies;
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable int id) {
        return movies.stream()
            .filter(m -> m.getId() == id)
            .findFirst()
            .orElse(null);
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        return movies.stream()
            .filter(m -> m.getTitle().toLowerCase().contains(title.toLowerCase()))
            .toList();
    }
}
