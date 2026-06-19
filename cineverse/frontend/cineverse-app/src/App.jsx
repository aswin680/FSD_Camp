import { useState } from "react";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null); // { name, role }

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  if (!user) return <Login onLogin={handleLogin} />;
  if (user.role === "admin") return <AdminDashboard user={user} onLogout={handleLogout} />;
  return <UserDashboard user={user} onLogout={handleLogout} />;
}
