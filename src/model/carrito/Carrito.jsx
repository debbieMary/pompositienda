import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePedido } from "../../context/PedidoContext";
import CarritoVacio from "../../ui/CarritoVacio";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../ui/PageTitle";
import {
  FaShoppingCart,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import ButtonLink from "../../ui/ButtonLink";
import { useCrearCompra } from "../../hooks/useCrearCompra";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorComponent from "../../ui/ErrorComponent";

export default function Carrito() {
  const {
    pedido,
    totalItems,
    limpiarPedido,
    agregarProducto,
    disminuirProducto,
    eliminarProducto,
    actualizarPedido,
  } = usePedido();

  const { usuario } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    formState: { errors, isDirty },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      nombre_factura: pedido?.nombre_factura || "",
      nit_factura: pedido?.nit_factura || "0",
    },
  });

  // Sincronizar el formulario cuando cambia el pedido
  useEffect(() => {
    if (pedido) {
      reset({
        nombre_factura: pedido.nombre_factura,
        nit_factura: pedido.nit_factura,
      });
    }
  }, [pedido, reset]);

  const guardarDatosFacturacion = () => {
    const formData = getValues();
    if (!pedido) return;

    const pedidoActualizado = {
      ...pedido,
      nombre_factura: formData.nombre_factura,
      nit_factura: formData.nit_factura,
    };

    actualizarPedido(pedidoActualizado);
    setIsEditing(false);

    // Verificación en consola
    console.log("Datos guardados en localStorage:", {
      nombre_factura: formData.nombre_factura,
      nit_factura: formData.nit_factura,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      reset({
        nombre_factura: pedido?.nombre_factura || "",
        nit_factura: pedido?.nit_factura || "0",
      });
    }
    setIsEditing(!isEditing);
  };

  const {
    mutate,
    isLoading: isLoadingCompra,
    error: errorCompra,
    data: dataCompra,
    isSuccess,
  } = useCrearCompra();

  const handleFinalizar = () => {
    const pedidoGuardado = localStorage.getItem("pedido");
    if (pedidoGuardado) {
      const pedido = JSON.parse(pedidoGuardado);
      mutate(pedido);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      console.log("Datos recibidos:", dataCompra);
      toast.success(
        `Felicidades registraste el pedido nro !!! ${dataCompra.id_compra_total}`
      );
      limpiarPedido();
      navigate("/historial"); // Ajusta esta ruta según necesites
    }
  }, [isSuccess, dataCompra, navigate, limpiarPedido]);

  if (!pedido || pedido.detalles.length === 0) {
    return <CarritoVacio />;
  }

  if (isLoadingCompra) {
    return <CustomSpinner color="salmon">Registrando la Compra</CustomSpinner>;
  }

  if (errorCompra) {
    return (
      <ErrorComponent
        titulo="Oops"
        subtitulo="Lo sentimos"
        mensaje={`No pudimos registrar tu pedido  por el error:  ${errorCompra.message}`}
        to="/"
        buttonLabel="Volver al Inicio"
      />
    );
  }

  return (
    <>
      <PageTitle label="Tu Pedido" Icon={FaShoppingCart} />
      <div className="container py-4">
        <div className="card border-0 shadow">
          <div
            className="card-header"
            style={{ backgroundColor: "var(--pomp-turquesa)", color: "white" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">{`${usuario.nombre1_usuario} ${usuario.apellido1_usuario}`}</h4>
              <button
                onClick={toggleEdit}
                className="btn btn-sm"
                style={{
                  backgroundColor: isEditing
                    ? "var(--pomp-salmon)"
                    : "var(--pomp-turquesa-dark)",
                  color: "white",
                }}
              >
                {isEditing ? (
                  <FaTimes className="me-1" />
                ) : (
                  <FaEdit className="me-1" />
                )}
                {isEditing ? "Cancelar" : "Editar Facturación"}
              </button>
            </div>
          </div>

          <div className="card-body">
            {/* Mostrar datos actuales cuando no se está editando */}
            {!isEditing ? (
              <div className="mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <p style={{ color: "var(--pomp-turquesa-dark)" }}>
                      <strong>Nombre/Razón Social:</strong>{" "}
                      {pedido.nombre_factura}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p style={{ color: "var(--pomp-turquesa-dark)" }}>
                      <strong>NIT/CI:</strong> {pedido.nit_factura}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Formulario de edición */
              <div className="mb-4">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="nombre_factura"
                        className="form-label"
                        style={{ color: "var(--pomp-turquesa-dark)" }}
                      >
                        Nombre/Razón Social*
                      </label>
                      <input
                        type="text"
                        id="nombre_factura"
                        className={`form-control ${
                          errors.nombre_factura ? "is-invalid" : ""
                        }`}
                        style={{
                          borderColor: "var(--pomp-turquesa)",
                          borderRadius: "0.5rem",
                        }}
                        {...register("nombre_factura", {
                          required: "Este campo es obligatorio",
                          minLength: {
                            value: 3,
                            message: "Mínimo 3 caracteres",
                          },
                        })}
                      />
                      {errors.nombre_factura && (
                        <div className="invalid-feedback">
                          {errors.nombre_factura.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="nit_factura"
                        className="form-label"
                        style={{ color: "var(--pomp-turquesa-dark)" }}
                      >
                        NIT/CI*
                      </label>
                      <input
                        type="text"
                        id="nit_factura"
                        className={`form-control ${
                          errors.nit_factura ? "is-invalid" : ""
                        }`}
                        style={{
                          borderColor: "var(--pomp-turquesa)",
                          borderRadius: "0.5rem",
                        }}
                        {...register("nit_factura", {
                          required: "Este campo es obligatorio",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números",
                          },
                        })}
                      />
                      {errors.nit_factura && (
                        <div className="invalid-feedback">
                          {errors.nit_factura.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3 gap-2">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="btn btn-secondary"
                      style={{ borderRadius: "0.5rem" }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={guardarDatosFacturacion}
                      disabled={
                        !isDirty || errors.nombre_factura || errors.nit_factura
                      }
                      className="btn btn-primary"
                      style={{
                        borderRadius: "0.5rem",
                        backgroundColor: "var(--pomp-turquesa)",
                        borderColor: "var(--pomp-turquesa)",
                      }}
                    >
                      <FaCheck className="me-2" />
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista de productos */}
            <div className="list-group">
              {pedido.detalles.map((producto, index) => (
               <div
               key={index}
               className="list-group-item border-0 mb-2 rounded"
               style={{ backgroundColor: "var(--pomp-turquesa-claro)" }}
             >
               {/* Primera fila: Nombre y precio total */}
               <div className="d-flex justify-content-between align-items-center mb-2">
                 <h5 className="mb-0" style={{ color: "var(--pomp-turquesa-dark)" }}>
                   {producto.nombre_producto}
                 </h5>
                 <span className="fw-bold" style={{ color: "var(--pomp-salmon-oscuro)" }}>
                   Bs. {producto.precio_total.toFixed(2)}
                 </span>
               </div>
             
               {/* Segunda fila: Detalles y controles */}
               <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                 <small className="text-muted mb-2 mb-sm-0">
                   {producto.cantidad} × Bs. {producto.precio_unitario.toFixed(2)}
                 </small>
             
                 <div className="d-flex align-items-center">
                   <div className="btn-group me-2" role="group">
                     <button
                       onClick={() => disminuirProducto(producto.id_producto)}
                       className="btn btn-sm py-1"
                       style={{
                         backgroundColor: "var(--pomp-salmon-light)",
                         color: "white",
                         minWidth: "32px"
                       }}
                     >
                       -
                     </button>
                     
                     <span 
                       className="px-2 d-flex align-items-center" 
                       style={{
                         color: "var(--pomp-plomo-xoscuro)",
                         minWidth: "32px",
                         justifyContent: "center"
                       }}
                     >
                       {producto.cantidad}
                     </span>
                     
                     <button
                       onClick={() => agregarProducto({
                         id_producto: producto.id_producto,
                         precio: producto.precio_unitario,
                         nombre_producto: producto.nombre_producto,
                       })}
                       className="btn btn-sm py-1"
                       style={{
                         backgroundColor: "var(--pomp-turquesa)",
                         color: "white",
                         minWidth: "32px"
                       }}
                     >
                       +
                     </button>
                   </div>
                   
                   <button
                     onClick={() => eliminarProducto(producto.id_producto)}
                     className="btn btn-sm py-1"
                     style={{
                       backgroundColor: "var(--pomp-salmon)",
                       color: "white",
                       minWidth: "32px"
                     }}
                   >
                     <FaTrash size={14} />
                   </button>
                 </div>
               </div>
             </div>
              ))}
            </div>
          </div>

          <div
            className="card-footer"
            style={{ backgroundColor: "var(--pomp-plomo)" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5
                className="mb-0"
                style={{ color: "var(--pomp-plomo-xoscuro)" }}
              >
                Total ({totalItems} items):
              </h5>
              <h4
                className="mb-0 fw-bold"
                style={{ color: "var(--pomp-salmon-oscuro)" }}
              >
                Bs. {pedido.total.toFixed(2)}
              </h4>
            </div>
            <div className="d-grid mt-3">
              <ButtonLink onClick={handleFinalizar} disabled={isLoadingCompra}>
                Finalizar pedido
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
