
import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";

function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (event) => {
    event.preventDefault();

    setError("");
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
      setError(error.message);
    }
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
        success={success}
      />

      <UsersTable
        users={users}
        loading={loading}
        error={error}
      />

      <button onClick={onLogout}>
        Se déconnecter
      </button>
    </div>
  );
}

export default AdminDashboard;
