function UsersTable({ users, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      <p>Nombre d'utilisateurs : {users.length}</p>

      <table border="1" cellPadding="10">
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
              <td>{item.role}</td>
              <td>{item.statut}</td>
              <td>
                <button onClick={() => onEdit(item)}>
                  Modifier
                </button>

                <button onClick={() => onDelete(item)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
            {users.length === 0 && (
            <tr>
              <td colSpan="5">Aucun utilisateur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
