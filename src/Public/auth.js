// auth.js
const BACKEND_URL = "https://clear-aligner-case-tracker.onrender.com";

// Check authentication status
function requireAuth() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    alert("⚠️ Please log in to continue.");
    window.location.href = "login.html";
  }
  return token;
}

// Helper for authenticated API calls
async function apiRequest(endpoint, options = {}) {
  const token = requireAuth();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    alert("Session expired. Please log in again.");
    localStorage.removeItem("jwtToken");
    window.location.href = "login.html";
    return;
  }

  return response.json();
}