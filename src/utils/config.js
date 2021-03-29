/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-29 17:07:08
 */
import axios from 'axios'

const authedAxios = axios.create({
  timeout: 20000,
})

// 添加请求拦截器
authedAxios.interceptors.request.use(
  config => {
    if(localStorage.getItem('token')){
      config.headers['token'] = localStorage.getItem('token');
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)


export {  authedAxios }
