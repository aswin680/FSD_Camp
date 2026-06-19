package com.cineverse.api.model;

public class Movie {
    private int id;
    private String title;
    private String genre;
    private String language;
    private double rating;
    private String poster;
    private String description;
    private int year;
    private int duration; // minutes

    public Movie() {}

    public Movie(int id, String title, String genre, String language,
                 double rating, String poster, String description, int year, int duration) {
        this.id = id; this.title = title; this.genre = genre;
        this.language = language; this.rating = rating; this.poster = poster;
        this.description = description; this.year = year; this.duration = duration;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
}
