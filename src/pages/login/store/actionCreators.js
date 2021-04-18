/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-18 10:40:03
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
     // 密码至少包含 数字和英文，长度4-20
     let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
     // 用户名正则，4到16位（字母，数字，下划线，减号
     let accReg = /^[a-zA-Z0-9_-]{2,11}$/;
     if(!accReg.test(account)){
       notification['error']({
         message: '账号应为2到11位的字母，数字，下划线，减号',
         duration: 1,
       });
       return;
     }
     if(!pwdReg.test(password)){
       notification['error']({
         message: '密码至少包含数字和英文，长度4-20',
         duration: 1,
       });
       return;
     }
    let params = {
      account,
      password,
      nickname:'新用户'
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
