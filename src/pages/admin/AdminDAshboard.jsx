import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import CamionsSection from "./components/CamionsSection";
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";

function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [listError, setListError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
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

  const handleEditUser = (selectedUser) => {
    setEditingUser(selectedUser);

    setEditForm({
      nom: selectedUser.nom,
      email: selectedUser.email,
      password: "",
      role: selectedUser.role,
      statut: selectedUser.statut,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormError("");
    setSuccess("");
  };

  return (
    <div>
      <h1>Dashboard Admin</h1>

      <h2>Bienvenue {user.nom}</h2>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>

      <hr />

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

      <UsersTable
        users={users}
        loading={loading}
        error={listError}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <hr />

      <h2>Gestion des camions</h2>

      <CamionsSection />
      <button onClick={onLogout}>Se déconnecter</button>
    </div>
  );
}

export default AdminDashboard;
