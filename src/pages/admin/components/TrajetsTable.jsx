
function TrajetsTable({ trajets, onUpdateStatus, onSelectTrajet }) {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("fr-FR");
  };

  const statusLabels = {
    planifie: "Planifié",
    en_cours: "En cours",
    termine: "Terminé",
    annule: "Annulé",
  };

  return (
    <div className="table-wrapper">
      <div className="table-heading">
        <h2>Liste des trajets</h2>
        <p>Nombre de trajets : {trajets.length}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Origine</th>
            <th>Destination</th>
            <th>Date départ</th>
            <th>Camion</th>
            <th>Remorque</th>
            <th>Chauffeur</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trajets.map((trajet) => (
            <tr key={trajet._id}>
              <td>{trajet.origine}</td>
              <td>{trajet.destination}</td>
              <td>{formatDate(trajet.dateDepart)}</td>
              <td>{trajet.camion?.matricule || "-"}</td>
              <td>{trajet.remorque?.matricule || "-"}</td>
              <td>{trajet.chauffeur?.nom || "-"}</td>

              <td>
                <span
                  className={`status-badge status-${trajet.statut}`}
                >
                  {statusLabels[trajet.statut] || trajet.statut}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  {trajet.statut === "planifie" && (
                    <>
                      <button
                        className="action-edit"
                        onClick={() =>
                          onUpdateStatus(trajet._id, "en_cours")
                        }
                      >
                        Démarrer
                      </button>

                      <button
                        className="action-delete"
                        onClick={() =>
                          onUpdateStatus(trajet._id, "annule")
                        }
                      >
                        Annuler
                      </button>
                    </>
                  )}

                  {trajet.statut === "en_cours" && (
                    <>
                      <button
                        className="action-edit"
                        onClick={() => onSelectTrajet(trajet._id)}
                      >
                        Terminer
                      </button>

                      <button
                        className="action-delete"
                        onClick={() =>
                          onUpdateStatus(trajet._id, "annule")
                        }
                      >
                        Annuler
                      </button>
                    </>
                  )}

                  {trajet.statut !== "planifie" &&
                    trajet.statut !== "en_cours" && (
                      <span className="table-no-action">Aucune action</span>
                    )}
                </div>
              </td>
            </tr>
          ))}

          {trajets.length === 0 && (
            <tr>
              <td colSpan="8" className="table-empty">
                Aucun trajet enregistré.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrajetsTable;
