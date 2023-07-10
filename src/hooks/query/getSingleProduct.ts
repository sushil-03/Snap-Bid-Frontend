import { useQuery } from "react-query";
import { getSingleProduct } from "@/endpoints/product";

export const getProductByID = (id: string) => {
  return useQuery(['products', id], () => getSingleProduct(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    enabled: true,
    refetchOnMount: false
  });
}