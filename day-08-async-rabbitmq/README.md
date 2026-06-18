# Day 08 – Asynchronous Processing (RabbitMQ / Event-Driven System)

## Objective
Implement asynchronous communication using RabbitMQ to handle background tasks like booking confirmation and notifications without blocking the main booking flow.

## Tech Stack
- Spring Boot
- RabbitMQ (AMQP)
- Spring AMQP (`spring-boot-starter-amqp`)

## Event Flow

```
Booking Service (Producer)
        |
        |  publishes: BookingCreated event
        ↓
   [RabbitMQ Exchange]
        |
        ↓
Notification Service (Consumer)
        |
        ├── Sends booking confirmation email/SMS
        └── Logs the event
```

## RabbitMQ Setup

### Queue & Exchange Configuration
```java
// Exchange
@Bean
public TopicExchange bookingExchange() {
    return new TopicExchange("booking.exchange");
}

// Queue
@Bean
public Queue bookingQueue() {
    return new Queue("booking.queue", true); // durable
}

// Binding
@Bean
public Binding binding(Queue bookingQueue, TopicExchange bookingExchange) {
    return BindingBuilder.bind(bookingQueue)
        .to(bookingExchange)
        .with("booking.created");
}
```

## Event: BookingCreated

### Payload
```json
{
  "bookingId": "BKG-001",
  "userId": "USR-123",
  "movieTitle": "Interstellar",
  "showTime": "2025-06-10T18:30:00",
  "seats": ["A1", "A2"],
  "totalAmount": 500.00,
  "status": "CONFIRMED"
}
```

## Producer – Booking Service
```java
@Service
public class BookingEventPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publishBookingCreated(BookingEvent event) {
        rabbitTemplate.convertAndSend(
            "booking.exchange",
            "booking.created",
            event
        );
        log.info("BookingCreated event published: {}", event.getBookingId());
    }
}
```

## Consumer – Notification Service
```java
@Service
public class NotificationConsumer {

    @RabbitListener(queues = "booking.queue")
    public void handleBookingCreated(BookingEvent event) {
        log.info("Received BookingCreated event for bookingId: {}", event.getBookingId());
        // Send confirmation email/SMS
        notificationService.sendConfirmation(event);
    }
}
```

## application.properties
```properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

## How to Run

### 1. Start RabbitMQ
```bash
# Using Docker (recommended)
docker run -d --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management

# RabbitMQ Management UI → http://localhost:15672
# Default credentials: guest / guest
```

### 2. Start Services
```bash
# Start Booking Service (producer)
cd booking-service && mvn spring-boot:run

# Start Notification Service (consumer)
cd notification-service && mvn spring-boot:run
```

### 3. Trigger the Flow
```bash
POST http://localhost:8080/booking
Authorization: Bearer <JWT>
```
→ Booking gets created → `BookingCreated` event published to RabbitMQ → Notification consumer picks it up and logs/processes it.

## Sample Logs

**Producer (Booking Service):**
```
INFO  - Booking confirmed: BKG-001
INFO  - BookingCreated event published: BKG-001
```

**Consumer (Notification Service):**
```
INFO  - Received BookingCreated event for bookingId: BKG-001
INFO  - Confirmation notification sent to user USR-123
```
