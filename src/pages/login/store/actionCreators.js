/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-28 18:15:18
 */
import { notification } from 'antd';
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
    if(account===''|| password===''){
      notification['error']({
        message: '请重新输入账号密码',
        duration: 1,
      });
      return;
    }
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
    } else {
      notification['error']({
        message: '账号不存在或账号密码错误，请重试',
        duration: 1,
      });
    }

	}
}
export const register = (account, password) => {
	return async(dispatch) => {
    if(account===''|| password===''){
      notification['error']({
        message: '请重新输入账号密码',
        duration: 1,
      });
      return;
    }
    let params = {
      account,
      password
    }
    let res = await http.post(`${demoUrl}/blogservice/blog-member/register`,params);
    if(res.code === 20000) {
      notification['success']({
        message: '注册成功',
        duration: 1,
      });
      dispatch(login(account,password))
      // let resp = await http.get(`${demoUrl}/blogservice/blog-member/getMemberInfo`,res.data.token);
      // console.log(resp);
    } else {
      notification['error']({
        message: '账号已存在，请重新输入',
        duration: 1,
      });
    }
	}
}
