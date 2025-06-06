import { ROLES } from "./MainConstants";

export function convertToTimestamp(selectedDate){

    const fecha = new Date(selectedDate);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const día = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`; 


}


export function convertToLiteralDay(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}



 export function getNextCategoryValue(categorias_nuevas){
  const lastValue = categorias_nuevas[categorias_nuevas.length - 1]?.value || "cat0";
  const [, digits] = lastValue.match(/^cat(\d+)$/) || [];
  if (!digits) throw new Error(`Formato inválido: ${lastValue}. Debe ser "cat" + números.`);
  
  const nextNumber = parseInt(digits, 10) + 1;
  return `cat${String(nextNumber).padStart(digits.length, "0")}`;
};

