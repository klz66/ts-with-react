/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 16:29:27
 */
// import axios from "axios";
import {authedAxios} from './config'

const http = {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      authedAxios.get(url, {
          params: params,
        }).then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      authedAxios.put(url, data).then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      authedAxios.post(url, data).then(
        (response) => {
          //关闭进度条
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  delete (url, data) {
    return new Promise((resolve, reject) => {
      authedAxios.delete(url, { data }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}


export default http
