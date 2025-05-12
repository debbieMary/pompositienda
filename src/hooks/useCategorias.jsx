import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../services/CategoriaServices";

export function useCategorias() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["categorias"],
        queryFn: getCategorias,
      });
  
    return { data, error, isLoading };
  }