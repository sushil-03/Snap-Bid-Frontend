import { useMutation } from "react-query";
import { getLogout } from "@/endpoints/user";
export const useLogin = () => {
  return useMutation(() => getLogout())
}