import React from 'react'

export default function CustomCard({children}) {
  return (
    <div
    className="card h-100 shadow-sm border-0 overflow-hidden"
    style={{
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      borderRadius: "15px",
      border: "1px solid var(--pomp-plomo)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
    }}
  >{children}
    </div>
  )
}
