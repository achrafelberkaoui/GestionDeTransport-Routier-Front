import { useEffect, useState } from "react";

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";

import { apiRequest } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await apiRequest("/auth/me");
        setUser(result.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = (result) => {
    setUser(result.user);
  };

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Erreur de déconnexion :", error.message);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <p>Vérification de votre session...</p>;
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (user.role === "admin") {
    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (user.role === "driver") {
    return (
      <DriverDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return <p>Rôle non autorisé.</p>;
}

export default App;
