/*// src/routing/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ajusta el path si es necesario

function ProtectedRoute({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    // Si no está logueado, lo redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, muestra el contenido protegido
  return children;
}

export default ProtectedRoute;*/




// src/routing/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/MainConstants";

function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  restrictedForRoles = [] 
}) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = usuario.rol_usuario?.toLowerCase();

  // 1. Verificar roles restringidos
  if (restrictedForRoles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // 2. Verificar roles permitidos (CORRECCIÓN APPLICADA)
  if (allowedRoles.length > 0 && 
      !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/no-autorizado" replace />;
  }


  return children;
}

export default ProtectedRoute;