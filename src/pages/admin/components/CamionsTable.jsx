function CamionsTable({ camions, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p>Chargement des camions...</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div className="table-wrapper">
      <div className="table-heading">
        <h3>Liste des camions</h3>
        <span>{camions.length} véhicule(s)</span>
      </div>

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
              <td>
                <strong>{camion.matricule}</strong>
              </td>
              <td>{camion.marque}</td>
              <td>{camion.modele}</td>
              <td>{Number(camion.kilometrage).toLocaleString("fr-FR")} km</td>

              <td>
                <span className={`status-badge status-${camion.statut}`}>
                  {camion.statut}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="action-edit"
                    onClick={() => onEdit(camion)}
                  >
                    Modifier
                  </button>

                  <button
                    className="action-delete"
                    onClick={() => onDelete(camion)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {camions.length === 0 && (
            <tr>
              <td colSpan="6" className="table-empty">
                Aucun camion trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CamionsTable;
