import { HiOutlineEmojiHappy } from "react-icons/hi";

export default function CustomSpinner({color = "turquesa", size = "medium" , children} ){
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
    plomoXOscuro: "var(--pomp-plomo-xoscuro)"
  };

  // Tamaños predefinidos
  const sizeMap = {
    small: "50px",
    medium: "70px",
    large: "90px",
    xlarge: "110px"
  };

  return (
   <div align="center">
   <div className="spinner-container" style={{ width: sizeMap[size], height: sizeMap[size] }}>
    <div 
      className="infinite-spinner" 
      style={{ 
        '--spinner-color': colorMap[color] || colorMap.turquesa,
        '--spinner-size': sizeMap[size]
      }}
    />
  </div>
  <h2 className="tex-center display-5" style={{color:colorMap[color]}}>{children} <HiOutlineEmojiHappy/></h2>
  </div>
  );
};
