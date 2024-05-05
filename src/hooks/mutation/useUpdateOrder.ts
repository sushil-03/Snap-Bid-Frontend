import { updateOrder } from "@/endpoints/order";
import { useMutation } from "react-query";
export const useUpdateUser = () => {
  return useMutation((data: { payment_status: boolean, order_status: string, orderId: string }) => updateOrder(data))
}