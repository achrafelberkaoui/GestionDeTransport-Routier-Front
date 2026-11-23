
function UsersTable({ users, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div className="table-wrapper">
      <div className="table-heading">
        <h2>Liste des utilisateurs</h2>
        <p>Nombre d'utilisateurs : {users.length}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item) => (
            <tr key={item._id || item.id}>
              <td>{item.nom}</td>
              <td>{item.email}</td>

              <td>
                {item.role === "admin" ? "Administrateur" : "Chauffeur"}
              </td>

              <td>
                <span className={`status-badge status-${item.statut}`}>
                  {item.statut === "actif" ? "Actif" : "Suspendu"}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="action-edit"
                    onClick={() => onEdit(item)}
                  >
                    Modifier
                  </button>

                  <button
                    className="action-delete"
                    onClick={() => onDelete(item)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="table-empty">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
