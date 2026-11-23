function Header({ user, title }) {
  return (
    <header className="dashboard-topbar">
      <div>
        <span className="topbar-eyebrow">FLEETTRACKPRO / ADMIN</span>
        <h1>{title}</h1>
      </div>

      <div className="topbar-profile">
        <div className="topbar-avatar">
          {user.nom?.charAt(0).toUpperCase()}
        </div>

        <div>
          <strong>{user.nom}</strong>
          <span>Administrateur</span>
        </div>
      </div>
    </header>
  );
}

export default Header;