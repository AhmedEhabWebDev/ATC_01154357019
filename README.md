# 📅 Event Booking System (Back-End)
This is the back-end of an event booking system that allows users to browse and book events, manage their bookings, and provides secure APIs for admin event management.

The project was developed using AI tools like ChatGPT and GitHub Copilot to enhance productivity and streamline the development workflow.

### 🚀 Features
User registration and login.

Browse all available events.

Book events and manage bookings.

Admin panel for managing events (add, edit, delete).

User profile management (update personal data).

### 🛠️ Built With
Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Token) Authentication

bcryptjs for password hashing

dotenv for environment variables

express-rate-limit for request throttling & security

Joi for request validation and input sanitization

Postman for API testing

### 📂 Getting Started
#### 1️⃣ Install dependencies

---
npm install
---

#### 2️⃣ Configure environment variables
Create a .env file in the root directory and add:

---
PORT= 3000
MONGO_URI= "mongodb://127.0.0.1:27017/areeb_task"
SALT_ROUNDS = 12
LOGIN_SECRET = "signIn$@11"
PREFIX_SECRET = "eventSystem"
---
#### 3️⃣ Run the server

---
npm run start:dev
---

### 📑 API Endpoints
#### 🔐 User

| Method | Endpoint               | Description         | Auth |
| ------ | ---------------------- | ------------------- | ---- |
| POST   | /api/v1/users/register | Register a new user | ❌    |
| POST   | /api/v1/users/signin   | Login a user        | ❌    |
| GET    | /api/v1/users/me       | Get user profile    | ✅    |
| PUT    | /api/v1/users/update   | Update user profile | ✅    |

#### 🎟️ Event

| Method | Endpoint                   | Description             | Auth      |
| ------ | -------------------------- | ----------------------- | --------- |
| GET    | /api/v1/events             | Get all events          | ❌         |
| GET    | /api/v1/events/:id         | Get event details by ID | ❌         |
| POST   | /api/v1/events/add         | Create a new event      | ✅ (Admin) |
| PUT    | /api/v1/events/update/:id  | Update an event         | ✅ (Admin) |
| DELETE | /api/v1/events/delete/:id  | Delete an event         | ✅ (Admin) |

#### 📝 Booking

| Method | Endpoint                           | Description          | Auth |
| ------ | ---------------------------------- | -------------------- | ---- |
| POST   | /api/v1/booking/book               | Create a new booking | ✅    |
| GET    | /api/v1/booking/getBookingsForUser | Get user's bookings  | ✅    |
| DELETE | /api/v1/booking/cancel/:bookingId  | Cancel a booking     | ✅    |

### 🔑 Authentication

Send the token in the request headers:
---
Authorization: eventSystem <token>
---

### 🤖 AI Integration

This project was developed with the support of AI tools:

ChatGPT: Assisted in API design, controller logic, and improving overall structure.

GitHub Copilot: Helped with writing repetitive code blocks and speeding up development.

### 🛡️ Notes

Make sure MongoDB is running and accessible.

Use Postman or similar tools to test the API endpoints.

Role-based access control is implemented to secure admin routes.

# 🙌 Thanks for checking out the project!
