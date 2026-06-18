# Day 04 – API Gateway & Microservices Communication

## Objective
Design and implement an API Gateway using Spring Cloud Gateway with centralized JWT authentication and inter-service communication.

## Tech Stack
- Spring Boot
- Spring Cloud Gateway
- Spring Security
- JWT (reused from Day 03 Auth Service)
- RestTemplate / WebClient

## Gateway Route Configuration

| Route | Target Service | Port |
|-------|---------------|------|
| `/auth/**` | Auth Service | 8081 |
| `/movies/**` | Movie/Catalog Service | 8082 |
| `/booking/**` | Booking Service | 8083 |

## Project Structure
```
api-gateway/
├── config/
│   └── GatewayConfig.java
├── filter/
│   └── AuthFilter.java        # Global JWT validation filter
├── security/
│   └── SecurityConfig.java
└── application.yml
```

## application.yml – Route Config
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: auth-service
          uri: http://localhost:8081
          predicates:
            - Path=/auth/**
        - id: movie-service
          uri: http://localhost:8082
          predicates:
            - Path=/movies/**
        - id: booking-service
          uri: http://localhost:8083
          predicates:
            - Path=/booking/**
```

## Global Filter – JWT Validation
- Extracts JWT from `Authorization: Bearer <token>` header
- Validates token before forwarding the request
- Rejects unauthorized requests with `401 Unauthorized`
- Allows public access to `/auth/**`

## Microservice Communication
- Services communicate using `RestTemplate` or `WebClient`
- All inter-service calls route through the gateway
- No direct service-to-service exposure

## How to Run
```bash
# Start all services first
# Auth Service  → port 8081
# Movie Service → port 8082
# Booking Service → port 8083

# Then start gateway
mvn spring-boot:run
```
Gateway runs at `http://localhost:8080`

## Testing with Postman
1. Login via `POST http://localhost:8080/auth/login` → get JWT
2. Use JWT in `Authorization: Bearer <token>` header for all other requests
3. All protected routes must go through `localhost:8080`
