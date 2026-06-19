package com.cineverse.movieapi.model;

public class Movie {
    private int id;
    private String title;
    private String genre;
    private String language;
    private double rating;
    private String poster;
    private String description;
    private int year;

    public Movie(int id, String title, String genre, String language,
                 double rating, String poster, String description, int year) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.language = language;
        this.rating = rating;
        this.poster = poster;
        this.description = description;
        this.year = year;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getGenre() { return genre; }
    public String getLanguage() { return language; }
    public double getRating() { return rating; }
    public String getPoster() { return poster; }
    public String getDescription() { return description; }
    public int getYear() { return year; }
}
