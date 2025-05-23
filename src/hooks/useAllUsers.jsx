import { useQuery } from "@tanstack/react-query";
import { getAllUsuarios } from "../services/UsuariosServices";

export function useAllUsers() {
    const {
        data,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["all_usuarios"],
        queryFn: getAllUsuarios,
      });
  
    return { data, error, isLoading };
  }