
function CamionForm({
  camion,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  error,
}) {
  const isEditing = Boolean(camion);

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
        <label>Marque</label>
        <input
          name="marque"
          type="text"
          placeholder="Ex : Renault"
          value={formData.marque}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Modèle</label>
        <input
          name="modele"
          type="text"
          placeholder="Ex : Trucks T"
          value={formData.modele}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Kilométrage</label>
        <input
          name="kilometrage"
          type="number"
          min="0"
          value={formData.kilometrage}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Statut</label>
        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
        >
          <option value="disponible">Disponible</option>
          <option value="maintenance">Maintenance</option>
          <option value="archive">Archivé</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="modal-form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Enregistrer les modifications" : "Ajouter le camion"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default CamionForm;
