import { api } from "./axios"
export type LoginType = {
  email: string;
  password: string;
};
export type RegisterType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  contact: string;
  country: string;
  state: string,
  pincode: string;
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
export const getRegister = async (data: RegisterType) => {
  const res = await api.AXIOS({
    url: '/api/v1/register',
    method: 'post',
    data
  })
  return res;
}
export const getSingleUser = async (id: string) => {
  const res = await api.AXIOS({
    url: `/api/v1/user/${id}`,
    method: 'get',
  })
  return res;
}