import { getSingleUser } from "@/endpoints/user";
import { useQuery } from "react-query";

export const getUserById = (id: string) => {
  return useQuery(['user', id], () => getSingleUser(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    refetchOnMount: false

  });
}