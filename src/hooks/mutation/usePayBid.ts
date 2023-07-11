import { BidType, bidPayment } from "@/endpoints/product";
import { useMutation } from "react-query";
export const usePayBid = () => {

  return useMutation((data: BidType) => bidPayment(data))
}