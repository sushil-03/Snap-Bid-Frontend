import { useMutation } from "react-query";
import { RegisterType, updateUser } from "@/endpoints/user";
export const useUpdateUser = () => {
  return useMutation((data: RegisterType) => updateUser(data))
}