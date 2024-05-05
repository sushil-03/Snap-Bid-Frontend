import { atom, useAtom } from "jotai";
type ProductSearchType = {
  search: string,
  category: string
}

const productSearchAtom = atom<ProductSearchType>({
  search: '',
  category: ''
})
export const useProductSearch = () => {
  return useAtom(productSearchAtom)
}

