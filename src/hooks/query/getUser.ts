import { useQuery } from "react-query";
import { getOrderByUserType } from "@/endpoints/order";
export const getOrders = ({ userId, userType }: { userId: string, userType: string }) => {
  return useQuery([userId, userType], () => getOrderByUserType({ userId, userType }), {
    staleTime: 1000 * 60 * 10, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 5 minutes
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnMount: false,

  });
}