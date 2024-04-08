import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("requireAuth", auth?.accessToken);
  
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? ( 
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
