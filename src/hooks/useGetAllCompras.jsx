import { useQuery } from "@tanstack/react-query";
import { getAllCompras } from "../services/CompraService";

export function useGetAllCompras() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["compras"],
        queryFn: getAllCompras,
      });
  
    return { data, error, isLoading };
  }