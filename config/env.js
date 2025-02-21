import { config } from "dotenv";

// Load the correct .env file in development, but use Railway variables in production
if (process.env.NODE_ENV !== "production") {
  config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
}

// Export environment variables
export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES,
  ARCJET_KEY,
  ARCJET_ENV,
  SERVER_URL,
  QSTASH_TOKEN,
  QSTASH_URL,
  EMAIL_PASSWORD
} = process.env;