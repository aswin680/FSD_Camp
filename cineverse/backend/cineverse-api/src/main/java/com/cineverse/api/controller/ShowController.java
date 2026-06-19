package com.cineverse.api.controller;

import com.cineverse.api.model.Show;
import com.cineverse.api.service.DataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@CrossOrigin(origins = "*")
public class ShowController {

    @Autowired
    private DataStore dataStore;

    @GetMapping
    public List<Show> getAllShows() {
        return dataStore.getAllShows();
    }

    @GetMapping("/movie/{movieId}")
    public List<Show> getShowsByMovie(@PathVariable int movieId) {
        return dataStore.getShowsByMovie(movieId);
    }
}
