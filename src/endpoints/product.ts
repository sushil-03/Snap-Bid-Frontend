import { PaymentOption } from "@/components/molecules/ProductBidder";
import { api } from "./axios"
import { Dayjs } from "dayjs";
// import axios from 'axios'
import Cookies from "universal-cookie";
export type ProductImageType = {
  _id: string;
  filename: string;
  fileimage: string;
};
export type ProductType = {
  brand: string;
  bidIncrement: Number;
  title: string;
  addressFrom: {
    state: String,
    city: String,
    country: String,
    pincode: String,
  }
  description: string;
  images: ProductImageType[];
  category:
  | "Vehicle"
  | "Electronic"
  | "Property"
  | "Furniture"
  | "Painting"
  | "Jewellery"
  | "Collectible"
  | "Art"
  | "Others";
  owner: "1st" | "2nd" | "3rd";
  enable_email: Boolean
  condition: "Antique" | "New" | "Old" | "Refurbished" | "Used" | "Open Box";
  startingBid: number;
  startingDate: "";
  endingDate: "";
  startingTime: "";
  starting: Date,
  timeToPay: number,
  ending: Date,
  endingTime: "";
  paymentOption: "online" | "offline" | "both";
  shippingInfo: "self" | "arrange";

};
export type ProductSellDetailType = {
  product: Partial<ProductType>;
  setActiveStep: (value: number) => void;
  handleSubmit: () => void;
  handleChange: (name: string | Dayjs, value: string) => void;
};
export type BidType = {
  amount: number;
  productId: string;
  type?: PaymentOption

}
export type ProductGetType = {
  category?: string;
  search?: string;
  page?: number
  signal?: any
  status?: string;
}
export const createProduct = async (data: ProductType) => {
  const cookie = new Cookies()
  const user = cookie.get('authorization')
  const res = await api.AXIOS({
    url: '/api/v1/create',
    method: 'post',
    headers: {
      token: user.token
    },
    data,
  })
  return res;
}
export const placeBid = async (data: BidType) => {

  const cookie = new Cookies()
  const user = cookie.get('authorization')
  console.log('Placing bid frontend',);

  const res = await api.AXIOS({
    url: '/api/v1/bid',
    method: 'post',
    headers: {
      token: user.token
    },
    data,
  })
  return res;
}
export const getAllProduct = async ({ category = "", search = "", page = 1, signal, status = "" }: ProductGetType) => {
  try {
    const res = await api.AXIOS({
      url: `/api/v1/products?category=${category}&page=${page}&search=${search}&status=${status}`,
      method: 'get',
      signal
    })

    return res;
  } catch (error) {
    console.log('Aborting req');
    return
  }
}
export const getSingleProduct = async (id: string) => {
  const res = await api.AXIOS({
    url: `/api/v1/product/${id}`,
    method: 'get',
  })
  return res.product;
}

export const bidPayment = async (data: BidType) => {
  const cookie = new Cookies()
  const user = cookie.get('authorization')

  const res = await api.AXIOS({
    url: '/api/v1/product/pay',
    method: 'post',
    headers: {
      token: user.token
    },
    data,
  })
  // console.log('reponse from pay', res);

  return res;
}
export const getTopProduct = () => {

}
export const getfilteredProduct = () => {

}