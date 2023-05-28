import { api } from "./axios"
import { Dayjs } from "dayjs";
export type ProductImageType = {
  id: string;
  filename: string;
  filetype: string;
  fileimage: string;
  datetime: string;
  filesize: string;
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
  startingDate: Dayjs;
  endingDate: Dayjs;
  startingTime: Dayjs;
  endingTime: Dayjs;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerCity: string;
  sellerState: string;
  sellerZip: string;
  paymentInfo: "online" | "COD" | "POS";
  shippingInfo: "self" | "arrange";
};
export type ProductSellDetailType = {
  product: Partial<ProductType>;
  setActiveStep: (value: number) => void;
  handleChange: (name: string | Dayjs, value: string) => void;
};
export const createProduct = async (data: ProductType) => {
  console.log('Data comes in create Product');
  return {}
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