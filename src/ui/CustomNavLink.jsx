import React from 'react'
import { NavLink } from "react-router-dom";

export default function CustomNavLink({ label, to, badgeCount }) {
  return (
    <li className="nav-item me-2 mt-3 my-sm-3">
      <NavLink
        className="nav-link pomp-nav-item d-flex align-items-center"
        to={to}
      >
        <span className="ms-2">{label}</span>
        {badgeCount > 0 && (
          <span className="badge bg-tertiary ms-2">
            {badgeCount}
          </span>
        )}
      </NavLink>
    </li>
  )
}