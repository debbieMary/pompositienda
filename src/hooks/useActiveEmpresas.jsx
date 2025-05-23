import { useQuery } from "@tanstack/react-query";
import { getActiveEmpresas } from "../services/EmpresasServices";

export function useActiveEmpresas() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["empresas_active"],
        queryFn: getActiveEmpresas,
      });
  
    return { data, error, isLoading };
  }