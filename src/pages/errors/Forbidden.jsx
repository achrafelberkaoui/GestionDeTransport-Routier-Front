import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <main className="error-page">
      <h1>403</h1>
      <h2>Accès interdit</h2>
      <p>Vous n'avez pas les autorisations nécessaires.</p>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  );
}

export default Forbidden;
