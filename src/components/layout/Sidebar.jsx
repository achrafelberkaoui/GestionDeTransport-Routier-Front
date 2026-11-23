function Sidebar({
  user,
  onLogout,
  navigation,
  activeSection,
  setActiveSection,
}) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-logo">
        <div className="dashboard-logo-icon">F</div>
        <div>
          <strong>
            FleetTrack<span>PRO</span>
          </strong>
          <small>FLEET MANAGEMENT</small>
        </div>
      </div>

      <div className="sidebar-label">MENU PRINCIPAL</div>

      <nav className="sidebar-navigation">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={`sidebar-link ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}

            {activeSection === item.id && (
              <span className="sidebar-indicator" />
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user.nom?.charAt(0).toUpperCase()}
          </div>

          <div className="sidebar-user-info">
            <strong>{user.nom}</strong>
            <span>Administrateur</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={onLogout}>
          <span>↪</span> Se déconnecter
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;