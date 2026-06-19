package com.cineverse.api.model;

public class Show {
    private int id;
    private int movieId;
    private String theatre;
    private String date;
    private String time;
    private int totalSeats;
    private int availableSeats;
    private double price;

    public Show() {}

    public Show(int id, int movieId, String theatre, String date,
                String time, int totalSeats, int availableSeats, double price) {
        this.id = id; this.movieId = movieId; this.theatre = theatre;
        this.date = date; this.time = time; this.totalSeats = totalSeats;
        this.availableSeats = availableSeats; this.price = price;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public int getMovieId() { return movieId; }
    public void setMovieId(int movieId) { this.movieId = movieId; }
    public String getTheatre() { return theatre; }
    public void setTheatre(String theatre) { this.theatre = theatre; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
