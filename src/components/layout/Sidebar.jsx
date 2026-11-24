
import { NavLink } from "react-router-dom";

function Sidebar({ user, onLogout, navigation }) {
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
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/admin" || item.path === "/driver"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
                {isActive && <span className="sidebar-indicator" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user.nom?.charAt(0).toUpperCase()}
          </div>

          <div className="sidebar-user-info">
            <strong>{user.nom}</strong>
            <span>
              {user.role === "admin" ? "Administrateur" : "Chauffeur"}
            </span>
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
