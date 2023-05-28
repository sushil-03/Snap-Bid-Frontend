import { useMutation } from "react-query";
import { getRegister, RegisterType } from "@/endpoints/user";
export const useRegister = () => {
  return useMutation((data: RegisterType) => getRegister(data))
}