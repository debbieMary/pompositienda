import  {  useRef } from 'react'
import { opcionesCIExp, opcionesUserRoles } from '../utils/MainConstants'
import CustomForm from "./CustomForm";

export default function CustomRegisterForm({onSubmit,  needs_role_selector}) {

      const formRef = useRef();




  return (
     <CustomForm ref={formRef} onSubmit={onSubmit}>
          <CustomForm.Input
            name="nombre1_usuario"
            label="Primer Nombre:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="nombre2_usuario"
            label="Segundo Nombre:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="apellido1_usuario"
            label="Apellido Paterno:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="apellido2_usuario"
            label="Apellido Materno:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="ci_usuario"
            label="Cédula de Identidad:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Select
            name="exp_ci_usuario"
            label="Lugar de Expedición:"
            options={opcionesCIExp}
            validation={{ required: "Debe seleccionar un país" }}
          />

          { needs_role_selector && <CustomForm.Select
            name="rol_usuario"
            label="Rol de usuario:"
            options={opcionesUserRoles}
            validation={{ required: "Debe seleccionar un rol" }}
          />}

          <CustomForm.Input
            name="celular_usuario"
            label="Número de Celular:"
            validation={{ required: "Este campo es obligatorio" }}
          />

          <CustomForm.Input
            name="email_usuario"
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
            name="password_usuario"
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

          <CustomForm.DatePicker
            name="fecha_nac_usuario"
            label={"Fecha de Nacimiento:" + "\u00A0\u00A0\u00A0"}
            validation={{ required: "Debe ingresar su fecha de nacimiento" }}
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />

          <CustomForm.Submit>Registrarme</CustomForm.Submit>
        </CustomForm>
  )
}
