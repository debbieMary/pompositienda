import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../services/ProductosServices";

export function useProductos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });
  return { data, error, isLoading };
}
