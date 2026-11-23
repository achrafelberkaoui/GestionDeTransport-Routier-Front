import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes({ user, allowedRole }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
