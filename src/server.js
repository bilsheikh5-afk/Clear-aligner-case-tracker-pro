// server.js
const express = require('express');
const path = require('path');
const app = express();

// ✅ Serve all static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route: Homepage → index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Route: Login page → login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Optional: 404 fallback (if no route/file matches)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Use Render's PORT or fallback to 3000 for local dev
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
