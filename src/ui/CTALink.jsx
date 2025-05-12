import React from 'react'
import { NavLink } from "react-router-dom";

export default function CTALink({className, to, children, onClick}) {
  return (
    <NavLink className={className} to={to} onClick={onClick}>
    {children}
  </NavLink>
  )
}
