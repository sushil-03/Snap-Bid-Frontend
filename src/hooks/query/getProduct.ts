import { useQuery } from "react-query";
import { getAllProduct, ProductGetType } from "@/endpoints/product";
export const getProducts = ({ category = "", search = "", page = 1, status }: ProductGetType) => {
  return useQuery(['products', category, search, page, status], () => getAllProduct({ category, search, page, status }), {
    staleTime: 1000 * 60 * 10, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 5 minutes
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });
}