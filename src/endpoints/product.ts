import { api } from "./axios"
import { Dayjs } from "dayjs";
export type ProductImageType = {
  id: string;
  filename: string;
  fileimage: string;
};
export type ProductType = {
  brand: string;
  title: string;
  description: string;
  images: ProductImageType[];
  category:
  | "Car"
  | "Properties"
  | "Mobile"
  | "Bike"
  | "Electronic & Appliances"
  | "Furniture"
  | "Fashion"
  | "Art"
  | "bike"
  | "Other";
  owner: "1st" | "2nd" | "3rd";
  condition: "Antique" | "New" | "Old" | "Refurbished" | "Used" | "Open Box";
  location: string;
  startingBid: Number;
  startingDate: "";
  endingDate: "";
  startingTime: "";
  endingTime: "";
  paymentInfo: "Online" | "COD" | "POS";
  shippingInfo: "self" | "arrange";
};
export type ProductSellDetailType = {
  product: Partial<ProductType>;
  setActiveStep: (value: number) => void;
  handleSubmit: () => void;
  handleChange: (name: string | Dayjs, value: string) => void;
};
export const createProduct = async (data: ProductType) => {
  console.log('Data comes in create Product', data);
  const res = await api.AXIOS({
    url: '/bid',
    method: 'post',
    data
  })

  return res;
}
export const placeBid = () => {

}
export const getAllProduct = () => {

}
export const getProductDetail = () => {

}
export const getTopProduct = () => {

}
export const getfilteredProduct = () => {

}