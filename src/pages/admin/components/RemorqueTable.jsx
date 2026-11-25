function RemorquesTable({ remorques, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p>Chargement des remorques...</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div className="table-wrapper">
      <div className="table-heading">
        <h3>Liste des Remorques</h3>
        <span>{remorques.length} véhicule(s)</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {remorques.map((remorque) => (
            <tr key={remorque._id}>
              <td>
                <strong>{remorque.matricule}</strong>
              </td>
              <td>{remorque.type}</td>
              <td>
                <span className={`status-badge status-${remorque.statut}`}>
                  {remorque.statut}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="action-edit"
                    onClick={() => onEdit(remorque)}
                  >
                    Modifier
                  </button>

                  <button
                    className="action-delete"
                    onClick={() => onDelete(remorque)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {remorques.length === 0 && (
            <tr>
              <td colSpan="4" className="table-empty">
                Aucun remorque trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RemorquesTable;
