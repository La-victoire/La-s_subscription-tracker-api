

# La's Subscription Checker API

**Node.js | Express | MongoDB | Upstash QStash | Railway | Archer**

## 📌 Overview
La’s Subscription Checker is an API designed to help users **track, manage, and get reminders** for their subscriptions. It provides authentication, subscription CRUD operations, and upcoming renewal tracking.

## 🚀 Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (Bearer Token)
- **Job Scheduling & Webhooks**: Upstash QStash
- **Deployment**: Railway
- **Monitoring & Security**: Archer

## 🌍 Base URL
📌 **Deployed API**: [`https://la-ssubscription-tracker-api-production.up.railway.app`](https://la-ssubscription-tracker-api-production.up.railway.app)

## 🔑 Authentication
- Uses **JWT Bearer Token** authentication.
- **Sign-in requires**: `email`, `password`.
- **Sign-up requires**: `name`, `email`, `password`.
- **Include token** in the `Authorization` header for protected routes:

  ```bash
  Authorization: Bearer <your_jwt_token>
  ```

## 📂 API Endpoints

### 1️⃣ Authentication Routes

#### Sign Up

**POST** `/api/v1/auth/sign-up`

**Description**: Register a new user.

**Request Body (JSON)**:

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

**Response (201 Created)**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "token": "your_jwt_token"
  }
}
```

#### Sign In

**POST** `/api/v1/auth/sign-in`

**Description**: Authenticate a user and return a JWT token.

**Request Body (JSON)**:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "your_jwt_token"
}
```

#### Sign Out (🚧 In Production)

**POST** `/api/v1/auth/sign-out`

**Description**: Logs out the user (feature in production).

---

### 2️⃣ User Routes

#### Get All Users

**GET** `/api/v1/users/`

**Description**: Retrieves all registered users.

#### Get a User

**GET** `/api/v1/users/:id` (🔐 Protected)

**Description**: Retrieves a single user by ID.

#### Create a User (🚧 In Production)

**POST** `/api/v1/users/`

**Description**: Creates a new user (feature in production).

#### Update a User (🚧 In Production)

**PUT** `/api/v1/users/:id`

**Description**: Updates user details (feature in production).

#### Delete a User (🚧 In Production)

**DELETE** `/api/v1/users/:id`

**Description**: Deletes a user (feature in production).

---

### 3️⃣ Subscription Routes

#### Get All Subscriptions

**GET** `/api/v1/subscriptions/`

**Description**: Retrieves all subscriptions.

#### Get a User's Subscriptions

**GET** `/api/v1/subscriptions/user/:id` (🔐 Protected)

**Description**: Fetch subscriptions for a specific user.

#### Get a Subscription

**GET** `/api/v1/subscriptions/:id` (🔐 Protected)

**Description**: Fetches a single subscription.

#### Create a Subscription

**POST** `/api/v1/subscriptions/` (🔐 Protected)

**Description**: Adds a new subscription for the authenticated user.

**Request Body (JSON)**:

```json
{
  "subscriptionName": "Netflix",
  "price": 999,
  "currency": "NGN",
  "frequency": "monthly",
  "category": "Entertainment",
  "paymentMethod": "credit card",
  "startDate": "2025-02-22"
}
```

**Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "id": "subscription_id",
    "user": "user_id",
    "subscriptionName": "Netflix",
    "price": 999,
    "currency": "NGN",
    "frequency": "monthly",
    "category": "Entertainment",
    "paymentMethod": "credit card",
    "startDate": "2025-02-22"
  }
}
```

#### Update a Subscription (🚧 In Production)

**PUT** `/api/v1/subscriptions/:id`

**Description**: Updates a subscription’s details (feature in production).

#### Cancel a Subscription (🚧 In Production)

**PUT** `/api/v1/subscriptions/:id/cancel`

**Description**: Cancels a subscription (feature in production).

#### Delete a Subscription (🚧 In Production)

**DELETE** `/api/v1/subscriptions/:id`

**Description**: Deletes a subscription (feature in production).

#### Get Upcoming Renewals

**GET** `/api/v1/subscriptions/upcoming-renewals`

**Description**: Fetches upcoming renewals.

---

### 4️⃣ Webhook Routes

#### Subscription Reminder Workflow

**POST** `/api/v1/workflows/subscription/reminder`

**Description**: Sends reminders for upcoming subscriptions using Upstash QStash.

**Request Body (JSON)**:

```json
{
  "subscriptionId": "subscription_id"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "message": "Reminder workflow triggered"
}
```

---

## 📊 Database Schema (Mongoose)

### User Model

```json
{
  "name": { "type": "String", "required": true },
  "email": { "type": "String", "required": true, "unique": true },
  "password": { "type": "String", "required": true },
  "createdAt": { "type": "Date", "default": "Date.now" }
}
```

### Subscription Model

```json
{
  "user": { "type": "mongoose.Schema.Types.ObjectId", "ref": "User", "required": true },
  "subscriptionName": { "type": "String", "required": true },
  "price": { "type": "Number", "required": true, "max": 1000 },
  "currency": { "type": "String", "enum": ["NGN", "USD", "GBP"], "required": true },
  "frequency": { "type": "String", "required": true },
  "category": { "type": "String", "required": true },
  "paymentMethod": { "type": "String", "required": true },
  "startDate": { "type": "Date", "required": true }
}
```

---

## 🔧 Environment Variables

List the environment variables required for the application here.

---

## 📌 Deployment

- Hosted on Railway
- Uses Upstash QStash for scheduling reminders

---

You can now copy and paste this formatted README content into your repository. Let me know if there are any additional sections or changes you would like to make.