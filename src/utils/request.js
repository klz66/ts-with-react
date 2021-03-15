/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-13 19:33:34
 */
import axios from "axios";

const http = {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
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
      axios.put(url, data).then(
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
      axios.post(url, data).then(
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
}


export default http
