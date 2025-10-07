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

// ❌ Remove this — it forces everything to use index.html
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// ✅ Optional: add a real 404 page
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
