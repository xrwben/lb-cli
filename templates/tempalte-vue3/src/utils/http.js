import axios from 'axios';
import { Toast } from 'vant';

const axiosIns = axios.create({
  // baseURL: requestHost,
  timeout: 15000,
  withCredentials: true,
});

// 添加请求拦截器
axiosIns.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axiosIns.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
  // 对响应错误做点什么
  // console.log(error.response)
  Toast(error.response.statusText || '服务器异常')
  return Promise.reject(error);
});

export default axiosIns;