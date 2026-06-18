# Day 07 – Redis Caching & Performance Optimization

## Objective
Integrate Redis caching into the CineVerse services to reduce database load and improve API performance for high-read operations.

## Tech Stack
- Spring Boot
- Redis
- Spring Cache (`@Cacheable`, `@CacheEvict`)
- PostgreSQL / MongoDB (existing services)

## APIs Cached

| API | Cache Name | TTL | Eviction Trigger |
|-----|-----------|-----|-----------------|
| `GET /movies` | `movies` | 10 min | Movie updated/deleted |
| `GET /movies/{id}` | `movie` | 10 min | That movie updated/deleted |
| `GET /theatres` | `theatres` | 10 min | Theatre updated/deleted |
| `GET /theatres/{id}` | `theatre` | 10 min | That theatre updated/deleted |
| `GET /shows/{showId}/seats` | `seatAvailability` | 2 min | Booking created/cancelled |

## Caching Annotations Used

### `@Cacheable` – Read
```java
@Cacheable(value = "movies", key = "#id")
public MovieDTO getMovieById(String id) { ... }
```

### `@CacheEvict` – Update / Delete
```java
@CacheEvict(value = "movies", key = "#id")
public MovieDTO updateMovie(String id, MovieDTO dto) { ... }

@CacheEvict(value = "movies", allEntries = true)
public void deleteMovie(String id) { ... }
```

## Redis Configuration
```properties
spring.cache.type=redis
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.cache.redis.time-to-live=600000
```

## Cache Consistency Rules
| Event | Cache Action |
|-------|-------------|
| Movie updated | Evict `movie::{id}` + `movies` |
| Theatre updated | Evict `theatre::{id}` + `theatres` |
| Show/seat updated | Evict `seatAvailability::{showId}` |
| Booking confirmed | Evict seat availability cache for that show |

## Performance Improvement
- DB calls on cached APIs drop to near-zero after first request
- Logs show `Cache hit` vs `Cache miss` for visibility
- Seat availability cache has shorter TTL (2 min) to stay consistent with bookings

## How to Run
```bash
# Start Redis
redis-server

# Verify Redis is running
redis-cli ping   # should return PONG

# Run the service
mvn spring-boot:run
```

## Testing Cache Behaviour
1. Call `GET /movies` → first call hits DB (cache miss, logged)
2. Call `GET /movies` again → served from Redis (cache hit, no DB call)
3. Call `PUT /movies/{id}` → cache evicted
4. Call `GET /movies/{id}` → DB hit again (cache miss)
