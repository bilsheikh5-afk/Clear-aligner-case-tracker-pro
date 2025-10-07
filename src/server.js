// /src/server.js
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// --- Mock user data ---
const USERS = [
  { username: "drsmith", password: "aligner123" },
  { username: "drjones", password: "smile2025" },
];

// --- LOGIN ENDPOINT ---
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

// --- AUTH MIDDLEWARE ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// --- PROTECTED ROUTE EXAMPLE ---
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome, Dr. ${req.user.username}!`,
    nextSteps: ["View patient list", "Add new case", "Track aligner progress"],
  });
});

// --- FRONTEND ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
