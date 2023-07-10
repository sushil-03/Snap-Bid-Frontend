import { useQuery } from "react-query";
import { getAllProduct } from "@/endpoints/product";

export const getProducts = () => {
  return useQuery('products', getAllProduct, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnMount: false

  });
}