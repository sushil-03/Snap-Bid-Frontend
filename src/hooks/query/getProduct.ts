import { useQuery } from "react-query";
import { getAllProduct } from "@/endpoints/product";

export const getProducts = (category: string | "") => {
  return useQuery(['products', category], () => getAllProduct(category), {
    staleTime: 1000 * 60 * 10, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 5 minutes
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnMount: false

  });
}