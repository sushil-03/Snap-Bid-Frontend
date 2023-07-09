import { atom, useAtom } from "jotai";
type UserType = {
  name: string,
  _id: string,
  token: string,
}
const userAtom = atom<UserType>({
  name: "",
  _id: "",
  token: ""
})
export const useSelectedUser = () => {
  return useAtom(userAtom)
}

