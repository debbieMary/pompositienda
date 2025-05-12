import React from "react";

export default function PageTitle({ 
    label, 
    Icon, 
    color = "var(--pomp-turquesa-dark)", 
    className = "", 
    iconClass = "mb-2 mx-2" 
  }) {
    return (
      <h2 
        className={`${className}`} 
        style={{ color }}
      >
        {Icon && <Icon className={iconClass} />}
        {label}
      </h2>
    );
  };