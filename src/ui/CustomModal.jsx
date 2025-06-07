import { ESTADO_COMPRA, ROLES } from "../utils/MainConstants";
import CustomForm from "./CustomForm";

// Configuración centralizada de todas las entidades
const entityConfig = {
  categoria: {
    fields: [
      {
        name: "nombre_categoria",
        label: "Nombre",
        type: "text",
        required: true,
      },
      {
        name: "descripcion",
        label: "Descripción",
        type: "text",
        required: true,
      },
    ],
  },
  empresa: {
    fields: [
      { name: "nombre_empresa", label: "Nombre", type: "text", required: true },
      {
        name: "descripcion",
        label: "Descripción",
        type: "text",
        required: true,
      },
      { name: "direccion", label: "Dirección", type: "text", required: true },
      { name: "telefono", label: "Teléfono", type: "text", required: true },
    ],
  },
  producto: {
    fields: [
      {
        name: "nombre_producto",
        label: "Nombre",
        type: "text",
        required: true,
      },
      { name: "precio", label: "Precio", type: "number", required: true },
      { name: "descuento", label: "Descuento", type: "number", required: true },
    ],
  },
  usuario: {
    fields: [
      {
        name: "celular_usuario",
        label: "Celular",
        type: "text",
        required: true,
      },
      { name: "email_usuario", label: "Email", type: "email", required: true },
      {
        name: "rol_usuario",
        label: "Rol",
        type: "select",
        options: Object.values(ROLES),
        required: true,
      },
    ],
  },
   compras: {
    fields: [
      {
        name: "nombre_factura",
        label: "Nombre de la Factura",
        type: "text",
        required: true,
      },
      { name: "nit_factura", label: "Nit de la Factura", type: "text", required: true },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        options: Object.values(ESTADO_COMPRA),
        required: true,
      },
    ],
  },
};

export function CustomModal({ show, onHide, entityType, entityData, onSave }) {
  // Obtener configuración de campos para la entidad actual
  const currentConfig = entityConfig[entityType] || { fields: [] };

  // Preparar valores por defecto
  const getDefaultValues = () => {
    if (!entityData) return {};
    const defaultValues = {};
    currentConfig.fields.forEach((field) => {
      defaultValues[field.name] = entityData[field.name] ?? "";
    });
    return defaultValues;
  };

  const handleFormSubmit = (formData) => {
    const updatedData = {
      ...(entityData || {}), // Mantener todos los datos originales si existen
      ...formData, // Agregar los campos editados
    };
    onSave(updatedData);
    onHide();
  };

  if (!show) return null;

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "var(--pomp-turquesa-claro)",
            border: "2px solid var(--pomp-turquesa)",
            borderRadius: "8px",
          }}
        >
          <div
            className="modal-header"
            style={{
              backgroundColor: "var(--pomp-turquesa)",
              borderBottom: "2px solid var(--pomp-turquesa-dark)",
              color: "var(--pomp-white)",
              padding: "1rem 1.5rem",
            }}
          >
            <h5 className="modal-title" style={{ margin: 0 }}>
              {entityData?.id ? `Editar ${entityType}` : `Crear ${entityType}`}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              style={{
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          <CustomForm
            onSubmit={handleFormSubmit}
            defaultValues={getDefaultValues()}
          >
            <div className="modal-body" style={{ padding: "1.5rem" }}>
              {currentConfig.fields.map((field) => {
                const commonProps = {
                  name: field.name,
                  label: field.label,
                  validation: {
                    required: field.required
                      ? "Este campo es obligatorio"
                      : false,
                  },
                };

                switch (field.type) {
                  case "select":
                    return (
                      <CustomForm.Select
                        key={field.name}
                        {...commonProps}
                        options={field.options.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                      />
                    );
                  case "number":
                    return (
                      <CustomForm.Input
                        key={field.name}
                        {...commonProps}
                        type="number"
                        step="any"
                      />
                    );
                  case "email":
                    return (
                      <CustomForm.Input
                        key={field.name}
                        {...commonProps}
                        type="email"
                      />
                    );
                  default:
                    return (
                      <CustomForm.Input
                        key={field.name}
                        {...commonProps}
                        type={field.type || "text"}
                      />
                    );
                }
              })}
            </div>

            <div
              className="modal-footer"
              style={{
                borderTop: "2px solid var(--pomp-turquesa)",
                padding: "1rem 1.5rem",
                backgroundColor: "var(--pomp-turquesa-claro)",
              }}
            >
              <CustomForm.Submit
                style={{
                  backgroundColor: "var(--pomp-turquesa)",
                  color: "var(--pomp-white)",
                  padding: "0.5rem 1.25rem",
                  marginLeft: "0.75rem",
                  border: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "var(--pomp-turquesa-dark)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "var(--pomp-turquesa)")
                }
              >
                Guardar
              </CustomForm.Submit>
            </div>
          </CustomForm>
        </div>
      </div>
    </div>
  );
}
