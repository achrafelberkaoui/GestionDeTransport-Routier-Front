
import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api";

import CamionForm from "./CamionForm";
import CamionsTable from "./CamionsTable";
import Modal from "../../../components/common/Modal";

function CamionsSection() {
  const [camions, setCamions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCamion, setEditingCamion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    matricule: "",
    marque: "",
    modele: "",
    kilometrage: 0,
    statut: "disponible",
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchCamions = async () => {
    try {
      setError("");
      const result = await apiRequest("/camions");
      setCamions(result.camion);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamions();
  }, []);

  const openCreateModal = () => {
    setEditingCamion(null);
    setFormData(initialForm);
    setFormError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    try {
      await apiRequest("/camions", {
        method: "POST",
        body: {
          ...formData,
          kilometrage: Number(formData.kilometrage),
        },
      });

      setSuccess("Camion ajouté avec succès !");
      await fetchCamions();

      setFormData(initialForm);
      setShowModal(false);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleEdit = (camion) => {
    setEditingCamion(camion);

    setFormData({
      matricule: camion.matricule,
      marque: camion.marque,
      modele: camion.modele,
      kilometrage: camion.kilometrage,
      statut: camion.statut,
    });

    setFormError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    try {
      await apiRequest(`/camions/${editingCamion._id}`, {
        method: "PUT",
        body: {
          ...formData,
          kilometrage: Number(formData.kilometrage),
        },
      });

      setSuccess("Camion modifié avec succès !");
      await fetchCamions();

      setEditingCamion(null);
      setFormData(initialForm);
      setShowModal(false);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingCamion(null);
    setFormData(initialForm);
    setFormError("");
    setSuccess("");
    setShowModal(false);
  };

  const handleDelete = async (camion) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le camion ${camion.matricule} ?`
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiRequest(`/camions/${camion._id}`, {
        method: "DELETE",
      });

      setCamions((previousCamions) =>
        previousCamions.filter((item) => item._id !== camion._id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="management-toolbar">
        <div>
          <h2>Gestion des camions</h2>
          <p>Gérez les véhicules de votre flotte.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          + Ajouter un camion
        </button>
      </div>

      <CamionsTable
        camions={camions}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <Modal
          title={
            editingCamion ? "Modifier un camion" : "Ajouter un camion"
          }
          onClose={handleCancel}
        >
          <CamionForm
            camion={editingCamion}
            formData={formData}
            setFormData={setFormData}
            onSubmit={editingCamion ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            error={formError}
            success={success}
          />
        </Modal>
      )}
    </div>
  );
}

export default CamionsSection;
