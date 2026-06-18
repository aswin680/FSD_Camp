# Day 03 – Spring Boot Authentication Service

## Objective
Build a secure Authentication Service with user registration, login, JWT-based authentication, and Role-Based Access Control (RBAC).

## Tech Stack
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- PostgreSQL
- BCrypt (password encryption)

## API Endpoints

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/auth/register` | POST | Register a new user | Public |
| `/auth/login` | POST | Authenticate user & return JWT | Public |

## Roles
| Role | Permissions |
|------|-------------|
| `USER` | Access user-facing features |
| `THEATRE_OWNER` | Manage movies, theatres, screens |
| `ADMIN` | Full access |

## Project Structure
```
auth-service/
├── controller/
│   └── AuthController.java
├── service/
│   └── AuthService.java
├── repository/
│   └── UserRepository.java
├── entity/
│   └── User.java
├── dto/
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   └── AuthResponse.java
├── security/
│   ├── JwtUtil.java
│   ├── JwtFilter.java
│   └── SecurityConfig.java
└── exception/
    └── GlobalExceptionHandler.java
```

## Database Configuration
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cineverse_auth
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Sample Request – Register
```json
POST /auth/register
{
  "name": "Aswin Patel",
  "email": "aswin@example.com",
  "password": "password123",
  "role": "USER"
}
```

## Sample Request – Login
```json
POST /auth/login
{
  "email": "aswin@example.com",
  "password": "password123"
}
```

## Sample Response – Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER"
}
```

## How to Run
```bash
# Start PostgreSQL and create database
createdb cineverse_auth

# Run the service
mvn spring-boot:run
```
Service runs at `http://localhost:8081`
