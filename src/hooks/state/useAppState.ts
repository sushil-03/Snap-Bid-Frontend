import { atom, useAtom } from "jotai";
type UserType = {
  name: string,
  _id: string,
  token: string,
  selectedAddress: number,
  address: any
  avatar: string
}

const userAtom = atom<UserType>({
  name: "",
  _id: "",
  token: "",
  avatar: "",
  selectedAddress: -1,
  address: []
})
export const useSelectedUser = () => {
  return useAtom(userAtom)
}

