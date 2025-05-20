import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomForm = ({ children, onSubmit, defaultValues }) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-100">
        {children}
      </form>
    </FormProvider>
  );
};

// Componente Input
const Input = ({ name, label, type = "text", validation, step }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="form-label fw-semibold"
        style={{ color: "var(--pomp-turquesa-dark)" }}
      >
        {label}
      </label>
      <input
        type={type}
        step={step}
        id={name}
        disabled={isSubmitting}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        style={{
          borderColor: "var(--pomp-turquesa)",
          backgroundColor: errors[name]
            ? "var(--pomp-salmon-light)"
            : "var(--pomp-turquesa-claro)",
        }}
        {...register(name, validation)}
      />
      {errors[name] && (
        <div
          className="invalid-feedback d-block"
          style={{ color: "var(--pomp-salmon)" }}
        >
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

// Componente Select
const Select = ({ name, label, options, validation }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="form-label fw-semibold"
        style={{ color: "var(--pomp-turquesa-dark)" }}
      >
        {label}
      </label>
      <select
        id={name}
        disabled={isSubmitting}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        style={{
          borderColor: "var(--pomp-turquesa)",
          backgroundColor: errors[name]
            ? "var(--pomp-salmon-light)"
            : "var(--pomp-turquesa-claro)",
        }}
        {...register(name, validation)}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <div
          className="invalid-feedback d-block"
          style={{ color: "var(--pomp-salmon)" }}
        >
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

// Componente DatePicker
const DatePickerField = ({ name, label, validation, ...rest }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const dateValue = watch(name);

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="form-label fw-semibold"
        style={{ color: "var(--pomp-turquesa-dark)" }}
      >
        {label}
      </label>
      <DatePicker
        id={name}
        selected={dateValue ? new Date(dateValue) : null}
        onChange={(date) => setValue(name, date)}
        customInput={
          <input
            style={{
              borderColor: "var(--pomp-turquesa)",
              backgroundColor: errors[name]
                ? "var(--pomp-salmon-light)"
                : "var(--pomp-turquesa-claro)",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          />
        }
        disabled={isSubmitting}
        dateFormat="dd/MM/yyyy"
        {...rest}
      />
      <input type="hidden" {...register(name, validation)} />
      {errors[name] && (
        <div
          className="invalid-feedback d-block"
          style={{ color: "var(--pomp-salmon)" }}
        >
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

// Componente TextArea (NUEVO)
const TextArea = ({ name, label, validation, rows = 3 }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className="mb-3">
      <label
        className="form-label fw-semibold"
        style={{ color: "var(--pomp-turquesa-dark)" }}
      >
        {label}
      </label>
      <textarea
        {...register(name, validation)}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        style={{
          borderColor: "var(--pomp-turquesa)",
          backgroundColor: errors[name]
            ? "var(--pomp-salmon-light)"
            : "var(--pomp-turquesa-claro)",
        }}
        rows={rows}
        disabled={isSubmitting}
      />
      {errors[name] && (
        <div
          className="invalid-feedback d-block"
          style={{ color: "var(--pomp-salmon)" }}
        >
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

const ImageUpload = ({ name, label, validation }) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useFormContext();

  const [isLoading, setIsLoading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  // Registrar el campo manualmente
  React.useEffect(() => {
    register(name, validation);
  }, [register, name, validation]);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setPreviewUrl(null);

    try {
      if (!file.type.match(/image\/(jpeg|png|webp|jpg)/i)) {
        throw new Error("Formato no soportado (solo JPEG, PNG, WEBP)");
      }

      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (!reader.result?.startsWith("data:image")) {
            reject(new Error("Archivo no es una imagen válida"));
          } else {
            resolve(reader.result);
          }
        };
        reader.onerror = () => reject(new Error("Error al leer archivo"));
        reader.readAsDataURL(file);
      });

      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Imagen corrupta"));
        img.src = base64Image;
      });

      // Establecer el valor y activar validaciones correctamente
      setValue(name, base64Image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      setPreviewUrl(base64Image);
      clearErrors(name);
    } catch (error) {
      setValue(name, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setPreviewUrl(null);
      setError(name, {
        type: "manual",
        message: error.message || "Error al procesar imagen",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-3">
      <label
        className="form-label fw-semibold"
        style={{ color: "var(--pomp-turquesa-dark)" }}
      >
        {label}
      </label>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="d-none"
        id={`file-upload-${name}`}
      />

      <label
        htmlFor={`file-upload-${name}`}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        style={{
          borderColor: "var(--pomp-turquesa)",
          backgroundColor: errors[name]
            ? "var(--pomp-salmon-light)"
            : "var(--pomp-turquesa-claro)",
          cursor: "pointer",
          minHeight: "38px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <span className="d-flex align-items-center gap-2">
            <span className="spinner-border spinner-border-sm"></span>
            Procesando...
          </span>
        ) : previewUrl ? (
          "Cambiar imagen"
        ) : (
          "Seleccionar imagen"
        )}
      </label>

      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Vista previa"
            className="img-thumbnail"
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              borderColor: "var(--pomp-turquesa)",
              objectFit: "contain",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              setPreviewUrl(null);
            }}
          />
        </div>
      )}

      {errors[name] && (
        <div
          className="invalid-feedback d-block"
          style={{ color: "var(--pomp-salmon)" }}
        >
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

// Componente Submit
const Submit = ({ children, loadingText = "Procesando..." }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="d-grid mb-3">
      <button
        type="submit"
        className="btn fw-bold py-2"
        disabled={isSubmitting}
        style={{
          backgroundColor: "var(--pomp-turquesa)",
          color: "white",
          border: "none",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) =>
          !isSubmitting &&
          (e.target.style.backgroundColor = "var(--pomp-turquesa-dark)")
        }
        onMouseOut={(e) =>
          !isSubmitting &&
          (e.target.style.backgroundColor = "var(--pomp-turquesa)")
        }
      >
        {isSubmitting ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

// Asignamos los componentes compuestos
CustomForm.Input = Input;
CustomForm.Submit = Submit;
CustomForm.Select = Select;
CustomForm.DatePicker = DatePickerField;
CustomForm.TextArea = TextArea;
CustomForm.ImageUpload = ImageUpload;

export default CustomForm;
