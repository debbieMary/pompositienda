import React, { useState } from 'react';
import { FiFileText, FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useHistorial } from '../../hooks/useHistorial';
import CustomSpinner from '../../ui/CustomSpinner';
import ErrorComponent from '../../ui/ErrorComponent';
import PageTitle from '../../ui/PageTitle';
import CustomBorder from '../../ui/CustomBorder';
import EmptyData from '../../ui/EmptyData';

const Historial = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const {usuario} = useAuth(); 
  const { data: historial, isLoading, isError} = useHistorial(usuario.id_usuario);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'pendiente':
        return (
          <span className="badge rounded-pill" style={{ 
            backgroundColor: 'var(--pomp-salmon-light)',
            color: 'var(--pomp-salmon-oscuro)',
            border: '1px solid var(--pomp-salmon)'
          }}>
            <FiClock className="me-1" /> Pendiente
          </span>
        );
      case 'completado':
        return (
          <span className="badge rounded-pill" style={{ 
            color: 'var(--pomp-turquesa-dark)',
            border: '1px solid var(--pomp-turquesa)'
          }}>
            <FiCheckCircle className="me-1" /> Completado
          </span>
        );
      default:
        return (
          <span className="badge rounded-pill" style={{ 
            backgroundColor: 'var(--pomp-plomo)',
            color: 'var(--pomp-plomo-xoscuro)',
            border: '1px solid var(--pomp-plomo-oscuro)'
          }}>
            <FiPackage className="me-1" /> {estado}
          </span>
        );
    }
  };

  if(isLoading){
    return <>
    <CustomBorder>
    <CustomSpinner>Cargando tu historial!!!</CustomSpinner>
    </CustomBorder>
    </>
  }

  if(isError){
    return <ErrorComponent titulo="Error de carga" mensaje="No pudimos cargar tu historial" to="/" buttonLabel="Volver al inicio"/>
  }



  if(historial.length === 0){
    return <EmptyData titulo="No hiciste compras aún" buttonLabel="Ir a la lista de Productos" to="/productos"/>
  }

  return (
    <div className="container py-2 px-2" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
          <PageTitle label="Historial de Compras" Icon={FiFileText}/>
      </div>

      <div className="accordion" id="historialAccordion">
      {historial && historial.map((compra, index) => (
          <div 
            key={index} 
            className={`accordion-item mb-3 border rounded ${activeIndex === index ? 'border-pomp-turquesa_dark ' : 'border-pomp-plomo_oscuro'}`}
            style={{
              borderColor: activeIndex === index ? 'var(--pomp-turquesa)' : 'var(--pomp-plomo)',
              boxShadow: activeIndex === index ? '0 2px 12px hsla(180, 70%, 39.21568627450981%, 0.1)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button p-3 ${activeIndex === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleAccordion(index)}
                style={{
                  backgroundColor: activeIndex === index ? 'var(--pomp-turquesa-claro)' : 'white',
                  color: 'var(--pomp-plomo-xoscuro)'
                }}
              >
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between align-items-center w-100 mb-2">
                    <div className="d-flex align-items-center">
                      <span className="fw-medium me-3" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                        Compra #{compra.id_compra_total}
                      </span>
                      {getEstadoBadge(compra.estado)}
                    </div>
                    <span className="fw-medium" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                      Bs. {compra.total}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <small className="text-muted">{formatFecha(compra.fecha_compra_total)}</small>
                  </div>
                </div>
              </button>
            </h2>
            
            <div 
              className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
              data-bs-parent="#historialAccordion"
            >
              <div className="accordion-body pt-3 pb-4 px-3">
                {/* Sección de facturación */}
                <div className="card mb-4 border-0" style={{ backgroundColor: 'var(--pomp-)' }}>
                  <div className="card-body p-3">
                    <h5 className="card-title d-flex align-items-center mb-3" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                      <FiFileText className="me-2" />
                      <span>Datos de Facturación</span>
                    </h5>
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <p className="mb-1 small" style={{ color: 'var(--pomp-plomo-xoscuro)' }}>Nombre/Razón Social</p>
                        <p className="mb-0 fw-medium">{compra.nombre_factura || 'No especificado'}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 small" style={{ color: 'var(--pomp-plomo-xoscuro)' }}>NIT/CI</p>
                        <p className="mb-0 fw-medium">{compra.nit_factura}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de productos */}
                <h5 className="d-flex align-items-center mb-3" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                  <FiPackage className="me-2" />
                  <span>Productos Adquiridos</span>
                </h5>

                <div className="list-group">
                  {compra.detalles.map((producto, pIndex) => (
                    <div 
                      key={pIndex} 
                      className="list-group-item d-flex justify-content-between align-items-center p-3 mb-2 border-0 rounded"
                      style={{ 
                        backgroundColor:'white',
                        borderLeft: '3px solid var(--pomp-turquesa)'
                      }}
                    >
                      <div>
                        <h6 className="mb-1 fw-medium" style={{ color: 'var(--pomp-plomo-xoscuro)' }}>{producto.nombre_producto}</h6>
                        <small className="text-muted">
                          {producto.cantidad} × Bs. {producto.precio_unitario}
                        </small>
                      </div>
                      <span 
                        className="badge rounded-pill px-3 py-2"
                        style={{ 
                          backgroundColor: 'var(--pomp-salmon-light)',
                          color: 'var(--pomp-salmon-oscuro)',
                          border: '1px solid var(--pomp-salmon)'
                        }}
                      >
                        Bs. {producto.precio_total}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div 
                  className="d-flex justify-content-between align-items-center mt-4 p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--pomp-turquesa-claro)',
                    border: '2px solid var(--pomp-turquesa)'
                  }}
                >
                  <h5 className="m-0" style={{ color: 'var(--pomp-turquesa-dark)' }}>Total de la compra:</h5>
                  <h4 className="m-0 fw-medium" style={{ color: 'var(--pomp-turquesa-dark)' }}>
                    Bs. {compra.total}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Historial;