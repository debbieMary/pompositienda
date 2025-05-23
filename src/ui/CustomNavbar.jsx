import React from "react";
import HomeNavLink from "./HomeNavLink";

import CustomNavLink from "./CustomNavLink";
import CTALink from "./CTALink";
import { useAuth } from "../context/AuthContext";
import { usePedido } from "../context/PedidoContext";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { ROLES } from "../utils/MainConstants";

export default function CustomNavbar() {
  const { usuario, logout } = useAuth();
  const { totalItems, limpiarPedido } = usePedido();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      {/* Navbar mejorado */}
      <nav className="navbar navbar-expand-lg pomp-navbar sticky-top shadow-sm">
        <div className="container-fluid">
          <span>
            <HomeNavLink />
          </span>

          <button
            className="navbar-toggler white-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon white-toggler"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <CustomNavLink label="Nuestras Empresas" to="empresas" />
              <CustomNavLink label="Productos" to="productos" />
              {usuario && (
                <>
                  <CustomNavLink
                    label="Carrito"
                    to="carrito"
                    badgeCount={totalItems ? totalItems : 0}
                  />
                  <CustomNavLink label="Historial" to="historial" />
                </>
              )}

              {usuario?.rol_usuario === ROLES.SUPER && (
                <CustomNavLink label="Admin" to="admin" />
              )}

              {(usuario?.rol_usuario === ROLES.ADMIN ||
                usuario?.rol_usuario === ROLES.SUPER) && (
                <CustomNavLink label="Registros" to="regEmpresasProductos" />
              )}

              {(usuario?.rol_usuario === ROLES.ADMIN ||
                usuario?.rol_usuario === ROLES.SUPER) && (
                <CustomNavLink label="Inventario" to="inventario" />
              )}

              <CustomNavLink label="Contacto" to="contacto" />
            </ul>

            <div className="d-flex my-3 gap-2">
              <button onClick={toggleTheme} className="btn pomp-btn-secondary">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {!usuario ? (
                <>
                  <CTALink to="login" className="btn pomp-btn-secondary me-2r">
                    <span className="ms-2">Login</span>
                  </CTALink>

                  {
                    <CTALink
                      to="registro"
                      className="btn pomp-btn-primary me-2r"
                    >
                      <span className="ms-2">Registro</span>
                    </CTALink>
                  }
                </>
              ) : (
                <CTALink
                  to="login"
                  className="btn pomp-btn-secondary me-2r"
                  onClick={() => {
                    limpiarPedido();
                    logout();
                  }}
                >
                  <span className="ms-2">Logout</span>
                </CTALink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
