package com.cineverse.api.model;

import java.util.List;

public class Booking {
    private int id;
    private int showId;
    private String userName;
    private List<String> seats;
    private double totalAmount;
    private String status; // CONFIRMED, CANCELLED
    private String bookedAt;

    public Booking() {}

    public Booking(int id, int showId, String userName, List<String> seats,
                   double totalAmount, String status, String bookedAt) {
        this.id = id; this.showId = showId; this.userName = userName;
        this.seats = seats; this.totalAmount = totalAmount;
        this.status = status; this.bookedAt = bookedAt;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public int getShowId() { return showId; }
    public void setShowId(int showId) { this.showId = showId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public List<String> getSeats() { return seats; }
    public void setSeats(List<String> seats) { this.seats = seats; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getBookedAt() { return bookedAt; }
    public void setBookedAt(String bookedAt) { this.bookedAt = bookedAt; }
}
