import { FaTag } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { usePedido } from "../../context/PedidoContext";
import GenericItem from "../../ui/GenericItem";
import toast from "react-hot-toast";
import { FiPackage } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

export default function ProductoItem({ producto }) {
  const { usuario } = useAuth();
  const { agregarProducto } = usePedido();

  function handleAgregarProducto(e) {
    e.preventDefault();
    if (!usuario) {
      toast.error("Debes iniciar sesión para agregar productos");
      return;
    }
    if(producto.cantidad_stock <= 0){
       toast.error("No puedes agregar este producto porque no se encuentra en stock");
        return;
    }

    toast.success(`Producto: ${producto.nombre_producto} agregado a Carrito`);
    agregarProducto(producto);
  }

  return (
    <GenericItem
      imageSrc={producto.imagen}
      imageAlt={producto.nombre_producto}
      stock={{
        content:
          producto.cantidad_stock > 0
            ? `${producto.cantidad_stock} unidades disponibles`
            : "Agotado",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "0.9rem",
          fontWeight: "600",
          color:
            producto.cantidad_stock > 0
              ? "var(--pomp-turquesa-dark)"
              : "var(--pomp-plomo-xoscuro)",
          background:
            producto.cantidad_stock > 0
              ? "rgba(30, 170, 170, 0.1)"
              : "rgba(179, 179, 179, 0.1)",
          borderLeft: `3px solid ${
            producto.cantidad_stock > 0
              ? "var(--pomp-turquesa)"
              : "var(--pomp-plomo-oscuro)"
          }`,
          margin: "6px 0",
        },
        icon: producto.cantidad_stock > 0 ? FiPackage : MdOutlineClose,
        iconSize: 20,
      }}
      topLeftBadge={{
        content: producto.nombre_categoria,
        style: {
          backgroundColor: "var(--pomp-turquesa-claro)",
          color: "var(--pomp-turquesa-dark)",
        },
      }}
      topRightText={{
        content: producto.nombre_empresa,
        style: { color: "var(--pomp-plomo-oscuro)" },
      }}
      title={producto.nombre_producto}
      description={producto.descripcion}
      price={producto.precio - producto.descuento}
      originalPrice={producto.descuento > 0 ? producto.precio : null}
      discountBadge={
        producto.descuento > 0
          ? {
              content: `Bs. ${producto.descuento} OFF`,
              style: {
                backgroundColor: "var(--pomp-salmon-light)",
                color: "var(--pomp-salmon-oscuro)",
              },
              icon: FaTag,
            }
          : null
      }
      onCTAClick={(e) => {
        handleAgregarProducto(e);
      }}
      ctaText="Agregar a Carrito"
    />
  );
}
