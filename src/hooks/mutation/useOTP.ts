import { useMutation, } from "react-query";
import { generateOTP } from "@/endpoints/user";
export const getOTP = () => {
  return useMutation((email: string) => generateOTP(email))
}