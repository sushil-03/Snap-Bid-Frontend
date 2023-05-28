import { useMutation } from "react-query";
import { createProduct, ProductType } from "@/endpoints/product";
export const useCreateProduct = () => {
  return useMutation((data: ProductType) => createProduct(data))
}