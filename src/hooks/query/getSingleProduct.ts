import { useQuery, } from "react-query";
import { getSingleProduct } from "@/endpoints/product";

export const getProductByID = (id: string) => {
  // const queryClient = useQueryClient()
  // const data: any = queryClient.getQueryData(['products', ""])
  console.log("hello",);

  return useQuery(['product', id], () => getSingleProduct(id), {
    staleTime: 1000 * 60 * 1, // 1 minutes
    refetchInterval: 1000 * 60 * 1, //1 minutes
    refetchOnWindowFocus: true,
    enabled: true,
    refetchOnMount: false
  });
}