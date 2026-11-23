
import { useState } from "react";
import { apiRequest } from "../../services/api";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      onLoginSuccess(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <div className="brand-icon">F</div>
          <span>FleetTrack<span className="brand-highlight">PRO</span></span>
        </div>

        <div className="visual-content">
          <span className="visual-tag">FLEET MANAGEMENT PLATFORM</span>
          <h1>Gérez votre flotte.<br />
            <span>Gardez le contrôle.</span>
          </h1>
          <p>
            Une plateforme intelligente pour suivre vos véhicules,
            gérer vos trajets et optimiser vos opérations de transport.
          </p>

          <div className="visual-stats">
            <div>
              <strong>01</strong>
              <span>Gestion centralisée</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Suivi des trajets</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Performance</span>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          <span>SMART TRANSPORT. BETTER MANAGEMENT.</span>
          <span>© 2026 FleetTrackPRO</span>
        </div>
      </section>

      <section className="login-form-section">
        <div className="login-form-container">
          <div className="mobile-brand">
            <div className="brand-icon">F</div>
            <strong>FleetTrack<span className="brand-highlight">PRO</span></strong>
          </div>

          <div className="form-heading">
            <span className="form-eyebrow">ESPACE SÉCURISÉ</span>
            <h2>Bienvenue !</h2>
            <p>Connectez-vous à votre espace de gestion.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nom@entreprise.com"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Entrez votre mot de passe"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Connexion en cours..." : "Se connecter"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-security">
            <span>●</span>
            Connexion sécurisée · FleetTrackPRO
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
