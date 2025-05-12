import React from "react";
import CustomBorder from "./CustomBorder";
import { FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CarritoVacio() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <CustomBorder color="salmon">
            <div className="text-center">
              <div className="position-relative mb-4">
                <FaShoppingCart 
                  size={80} 
                  style={{ 
                    color: "var(--pomp-salmon-light)", 
                    opacity: 0.3 
                  }} 
                />
                <FaBoxOpen 
                  size={48} 
                  style={{ 
                    color: "var(--pomp-salmon)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }} 
                />
              </div>
              
              <h2 
                className="mb-3 fw-bold" 
                style={{ color: "var(--pomp-salmon)" }}
              >
                ¡Oh no, tu carrito está vacío!
              </h2>
              
              <p 
                className="mb-4 fs-5" 
                style={{ color: "var(--pomp-plomo-xoscuro)" }}
              >
                Parece que aún no has encontrado esos productos especiales que merecen estar en tu carrito.
              </p>
              
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link 
                  to="/productos" 
                  className="btn btn-lg pomp-btn-primary"
                  style={{
                    backgroundColor: "var(--pomp-salmon)",
                    borderColor: "var(--pomp-salmon)"
                  }}
                >
                  Descubrir Productos
                </Link>
              </div>
            </div>
          </CustomBorder>
        </div>
      </div>
    </div>
  );
}