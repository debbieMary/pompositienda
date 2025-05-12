import React from 'react'

export default function CustomBorder({children, color = "turquesa"}) {

    // Mapeo de colores a variables CSS
    const colorMap = {
      turquesa: "var(--pomp-turquesa)",
      turquesaClaro: "var(--pomp-turquesa-claro)",
      salmon: "var(--pomp-salmon)",
      salmonOscuro: "var(--pomp-salmon-oscuro)",
      salmonLight: "var(--pomp-salmon-light)",
      turquesaDark: "var(--pomp-turquesa-dark)",
      plomo: "var(--pomp-plomo)",
      plomoOscuro: "var(--pomp-plomo-oscuro)",
      plomoXOscuro: "var(--pomp-plomo-xoscuro)",
    };
    
  return (
    <>
      <div align="center">
          <div 
            className="text-center p-5 rounded-4 shadow-lg"
            style={{
              backgroundColor: "var(--pomp-white)",
              border: `3px solid ${colorMap[color]}`,
              maxWidth: "600px"
            }}>
          {children}
        </div>
        </div>
        </>
  )
}
