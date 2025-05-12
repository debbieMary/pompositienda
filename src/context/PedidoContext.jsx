import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const { usuario, isAuthenticated } = useAuth();
  
  // Estado inicial cargado desde localStorage
  const [pedido, setPedido] = useState(() => {
    try {
      const storedPedido = localStorage.getItem('pedido');
      return storedPedido ? JSON.parse(storedPedido) : null;
    } catch (error) {
      console.error("Error al parsear pedido del localStorage:", error);
      return null;
    }
  });
  
  const [totalItems, setTotalItems] = useState(0);

  // Función para cargar/recargar el pedido desde localStorage
  const cargarPedido = useCallback(() => {
    try {
      const storedPedido = localStorage.getItem('pedido');
      if (storedPedido !== null) {
        setPedido(JSON.parse(storedPedido));
      } else {
        setPedido(null);
      }
    } catch (error) {
      console.error("Error al cargar pedido:", error);
      setPedido(null);
    }
  }, []);

  // Función para actualizar el pedido en estado y localStorage
  const actualizarPedido = useCallback((nuevoPedido) => {
    try {
      setPedido(nuevoPedido);
      localStorage.setItem('pedido', JSON.stringify(nuevoPedido));
      // Disparamos evento personalizado para notificar a otros hooks
      window.dispatchEvent(new CustomEvent('localPedidoUpdated'));
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
    }
  }, []);

  // Función para limpiar completamente el pedido
  const limpiarPedido = useCallback(() => {
    try {
      setPedido(null);
      setTotalItems(0);
      localStorage.removeItem('pedido');
      window.dispatchEvent(new CustomEvent('localPedidoUpdated'));
    } catch (error) {
      console.error("Error al limpiar pedido:", error);
    }
  }, []);

  // Función para eliminar un producto específico del pedido
  const eliminarProducto = useCallback((idProducto) => {
    if (!pedido) return;

    try {
      const nuevoPedido = {...pedido};
      nuevoPedido.detalles = nuevoPedido.detalles.filter(
        item => item.id_producto !== idProducto
      );

      // Recalcular total
      nuevoPedido.total = nuevoPedido.detalles.reduce(
        (sum, item) => sum + item.precio_total,
        0
      );

      if (nuevoPedido.detalles.length === 0) {
        limpiarPedido();
      } else {
        actualizarPedido(nuevoPedido);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }, [pedido, actualizarPedido, limpiarPedido]);

  // Función para disminuir la cantidad de un producto
  const disminuirProducto = useCallback((idProducto) => {
    if (!pedido) return;

    try {
      const nuevoPedido = {...pedido};
      const itemIndex = nuevoPedido.detalles.findIndex(
        item => item.id_producto === idProducto
      );

      if (itemIndex >= 0) {
        if (nuevoPedido.detalles[itemIndex].cantidad > 1) {
          nuevoPedido.detalles[itemIndex].cantidad -= 1;
          nuevoPedido.detalles[itemIndex].precio_total = 
            nuevoPedido.detalles[itemIndex].precio_unitario * 
            nuevoPedido.detalles[itemIndex].cantidad;
          
          nuevoPedido.total = nuevoPedido.detalles.reduce(
            (sum, item) => sum + item.precio_total,
            0
          );

          actualizarPedido(nuevoPedido);
        } else {
          eliminarProducto(idProducto);
        }
      }
    } catch (error) {
      console.error("Error al disminuir producto:", error);
    }
  }, [pedido, actualizarPedido, eliminarProducto]);

  // Función para agregar un producto al pedido
  const agregarProducto = useCallback((producto) => {
    if (!usuario) return;

    try {
      let nuevoPedido = pedido ? {...pedido} : {
        id_usuario: usuario.id_usuario,
        nombre_factura: "",
        nit_factura: "0",
        total: 0,
        estado: "pendiente",
        detalles: []
      };

      const itemIndex = nuevoPedido.detalles.findIndex(
        item => item.id_producto === producto.id_producto
      );

      if (itemIndex >= 0) {
        // Producto ya existe, incrementar cantidad
        nuevoPedido.detalles[itemIndex].cantidad += 1;
        nuevoPedido.detalles[itemIndex].precio_total = 
          nuevoPedido.detalles[itemIndex].precio_unitario * 
          nuevoPedido.detalles[itemIndex].cantidad;
      } else {
        // Nuevo producto
        nuevoPedido.detalles.push({
          id_producto: producto.id_producto,
          cantidad: 1,
          precio_unitario:producto.descuento ? producto.precio- producto.descuento:producto.precio,
          precio_total:producto.descuento ? producto.precio- producto.descuento:producto.precio,
          nombre_producto: producto.nombre_producto,
        });
      }

      // Recalcular total
      nuevoPedido.total = nuevoPedido.detalles.reduce(
        (sum, item) => sum + item.precio_total,
        0
      );

      actualizarPedido(nuevoPedido);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }, [usuario, pedido, actualizarPedido]);

  // Efecto para manejar cambios en el localStorage
  useEffect(() => {
    // Handler para cambios en otras pestañas
    const handleStorageChange = (e) => {
      if (e.key === 'pedido') {
        cargarPedido();
      }
    };

    // Handler para cambios en esta pestaña (evento personalizado)
    const handleLocalUpdate = () => {
      cargarPedido();
    };

    // Verificación periódica como respaldo
    const interval = setInterval(() => {
      const currentPedido = localStorage.getItem('pedido');
      if (currentPedido !== JSON.stringify(pedido)) {
        cargarPedido();
      }
    }, 1000);

    // Configurar event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localPedidoUpdated', handleLocalUpdate);

    // Limpieza
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localPedidoUpdated', handleLocalUpdate);
      clearInterval(interval);
    };
  }, [pedido, cargarPedido]);

  // Efecto para limpiar cuando el usuario cierra sesión
  useEffect(() => {
    if (isAuthenticated === false) {
      limpiarPedido();
    }
  }, [isAuthenticated, limpiarPedido]);

  // Efecto para actualizar el contador de items
  useEffect(() => {
    const count = pedido?.detalles?.reduce((sum, item) => sum + item.cantidad, 0) || 0;
    setTotalItems(count);
  }, [pedido]);

  return (
    <PedidoContext.Provider value={{
      pedido,
      totalItems,
      agregarProducto,
      disminuirProducto,
      eliminarProducto,
      limpiarPedido, 
      actualizarPedido
    }}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido debe ser usado dentro de un PedidoProvider');
  }
  return context;
}