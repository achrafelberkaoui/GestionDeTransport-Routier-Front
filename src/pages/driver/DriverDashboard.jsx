function DriverDashboard({ user, onLogout }){
    return (
        <div>
        <h1>Dashboard {user.role}</h1>
        <h2>Bienvenue : {user.nom}</h2>
        <p>Email : {user.email}</p>
        <p>Role : {user.role}</p>
        <button onClick={onLogout}>
            Se déconnecter
        </button>
        </div>
    )
}

export default DriverDashboard;