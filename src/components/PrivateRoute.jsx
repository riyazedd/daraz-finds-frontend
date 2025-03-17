import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = () => {
  const { adminToken } = useAuth();

    
    return adminToken ? <Outlet />  : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
