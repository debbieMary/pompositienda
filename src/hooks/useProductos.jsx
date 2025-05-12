import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../services/ProductosServices";

export function useProductos(id_empresa, id_categoria) {
  return useQuery({
    queryKey: ['productos', id_empresa, id_categoria],
    queryFn: () => getProductos(id_empresa, id_categoria),
  });
}
