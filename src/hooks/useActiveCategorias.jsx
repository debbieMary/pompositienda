import { useQuery } from "@tanstack/react-query";
import { getActiveCategorias } from "../services/CategoriaServices";

export function useActiveCategorias() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["categorias_active"],
        queryFn: getActiveCategorias,
      });
  
    return { data, error, isLoading };
  }

 