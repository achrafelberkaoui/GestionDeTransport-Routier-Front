function CamionForm({
  camion,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  error,
  success,
}) {
  const isEditing = Boolean(camion);

  return (
    <div>
      <h3>{isEditing ? "Modifier un camion" : "Ajouter un camion"}</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Matricule"
          value={formData.matricule}
          onChange={(event) =>
            setFormData({
              ...formData,
              matricule: event.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Marque"
          value={formData.marque}
          onChange={(event) =>
            setFormData({
              ...formData,
              marque: event.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Modèle"
          value={formData.modele}
          onChange={(event) =>
            setFormData({
              ...formData,
              modele: event.target.value,
            })
          }
          required
        />

        <input
          type="number"
          placeholder="Kilométrage"
          min="0"
          value={formData.kilometrage}
          onChange={(event) =>
            setFormData({
              ...formData,
              kilometrage: event.target.value,
            })
          }
        />

        <select
          value={formData.statut}
          onChange={(event) =>
            setFormData({
              ...formData,
              statut: event.target.value,
            })
          }
        >
          <option value="disponible">Disponible</option>
          <option value="maintenance">Maintenance</option>
          <option value="archive">Archivé</option>
        </select>

        <button type="submit">
          {isEditing ? "Enregistrer" : "Ajouter le camion"}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CamionForm;
