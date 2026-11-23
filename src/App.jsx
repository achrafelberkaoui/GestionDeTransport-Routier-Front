import { useEffect, useState } from "react";

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";

import { apiRequest } from "./services/api";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Forbidden from "./pages/errors/Forbidden";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import NotFound from "./pages/errors/NotFound";

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
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginRoute user={user} setUser={setUser} />}
      />

      <Route path="/403" element={<Forbidden />} />

      <Route element={<ProtectedRoutes user={user} />}>
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/403" replace />
            )
          }
        />
        <Route
          path="/driver"
          element={
            user?.role === "driver" ? (
              <DriverDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/403" replace />
            )
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <Navigate
            to={
              !user
                ? "/login"
                : user.role === "admin"
                  ? "/admin"
                  : user.role === "driver"
                    ? "/driver"
                    : "/403"
            }
          />
        }
        replace
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
function LoginRoute({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/driver"} replace />
    );
  }

  const handleLoginSuccess = (result) => {
    setUser(result.user);

    const requestedPath = location.state?.from?.pathname;

    navigate(
      requestedPath || (result.user.role === "admin" ? "/admin" : "/driver"),
      { replace: true },
    );
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;
