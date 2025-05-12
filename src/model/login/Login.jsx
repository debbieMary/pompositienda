import React, { useEffect } from "react";
import CustomBorder from "../../ui/CustomBorder";
import PageTitle from "../../ui/PageTitle";
import { FaUser } from "react-icons/fa";
import { useLogin } from "../../hooks/useLogin";
import ErrorComponent from "../../ui/ErrorComponent";
import CustomSpinner from "../../ui/CustomSpinner";
import CustomForm from "../../ui/CustomForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, isSuccess, data, error, reset } =
    useLogin();

  const onSubmit = (data) => {
    mutate({
      email_usuario: data.email,
      password_usuario: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Datos recibidos:", data);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      window.dispatchEvent(new Event("localStorageUpdated"));
      navigate("/productos"); // Ajusta esta ruta según necesites
    }
  }, [isSuccess, data, navigate]);

  function reload() {
    reset();
    navigate(location.pathname, { replace: true });
  }

  if (isError)
    return (
      <ErrorComponent
        titulo={error.message}
        subtitulo="Pudo ser un problema de conexión o mal ingreso de credeciales."
        onClick={reload}
        buttonLabel="Volver a intentarlo"
      />
    );

  if (isLoading) return <CustomSpinner>Logueando...</CustomSpinner>;

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <CustomBorder color="turquesa">
          <PageTitle label="Inicio de Sesión" Icon={FaUser} />

          <CustomForm onSubmit={onSubmit}>
            
            <CustomForm.Input
              name="email"
              label="Correo Electrónico:"
              type="email"
              validation={{
                required: "El correo es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              }}
            />

            <CustomForm.Input
              name="password"
              label="Contraseña:"
              type="password"
              validation={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
              }}
            />

            <CustomForm.Submit>Ingresar</CustomForm.Submit>
          </CustomForm>

          {/* <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                
               
                <div className="mb-3">
                  <label 
                    htmlFor="email" 
                    className="form-label fw-semibold"
                    style={{ color: "var(--pomp-turquesa-dark)" }}
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    style={{
                      borderColor: "var(--pomp-turquesa)",
                      backgroundColor: errors.email 
                        ? "var(--pomp-salmon-light)" 
                        : "var(--pomp-turquesa-claro)",
                    }}
                    {...register("email", {
                      required: "El correo es requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico inválido",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block" style={{ color: "var(--pomp-salmon)" }}>
                      {errors.email.message}
                    </div>
                  )}
                </div>
      
                <div className="mb-4">
                  <label 
                    htmlFor="password" 
                    className="form-label fw-semibold"
                    style={{ color: "var(--pomp-turquesa-dark)" }}
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    style={{
                      borderColor: "var(--pomp-turquesa)",
                      backgroundColor: errors.password 
                        ? "var(--pomp-salmon-light)" 
                        : "var(--pomp-turquesa-claro)",
                    }}
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message: "Mínimo 6 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback d-block" style={{ color: "var(--pomp-salmon)" }}>
                      {errors.password.message}
                    </div>
                  )}
                </div>
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
                      !(isSubmitting) && (e.target.style.backgroundColor = "var(--pomp-turquesa-dark)")
                    }
                    onMouseOut={(e) => 
                      !(isSubmitting) && (e.target.style.backgroundColor = "var(--pomp-turquesa)")
                    }
                  >
                    {(isSubmitting) ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Ingresando...
                      </>
                    ) : (
                      "Ingresar"
                    )}
                  </button>
                </div> */}

          {/* Enlace olvidé contraseña 
                <div className="text-center">
                  <a 
                    href="#"
                    className="text-decoration-none fw-semibold"
                    style={{ 
                      color: "var(--pomp-turquesa-dark)",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => e.target.style.color = "var(--pomp-salmon)"}
                    onMouseOut={(e) => e.target.style.color = "var(--pomp-turquesa-dark)"}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
               
              </form> */}
      </CustomBorder>
    </div>
  );
}
