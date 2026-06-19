export default function Navbar({ user, onLogout, active, setActive, tabs }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">🎬 CineVerse</div>
      <div className="nav-tabs">
        {tabs.map(t => (
          <button key={t} className={`nav-tab ${active === t ? "active" : ""}`} onClick={() => setActive(t)}>{t}</button>
        ))}
      </div>
      <div className="nav-user">
        <span className={`role-badge ${user.role}`}>{user.role.toUpperCase()}</span>
        <span className="nav-name">👋 {user.name}</span>
        <button className="btn-logout" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
