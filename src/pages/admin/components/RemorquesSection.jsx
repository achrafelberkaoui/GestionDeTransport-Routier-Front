import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api";

import Modal from "../../../components/common/Modal";
import RemorqueForm from "./RemorqueForm";
import RemorquesTable from "./RemorqueTable";

function RemorquesSection() {
  const [remorques, setRemorques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingRemorque, setEditingRemorque] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    matricule: "",
    type: "",
    statut: "disponible",
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchRemorques = async () => {
    try {
      setError("");
      const result = await apiRequest("/remorques");
      const res = result.remorques.filter(
        (remorque) => remorque.statut !== "archive",
      );
      console.log(res);
      setRemorques(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemorques();
  }, []);

  const openCreateModal = () => {
    setEditingRemorque(null);
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
      await apiRequest("/remorques", {
        method: "POST",
        body: formData,
      });

      setSuccess("Remorque ajouté avec succès !");
      await fetchRemorques();

      setFormData(initialForm);
      setShowModal(false);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleEdit = (remorque) => {
    setEditingRemorque(remorque);

    setFormData({
      matricule: remorque.matricule,
      type: remorque.type,
      statut: remorque.statut,
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
      await apiRequest(`/remorques/${editingRemorque._id}`, {
        method: "PUT",
        body: formData,
      });

      setSuccess("Remorque modifié avec succès !");
      await fetchRemorques();

      setEditingRemorque(null);
      setFormData(initialForm);
      setShowModal(false);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingRemorque(null);
    setFormData(initialForm);
    setFormError("");
    setSuccess("");
    setShowModal(false);
  };

  const handleDelete = async (remorque) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le remoruqe ${remorque.matricule} ?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiRequest(`/remorques/${remorque._id}`, {
        method: "PUT",
        body: { statut: "archive" },
      });

      setRemorques((previousRemorques) =>
        previousRemorques.filter((item) => item._id !== remorque._id),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="management-toolbar">
        <div>
          <h2>Gestion des Remorques</h2>
          <p>Gérez les véhicules de votre flotte.</p>
        </div>

        <button className="btn btn-primary" onClick={openCreateModal}>
          + Ajouter un remorque
        </button>
      </div>
      {success && <p className="form-success">{success}</p>}

      <RemorquesTable
        remorques={remorques}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <Modal
          title={
            editingRemorque ? "Modifier un remorque" : "Ajouter un remorque"
          }
          onClose={handleCancel}
        >
          <RemorqueForm
            remorque={editingRemorque}
            formData={formData}
            setFormData={setFormData}
            onSubmit={editingRemorque ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            error={formError}
            success={success}
          />
        </Modal>
      )}
    </div>
  );
}

export default RemorquesSection;
