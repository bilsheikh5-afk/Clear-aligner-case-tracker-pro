// Import dependencies
const express = require('express');
const path = require('path');

const app = express();

// ✅ Serve all static files from "src/public"
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route: Homepage → index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Route: Login page → login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Optional: 404 fallback (serves index.html for unknown routes)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Use Render's provided PORT or fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
