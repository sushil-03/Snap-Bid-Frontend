import { BidType, placeBid } from "@/endpoints/product";
import { useMutation } from "react-query";
export const useBid = () => {
  return useMutation((data: BidType) => placeBid(data))
}