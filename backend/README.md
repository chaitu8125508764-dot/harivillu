# 🌈 Harivillu Collections — Java Spring Boot REST API Backend

> **Enterprise E-Commerce Backend Engine**  
> Built with **Java 17+**, **Spring Boot 3.3.x**, **Spring Data JPA**, **Hibernate ORM**, **Jakarta Bean Validation**, and embedded **H2 Database** (with zero-setup local storage and seamless PostgreSQL production readiness).

---

## 🏛️ Architecture & System Design (10 Senior Perspectives)

```
com.harivillu
├── config/
│   └── CorsConfig.java               # Cross-Origin (CORS) for React frontend (http://localhost:3000)
├── controller/
│   ├── ProductController.java        # REST APIs for saree catalog, age filtering, and search
│   ├── OrderController.java          # Order placement, shipping calculation, and live tracking
│   ├── CouponController.java         # Promo code validation (HARIVILLU20, FIRST10)
│   ├── ReviewController.java         # Verified customer reviews and parent ratings
│   └── NewsletterController.java     # VIP Royalty Club subscription & coupon unlocks
├── model/
│   ├── Product.java                  # JPA Entity: pure silk specs, zari finishes, age categories
│   ├── Order.java                    # JPA Entity: customer info, addresses, amounts, status
│   ├── OrderItem.java                # JPA Entity: individual saree items, sizes, colors
│   ├── Coupon.java                   # JPA Entity: promotional discount rules
│   ├── CustomerReview.java           # JPA Entity: verified mother reviews & ratings
│   └── NewsletterSubscriber.java     # JPA Entity: VIP email leads
├── repository/
│   ├── ProductRepository.java        # Spring Data JPA queries: search, age, ready-to-wear
│   ├── OrderRepository.java          # Order lookup by orderNumber (#HVS-XXXXX)
│   ├── CouponRepository.java         # Case-insensitive coupon lookup
│   ├── CustomerReviewRepository.java # Verified reviews descending
│   └── NewsletterRepository.java     # Subscriber management
├── service/
│   ├── ProductService.java           # Business logic for catalog retrieval and search
│   ├── OrderService.java             # Free delivery threshold, discount logic, order generation
│   └── CouponService.java            # Promo code evaluation
├── dto/
│   ├── ApiResponse.java              # Unified response envelope { success, message, data, timestamp }
│   └── OrderRequest.java             # Validated customer order payload
├── exception/
│   └── GlobalExceptionHandler.java   # @RestControllerAdvice for clean JSON error responses
└── HarivilluApplication.java         # Main class & automatic database seeding CommandLineRunner
```

---

## ⚡ REST API Specifications

### 1. Products API
* **Get All Products:**
  `GET http://localhost:8080/api/products`
* **Filter by Category:**
  `GET http://localhost:8080/api/products?category=kanchi-silks`
* **Filter by Age Group:**
  `GET http://localhost:8080/api/products?age=4-6`
* **Search Products:**
  `GET http://localhost:8080/api/products?search=peacock`
* **Get 1-Minute Ready-to-Wear Only:**
  `GET http://localhost:8080/api/products/ready-to-wear`
* **Get Product By ID:**
  `GET http://localhost:8080/api/products/hvs-001`

### 2. Orders & Checkout API
* **Place New Order:**
  `POST http://localhost:8080/api/orders`
  ```json
  {
    "customerName": "Sowmya Reddy",
    "customerEmail": "sowmya@example.com",
    "customerPhone": "+91 9876543210",
    "shippingAddress": "Plot 42, Jubilee Hills Road No 36",
    "city": "Hyderabad",
    "postalCode": "500033",
    "country": "India",
    "couponCode": "HARIVILLU20",
    "items": [
      {
        "productId": "hvs-001",
        "ageGroup": "7-9 Yrs",
        "color": "Peacock Teal & Rani Pink",
        "quantity": 1
      }
    ]
  }
  ```
* **Track Order by Order Number:**
  `GET http://localhost:8080/api/orders/HVS-88492`

### 3. Coupons & Promotions API
* **Validate Coupon Code:**
  `GET http://localhost:8080/api/coupons/validate/HARIVILLU20`
  *Returns:* Flat 20% discount confirmation.
* **Welcome Coupon:**
  `GET http://localhost:8080/api/coupons/validate/FIRST10`
  *Returns:* 10% first-order discount.

### 4. Verified Customer Reviews API
* **Get Verified Parent Reviews:**
  `GET http://localhost:8080/api/reviews`
* **Submit Review:**
  `POST http://localhost:8080/api/reviews`

### 5. Newsletter / VIP Club API
* **Subscribe for 20% Off:**
  `POST http://localhost:8080/api/newsletter/subscribe`
  ```json
  {
    "email": "mother@example.com"
  }
  ```

---

## 🗄️ In-Memory Database & H2 Web Console

The backend runs an embedded **H2 Database** with automatic data seeding:
* **H2 Console URL:** `http://localhost:8080/api/h2-console`
* **JDBC URL:** `jdbc:h2:mem:harivilludb`
* **Username:** `sa`
* **Password:** *(leave blank)*

---

## 🚀 How to Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *(Or open in IntelliJ IDEA, Eclipse, or VS Code and run `HarivilluApplication.java`)*
3. The server starts at `http://localhost:8080/api` with CORS enabled for your React frontend!
