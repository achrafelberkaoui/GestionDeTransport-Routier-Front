function UserForm({
  newUser,
  setNewUser,
  handleCreateUser,
  editingUser,
  editForm,
  setEditForm,
  handleUpdateUser,
  cancelEdit,
  success,
  error,
}) {
  const isEditing = Boolean(editingUser);

  const formData = isEditing ? editForm : newUser;
  const setFormData = isEditing ? setEditForm : setNewUser;

  const handleSubmit = isEditing ? handleUpdateUser : handleCreateUser;

  return (
    <div>
      <h3>
        {isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={formData.nom}
          onChange={(event) =>
            setFormData({
              ...formData,
              nom: event.target.value,
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) =>
            setFormData({
              ...formData,
              email: event.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder={
            isEditing ? "Nouveau mot de passe (facultatif)" : "Mot de passe"
          }
          autoComplete="new-password"
          minLength={6}
          value={formData.password}
          onChange={(event) =>
            setFormData({
              ...formData,
              password: event.target.value,
            })
          }
          required={!isEditing}
        />

        <select
          value={formData.role}
          onChange={(event) =>
            setFormData({
              ...formData,
              role: event.target.value,
            })
          }
        >
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        {isEditing && (
          <select
            value={formData.statut}
            onChange={(event) =>
              setFormData({
                ...formData,
                statut: event.target.value,
              })
            }
          >
            <option value="actif">Actif</option>
            <option value="suspendu">Suspendu</option>
          </select>
        )}

        <button type="submit">
          {isEditing ? "Enregistrer les modifications" : "Ajouter utilisateur"}
        </button>

        {isEditing && (
          <button type="button" onClick={cancelEdit}>
            Annuler
          </button>
        )}
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UserForm;
