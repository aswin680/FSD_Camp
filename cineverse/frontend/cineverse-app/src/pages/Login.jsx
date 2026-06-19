import { useState } from "react";

const USERS = [
  { email: "user@cineverse.com", password: "user123", name: "Aswin", role: "user" },
  { email: "admin@cineverse.com", password: "admin123", name: "Admin", role: "admin" },
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      onLogin({ name: found.name, role: found.role });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="logo-big">🎬 CineVerse</div>
        <p className="login-sub">Book your movie experience</p>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="user@cineverse.com" type="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <button className="btn-primary full" onClick={handleSubmit}>Login</button>
        <div className="hint-box">
          <p>👤 User: user@cineverse.com / user123</p>
          <p>🔧 Admin: admin@cineverse.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
