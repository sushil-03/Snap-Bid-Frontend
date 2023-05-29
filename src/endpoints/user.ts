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
  console.log('DATA COMES HERE', data);
  const res = await api.AXIOS({
    url: '/auth/login',
    method: 'post',
    data,
  })
  console.log(res);
  localStorage.setItem('bidToken', res.token)
  return res;

}
export const getRegister = async (data: RegisterType) => {

  const res = await api.AXIOS({
    url: '/auth/signup',
    method: 'PUT',
    data
  })

  return res;
}
export const getLogout = async () => {
  // return await api.AXIOS({
  //   url:'',
  //   method:"post"
  // })
}
export const getLoadUser = async () => {
  // return await api.AXIOS({
  //   url:'',
  //   method:"post"
  // })
}