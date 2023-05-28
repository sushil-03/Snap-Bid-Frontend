import { atom, useAtom } from "jotai";
const userAtom = atom("")
export const useSelectedUser = () => {
  return useAtom(userAtom)
}

