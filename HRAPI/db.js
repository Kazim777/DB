const { Pool } = require("pg")
require("dotenv").config()

// Log the database URL (with password masked for security)
const dbUrlForLogging = process.env.DATABASE_URL
  ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ":***@")
  : "No DATABASE_URL found"
console.log("Using database URL:", dbUrlForLogging)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.message)
  } else {
    console.log("Database connected successfully at:", res.rows[0].now)
  }
})

module.exports = pool
