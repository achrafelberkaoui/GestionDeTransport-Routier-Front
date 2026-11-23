
function UserForm({
  newUser,
  setNewUser,
  handleCreateUser,
  editingUser,
  editForm,
  setEditForm,
  handleUpdateUser,
  cancelEdit,
  error,
}) {
  const isEditing = Boolean(editingUser);

  const formData = isEditing ? editForm : newUser;
  const setFormData = isEditing ? setEditForm : setNewUser;

  const handleSubmit = isEditing ? handleUpdateUser : handleCreateUser;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom complet</label>
        <input
          id="nom"
          type="text"
          name="nom"
          placeholder="Nom complet"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Adresse email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder={
            isEditing
              ? "Nouveau mot de passe (facultatif)"
              : "Mot de passe"
          }
          autoComplete="new-password"
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          required={!isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Rôle</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="driver">Chauffeur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>

      {isEditing && (
        <div className="form-group">
          <label htmlFor="statut">Statut</label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
          >
            <option value="actif">Actif</option>
            <option value="suspendu">Suspendu</option>
          </select>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}

      <div className="modal-form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={cancelEdit}
        >
          Annuler
        </button>

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Enregistrer les modifications" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
