import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../errors/NotFound";

function DriverDashboard({ user, onLogout }) {
  const [trajets, setTrajets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const data = await apiRequest("/trajets/mes-trajets");
        setTrajets(data.trajets);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrajets();
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [
    { id: "overview", label: "Vue d'ensemble", icon: "⌂", path: "/driver" },
    { id: "trips", label: "Mes trajets", icon: "⇄", path: "/driver/trajets" },
  ];
  const routes = {
    "/driver": "overview",
    "/driver/trajets": "trips",
  };
  useEffect(() => {
    setActiveSection(routes[location.pathname] || "overview");
  }, [location.pathname]);
  const sectionTitles = {
    overview: "Vue d'ensemble",
    trips: "Mes trajets",
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("fr-FR");
  };

  const plannedTrips = trajets.filter(
    (trajet) => trajet.statut === "planifie",
  ).length;

  const activeTrips = trajets.filter(
    (trajet) => trajet.statut === "en_cours",
  ).length;

  const completedTrips = trajets.filter(
    (trajet) => trajet.statut === "termine",
  ).length;

  const statusLabels = {
    planifie: "Planifié",
    en_cours: "En cours",
    termine: "Terminé",
    annule: "Annulé",
  };
  if (!routes[location.pathname]) {
    return <NotFound />;
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      navigation={navigation}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      title={sectionTitles[activeSection]}
    >
      {activeSection === "overview" && (
        <>
          <section className="welcome-banner">
            <div>
              <span>ESPACE CHAUFFEUR</span>
              <h2>Bienvenue, {user.nom} 👋</h2>
              <p>
                Retrouvez vos missions et suivez l'avancement de vos trajets
                depuis votre espace personnel.
              </p>
            </div>

            <div className="welcome-decoration">F</div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon blue">⇄</div>
              <span>Total des trajets</span>
              <strong>{loading ? "..." : trajets.length}</strong>
              <small>Vos missions enregistrées</small>
            </article>

            <article className="stat-card">
              <div className="stat-icon cyan">◷</div>
              <span>Trajets planifiés</span>
              <strong>{loading ? "..." : plannedTrips}</strong>
              <small>Missions à effectuer</small>
            </article>

            <article className="stat-card">
              <div className="stat-icon purple">↗</div>
              <span>Trajets en cours</span>
              <strong>{loading ? "..." : activeTrips}</strong>
              <small>Missions en progression</small>
            </article>

            <article className="stat-card">
              <div className="stat-icon blue">✓</div>
              <span>Trajets terminés</span>
              <strong>{loading ? "..." : completedTrips}</strong>
              <small>Missions réalisées</small>
            </article>
          </section>

          <section className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <span>VOTRE ESPACE</span>
                <h2>Informations personnelles</h2>
              </div>
            </div>

            <div className="profile-info">
              <div>
                <span>Nom complet</span>
                <strong>{user.nom}</strong>
              </div>

              <div>
                <span>Adresse email</span>
                <strong>{user.email}</strong>
              </div>

              <div>
                <span>Rôle</span>
                <strong>Chauffeur</strong>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/driver/trajets")}
            >
              Consulter mes trajets →
            </button>
          </section>
        </>
      )}

      {activeSection === "trips" && (
        <section className="dashboard-panel management-panel">
          <div className="management-toolbar">
            <div>
              <h2>Mes trajets</h2>
              <p>Consultez vos missions et leur état d'avancement.</p>
            </div>
          </div>

          {loading && <p>Chargement des trajets...</p>}

          {error && <p className="form-error">{error}</p>}

          {!loading && !error && (
            <div className="table-wrapper">
              <div className="table-heading">
                <h2>Liste de mes trajets</h2>
                <p>Nombre de trajets : {trajets.length}</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Origine</th>
                    <th>Destination</th>
                    <th>Date de départ</th>
                    <th>Camion</th>
                    <th>Remorque</th>
                    <th>Statut</th>
                  </tr>
                </thead>

                <tbody>
                  {trajets.map((trajet) => (
                    <tr key={trajet._id}>
                      <td>{trajet.origine}</td>
                      <td>{trajet.destination}</td>
                      <td>{formatDate(trajet.dateDepart)}</td>
                      <td>{trajet.camion?.matricule || "-"}</td>
                      <td>{trajet.remorque?.matricule || "-"}</td>
                      <td>
                        <span
                          className={`status-badge status-${trajet.statut}`}
                        >
                          {statusLabels[trajet.statut] || trajet.statut}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {trajets.length === 0 && (
                    <tr>
                      <td colSpan="6" className="table-empty">
                        Aucun trajet trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </DashboardLayout>
  );
}

export default DriverDashboard;
