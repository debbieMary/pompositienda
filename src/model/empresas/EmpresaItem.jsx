import GenericItem from "../../ui/GenericItem";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";

export default function EmpresaItem({ empresa }) {

  return <GenericItem
  imageSrc={empresa.imagen}
  imageAlt={empresa.nombre_empresa}
  title={empresa.nombre_empresa}
  subtitle={empresa.nombre_categoria}
  description={empresa.descripcion}
  socialLinks={[
    empresa.redesSociales?.instagram && {
      href: empresa.redesSociales.instagram,
      icon: <FaInstagram/>,
      className: "bg-secondary",
    },
    empresa.redesSociales?.facebook && {
      href: empresa.redesSociales.facebook,
      icon: <FaFacebook/>,
      className: "bg-primary",
    },
    empresa.redesSociales?.tiktok && {
      href: empresa.redesSociales.tiktok,
      icon: <FaTiktok/>,
      className: "bg-plomo",
    },
    empresa.redesSociales?.web && {
      href: empresa.redesSociales.web,
      icon: <FaGlobe/>,
      className: "bg-tertiary",
    },
  ].filter(Boolean)}
  location={{
    icon: HiOutlineLocationMarker,
    text: empresa.direccion,
  }}
  phone={{
    icon: HiOutlinePhone,
    text: empresa.telefono,
  }}
  ctaText="Ver Productos"
  ctaLink={`/productos/${empresa.id_empresa}`}
/>

}