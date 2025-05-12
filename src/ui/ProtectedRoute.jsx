// src/routing/ProtectedRoute.jsx
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

export default ProtectedRoute;
