const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
console.log("hello");
// Create table if not exists
pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`
  )
  .catch((err) => console.error("Error creating table:", err));

// Routes
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new user
app.post("/api/users", async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING *",
      [username]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
