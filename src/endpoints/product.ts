import { api } from "./axios"
import { Dayjs } from "dayjs";
import Cookies from "universal-cookie";
export type ProductImageType = {
  _id: string;
  filename: string;
  fileimage: string;
};
export type ProductType = {
  brand: string;
  title: string;
  description: string;
  images: ProductImageType[];
  category:
  | "Vehicle"
  | "Property"
  | "Furniture"
  | "Painting"
  | "Jewellery"
  | "Collectible"
  | "Music"
  | "Art"
  | "Others";
  owner: "1st" | "2nd" | "3rd";
  condition: "Antique" | "New" | "Old" | "Refurbished" | "Used" | "Open Box";
  location: string;
  startingBid: Number;
  startingDate: "";
  endingDate: "";
  startingTime: "";
  starting: Date,
  ending: Date,
  endingTime: "";
  paymentInfo: "Online Payment" | "Cash on Delivery" | "POS on Delivery";
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
}
export const createProduct = async (data: ProductType) => {
  const cookie = new Cookies()
  const user = cookie.get('authorization')
  console.log('user at create product', user);

  console.log('Data comes in create Product', data);
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
export const getAllProduct = async (cate: string,) => {
  // url: `/api/v1/products?category=${cate}?status=${status}`,
  // const queryClient = useQueryClient();
  const res = await api.AXIOS({
    url: `/api/v1/products?category=${cate}`,
    method: 'get',
  })
  // console.log('Data IIIIIIII', res.products);
  // const products = res.products;

  return res;
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

  console.log('Data comes in  bid paymentxxz', data);
  const res = await api.AXIOS({
    url: '/api/v1/product/pay',
    method: 'post',
    headers: {
      token: user.token
    },
    data,
  })
  return res;
}
export const getTopProduct = () => {

}
export const getfilteredProduct = () => {

}