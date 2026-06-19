package com.cineverse.api.controller;

import com.cineverse.api.model.Movie;
import com.cineverse.api.service.DataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private DataStore dataStore;

    @GetMapping
    public List<Movie> getAllMovies() {
        return dataStore.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable int id) {
        Movie movie = dataStore.getMovieById(id);
        return movie != null ? ResponseEntity.ok(movie) : ResponseEntity.notFound().build();
    }

    // Admin only
    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(dataStore.addMovie(movie));
    }

    // Admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable int id) {
        boolean deleted = dataStore.deleteMovie(id);
        return deleted ? ResponseEntity.ok("Movie deleted") : ResponseEntity.notFound().build();
    }
}
