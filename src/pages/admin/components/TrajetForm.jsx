
import { useState } from "react";

function TrajetForm({
  camions,
  remorques,
  chauffeurs,
  onSubmit,
  onCancel,
  error,
}) {
  const initialForm = {
    origine: "",
    destination: "",
    dateDepart: "",
    camion: "",
    remorque: "",
    chauffeur: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const created = await onSubmit(event, formData);

      if (created) {
        setFormData(initialForm);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="origine">Ville de départ</label>
        <input
          id="origine"
          type="text"
          name="origine"
          value={formData.origine}
          onChange={handleChange}
          placeholder="Ex : Casablanca"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Ex : Tanger"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateDepart">Date de départ</label>
        <input
          id="dateDepart"
          type="datetime-local"
          name="dateDepart"
          value={formData.dateDepart}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="camion">Camion</label>
        <select
          id="camion"
          name="camion"
          value={formData.camion}
          onChange={handleChange}
          required
        >
          <option value="">Choisir un camion</option>

          {camions.map((camion) => (
            <option key={camion._id} value={camion._id}>
              {camion.matricule} - {camion.marque}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="remorque">Remorque</label>
        <select
          id="remorque"
          name="remorque"
          value={formData.remorque}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une remorque</option>

          {remorques.map((remorque) => (
            <option key={remorque._id} value={remorque._id}>
              {remorque.matricule} - {remorque.type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="chauffeur">Chauffeur</label>
        <select
          id="chauffeur"
          name="chauffeur"
          value={formData.chauffeur}
          onChange={handleChange}
          required
        >
          <option value="">Choisir un chauffeur</option>

          {chauffeurs.map((chauffeur) => (
            <option key={chauffeur._id} value={chauffeur._id}>
              {chauffeur.nom} - {chauffeur.email}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="modal-form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Annuler
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création en cours..." : "Créer le trajet"}
        </button>
      </div>
    </form>
  );
}

export default TrajetForm;
