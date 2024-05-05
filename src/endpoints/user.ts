import { api } from "./axios"
import Cookies from "universal-cookie";
export type LoginType = {
  email: string;
  password: string;
};
export type RegisterType = {
  email: string;
  password: string;
  firstname: string;
  avatar: string;
  lastname: string;
  address?: [{
    contact?: string;
    country?: string;
    state?: string,
    pincode?: string;
  }]
};
export const getLogin = async (data: LoginType) => {
  // const [, setUser] = useSelectedUser()
  const res = await api.AXIOS({
    url: '/api/v1/login',
    method: 'post',
    data,
  })
  return res;
}
export const updateUser = async (data: RegisterType) => {
  console.log('upaddddting a', data);
  const cookie = new Cookies()
  const user = cookie.get('authorization')
  const res = await api.AXIOS({
    url: '/api/v1/user',
    method: 'put',
    data,
    headers: {
      token: user.token
    },
  })
  return res;
}
export const getRegister = async (data: RegisterType) => {
  const res = await api.AXIOS({
    url: '/api/v1/register',
    method: 'post',
    data
  })
  return res;
}
export const getSingleUser = async (id: string) => {
  console.log('calling single user with', id);
  if (!id) return null;

  const res = await api.AXIOS({
    url: `/api/v1/user/${id}`,
    method: 'get',
  })
  return res;
}
export const generateOTP = async (email: string) => {
  const res = await api.AXIOS({
    url: `/api/v1/service/otp`,
    method: 'post',
    data: { email: email }
  })
  return res;
}