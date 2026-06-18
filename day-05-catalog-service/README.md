# Day 05 – Movie Catalog Service (MongoDB)

## Objective
Develop a full Catalog Service with CRUD operations for movies, theatres, locations, auditoriums, and seat layouts using MongoDB.

## Tech Stack
- Spring Boot
- MongoDB
- Spring Security (RBAC)
- Spring Data MongoDB

## API Endpoints

### Movies
| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `GET /movies` | GET | USER, ADMIN | List all movies (paginated) |
| `GET /movies/{id}` | GET | USER, ADMIN | Get movie by ID |
| `GET /movies/search?title=&genre=` | GET | USER, ADMIN | Search movies |
| `POST /movies` | POST | THEATRE_OWNER, ADMIN | Add movie |
| `PUT /movies/{id}` | PUT | THEATRE_OWNER, ADMIN | Update movie |
| `DELETE /movies/{id}` | DELETE | ADMIN | Delete movie |

### Theatres
| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `GET /theatres` | GET | USER, ADMIN | List theatres (paginated) |
| `GET /theatres/{id}` | GET | USER, ADMIN | Get theatre by ID |
| `POST /theatres` | POST | THEATRE_OWNER, ADMIN | Add theatre |
| `PUT /theatres/{id}` | PUT | THEATRE_OWNER, ADMIN | Update theatre |
| `DELETE /theatres/{id}` | DELETE | ADMIN | Delete theatre |

### Locations
| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `GET /locations` | GET | ALL | List all locations |
| `POST /locations` | POST | ADMIN | Add location |

### Screens & Seats
| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /screens/{theatreId}` | GET | List screens for a theatre |
| `POST /screens` | POST | Add screen |
| `GET /seats/{screenId}` | GET | Get seat layout for screen |

## RBAC Summary
| Role | Access |
|------|--------|
| `USER` | View only |
| `THEATRE_OWNER` | Manage movies, theatres, screens |
| `ADMIN` | Full access including locations |

## Data Model Relationships
```
Location
  └── Theatre
        └── Screen (Auditorium)
              └── Seats
```

## Pagination & Sorting
- All listing APIs support `?page=0&size=10&sort=rating,desc`
- Sortable fields: `rating`, `name`, `releaseDate`

## Database Configuration
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/cineverse_catalog
```

## How to Run
```bash
# Start MongoDB
mongod

# Run the service
mvn spring-boot:run
```
Service runs at `http://localhost:8082`
