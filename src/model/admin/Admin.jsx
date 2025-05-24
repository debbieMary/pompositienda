import React from 'react'
import VentasPorDia from './VentasPorDia.jsx'
import RegistrosDiarios from './RegistrosDiarios.jsx'

export default function Admin() {
  return (
     <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <VentasPorDia />
      <RegistrosDiarios />
    </div>
  )
}
