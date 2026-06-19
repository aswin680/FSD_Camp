package com.cineverse.api.controller;

import com.cineverse.api.model.Booking;
import com.cineverse.api.service.DataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private DataStore dataStore;

    // Admin: get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return dataStore.getAllBookings();
    }

    // User: get my bookings
    @GetMapping("/user/{userName}")
    public List<Booking> getUserBookings(@PathVariable String userName) {
        return dataStore.getBookingsByUser(userName);
    }

    // User: create booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> body) {
        int showId = (int) body.get("showId");
        String userName = (String) body.get("userName");
        List<String> seats = (List<String>) body.get("seats");
        Booking booking = dataStore.createBooking(showId, userName, seats);
        if (booking == null) return ResponseEntity.badRequest().body("Not enough seats available");
        return ResponseEntity.ok(booking);
    }

    // User/Admin: cancel booking
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable int id) {
        boolean cancelled = dataStore.cancelBooking(id);
        return cancelled ? ResponseEntity.ok("Booking cancelled") : ResponseEntity.badRequest().body("Cannot cancel");
    }
}
