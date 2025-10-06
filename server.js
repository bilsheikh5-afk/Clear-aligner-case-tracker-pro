```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Clear Aligner Case Tracker Pro</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      overflow: hidden;
    }

    /* Animated background particles */
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
      animation: float 20s linear infinite;
      z-index: -1;
    }

    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-100px) rotate(360deg); }
    }

    .login-box {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 50px 40px;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 420px;
      text-align: center;
      position: relative;
      animation: slideIn 0.8s ease-out;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .login-box h2 {
      margin-bottom: 30px;
      color: #1e40af;
      font-weight: 700;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .input-container {
      position: relative;
      margin-bottom: 20px;
      width: 100%;
    }

    .input-container input {
      width: 100%;
      padding: 15px 45px 15px 15px;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.8);
      transition: var(--transition);
      outline: none;
    }

    .input-container input:focus {
      border-color: #1e40af;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }

    .toggle-password {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #6b7280;
      font-size: 1rem;
      transition: color 0.3s;
    }

    .toggle-password:hover {
      color: #1e40af;
    }

    .login-box button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      margin-top: 20px;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }

    .login-box button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .login-box button:hover::before {
      left: 100%;
    }

    .login-box button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
    }

    .login-box button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .message {
      margin-top: 15px;
      font-weight: 600;
      min-height: 20px;
      padding: 10px;
      border-radius: 8px;
      display: none;
    }

    .message.success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    .message.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .links {
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }

    .links a {
      text-decoration: none;
      color: #1e40af;
      font-weight: 600;
      margin: 0 10px;
      transition: color 0.3s;
    }

    .links a:hover {
      color: #1e3a8a;
    }

    /* Mobile optimization */
    @media (max-width: 500px) {
      .login-box {
        padding: 30px 20px;
        margin: 10px;
      }

      .login-box h2 {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h2><i class="fas fa-user-md"></i> Dr. Login</h2>

    <div class="input-container">
      <input type="text" id="username" placeholder="Username" required />
    </div>

    <div class="input-container">
      <input type="password" id="password" placeholder="Password" required />
      <i class="fas fa-eye toggle-password" id="togglePassword"></i>
    </div>

    <button id="loginBtn"><i class="fas fa-sign-in-alt"></i> Login</button>

    <div class="message" id="message"></div>

    <div class="links">
      <a href="register.html">Register New Patient</a> |
      <a href="index.html">Dashboard</a>
    </div>
  </div>

  <script>
    const BACKEND_URL = "https://clear-aligner-case-tracker.onrender.com";

    // Show/Hide password toggle
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", () => {
      const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      togglePassword.classList.toggle("fa-eye-slash");
    });

    // Login handler
    document.getElementById("loginBtn").addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      const password = passwordField.value.trim();
      const messageEl = document.getElementById("message");
      const btn = document.getElementById("loginBtn");

      if (!username || !password) {
        messageEl.textContent = "⚠️ Please enter both username and password.";
        messageEl.className = "message error";
        messageEl.style.display = "block";
        return;
      }

      // Loading state
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging In...';
      messageEl.style.display = "none";

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("jwtToken", data.token);
          messageEl.textContent = "✅ Login successful! Redirecting...";
          messageEl.className = "message success";
          messageEl.style.display = "block";

          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        } else {
          const errorData = await response.json();
          messageEl.textContent = "❌ Invalid username or password.";
          messageEl.className = "message error";
          messageEl.style.display = "block";
        }
      } catch (error) {
        console.error("Login error:", error);
        messageEl.textContent = "⚠️ Server error. Please try again later.";
        messageEl.className = "message error";
        messageEl.style.display = "block";
      } finally {
        // Reset button
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
      }
    });

    // Enter key submission
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("loginBtn").click();
      }
    });
  </script>
</body>
</html>
```