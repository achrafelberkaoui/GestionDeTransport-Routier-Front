function UserForm({
  newUser,
  setNewUser,
  handleCreateUser,
  success,
}) {
  return (
    <div>
      <h3>Ajouter un utilisateur</h3>

      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nom"
          value={newUser.nom}
          onChange={(event) =>
            setNewUser({
              ...newUser,
              nom: event.target.value,
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(event) =>
            setNewUser({
              ...newUser,
              email: event.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          autoComplete="new-password"
          minLength={6}
          value={newUser.password}
          onChange={(event) =>
            setNewUser({
              ...newUser,
              password: event.target.value,
            })
          }
          required
        />

        <select
          value={newUser.role}
          onChange={(event) =>
            setNewUser({
              ...newUser,
              role: event.target.value,
            })
          }
        >
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">
          Ajouter utilisateur
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default UserForm;
