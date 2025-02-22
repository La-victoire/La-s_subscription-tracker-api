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