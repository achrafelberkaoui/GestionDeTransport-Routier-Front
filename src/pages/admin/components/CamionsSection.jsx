import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api";

import CamionForm from "./CamionForm";
import CamionsTable from "./CamionsTable";

function CamionsSection() {
  const [camions, setCamions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCamion, setEditingCamion] = useState(null);

  const [formData, setFormData] = useState({
    matricule: "",
    marque: "",
    modele: "",
    kilometrage: 0,
    statut: "disponible",
  });

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

      setFormData({
        matricule: "",
        marque: "",
        modele: "",
        kilometrage: 0,
        statut: "disponible",
      });

      await fetchCamions();
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
      setEditingCamion(null);

      setFormData({
        matricule: "",
        marque: "",
        modele: "",
        kilometrage: 0,
        statut: "disponible",
      });

      await fetchCamions();
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingCamion(null);
    setFormError("");
    setSuccess("");

    setFormData({
      matricule: "",
      marque: "",
      modele: "",
      kilometrage: 0,
      statut: "disponible",
    });
  };

  const handleDelete = async (camion) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le camion ${camion.matricule} ?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiRequest(`/camions/${camion._id}`, {
        method: "DELETE",
      });

      setCamions((previousCamions) =>
        previousCamions.filter((item) => item._id !== camion._id),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <CamionForm
        camion={editingCamion}
        formData={formData}
        setFormData={setFormData}
        onSubmit={editingCamion ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        error={formError}
        success={success}
      />

      <hr />

      <CamionsTable
        camions={camions}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CamionsSection;
