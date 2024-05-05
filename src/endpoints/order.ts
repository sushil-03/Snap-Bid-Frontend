
import { api } from "./axios"
import Cookies from "universal-cookie";
export const getOrderByUserType = async ({ userId, userType }: { userId: string, userType: string }) => {
  const cookie = new Cookies()
  const user = cookie.get('authorization')
  console.log('ser', user);
  if (!userId) return
  console.log('calling', userId, userType);

  const res = await api.AXIOS({
    url: `/api/v1/order?userType=${userType}`,
    method: 'get',
    headers: {
      token: user.token
    },
  })
  return res;
}

export const updateOrder = async ({ payment_status, order_status, orderId }: { payment_status: boolean, order_status: string, orderId: string }) => {

  const cookie = new Cookies()
  const user = cookie.get('authorization')
  console.log('ser', user);

  const res = await api.AXIOS({
    url: `/api/v1/order`,
    method: 'post',
    headers: {
      token: user.token
    },
    data: {
      payment_status, order_status, orderId
    }
  })
  return res;
}