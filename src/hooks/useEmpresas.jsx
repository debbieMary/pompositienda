import { useQuery } from "@tanstack/react-query";
import { getAllEmpresas } from "../services/EmpresasServices";

export function useEmpresas() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["empresas"],
        queryFn: getAllEmpresas,
      });
  
    return { data, error, isLoading };
  }