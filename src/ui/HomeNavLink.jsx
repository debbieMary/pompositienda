import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { NavLink } from "react-router-dom";


export default function HomeNavLink() {
  return (
    <NavLink
      to="dashboard"
      className={({ isActive }) =>
        `${isActive ? "pomp-active-home-link" : "pomp-home-link"}`
      }
    >
      <span className="mt-4">
        <HiOutlineHome className="pomp-nav-icon" size={30} />
      </span>
    </NavLink>
  );
}
