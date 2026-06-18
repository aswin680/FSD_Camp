# Day 06 – Booking Service & Seat Management

## Objective
Build a Booking Service to handle show scheduling, seat selection, and the full booking workflow while preventing double booking under concurrent users.

## Tech Stack
- Spring Boot
- PostgreSQL
- Spring Data JPA

## API Endpoints

### Shows
| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /shows` | POST | Create a show (Movie + Screen + Time) |
| `GET /shows` | GET | List all shows |
| `GET /shows/{id}` | GET | Get show details |

### Seat Availability
| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /shows/{showId}/seats` | GET | Get seat layout with availability status |
| `POST /shows/{showId}/seats/lock` | POST | Temporarily lock selected seats |

### Bookings
| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /bookings` | POST | Create a booking with selected seats |
| `GET /bookings/{id}` | GET | Get booking details |
| `PUT /bookings/{id}/confirm` | PUT | Confirm booking |
| `PUT /bookings/{id}/cancel` | PUT | Cancel booking |

## Booking Flow
```
User selects seats
      ↓
Seats temporarily LOCKED
      ↓
Booking created → status: INITIATED
      ↓
Payment / Confirmation
      ↓
Booking status: CONFIRMED
      ↓ (if failed/timeout)
Booking status: CANCELLED → Seats released back to AVAILABLE
```

## Seat States
| State | Description |
|-------|-------------|
| `AVAILABLE` | Free to book |
| `LOCKED` | Temporarily held for a user (e.g., 5 min timeout) |
| `BOOKED` | Confirmed booking |

## Double Booking Prevention
- Before locking, seat status is checked within a DB transaction
- `SELECT ... FOR UPDATE` / optimistic locking used to prevent race conditions
- If seat is already `LOCKED` or `BOOKED`, request is rejected with `409 Conflict`

## Data Model Relationships
```
Movie → Screen → Show
Show → SeatAvailability (per show)
Booking → Show + List of Seats
```

## Database Configuration
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cineverse_booking
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## How to Run
```bash
createdb cineverse_booking
mvn spring-boot:run
```
Service runs at `http://localhost:8083`
