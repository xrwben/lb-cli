import http from '@/utils/http.js';
import api from './api.config.js';

// 用户信息
export const getUserInfoAPI = () => {
  return new Promise((resolve, reject) => {
    http.get(api.userInfo).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}