/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 19:18:34
 */
import * as constants from './constants';
import http from '@/utils/request'
import {demoUrl} from '@/utils/utils'

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (account, password) => {
	return async(dispatch) => {
    let params = {
      account,
      password
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-member/login`,params);
    if(res.code === 20000) {
      localStorage.setItem('token',res.data.token)
      console.log('储存token成功',localStorage.getItem('token'));
      let resp = await http.get(`${demoUrl}/blogservice/blog-member/getMemberInfo`);
      localStorage.setItem('memberInfo',JSON.stringify(resp.data.userInfo))
      console.log(localStorage.getItem('memberInfo'));
      dispatch(changeLogin())
    }

	}
}
export const register = (account, password) => {
	return async(dispatch) => {
    let params = {
      account,
      password
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-member/register`,params);
    if(res.code === 20000) {
      dispatch(login(account,password))
      // let resp = await http.get(`${demoUrl}/blogservice/blog-member/getMemberInfo`,res.data.token);
      // console.log(resp);
    }
	}
}
