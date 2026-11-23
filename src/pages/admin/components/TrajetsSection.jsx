
import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api";
import TrajetForm from "./TrajetForm";
import TrajetsTable from "./TrajetsTable";
import TerminerTrajetForm from "./TerminerTrajetForm";
import Modal from "../../../components/common/Modal";

function TrajetsSection() {
  const [trajets, setTrajets] = useState([]);
  const [camions, setCamions] = useState([]);
  const [remorques, setRemorques] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);

  const fetchData = async () => {
    try {
      setError("");

      const [trajetsResult, camionsResult, remorquesResult, usersResult] =
        await Promise.all([
          apiRequest("/trajets"),
          apiRequest("/camions"),
          apiRequest("/remorques"),
          apiRequest("/users"),
        ]);

      setTrajets(trajetsResult.trajets);

      setCamions(
        camionsResult.camion.filter(
          (camion) => camion.statut === "disponible",
        ),
      );

      setRemorques(
        remorquesResult.remorques.filter(
          (remorque) => remorque.statut === "disponible",
        ),
      );

      setChauffeurs(
        usersResult.users.filter(
          (user) => user.role === "driver" && user.statut === "actif",
        ),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (_event, formData) => {
    setFormError("");
    setSuccess("");

    try {
      await apiRequest("/trajets", {
        method: "POST",
        body: formData,
      });

      await fetchData();

      setSuccess("Trajet créé avec succès !");
      setShowCreateModal(false);

      return true;
    } catch (error) {
      setFormError(error.message);
      return false;
    }
  };

  const handleUpdateStatus = async (id, statut) => {
    setFormError("");
    setSuccess("");

    try {
      await apiRequest(`/trajets/${id}`, {
        method: "PUT",
        body: { statut },
      });

      await fetchData();

      setSuccess("Statut du trajet modifié avec succès !");
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleTerminerTrajet = async (formData) => {
    setFormError("");
    setSuccess("");

    try {
      await apiRequest(`/trajets/${selectedTrajet}/terminer`, {
        method: "PUT",
        body: {
          kilometrageArrivee: Number(formData.kilometrageArrivee),
          carburantConsomme: Number(formData.carburantConsomme),
        },
      });

      await fetchData();

      setSelectedTrajet(null);
      setSuccess("Trajet terminé avec succès !");

      return true;
    } catch (error) {
      setFormError(error.message);
      return false;
    }
  };

  const openCreateModal = () => {
    setFormError("");
    setSuccess("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setFormError("");
  };

  const closeFinishModal = () => {
    setSelectedTrajet(null);
    setFormError("");
  };

  if (loading) {
    return <p>Chargement des trajets...</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div>
      <div className="management-toolbar">
        <div>
          <h2>Gestion des trajets</h2>
          <p>Planifiez et suivez les missions de votre flotte.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          + Ajouter un trajet
        </button>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total des trajets</span>
          <strong>{trajets.length}</strong>
        </article>

        <article className="stat-card">
          <span>Camions disponibles</span>
          <strong>{camions.length}</strong>
        </article>

        <article className="stat-card">
          <span>Remorques disponibles</span>
          <strong>{remorques.length}</strong>
        </article>

        <article className="stat-card">
          <span>Chauffeurs actifs</span>
          <strong>{chauffeurs.length}</strong>
        </article>
      </div>

      {success && <p className="success-message">{success}</p>}
      {formError && !selectedTrajet && (
        <p className="form-error">{formError}</p>
      )}

      <TrajetsTable
        trajets={trajets}
        onUpdateStatus={handleUpdateStatus}
        onSelectTrajet={(id) => {
          setFormError("");
          setSelectedTrajet(id);
        }}
      />

      {showCreateModal && (
        <Modal
          title="Créer un trajet"
          onClose={closeCreateModal}
        >
          <TrajetForm
            camions={camions}
            remorques={remorques}
            chauffeurs={chauffeurs}
            onSubmit={handleCreate}
            onCancel={closeCreateModal}
            error={formError}
          />
        </Modal>
      )}

      {selectedTrajet && (
        <Modal
          title="Terminer le trajet"
          onClose={closeFinishModal}
        >
          <TerminerTrajetForm
            onSubmit={handleTerminerTrajet}
            onCancel={closeFinishModal}
            error={formError}
          />
        </Modal>
      )}
    </div>
  );
}

export default TrajetsSection;
