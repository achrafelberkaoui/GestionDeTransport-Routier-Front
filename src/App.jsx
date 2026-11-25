import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDAshboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
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
import useAuth from "./hooks/useAuth";

function App() {
  const { user, loading, logout } = useAuth();
  if (loading) {
    return <p>Vérification de votre session...</p>;
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute user={user} />} />

      <Route path="/403" element={<Forbidden />} />

      <Route element={<ProtectedRoutes user={user} />}>
        <Route
          path="/admin/*"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/403" replace />
            )
          }
        />
        <Route
          path="/driver/*"
          element={
            user?.role === "driver" ? (
              <DriverDashboard />
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
            replace
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
function LoginRoute({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  if (user) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/driver"} replace />
    );
  }

  const handleLoginSuccess = async (credentials) => {
    const result = await login(credentials)
    const requestedPath = location.state?.from?.pathname;

    navigate(
      requestedPath || (result.user.role === "admin" ? "/admin" : "/driver"),
      { replace: true },
    );
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;
