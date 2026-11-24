import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

import CamionsSection from "./components/CamionsSection";
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";
import TrajetsSection from "./components/TrajetsSection";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/common/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../errors/NotFound";
function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [listError, setListError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [showUserModal, setShowUserModal] = useState(false);

  const [editForm, setEditForm] = useState({
    nom: "",
    email: "",
    password: "",
    role: "driver",
    statut: "actif",
  });

  const [newUser, setNewUser] = useState({
    nom: "",
    email: "",
    password: "",
    role: "driver",
  });

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await apiRequest("/users");
        setUsers(result.users);
      } catch (error) {
        setListError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    try {
      await apiRequest("/users", {
        method: "POST",
        body: newUser,
      });

      setSuccess("Utilisateur créé avec succès !");
      setShowUserModal(false);
      setNewUser({
        nom: "",
        email: "",
        password: "",
        role: "driver",
      });

      const result = await apiRequest("/users");
      setUsers(result.users);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleDeleteUser = async (selectedUser) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer ${selectedUser.nom} ?`,
    );

    if (!confirmed) return;

    try {
      setListError("");

      await apiRequest(`/users/${selectedUser._id}`, {
        method: "DELETE",
      });

      setUsers((previousUsers) =>
        previousUsers.filter((item) => item._id !== selectedUser._id),
      );
    } catch (error) {
      setListError(error.message);
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    try {
      const updatedData = { ...editForm };

      if (!updatedData.password) {
        delete updatedData.password;
      }

      await apiRequest(`/users/${editingUser._id}`, {
        method: "PATCH",
        body: updatedData,
      });

      setSuccess("Utilisateur modifié avec succès !");
      setShowUserModal(false);
      setEditingUser(null);

      const result = await apiRequest("/users");
      setUsers(result.users);

      setEditForm({
        nom: "",
        email: "",
        password: "",
        role: "driver",
        statut: "actif",
      });
    } catch (error) {
      setFormError(error.message);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const handleEditUser = (selectedUser) => {
    setEditingUser(selectedUser);
    setEditForm({
      nom: selectedUser.nom,
      email: selectedUser.email,
      password: "",
      role: selectedUser.role,
      statut: selectedUser.statut,
    });
    setShowUserModal(true);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setShowUserModal(false);
    setFormError("");
    setSuccess("");
  };

  const navigation = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      icon: "⌂",
      path: "/admin",
    },
    {
      id: "users",
      label: "Utilisateurs",
      icon: "♙",
      path: "/admin/utilisateurs",
    },
    {
      id: "trucks",
      label: "Camions",
      icon: "▣",
      path: "/admin/camions",
    },
    {
      id: "trips",
      label: "Trajets",
      icon: "⇄",
      path: "/admin/trajets",
    },
  ];
  const routes = {
    "/admin": "overview",
    "/admin/utilisateurs": "users",
    "/admin/camions": "trucks",
    "/admin/trajets": "trips",
  };
  useEffect(() => {
    setActiveSection(routes[location.pathname] || "overview");
  }, [location.pathname]);
  const sectionTitles = {
    overview: "Vue d'ensemble",
    users: "Gestion des utilisateurs",
    trucks: "Gestion des camions",
    trips: "Gestion des trajets",
  };

  if (!routes[location.pathname]) {
    return <NotFound />;
  }
  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      navigation={navigation}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      title={sectionTitles[activeSection]}
    >
      {activeSection === "overview" && (
        <>
          <section className="welcome-banner">
            <div>
              <span>ESPACE ADMINISTRATEUR</span>
              <h2>Bienvenue, {user.nom} 👋</h2>
              <p>
                Gérez votre flotte et suivez vos opérations depuis votre espace
                centralisé.
              </p>
            </div>

            <div className="welcome-decoration">F</div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon blue">♙</div>
              <span>Utilisateurs</span>
              <strong>{loading ? "..." : users.length}</strong>
              <small>Comptes enregistrés</small>
            </article>

            <article className="stat-card">
              <div className="stat-icon cyan">♧</div>
              <span>Chauffeurs</span>
              <strong>
                {loading
                  ? "..."
                  : users.filter((item) => item.role === "driver").length}
              </strong>
              <small>Comptes chauffeur</small>
            </article>

            <article className="stat-card">
              <div className="stat-icon purple">♔</div>
              <span>Administrateurs</span>
              <strong>
                {loading
                  ? "..."
                  : users.filter((item) => item.role === "admin").length}
              </strong>
              <small>Comptes administrateur</small>
            </article>
          </section>

          <section className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <span>ACCÈS RAPIDE</span>
                <h2>Gestion de votre flotte</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button onClick={() => navigate("/admin/utilisateurs")}>
                <span>♙</span>
                <strong>Utilisateurs</strong>
                <small>Gérer les comptes</small>
                <b>→</b>
              </button>

              <button onClick={() => navigate("/admin/camions")}>
                <span>▣</span>
                <strong>Camions</strong>
                <small>Gérer les véhicules</small>
                <b>→</b>
              </button>

              <button onClick={() => navigate("/admin/trajets")}>
                <span>⇄</span>
                <strong>Trajets</strong>
                <small>Suivre les missions</small>
                <b>→</b>
              </button>
            </div>
          </section>
        </>
      )}

      {activeSection === "users" && (
        <section className="dashboard-panel management-panel">
          <div className="management-toolbar">
            <div>
              <h2>Gestion des utilisateurs</h2>
              <p>Gérez les comptes administrateurs et chauffeurs.</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingUser(null);
                setNewUser({
                  nom: "",
                  email: "",
                  password: "",
                  role: "driver",
                });
                setFormError("");
                setSuccess("");
                setShowUserModal(true);
              }}
            >
              + Ajouter un utilisateur
            </button>
          </div>

          <UsersTable
            users={users}
            loading={loading}
            error={listError}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />

          {showUserModal && (
            <Modal
              title={
                editingUser
                  ? "Modifier un utilisateur"
                  : "Ajouter un utilisateur"
              }
              onClose={cancelEdit}
            >
              <UserForm
                newUser={newUser}
                setNewUser={setNewUser}
                handleCreateUser={handleCreateUser}
                editingUser={editingUser}
                editForm={editForm}
                setEditForm={setEditForm}
                handleUpdateUser={handleUpdateUser}
                cancelEdit={cancelEdit}
                success={success}
                error={formError}
              />
            </Modal>
          )}
        </section>
      )}

      {activeSection === "trucks" && (
        <section className="dashboard-panel management-panel">
          <CamionsSection />
        </section>
      )}

      {activeSection === "trips" && (
        <section className="dashboard-panel management-panel">
          <TrajetsSection />
        </section>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
