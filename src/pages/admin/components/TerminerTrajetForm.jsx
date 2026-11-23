
import { useState } from "react";

function TerminerTrajetForm({ onSubmit, onCancel, error }) {
  const [formData, setFormData] = useState({
    kilometrageArrivee: "",
    carburantConsomme: "",
  });

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
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="kilometrageArrivee">
          Kilométrage d'arrivée (km)
        </label>

        <input
          id="kilometrageArrivee"
          type="number"
          name="kilometrageArrivee"
          min="0"
          value={formData.kilometrageArrivee}
          onChange={handleChange}
          placeholder="Ex : 125000"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="carburantConsomme">
          Carburant consommé (litres)
        </label>

        <input
          id="carburantConsomme"
          type="number"
          name="carburantConsomme"
          min="0"
          step="any"
          value={formData.carburantConsomme}
          onChange={handleChange}
          placeholder="Ex : 45"
          required
        />
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
          {isSubmitting ? "Finalisation..." : "Confirmer"}
        </button>
      </div>
    </form>
  );
}

export default TerminerTrajetForm;
