import { useQuery } from "@tanstack/react-query";
import { getActiveProductos } from "../services/ProductosServices";

export function useActiveProductos(id_empresa, id_categoria) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["productos_active", id_empresa, id_categoria],
    queryFn: () => getActiveProductos(id_empresa, id_categoria),
  });
  return { data, error, isLoading };
}
