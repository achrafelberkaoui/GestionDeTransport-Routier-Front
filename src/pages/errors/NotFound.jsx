import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="error-page">
      <h1>404</h1>
      <h2>Page introuvable</h2>
      <p>La page demandée n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  );
}

export default NotFound;
