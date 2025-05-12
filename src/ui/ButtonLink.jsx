import React from 'react'
import { NavLink } from "react-router-dom";
export default function ButtonLink({to,children, onClick, disabled}) {
  return (
    <NavLink 
    disabled={disabled}
    to={to}
    onClick={onClick}
    className="btn btn-lg fw-bold"
    style={{
      backgroundColor: "var(--pomp-turquesa)",
      color: "white",
      border: "none",
      transition: "all 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "var(--pomp-salmon)";
      e.target.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "var(--pomp-turquesa)";
      e.target.style.transform = "translateY(0)";
    }}
  >
  {children}
  </NavLink>
  )
}
