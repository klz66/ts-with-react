/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-26 23:10:37
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
    console.log(res);
	}
}
