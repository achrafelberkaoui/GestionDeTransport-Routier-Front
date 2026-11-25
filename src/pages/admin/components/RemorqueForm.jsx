function RemorqueForm({
  remorque,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  error,
  success,
}) {
  const isEditing = Boolean(remorque);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="modal-form">
      <div className="form-group">
        <label>Matricule</label>
        <input
          name="matricule"
          type="text"
          placeholder="Ex : 12345-A-6"
          value={formData.matricule}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <input
          name="type"
          type="text"
          placeholder="Ex : Frigorifique"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Statut</label>
        <select name="statut" value={formData.statut} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="maintenance">Maintenance</option>
          <option value="archive">Archivé</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="modal-form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Enregistrer les modifications" : "Ajouter le remorque"}
        </button>

        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}

export default RemorqueForm;
