import { Outlet } from "react-router-dom";
import ResponsiveHeader from "./ResponsiveHeader";
import CustomNavbar from "./CustomNavbar";

export default function AppLayout() {

  return (
    <div
      className="pomp-app"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <ResponsiveHeader/>
      <CustomNavbar/>
      <main className="container-fluid flex-grow-1 pomp-main-content p-4">
        <div className="pomp-content-container">
          <Outlet />
        </div>
      </main>
      <footer className="pomp-footer text-center">
        <div className="container">
          <p className="mb-0">
            © 2025 Pompositienda - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}