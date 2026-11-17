function CamionsTable({ camions, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p>Chargement des camions...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (camions.length === 0) {
    return <p>Aucun camion trouvé.</p>;
  }

  return (
    <div>
      <h2>Liste des camions</h2>

      <p>Nombre de camions : {camions.length}</p>

      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Kilométrage</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {camions.map((camion) => (
            <tr key={camion._id}>
              <td>{camion.matricule}</td>
              <td>{camion.marque}</td>
              <td>{camion.modele}</td>
              <td>{camion.kilometrage} km</td>
              <td>{camion.statut}</td>
              <td>
                <button onClick={() => onEdit(camion)}>Modifier</button>

                <button onClick={() => onDelete(camion)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CamionsTable;
