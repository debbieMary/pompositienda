import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // para que funcione navbar, etc.
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PedidoProvider } from "./context/PedidoContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ErrorComponent from "./ui/ErrorComponent.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={(error)=>{<ErrorComponent titulo="Error de la App" mensaje={error.message} buttonLabel="Volver al Inicio" to="/"/>}}>
      <ThemeProvider>
        <AuthProvider>
          <PedidoProvider>
            <App />
          </PedidoProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
