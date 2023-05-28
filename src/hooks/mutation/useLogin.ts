import { useMutation } from "react-query";
import { getLogin, LoginType } from "@/endpoints/user";
export const useLogin = () => {
  return useMutation((data: LoginType) => getLogin(data))
}